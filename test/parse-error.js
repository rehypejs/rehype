'use strict'

var fs = require('fs')
var path = require('path')
var test = require('tape')
var vfile = require('to-vfile')
var rehype = require('../packages/rehype/index.js')
var p5errors = require('../packages/rehype-parse/node_modules/parse5/lib/common/error-codes.js')
var rerrors = require('../packages/rehype-parse/errors.json')

// Related to https://github.com/inikulin/parse5/issues/255
// and https://github.com/inikulin/parse5/pull/257.
test('coverage', function (t) {
  t.deepEqual(
    Object.keys(p5errors).sort(),
    Object.keys(rerrors).sort(),
    'all codes from parse5 should be covered by rehype-parse'
  )

  t.end()
})

test('parse-errors', function (t) {
  var index = -1
  var root = path.join('test', 'parse-error')
  var fixtures = fs.readdirSync(root)

  t.test('surrogate-in-input-stream', function (st) {
    var file = vfile({
      path: 'index.html',
      contents: '<!doctype html>\n' + String.fromCharCode(0xd800)
    })

    rehype().data('settings', {emitParseErrors: true}).parse(file)

    st.deepEqual(
      JSON.parse(JSON.stringify(file.messages)),
      [
        {
          message: 'Unexpected surrogate character',
          name: 'index.html:2:1-2:1',
          reason: 'Unexpected surrogate character',
          line: 2,
          column: 1,
          location: {
            start: {line: 2, column: 1, offset: 16},
            end: {line: 2, column: 1, offset: 16}
          },
          source: 'parse-error',
          ruleId: 'surrogate-in-input-stream',
          file: 'index.html',
          fatal: false,
          note: 'Unexpected code point `0xD800`. Do not use lone surrogate characters in HTML',
          url: 'https://html.spec.whatwg.org/multipage/parsing.html#parse-error-surrogate-in-input-stream'
        }
      ],
      'should emit messages'
    )
  })

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

    t.test(fixture, function (st) {
      var file = vfile.readSync(path.join(fp, 'index.html'), 'utf8')
      var messages = JSON.parse(
        fs.readFileSync(path.join(fp, 'messages.json'), 'utf8')
      )

      file.dirname = ''

      rehype().data('settings', {emitParseErrors: true}).parse(file)

      st.deepEqual(
        JSON.parse(JSON.stringify(file.messages)),
        messages,
        'should emit messages for `' + fixture + '`'
      )

      st.end()
    })
  }

  next()
})
