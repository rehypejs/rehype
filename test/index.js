/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module rehype
 * @fileoverview Test suite for rehype, rehype-parse,
 *   and rehype-stringify.
 */

'use strict';

/* Dependencies. */
var fs = require('fs');
var path = require('path');
var test = require('tape');
var clean = require('unist-util-remove-position');
var hast = require('hast-util-assert');
var unified = require('../packages/rehype/node_modules/unified');
var parse = require('../packages/rehype-parse');
var stringify = require('../packages/rehype-stringify');
var rehype = require('../packages/rehype');

var fragment = {fragment: true};

/* Test `rehype-parse`. */
test('rehype().parse(file)', function (t) {
  var processor = unified().use(parse);

  t.equal(
    processor.parse('Alfred').children.length,
    1,
    'should accept a `string`'
  );

  t.deepEqual(
    clean(processor.parse('<img><span></span>', fragment), true),
    {
      type: 'root',
      children: [{
        type: 'element',
        tagName: 'img',
        properties: {},
        children: []
      }, {
        type: 'element',
        tagName: 'span',
        properties: {},
        children: []
      }],
      data: {quirksMode: false}
    },
    'should close void elements'
  );

  t.deepEqual(
    clean(processor.parse('<foo><span></span>', fragment), true),
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
          children: []
        }]
      }],
      data: {quirksMode: false}
    },
    'should not close unknown elements by default'
  );

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
      processor.stringify({type: 'unicorn'});
    },
    /unicorn/,
    'should throw when `ast` is not a valid node'
  );

  t.equal(
    processor.stringify({type: 'text', value: 'alpha < bravo'}),
    'alpha &#x3C; bravo',
    'should escape entities'
  );

  t.equal(
    processor.stringify({type: 'text', value: 'alpha < bravo'}, {
      entities: {}
    }),
    'alpha &#x3C; bravo',
    'should encode entities (numbered by default)'
  );

  t.equal(
    processor.stringify({type: 'text', value: 'alpha < bravo'}, {
      entities: {
        useNamedReferences: true
      }
    }),
    'alpha &lt; bravo',
    'should encode entities (numbered by default)'
  );

  t.equal(
    processor.stringify({type: 'element', tagName: 'img'}),
    '<img>',
    'should not close void elements'
  );

  t.equal(
    processor.stringify({type: 'element', tagName: 'img'}, {
      closeSelfClosing: true
    }),
    '<img />',
    'should close void elements if `closeSelfClosing` is given'
  );

  t.equal(
    processor().stringify({type: 'element', tagName: 'foo'}),
    '<foo></foo>',
    'should not close unknown elements by default'
  );

  t.equal(
    processor().stringify({type: 'element', tagName: 'foo'}, {
      voids: 'foo'
    }),
    '<foo>',
    'should close void elements if configured'
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
      return;
    }

    if (fixture.charAt(0) === '.') {
      next();
      return;
    }

    fp = path.join(root, fixture);

    setImmediate(next); // queue next.

    t.test(fixture, function (st) {
      var input = fs.readFileSync(path.join(fp, 'index.html'), 'utf8');
      var tree = fs.readFileSync(path.join(fp, 'index.json'), 'utf8');
      var config = fs.readFileSync(path.join(fp, 'config.json'), 'utf8');
      var node;
      var out;
      var result;

      config = JSON.parse(config);

      try {
        result = fs.readFileSync(path.join(fp, 'result.html'), 'utf8');
      } catch (err) { /* Empty */ }

      tree = JSON.parse(tree);
      node = processor.parse(input, config);
      hast(node);

      st.deepEqual(tree, node, 'should parse `' + fixture + '`');

      out = processor.stringify(node, config);

      if (result) {
        st.equal(out, result, 'should stringify `' + fixture + '`');
      } else {
        st.equal(out, input, 'should stringify `' + fixture + '` exact');
      }

      if (config.reprocess !== false) {
        st.deepEqual(
          clean(node),
          clean(processor.parse(out, config)),
          'should re-parse `' + fixture + '`'
        );
      }

      st.end();
    });
  }

  next();
});
