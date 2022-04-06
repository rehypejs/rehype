import fs from 'node:fs'
import path from 'node:path'
import test from 'tape'
import {toVFile, readSync} from 'to-vfile'
import {rehype} from 'rehype'
// @ts-expect-error: untyped.
import p5errors from 'parse5/lib/common/error-codes.js'
import {errors as rerrors} from 'rehype-parse/lib/errors.js'

// Related to https://github.com/inikulin/parse5/issues/255
// and https://github.com/inikulin/parse5/pull/257.
test('coverage', (t) => {
  t.deepEqual(
    Object.keys(p5errors).sort(),
    Object.keys(rerrors).sort(),
    'all codes from parse5 should be covered by rehype-parse'
  )

  t.end()
})

test('parse-errors', (t) => {
  let index = -1
  const root = path.join('test', 'parse-error')
  const fixtures = fs.readdirSync(root)

  t.test('surrogate-in-input-stream', (st) => {
    const file = toVFile({
      path: 'index.html',
      value: '<!doctype html>\n' + String.fromCharCode(0xd8_00)
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
          position: {
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
    const fixture = fixtures[++index]

    if (!fixture) {
      t.end()
      return
    }

    if (fixture.charAt(0) === '.') {
      setImmediate(next)
      return
    }

    const fp = path.join(root, fixture)

    setImmediate(next) // Queue next.

    t.test(fixture, (st) => {
      const file = readSync(path.join(fp, 'index.html'), 'utf8')
      /** @type {Array<Error>} */
      const messages = JSON.parse(
        // @ts-expect-error: xo removes `utf8` (because it’s not needed), ts wants it.
        fs.readFileSync(path.join(fp, 'messages.json'))
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
