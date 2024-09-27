import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import process from 'node:process'
import test from 'node:test'
import rehypeParse from 'rehype-parse'
import {unified} from 'unified'
import {VFile} from 'vfile'

test('parse errors', async function (t) {
  let index = -1
  const root = new URL('parse-error/', import.meta.url)
  const folders = await fs.readdir(root)

  while (++index < folders.length) {
    const folder = folders[index]

    if (folder.charAt(0) === '.') {
      continue
    }

    await t.test(folder, async function () {
      const base = new URL(folder + '/', root)
      const inputUrl = new URL('index.html', base)
      const expectedUrl = new URL('messages.json', base)

      const input = new VFile({
        basename: 'index.html',
        value: await fs.readFile(inputUrl)
      })

      unified().use(rehypeParse, {emitParseErrors: true}).parse(input)

      /** @type {Array<unknown>} */
      // eslint-disable-next-line unicorn/prefer-structured-clone -- cast to plain JSON.
      const actual = JSON.parse(JSON.stringify(input.messages))

      /** @type {Array<unknown>} */
      let expected

      try {
        expected = JSON.parse(String(await fs.readFile(expectedUrl)))
        if ('UPDATE' in process.env) throw new Error('Update')
      } catch {
        expected = actual
        await fs.writeFile(
          expectedUrl,
          JSON.stringify(expected, undefined, 2) + '\n'
        )
      }

      assert.deepEqual(actual, expected)
    })
  }

  // This one has to be manual as it’s lone surrogates which editors/tools will
  // typically fix.
  await t.test('surrogate-in-input-stream', function () {
    const file = new VFile({
      path: 'index.html',
      value: '<!doctype html>\n' + String.fromCharCode(0xd8_00)
    })

    unified().use(rehypeParse, {emitParseErrors: true}).parse(file)

    /** @type {Array<unknown>} */
    // eslint-disable-next-line unicorn/prefer-structured-clone -- cast to plain JSON.
    const actual = JSON.parse(JSON.stringify(file.messages))

    assert.deepEqual(actual, [
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
    ])
  })
})
