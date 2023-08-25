/**
 * @typedef {import('hast').Root} Root
 */

import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import process from 'node:process'
import test from 'node:test'
import {assert as hastAssert} from 'hast-util-assert'
import {rehype} from 'rehype'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import {unified} from 'unified'
import {removePosition} from 'unist-util-remove-position'
import {VFile} from 'vfile'

test('rehype', async function (t) {
  await t.test('should expose the public api of `rehype`', async function () {
    assert.deepEqual(Object.keys(await import('rehype')).sort(), ['rehype'])
  })

  await t.test(
    'should expose the public api of `rehype-parse`',
    async function () {
      assert.deepEqual(Object.keys(await import('rehype-parse')).sort(), [
        'default'
      ])
    }
  )

  await t.test(
    'should expose the public api of `rehype-stringify`',
    async function () {
      assert.deepEqual(Object.keys(await import('rehype-stringify')).sort(), [
        'default'
      ])
    }
  )

  await t.test('should accept a `string`', async function () {
    assert.deepEqual(unified().use(rehypeParse).parse('Alfred'), {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'html',
          properties: {},
          children: [
            {type: 'element', tagName: 'head', properties: {}, children: []},
            {
              type: 'element',
              tagName: 'body',
              properties: {},
              children: [
                {
                  type: 'text',
                  value: 'Alfred',
                  position: {
                    start: {line: 1, column: 1, offset: 0},
                    end: {line: 1, column: 7, offset: 6}
                  }
                }
              ]
            }
          ]
        }
      ],
      data: {quirksMode: true},
      position: {
        start: {line: 1, column: 1, offset: 0},
        end: {line: 1, column: 7, offset: 6}
      }
    })
  })

  await t.test(
    'should prefer options given to `rehypeParse` over `settings`',
    async function () {
      assert.deepEqual(
        unified()
          // @ts-expect-error: to do: type `settings`.
          .data('settings', {fragment: true})
          .use(rehypeParse, {fragment: false})
          .use(rehypeStringify)
          .processSync('a')
          .toString(),
        '<html><head></head><body>a</body></html>'
      )
    }
  )

  await t.test(
    'should prefer options given to `rehypeStringify` over `settings`',
    async function () {
      assert.deepEqual(
        unified()
          // @ts-expect-error: to do: type `settings`.
          .data('settings', {quote: '"'})
          .use(rehypeParse, {fragment: true})
          .use(rehypeStringify, {quote: "'"})
          .processSync('<a title="b">c</a>')
          .toString(),
        "<a title='b'>c</a>"
      )
    }
  )

  await t.test('should parse self-closing elements', async function () {
    assert.deepEqual(
      unified().use(rehypeParse, {fragment: true}).parse('<img><span></span>'),
      {
        type: 'root',
        children: [
          {
            type: 'element',
            tagName: 'img',
            properties: {},
            children: [],
            position: {
              start: {line: 1, column: 1, offset: 0},
              end: {line: 1, column: 6, offset: 5}
            }
          },
          {
            type: 'element',
            tagName: 'span',
            properties: {},
            children: [],
            position: {
              start: {line: 1, column: 6, offset: 5},
              end: {line: 1, column: 19, offset: 18}
            }
          }
        ],
        data: {quirksMode: false},
        position: {
          start: {line: 1, column: 1, offset: 0},
          end: {line: 1, column: 19, offset: 18}
        }
      }
    )
  })

  await t.test(
    'should not close unknown elements by default',
    async function () {
      assert.deepEqual(
        unified()
          .use(rehypeParse, {fragment: true})
          .parse('<foo><span></span>'),
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
                  children: [],
                  position: {
                    start: {line: 1, column: 6, offset: 5},
                    end: {line: 1, column: 19, offset: 18}
                  }
                }
              ],
              position: {
                start: {line: 1, column: 1, offset: 0},
                end: {line: 1, column: 19, offset: 18}
              }
            }
          ],
          data: {quirksMode: false},
          position: {
            start: {line: 1, column: 1, offset: 0},
            end: {line: 1, column: 19, offset: 18}
          }
        }
      )
    }
  )

  await t.test(
    'should throw when `tree` is not a valid node',
    async function () {
      assert.throws(function () {
        // @ts-expect-error: unknown node.
        unified().use(rehypeStringify).stringify({type: 'unicorn'})
      }, /unicorn/)
    }
  )

  await t.test('should escape character references', async function () {
    assert.equal(
      unified()
        .use(rehypeStringify)
        .stringify({
          type: 'root',
          children: [{type: 'text', value: 'alpha < bravo'}]
        }),
      'alpha &#x3C; bravo'
    )
  })

  await t.test(
    'should encode character references (numbered by default)',
    async function () {
      assert.equal(
        unified()
          .use(rehypeStringify, {characterReferences: {}})
          .stringify({
            type: 'root',
            children: [{type: 'text', value: 'alpha < bravo'}]
          }),
        'alpha &#x3C; bravo'
      )
    }
  )

  await t.test('should encode character references (named)', async function () {
    assert.equal(
      unified()
        .use(rehypeStringify, {
          characterReferences: {useNamedReferences: true}
        })
        .stringify({
          type: 'root',
          children: [{type: 'text', value: 'alpha < bravo'}]
        }),
      'alpha &lt; bravo'
    )
  })

  await t.test('should not close self-closing elements', async function () {
    assert.equal(
      unified()
        .use(rehypeStringify)
        .stringify({
          type: 'root',
          children: [
            {type: 'element', tagName: 'img', properties: {}, children: []}
          ]
        }),
      '<img>'
    )
  })

  await t.test(
    'should close self-closing elements if `closeSelfClosing` is given',
    async function () {
      assert.equal(
        unified()
          .use(rehypeStringify, {closeSelfClosing: true})
          .stringify({
            type: 'root',
            children: [
              {type: 'element', tagName: 'img', properties: {}, children: []}
            ]
          }),
        '<img />'
      )
    }
  )

  await t.test(
    'should not close unknown elements by default',
    async function () {
      assert.equal(
        unified()
          .use(rehypeStringify)
          .stringify({
            type: 'root',
            children: [
              {type: 'element', tagName: 'foo', properties: {}, children: []}
            ]
          }),
        '<foo></foo>'
      )
    }
  )

  await t.test('should close given `voids`', async function () {
    assert.equal(
      unified()
        .use(rehypeStringify, {voids: ['foo']})
        .stringify({
          type: 'root',
          children: [
            {type: 'element', tagName: 'foo', properties: {}, children: []}
          ]
        }),
      '<foo>'
    )
  })

  await t.test('should not emit parse errors by default', async function () {
    assert.deepEqual(
      rehype().processSync('<!doctypehtml>').messages.map(String),
      []
    )
  })

  await t.test(
    'should emit parse errors when `emitParseErrors: true`',
    async function () {
      assert.deepEqual(
        rehype()
          // @ts-expect-error: to do: type `settings`.
          .data('settings', {emitParseErrors: true})
          .processSync('<!doctypehtml>')
          .messages.map(String),
        ['1:10-1:10: Missing whitespace before doctype name']
      )
    }
  )

  await t.test(
    'should ignore parse errors when the specific rule is turned off',
    async function () {
      assert.deepEqual(
        rehype()
          .data('settings', {
            // @ts-expect-error: to do: type `settings`.
            emitParseErrors: true,
            missingWhitespaceBeforeDoctypeName: false
          })
          .processSync('<!doctypehtml>')
          .messages.map(String),
        []
      )
    }
  )

  await t.test(
    'should emit parse errors when the specific rule is turned on',
    async function () {
      assert.deepEqual(
        rehype()
          .data('settings', {
            // @ts-expect-error: to do: type `settings`.
            emitParseErrors: true,
            missingWhitespaceBeforeDoctypeName: true
          })
          .processSync('<!doctypehtml>')
          .messages.map(String),
        ['1:10-1:10: Missing whitespace before doctype name']
      )
    }
  )

  await t.test(
    'should emit fatal parse errors when the specific rule is `2`',
    async function () {
      assert.deepEqual(
        rehype()
          .data('settings', {
            // @ts-expect-error: to do: type `settings`.
            emitParseErrors: true,
            missingWhitespaceBeforeDoctypeName: 2
          })
          .processSync('<!doctypehtml>').messages[0].fatal,
        true
      )
    }
  )

  await t.test(
    'should emit warning parse errors when the specific rule is `1`',
    async function () {
      assert.deepEqual(
        rehype()
          .data('settings', {
            // @ts-expect-error: to do: type `settings`.
            emitParseErrors: true,
            missingWhitespaceBeforeDoctypeName: 1
          })
          .processSync('<!doctypehtml>').messages[0].fatal,
        false
      )
    }
  )
})

