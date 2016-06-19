/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module rehype
 * @fileoverview Test suite for rehype, rehype-parse,
 *   and rehype-stringify.
 */

'use strict';

/* eslint-env node */
/* jscs:disable jsDoc */
/* jscs:disable maximumLineLength */

var fs = require('fs');
var path = require('path');
var test = require('tape');
var clean = require('unist-util-remove-position');
var unified = require('../packages/rehype/node_modules/unified');
var parse = require('../packages/rehype-parse');
var stringify = require('../packages/rehype-stringify');
var rehype = require('../packages/rehype');
var hast = require('./hast.js');

/* Test `rehype-parse`. */
test('rehype().parse(file)', function (t) {
    var processor = unified().use(parse);

    t.equal(
        processor.parse('Alfred').children.length,
        1,
        'should accept a `string`'
    );

    t.deepEqual(
        clean(processor.parse('<img><span></span>')),
        {
            type: 'root',
            children: [{
                type: 'element',
                tagName: 'img',
                properties: {},
                children: [],
                position: undefined
            }, {
                type: 'element',
                tagName: 'span',
                properties: {},
                children: [],
                position: undefined
            }],
            position: undefined
        },
        'should close void elements'
    );

    t.deepEqual(
        clean(processor.parse('<foo><span></span>')),
        {
            type: 'root',
            children: [{
                type: 'element',
                tagName: 'foo',
                properties: {},
                children: [{
                    type: 'element',
                    tagName: 'span',
                    properties: {},
                    children: [],
                    position: undefined
                }],
                position: undefined
            }],
            position: undefined
        },
        'should not close unknown elements by default'
    );

    t.deepEqual(
        clean(processor().data('void', ['foo']).parse('<foo><span></span>')),
        {
            type: 'root',
            children: [{
                type: 'element',
                tagName: 'foo',
                properties: {},
                children: [],
                position: undefined
            }, {
                type: 'element',
                tagName: 'span',
                properties: {},
                children: [],
                position: undefined
            }],
            position: undefined
        },
        'should close elements in `voids`'
    );

    t.test('should warn about malformed HTML', function (st) {
        var filePath = path.join(__dirname, 'checker.html');
        var doc = fs.readFileSync(filePath, 'utf8');

        st.plan(2);

        rehype().process(doc, function (err, file) {
            st.ifErr(err);

            st.deepEqual(file.messages.map(String), [
                '6:5: Expected opening tag-name `DIV` to be lower-cased (`div`)',
                '6:9: Expected attribute name `Foo` to be lower-cased (`foo`)',
                '6:21: Expected closing tag-name `Div` to be lower-cased (`div`)',
                '10:23: Found superfluous value for boolean `hidden`',
                '10:43: Found superfluous value for boolean `download`',
                '14:9: Missing value for non-boolean attribute `id`',
                '18:9: Expected attribute name `Foo` to be lower-cased (`foo`)',
                '18:19: Duplicate attribute `foo`',
                '22:18: Did not expect `i` after closing tag',
                '26:1: Stray end tag `div`', '28:1: Stray end tag `br`',
                '34:10: Did not expect self-closing syntax in HTML',
                '36:6-36:12: Expected closing tag for `span`',
                '34:1-37:1: Unclosed element `article`',
                '32:1-37:1: Unclosed element `header`'
            ], 'should warn');
        });
    });

    t.end();
});

/* Test `rehype-stringify`. */
test('rehype().stringify(ast, file, options?)', function (t) {
    var processor = unified().use(stringify);

    t.throws(
        function () {
            processor.stringify(false);
        },
        /false/,
        'should throw when `ast` is not a node'
    );

    t.throws(
        function () {
            processor.stringify({
                type: 'unicorn'
            });
        },
        /unicorn/,
        'should throw when `ast` is not a valid node'
    );

    t.equal(
        processor.stringify({
            type: 'text',
            value: 'alpha © bravo ≠ at&t 𝌆 delta'
        }),
        'alpha © bravo ≠ at&#x26;t 𝌆 delta',
        'should escape entities'
    );

    t.equal(
        processor.stringify({
            type: 'text',
            value: 'alpha © bravo ≠ at&t 𝌆 delta'
        }, {
            entities: {}
        }),
        'alpha &#xA9; bravo &#x2260; at&#x26;t &#x1D306; delta',
        'should encode entities (numbered by default)'
    );

    t.equal(
        processor.stringify({
            type: 'text',
            value: 'alpha © bravo ≠ at&t 𝌆 delta'
        }, {
            entities: {
                useNamedReferences: true
            }
        }),
        'alpha &copy; bravo &ne; at&amp;t &#x1D306; delta',
        'should encode entities (numbered by default)'
    );

    t.equal(
        processor.stringify({
            type: 'element',
            tagName: 'img'
        }),
        '<img>',
        'should not close void elements'
    );

    t.equal(
        processor.stringify({
            type: 'element',
            tagName: 'img'
        }, {
            closeSelfClosing: true
        }),
        '<img />',
        'should close void elements if `closeSelfClosing` is given'
    );

    t.equal(
        processor().data('void', []).stringify({
            type: 'element',
            tagName: 'foo'
        }),
        '<foo></foo>',
        'should close unknown elements by default'
    );

    t.equal(
        processor().data('void', ['foo']).stringify({
            type: 'element',
            tagName: 'foo'
        }),
        '<foo>',
        'should not close elements in `voids`'
    );

    t.end();
});

/* Test all fixtures. */
test('fixtures', function (t) {
    var processor = rehype();
    var index = -1;
    var root = path.join(__dirname, 'fixtures');
    var fixtures = fs.readdirSync(root);

    /* Check the next fixture. */
    function next() {
        var fixture = fixtures[++index];
        var fp;

        if (!fixture) {
            t.end();
        } else {
            if (fixture.charAt(0) === '.') {
                next();
                return;
            }

            fp = path.join(root, fixture);

            setImmediate(next); // queue next.

            t.test(fixture, function (st) {
                var input = fs.readFileSync(path.join(fp, 'index.html'), 'utf8');
                var tree = fs.readFileSync(path.join(fp, 'index.json'), 'utf8');
                var node;
                var out;
                var renode;
                var result;

                try {
                    result = fs.readFileSync(path.join(fp, 'result.html'), 'utf8');
                } catch (e) { /* Empty */ }

                tree = JSON.parse(tree);

                node = processor.parse(input);

                hast(node);

                st.deepEqual(
                    node,
                    tree,
                    'should parse `' + fixture + '` correctly'
                );

                out = processor.stringify(node);
                renode = processor.parse(out);

                st.deepEqual(
                    clean(renode),
                    clean(node),
                    'should re-parse `' + fixture + '`'
                );

                if (result) {
                    st.equal(out, result, 'should stringify `' + fixture + '`');
                } else {
                    st.equal(out, input, 'should stringify `' + fixture + '` exact');
                }

                st.end()
            });
        }
    }

    next();
});
