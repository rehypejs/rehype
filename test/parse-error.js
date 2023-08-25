import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import test from 'node:test'
import {toVFile, read} from 'to-vfile'
import {rehype} from 'rehype'

test('parse-errors', async (t) => {
  await t.test('surrogate-in-input-stream', () => {
    const file = toVFile({
      path: 'index.html',
      value: '<!doctype html>\n' + String.fromCharCode(0xd8_00)
    })

    // @ts-expect-error: to do: type settings.
    rehype().data('settings', {emitParseErrors: true}).parse(file)

    assert.deepEqual(
      JSON.parse(JSON.stringify(file.messages)),
      [
        {
          column: 1,
          fatal: false,
          message: 'Unexpected surrogate character',
          line: 2,
          name: 'index.html:2:1-2:1',
          place: {
            start: {line: 2, column: 1, offset: 16},
            end: {line: 2, column: 1, offset: 16}
          },
          reason: 'Unexpected surrogate character',
          ruleId: 'surrogate-in-input-stream',
          source: 'hast-util-from-html',
          note: 'Unexpected code point `0xD800`. Do not use lone surrogate characters in HTML',
          url: 'https://html.spec.whatwg.org/multipage/parsing.html#parse-error-surrogate-in-input-stream',
          file: 'index.html'
        }
      ],
      'should emit messages'
    )
  })

  let index = -1
  const root = path.join('test', 'parse-error')
  const fixtures = await fs.readdir(root)

  while (++index < fixtures.length) {
    const fixture = fixtures[index]

    if (fixture.charAt(0) === '.') {
      continue
    }

    const fp = path.join(root, fixture)

    // eslint-disable-next-line no-await-in-loop
    await t.test(fixture, async () => {
      const file = await read(path.join(fp, 'index.html'), 'utf8')
      /** @type {Array<Error>} */
      let expected = JSON.parse(
        String(await fs.readFile(path.join(fp, 'messages.json')))
      )

      file.dirname = ''

      // @ts-expect-error: to do: type settings.
      rehype().data('settings', {emitParseErrors: true}).parse(file)

      /** @type {Array<Error>} */
      const actual = JSON.parse(JSON.stringify(file.messages))

      if ('UPDATE' in process.env) {
        expected = actual
        await fs.writeFile(
          path.join(fp, 'messages.json'),
          JSON.stringify(expected, undefined, 2) + '\n'
        )
      }

      assert.deepEqual(
        actual,
        expected,
        'should emit messages for `' + fixture + '`'
      )
    })
  }
})
