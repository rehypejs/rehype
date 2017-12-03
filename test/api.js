'use strict';

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

test('rehype().parse(file)', function (t) {
  t.equal(
    unified().use(parse).parse('Alfred').children.length,
    1,
    'should accept a `string`'
  );

  t.deepEqual(
    clean(unified().use(parse, fragment).parse('<img><span></span>'), true),
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
    clean(unified().use(parse, fragment).parse('<foo><span></span>'), true),
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

test('rehype().stringify(ast, file, options?)', function (t) {
  t.throws(
    function () {
      unified()
        .use(stringify)
        .stringify(false);
    },
    /false/,
    'should throw when `ast` is not a node'
  );

  t.throws(
    function () {
      unified()
        .use(stringify)
        .stringify({type: 'unicorn'});
    },
    /unicorn/,
    'should throw when `ast` is not a valid node'
  );

  t.equal(
    unified()
      .use(stringify)
      .stringify({type: 'text', value: 'alpha < bravo'}),
    'alpha &#x3C; bravo',
    'should escape entities'
  );

  t.equal(
    unified()
      .use(stringify, {entities: {}})
      .stringify({type: 'text', value: 'alpha < bravo'}),
    'alpha &#x3C; bravo',
    'should encode entities (numbered by default)'
  );

  t.equal(
    unified()
      .use(stringify, {entities: {useNamedReferences: true}})
      .stringify({type: 'text', value: 'alpha < bravo'}),
    'alpha &lt; bravo',
    'should encode entities (numbered by default)'
  );

  t.equal(
    unified()
      .use(stringify)
      .stringify({type: 'element', tagName: 'img'}),
    '<img>',
    'should not close void elements'
  );

  t.equal(
    unified()
      .use(stringify, {closeSelfClosing: true})
      .stringify({type: 'element', tagName: 'img'}),
    '<img />',
    'should close void elements if `closeSelfClosing` is given'
  );

  t.equal(
    unified()
      .use(stringify)
      .stringify({type: 'element', tagName: 'foo'}),
    '<foo></foo>',
    'should not close unknown elements by default'
  );

  t.equal(
    unified()
      .use(stringify, {voids: 'foo'})
      .stringify({type: 'element', tagName: 'foo'}),
    '<foo>',
    'should close void elements if configured'
  );

  t.end();
});

test('fixtures', function (t) {
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

    setImmediate(next); // Queue next.

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
      node = rehype().data('settings', config).parse(input);
      hast(node);

      st.deepEqual(tree, node, 'should parse `' + fixture + '`');

      out = rehype().data('settings', config).stringify(node);

      if (result) {
        st.equal(out, result, 'should stringify `' + fixture + '`');
      } else {
        st.equal(out, input, 'should stringify `' + fixture + '` exact');
      }

      if (config.reprocess !== false) {
        st.deepEqual(
          clean(node),
          clean(rehype().data('settings', config).parse(out)),
          'should re-parse `' + fixture + '`'
        );
      }

      st.end();
    });
  }

  next();
});
