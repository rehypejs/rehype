/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module rehype:parser
 * @fileoverview HTML parser.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies. */
var bail = require('bail');
var h = require('hastscript');
var information = require('property-information');
var Tokenizer = require('htmlparser2/lib/Tokenizer.js');
var webNamespaces = require('web-namespaces');
var voids = require('html-void-elements');
var openClose = require('./open-close.js');

/* Methods. */
var has = Object.prototype.hasOwnProperty;

/* Map of tag-names starting new namespaces. */
var namespaces = {
    math: webNamespaces.mathml,
    svg: webNamespaces.svg
};

/* Functions to patch a position, created later. */
var start;
var end;

/* Access to the `prototype` of `Parser`. */
var proto;

/* Rules. */
var R_OPEN = 'require-open-tag';
var R_CLOSE = 'require-close-tag';
var R_OPEN_SLASH = 'no-self-closing';
var R_CLOSE_ATTRIBUTES = 'no-close-tag-attributes';
var R_TAG_CASE = 'tag-case';
var R_ATTRIBUTE_CASE = 'attribute-name-case';
var R_ATTRIBUTE_DUPLICATE = 'no-duplicate-attribute';
var R_BOOLEAN_VALUE = 'no-boolean-value';
var R_ATTRIBUTE_VALUE = 'require-attribute-value';

/**
 * Lower-case a value.
 *
 * @param {*} value - Value.
 * @return {stirng} - Lower-cased value.
 */
function lower(value) {
    return String(value).toLowerCase();
}

/**
 * Get the last entry.
 *
 * @param {Array} values - List.
 * @return {*} - Entry.
 */
function last(values) {
    return values[values.length - 1];
}

/**
 * Utility to patch positions of type `type`.
 *
 * @param {string} type - Position type.
 * @return {Function} - Patcher for `type`.
 */
function patchFactory(type) {
    /**
     * Patch `type` positions of `node` based on the given
     * `parser`.
     *
     * @param {HastNode} node - Node to patch.
     * @param {Object} relative - Source position.
     */
    return function (node, relative) {
        var context = relative[type];
        var pos = node.position || (node.position = {});

        pos = pos[type] || (pos[type] = {});

        pos.line = context.line;
        pos.column = context.column;
        pos.offset = context.offset;
    };
}

start = patchFactory('start');
end = patchFactory('end');

/**
 * Utility to get the name of an instruction.
 *
 * @param {string} value - Instruction text.
 * @return {string} - Name of instruction.
 */
