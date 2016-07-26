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
var fromParse5 = require('hast-util-from-parse5');
var Parser5 = require('parse5/lib/parser');

/* Expose. */
module.exports = Parser;

/* Parse5 Configuration. */
var config = {
    locationInfo: true
};

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
 */
function Parser(file, options) {
    this.parser = new Parser5(config);
    this.file = file;
    this.options = options;
}

/**
 * Parse the bound virtual file.
 *
 * @this {Parser}
 * @return {HastRoot} - Hast root-node.
 */
function parse() {
    var settings = this.options || {};
    var fn = settings.fragment ? 'parseFragment' : 'parse';

    return fromParse5(this.parser[fn](String(this.file)), {
        file: this.file,
        verbose: settings.verbose
    });
}

Parser.prototype.parse = parse;