test('fixtures', async function (t) {
  const root = new URL('fixtures/', import.meta.url)
  let index = -1
  const folders = await fs.readdir(root)

  while (++index < folders.length) {
    const folder = folders[index]

    if (folder.charAt(0) === '.') {
      continue
    }

    await t.test(folder, async function () {
      const base = new URL(folder + '/', root)
      const configUrl = new URL('config.json', base)
      const inputUrl = new URL('index.html', base)
      const expectedTreeUrl = new URL('index.json', base)
      const expectedOutputUrl = new URL('result.html', base)

      // To do: types of `Settings`.
      /** @type {{fragment?: boolean, reprocess?: boolean}} */
      let settings = {}

      try {
        settings = JSON.parse(String(await fs.readFile(configUrl)))
      } catch {}

      // @ts-expect-error: To do: types of `Settings`.
      const processor = rehype().data('settings', settings)
      const input = new VFile({
        basename: 'index.html',
        value: await fs.readFile(inputUrl)
      })
      const actualTree = processor.parse(input)
      const actualOutput = processor.stringify(actualTree, input)

      hastAssert(actualTree)

      /** @type {string} */
      let expectedOutput
      /** @type {Root} */
      let expectedTree

      try {
        expectedOutput = String(await fs.readFile(expectedOutputUrl))
        if ('UPDATE' in process.env) throw new Error('Update')
      } catch {
        expectedOutput = actualOutput
        await fs.writeFile(expectedOutputUrl, expectedOutput)
      }

      try {
        expectedTree = JSON.parse(String(await fs.readFile(expectedTreeUrl)))
        if ('UPDATE' in process.env) throw new Error('Update')
      } catch {
        expectedTree = actualTree
        await fs.writeFile(
          expectedTreeUrl,
          JSON.stringify(expectedTree, undefined, 2) + '\n'
        )
      }

      assert.deepEqual(actualTree, expectedTree)
      assert.equal(actualOutput, expectedOutput)

      if (settings.reprocess !== false) {
        const reprocessedTree = rehype()
          // @ts-expect-error: to do: type `settings`.
          .data('settings', settings)
          .parse(actualOutput)
        removePosition(actualTree)
        removePosition(reprocessedTree)
        assert.deepEqual(actualTree, reprocessedTree)
      }
    })
  }
})