function instructionName(value) {
    var index = value.search(/\s|\//);

    return lower(index === -1 ? value : value.substr(0, index));
}

/**
 * Construct a new parser.
 *
 * @example
 *   var file = new VFile('<span>Hello</span>.');
 *   var parser = new Parser(file);
 *
 * @constructor
 * @class {Parser}
 * @param {File} file - Virtual file.
 * @param {Object?} options - Configuration.
 * @param {Unified} processor - Processor.
 */
function Parser(file, options, processor) {
    this.data = processor.data;
    this.file = file;
    this.stack = [];
    this.fragment = [];
    this.tagNameStack = [];
    this.namespaceStack = [webNamespaces.html];

    this.tagName = '';
    this.attributeName = '';
    this.attributeValue = null;
    this.attributes = null;

    this.start = {};
    this.end = {};
    this.start.column = this.end.column = this.start.line = this.end.line = 1;
    this.start.offset = 0;
    this.end.offset = null;
    this.tokenizer = new Tokenizer({
        decodeEntities: true
    }, this);
}

/**
 * Parse the bound virtual file.
 *
 * @this {Parser}
 * @return {HastRoot} - Hast root-node.
 */
function parse() {
    var self = this;
    var start = {};
    var end = {};
    var tail;
    var position;

    self.tokenizer.end(self.file.toString());

    tail = last(self.fragment);
    position = tail ? tail.position.end : {};

    start.column = start.line = 1;
    start.offset = 0;

    end.line = position.line || 1;
    end.column = position.column || 1;
    end.offset = position.offset || 0;

    return {
        type: 'root',
        children: self.fragment,
        position: {
            start: start,
            end: end
        }
    };
}

/**
 * Trigger a warning.
 *
 * @param {string} [reason] - Reason for warning.
 * @param {Node|Location|Position} position - Place of
 *   warning.
 * @param {string} ruleId - Short-code of warning.
 * @this {Parser}
 */
function warn(reason, position, ruleId) {
    var message = this.file.warn(reason, position, ruleId);

    message.source = 'rehype';
}

/**
 * Get to position, optionally with `endOffset`.
 *
 * @param {number} [endOffset=0] - Final offset.
 * @this {Parser}
 */
function current(endOffset) {
    var self = this;
    var buffer = self.tokenizer._buffer;
    var end = self.end;
    var begin = end.offset || 0;
    var final = this.tokenizer._index + (endOffset || 0);
    var character;
    var now;

    now = {
        line: end.line,
        column: end.column,
        offset: begin
    };

    while (begin < final) {
        character = buffer.charAt(begin);

        if (character === '\n') {
            now.line++;
            now.column = 0;
        }

        now.column++;

        begin++;
    }

    now.offset = final;

    return now;
}

/**
 * Update the position.
 *
 * @param {number} [endOffset=0] - Final offset.
 * @this {Parser}
 */
function update(endOffset) {
    var self = this;
    var end = self.end;

    self.start = {
        line: end.line,
        column: end.column,
        offset: end.offset || 0
    };

    self.end = self.current(endOffset);
}

/**
 * Enter a node.
 *
 * @param {HastNode} node - Node to enter.
 * @this {Parser}
 */
function enter(node) {
    var self = this;
    var parent = last(self.stack);

    (parent ? parent.children : self.fragment).push(node);

    start(node, self);

    return node;
}

/**
 * Exit the current node.
 *
 * @this {Parser}
 */
function exit() {
    var self = this;
    var tail = self.stack.pop();

    if (tail) {
        if (tail.tagName && has.call(namespaces, tail.tagName)) {
            self.namespaceStack.pop();
        }

        end(tail, self);
    }
}

/**
 * Handle raw-text.
 *
 * @param {string} value - Content.
 * @this {Parser}
 */
function raw(value) {
    var self = this;
    var parent = last(self.stack);
    var domTail = !parent && last(self.fragment);
    var prevTail = parent && last(parent.children);
    var node;

    if (domTail && domTail.type === 'text') {
        node = domTail;
    } else if (prevTail && prevTail.type === 'text') {
        node = prevTail;
    } else {
        node = self.enter({
            type: 'text',
            value: ''
        });
    }

    end(node, self);

    node.value += value;
}

/**
 * Add a node for `tag`.
 *
 * @param {string} tagName - Tag-name.
 * @param {Object} attributes - Attribute names mapping to
 *   attribute values.
 * @this {Parser}
 */
function tag(tagName, attributes) {
    var self = this;
    var nodeName = String(tagName);

    if (last(self.namespaceStack) === webNamespaces.html) {
        nodeName = lower(nodeName);
    }

    self.stack.push(self.enter(h(nodeName, attributes, [])));

    if (has.call(namespaces, nodeName)) {
        self.namespaceStack.push(namespaces[nodeName]);
    }
}

/**
 * Close the current node.
 *
 * @this {Parser}
 */
function close() {
    var self = this;
    var nodeName = self.tagName;

    self.onopentagend();

    if (last(self.tagNameStack) === nodeName) {
        self.exit();
        self.tagNameStack.pop();
    }
}

/**
 * Handle an instruction (declaration and processing
 * instruction).
 *
 * @param {string} name - instruction name.
 * @param {string} value - Content.
 * @this {Parser}
 */
function instruction(name, value) {
    this.update(1);

    end(this.enter({
        type: 'directive',
        name: name,
        value: value
    }), this);
}

/**
 * Handle text.
 *
 * @param {string} value - Value to handle.
 * @this {Parser}
 */
function text(value) {
    this.update();
    this.raw(value);
}

/**
 * Handle the start of an opening tag.
 *
 * @param {string} tagName - Tag-name.
 * @this {Parser}
 */
function openTagStart(tagName) {
    var self = this;
    var nodeName = tagName;
    var allVoids = self.data('void') || voids;
    var tagNameStack = self.tagNameStack;
    var closing;

    if (last(self.namespaceStack) === webNamespaces.html) {
        nodeName = lower(nodeName);
    }

    if (nodeName !== tagName) {
        self.warn(
            'Expected opening tag-name `' + tagName +
            '` to be lower-cased (`' + nodeName + '`)',
            self.current(),
            R_TAG_CASE
        );
    }

    self.tagName = nodeName;

    if (has.call(openClose, nodeName)) {
        closing = openClose[nodeName];

        while (closing.indexOf(last(tagNameStack)) !== -1) {
            self.onclosetag(last(tagNameStack), true);
        }
    }

    if (allVoids.indexOf(nodeName) === -1) {
        tagNameStack.push(nodeName);
    }

    self.attributes = {};
}

/**
 * Handle the end of an opening tag.
 *
 * @this {Parser}
 */
function openTagEnd() {
    var self = this;
    var name = self.tagName;
    var tokenizer = self.tokenizer;
    var namespace = last(self.namespaceStack);
    var empty = tokenizer._buffer.charAt(tokenizer._index - 1) === '/';
    var now = self.current(0);
    var allVoids = self.data('void') || voids;

    self.update(1);

    self.tag(name, self.attributes);

    self.attributes = null;

    if (allVoids.indexOf(name) !== -1) {
        self.exit();
    }

    /* XML has self-closing nodes. */
    if (self.tagNameStack.length && empty) {
        if (namespace !== webNamespaces.html) {
            self.tagNameStack.pop();
            self.exit();
        }
    }

    if (empty && namespace === webNamespaces.html) {
        self.warn(
            'Did not expect self-closing syntax in HTML',
            now,
            R_OPEN_SLASH
        );
    }

    self.tagName = '';
}

/**
 * Handle an closing tag.
 *
 * @param {string} tagName - Tag-name.
 * @param {boolean} [silent=false] - Whether to ignore
 *   updating the position.  Useful if a new open tag is
 *   found which implicitly closes previously open nodes.
 * @this {Parser}
 */
function closeTag(tagName, silent) {
    var self = this;
    var allVoids = self.data('void') || voids;
    var before = self.end;
    var tokenizer = self.tokenizer;
    var buffer = tokenizer._buffer;
    var index = tokenizer._index;
    var length = buffer.length;
    var nodeName = tagName;
    var character;
    var pos;
    var count;
    var name;
    var node;

    if (last(self.namespaceStack) === webNamespaces.html) {
        nodeName = lower(nodeName);
    }

    if (nodeName !== tagName) {
        self.warn(
            'Expected closing tag-name `' + tagName +
            '` to be lower-cased (`' + nodeName + '`)',
            self.current(),
            R_TAG_CASE
        );
    }

    if (!silent) {
        self.update(1);

        while (index < length) {
            character = buffer.charAt(index);

            if (/[\ \t\n\f\r]/g.test(character)) {
                index++;
                continue;
            }

            if (character !== '>') {
                self.warn(
                    'Did not expect `' + character + '` after closing tag',
                    self.current(index - tokenizer._index),
                    R_CLOSE_ATTRIBUTES
                );
            }

            break;
        }
    }

    pos = self.tagNameStack.lastIndexOf(nodeName);

    if (allVoids.indexOf(nodeName) === -1 && pos !== -1) {
        count = self.tagNameStack.length - pos;

        /* Close all tags until, and including, `nodeName`.
         * Example: `<div><p></div>`. */
        while (count--) {
            name = self.tagNameStack.pop();
            node = last(self.stack);

            self.exit();

            /* Warn about all except the last. */
            if (count) {
                node.position.end = before;

                self.warn(
                    'Expected closing tag for `' + name + '`',
                    node,
                    R_CLOSE
                );
            }
        }

        return;
    }

    /* Handle closing tags for non-open elements (including void
     * closing tags).  For example: `</p>`, `</br>`, or `</img>` */
    self.warn('Stray end tag `' + nodeName + '`', before, R_OPEN);

    if (nodeName === 'br' || nodeName === 'p') {
        self.onopentagname(nodeName);
        self.close();
    }
}

/**
 * Handle an attribute name.
 *
 * @param {string} value - Content.
 * @this {Parser}
 */
function attributeName(value) {
    var self = this;
    var attributes = self.attributes;
    var insensitive = lower(value);

    /* Warn if the attribute is already set. */
    if (attributes && has.call(attributes, insensitive)) {
        self.warn(
            'Duplicate attribute `' + insensitive + '`',
            self.current(),
            R_ATTRIBUTE_DUPLICATE
        );
    }

    if (insensitive !== value) {
        self.warn(
            'Expected attribute name `' + value +
            '` to be lower-cased (`' + insensitive + '`)',
            self.current(),
            R_ATTRIBUTE_CASE
        );
    }

    this.attributeName = insensitive;
}

/**
 * Handle a continued attribute value.
 *
 * @param {string} value - Content.
 * @this {Parser}
 */
function attributeContinue(value) {
    this.attributeValue = (this.attributeValue || '') + value;
}

/**
 * Handle the end of an attribute.
 *
 * @this {Parser}
 */
function attributeEnd() {
    var self = this;
    var attributes = self.attributes;
    var name = self.attributeName;
    var value = self.attributeValue;
    var info = information(name) || {};
    var hasValue = value !== null;
    var boolean = info.boolean;

    if (info.overloadedBoolean && lower(value) === name) {
        boolean = true;
    }

    if (boolean && hasValue) {
        self.warn(
            'Found superfluous value for boolean `' + name + '`',
            self.current(),
            R_BOOLEAN_VALUE
        );
    } else if (!boolean && !hasValue) {
        self.warn(
            'Missing value for non-boolean attribute `' + name + '`',
            self.current(),
            R_ATTRIBUTE_VALUE
        );
    }

    /* Redefined attributes are (per the spec) ignored. */
    if (attributes && !has.call(attributes, name)) {
        attributes[name] = value || '';
    }

    self.attributeName = '';
    self.attributeValue = null;
}

/**
 * Handle a declaration.
 *
 * @param {string} value - Content.
 * @this {Parser}
 */
function declaration(value) {
    this.instruction('!' + instructionName(value), '!' + value);
}

/**
 * Handle a processing instruction.
 *
 * @param {string} value - Content.
 * @this {Parser}
 */
function processingInstruction(value) {
    this.instruction('?' + instructionName(value), '?' + value);
}

/**
 * Handle a comment token.
 *
 * @param {string} value - Content.
 * @this {Parser}
 */
function comment(value) {
    this.update(1);

    end(this.enter({
        type: 'comment',
        value: value
    }), this);
}

/**
 * Handle a CDATA token.
 *
 * @param {string} value - Content.
 * @this {Parser}
 */
function characterData(value) {
    this.update(1);

    end(this.enter({
        type: 'characterData',
        value: value || ''
    }), this);
}

/**
 * Flush all currenly open nodes.
 *
 * @this {Parser}
 */
function flush() {
    var self = this;
    var length = self.tagNameStack.length;
    var node;
    var name;

    while (length--) {
        node = last(self.stack) || {};
        name = self.tagNameStack.pop();

        self.warn(
            'Unclosed element `' + name + '`',
            {
                start: node.position && node.position.start,
                end: self.current()
            },
            R_CLOSE
        );

        self.exit();
    }
}

/* Expose core. */
proto = Parser.prototype;

proto.parse = parse;
proto.update = update;
proto.current = current;
proto.warn = warn;

/* Expose utilities. */
proto.enter = enter;
proto.exit = exit;
proto.raw = raw;
proto.tag = tag;
proto.close = close;
proto.instruction = instruction;

/* Expose methods `tokenizer` expects. */
proto.ontext = text;
proto.onopentagname = openTagStart;
proto.onopentagend = openTagEnd;
proto.onclosetag = closeTag;
proto.onselfclosingtag = openTagEnd;
proto.onattribname = attributeName;
proto.onattribdata = attributeContinue;
proto.onattribend = attributeEnd;
proto.ondeclaration = declaration;
proto.onprocessinginstruction = processingInstruction;
proto.oncomment = comment;
proto.oncdata = characterData;
proto.onend = flush;

/* This never happens.  `htmlparser2` uses this for
 * incorrect API usage (which Parser does not allow),
 * not for malformed HTML.  However, it’s handled here
 * anyway. */
proto.onerror = bail;

/* Expose. */
module.exports = Parser;
