'use strict'

var fs = require('fs')
var path = require('path')
var test = require('tape')
var vfile = require('to-vfile')
var clean = require('unist-util-remove-position')
var hast = require('hast-util-assert')
var unified = require('../packages/rehype/node_modules/unified')
var parse = require('../packages/rehype-parse')
var stringify = require('../packages/rehype-stringify')
var rehype = require('../packages/rehype')

var fragment = {fragment: true}

test('rehype().parse(file)', function(t) {
  t.equal(
    unified()
      .use(parse)
      .parse('Alfred').children.length,
    1,
    'should accept a `string`'
  )

  t.deepEqual(
    clean(
      unified()
        .use(parse, fragment)
        .parse('<img><span></span>'),
      true
    ),
    {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'img',
          properties: {},
          children: []
        },
        {
          type: 'element',
          tagName: 'span',
          properties: {},
          children: []
        }
      ],
      data: {quirksMode: false}
    },
    'should close void elements'
  )

  t.deepEqual(
    clean(
      unified()
        .use(parse, fragment)
        .parse('<foo><span></span>'),
      true
    ),
    {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'foo',
          properties: {},
          children: [
            {
              type: 'element',
              tagName: 'span',
              properties: {},
              children: []
            }
          ]
        }
      ],
      data: {quirksMode: false}
    },
    'should not close unknown elements by default'
  )

  t.end()
})

test('rehype().stringify(ast, file, options?)', function(t) {
  t.throws(
    function() {
      unified()
        .use(stringify)
        .stringify(false)
    },
    /false/,
    'should throw when `ast` is not a node'
  )

  t.throws(
    function() {
      unified()
        .use(stringify)
        .stringify({type: 'unicorn'})
    },
    /unicorn/,
    'should throw when `ast` is not a valid node'
  )

  t.equal(
    unified()
      .use(stringify)
      .stringify({type: 'text', value: 'alpha < bravo'}),
    'alpha &#x3C; bravo',
    'should escape entities'
  )

  t.equal(
    unified()
      .use(stringify, {entities: {}})
      .stringify({type: 'text', value: 'alpha < bravo'}),
    'alpha &#x3C; bravo',
    'should encode entities (numbered by default)'
  )

  t.equal(
    unified()
      .use(stringify, {entities: {useNamedReferences: true}})
      .stringify({type: 'text', value: 'alpha < bravo'}),
    'alpha &lt; bravo',
    'should encode entities (numbered by default)'
  )

  t.equal(
    unified()
      .use(stringify)
      .stringify({type: 'element', tagName: 'img'}),
    '<img>',
    'should not close void elements'
  )

  t.equal(
    unified()
      .use(stringify, {closeSelfClosing: true})
      .stringify({type: 'element', tagName: 'img'}),
    '<img />',
    'should close void elements if `closeSelfClosing` is given'
  )

  t.equal(
    unified()
      .use(stringify)
      .stringify({type: 'element', tagName: 'foo'}),
    '<foo></foo>',
    'should not close unknown elements by default'
  )

  t.equal(
    unified()
      .use(stringify, {voids: 'foo'})
      .stringify({type: 'element', tagName: 'foo'}),
    '<foo>',
    'should close void elements if configured'
  )

  t.deepEqual(
    rehype()
      .processSync('<!doctypehtml>')
      .messages.map(String),
    [],
    'should not emit parse errors by default'
  )

  t.deepEqual(
    rehype()
      .data('settings', {emitParseErrors: true})
      .processSync('<!doctypehtml>')
      .messages.map(String),
    ['1:10-1:10: Missing whitespace before doctype name'],
    'should emit parse errors when `emitParseErrors: true`'
  )

  t.deepEqual(
    rehype()
      .data('settings', {
        emitParseErrors: true,
        missingWhitespaceBeforeDoctypeName: false
      })
      .processSync('<!doctypehtml>')
      .messages.map(String),
    [],
    'should ignore parse errors when the specific rule is turned off'
  )

  t.deepEqual(
    rehype()
      .data('settings', {
        emitParseErrors: true,
        missingWhitespaceBeforeDoctypeName: true
      })
      .processSync('<!doctypehtml>')
      .messages.map(String),
    ['1:10-1:10: Missing whitespace before doctype name'],
    'should emit parse errors when the specific rule is turned on'
  )

  t.deepEqual(
    rehype()
      .data('settings', {
        emitParseErrors: true,
        missingWhitespaceBeforeDoctypeName: 2
      })
      .processSync('<!doctypehtml>').messages[0].fatal,
    true,
    'should emit fatal parse errors when the specific rule is `2`'
  )

  t.deepEqual(
    rehype()
      .data('settings', {
        emitParseErrors: true,
        missingWhitespaceBeforeDoctypeName: 1
      })
      .processSync('<!doctypehtml>').messages[0].fatal,
    false,
    'should emit fatal parse errors when the specific rule is `1`'
  )

  t.end()
})

test('fixtures', function(t) {
  var index = -1
  var root = path.join('test', 'fixtures')
  var fixtures = fs.readdirSync(root)

  /* Check the next fixture. */
  function next() {
    var fixture = fixtures[++index]
    var fp

    if (!fixture) {
      t.end()
      return
    }

    if (fixture.charAt(0) === '.') {
      setImmediate(next)
      return
    }

    fp = path.join(root, fixture)

    setImmediate(next) // Queue next.

    t.test(fixture, function(st) {
      var file = vfile.readSync(path.join(fp, 'index.html'))
      var config = {}
      var tree
      var node
      var out
      var result

      file.dirname = ''

      try {
        config = JSON.parse(fs.readFileSync(path.join(fp, 'config.json')))
      } catch (error) {}

      try {
        result = fs.readFileSync(path.join(fp, 'result.html'), 'utf8')
      } catch (error) {}

      node = rehype()
        .data('settings', config)
        .parse(file)

      try {
        tree = JSON.parse(fs.readFileSync(path.join(fp, 'index.json')))
      } catch (error) {
        fs.writeFileSync(
          path.join(fp, 'index.json'),
          JSON.stringify(node, 0, 2) + '\n'
        )
        return
      }

      hast(node)

      st.deepEqual(tree, node, 'should parse `' + fixture + '`')

      out = rehype()
        .data('settings', config)
        .stringify(node)

      if (result) {
        st.equal(out, result, 'should stringify `' + fixture + '`')
      } else {
        st.equal(out, String(file), 'should stringify `' + fixture + '` exact')
      }

      if (config.reprocess !== false) {
        st.deepEqual(
          clean(node),
          clean(
            rehype()
              .data('settings', config)
              .parse(out)
          ),
          'should re-parse `' + fixture + '`'
        )
      }

      st.end()
    })
  }

  next()
})
