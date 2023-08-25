/**
 * @typedef {import('hast').Root} Root
 */

import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import {read} from 'to-vfile'
import {removePosition} from 'unist-util-remove-position'
import {assert as hastAssert} from 'hast-util-assert'
import {unified} from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import {rehype} from 'rehype'

const fragment = {fragment: true}

test('rehype().parse(file)', () => {
  assert.deepEqual(
    unified().use(rehypeParse).parse('Alfred'),
    {
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
    },
    'should accept a `string`'
  )

  assert.deepEqual(
    unified()
      // @ts-expect-error: to do: type `settings`.
      .data('settings', {fragment: true})
      .use(rehypeParse, {fragment: false})
      .use(rehypeStringify)
      .processSync('a')
      .toString(),
    '<html><head></head><body>a</body></html>',
    'should prefer options given to `rehypeParse` over `settings`'
  )

  assert.deepEqual(
    unified()
      // @ts-expect-error: to do: type `settings`.
      .data('settings', {quote: '"'})
      .use(rehypeParse, {fragment: true})
      .use(rehypeStringify, {quote: "'"})
      .processSync('<a title="b">c</a>')
      .toString(),
    "<a title='b'>c</a>",
    'should prefer options given to `rehypeStringify` over `settings`'
  )

  const tree = unified()
    .use(rehypeParse, {fragment: true})
    .parse('<img><span></span>')

  removePosition(tree, {force: true})

  assert.deepEqual(
    tree,
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

  const tree2 = unified().use(rehypeParse, fragment).parse('<foo><span></span>')
  removePosition(tree2, {force: true})

  assert.deepEqual(
    tree2,
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
})

test('rehype().stringify(ast, file, options?)', () => {
  assert.throws(
    () => {
      // @ts-expect-error: incorrect value.
      unified().use(rehypeStringify).stringify(false)
    },
    /false/,
    'should throw when `ast` is not a node'
  )

  assert.throws(
    () => {
      // @ts-expect-error: unknown node.
      unified().use(rehypeStringify).stringify({type: 'unicorn'})
    },
    /unicorn/,
    'should throw when `ast` is not a valid node'
  )

  assert.equal(
    unified()
      .use(rehypeStringify)
      .stringify({
        type: 'root',
        children: [{type: 'text', value: 'alpha < bravo'}]
      }),
    'alpha &#x3C; bravo',
    'should escape entities'
  )

  assert.equal(
    unified()
      .use(rehypeStringify, {characterReferences: {}})
      .stringify({
        type: 'root',
        children: [{type: 'text', value: 'alpha < bravo'}]
      }),
    'alpha &#x3C; bravo',
    'should encode entities (numbered by default)'
  )

  assert.equal(
    unified()
      .use(rehypeStringify, {characterReferences: {useNamedReferences: true}})
      .stringify({
        type: 'root',
        children: [{type: 'text', value: 'alpha < bravo'}]
      }),
    'alpha &lt; bravo',
    'should encode entities (numbered by default)'
  )

  assert.equal(
    unified()
      .use(rehypeStringify)
      .stringify({
        type: 'root',
        children: [
          {type: 'element', tagName: 'img', properties: {}, children: []}
        ]
      }),
    '<img>',
    'should not close void elements'
  )

  assert.equal(
    unified()
      .use(rehypeStringify, {closeSelfClosing: true})
      .stringify({
        type: 'root',
        children: [
          {type: 'element', tagName: 'img', properties: {}, children: []}
        ]
      }),
    '<img />',
    'should close void elements if `closeSelfClosing` is given'
  )

  assert.equal(
    unified()
      .use(rehypeStringify)
      .stringify({
        type: 'root',
        children: [
          {type: 'element', tagName: 'foo', properties: {}, children: []}
        ]
      }),
    '<foo></foo>',
    'should not close unknown elements by default'
  )

  assert.equal(
    unified()
      .use(rehypeStringify, {voids: ['foo']})
      .stringify({
        type: 'root',
        children: [
          {type: 'element', tagName: 'foo', properties: {}, children: []}
        ]
      }),
    '<foo>',
    'should close void elements if configured'
  )

  assert.deepEqual(
    rehype().processSync('<!doctypehtml>').messages.map(String),
    [],
    'should not emit parse errors by default'
  )

  assert.deepEqual(
    rehype()
      // @ts-expect-error: to do: type `settings`.
      .data('settings', {emitParseErrors: true})
      .processSync('<!doctypehtml>')
      .messages.map(String),
    ['1:10-1:10: Missing whitespace before doctype name'],
    'should emit parse errors when `emitParseErrors: true`'
  )

  assert.deepEqual(
    rehype()
      .data('settings', {
        // @ts-expect-error: to do: type `settings`.
        emitParseErrors: true,
        missingWhitespaceBeforeDoctypeName: false
      })
      .processSync('<!doctypehtml>')
      .messages.map(String),
    [],
    'should ignore parse errors when the specific rule is turned off'
  )

  assert.deepEqual(
    rehype()
      .data('settings', {
        // @ts-expect-error: to do: type `settings`.
        emitParseErrors: true,
        missingWhitespaceBeforeDoctypeName: true
      })
      .processSync('<!doctypehtml>')
      .messages.map(String),
    ['1:10-1:10: Missing whitespace before doctype name'],
    'should emit parse errors when the specific rule is turned on'
  )

  assert.deepEqual(
    rehype()
      .data('settings', {
        // @ts-expect-error: to do: type `settings`.
        emitParseErrors: true,
        missingWhitespaceBeforeDoctypeName: 2
      })
      .processSync('<!doctypehtml>').messages[0].fatal,
    true,
    'should emit fatal parse errors when the specific rule is `2`'
  )

  assert.deepEqual(
    rehype()
      .data('settings', {
        // @ts-expect-error: to do: type `settings`.
        emitParseErrors: true,
        missingWhitespaceBeforeDoctypeName: 1
      })
      .processSync('<!doctypehtml>').messages[0].fatal,
    false,
    'should emit fatal parse errors when the specific rule is `1`'
  )
})

test('fixtures', async (t) => {
  let index = -1
  const root = path.join('test', 'fixtures')
  const fixtures = await fs.readdir(root)

  while (++index < fixtures.length) {
    const fixture = fixtures[index]

    if (fixture.charAt(0) === '.') {
      continue
    }

    const fp = path.join(root, fixture)

    // eslint-disable-next-line no-await-in-loop
    await t.test(fixture, async () => {
      const file = await read(path.join(fp, 'index.html'))
      /** @type {{fragment?: boolean, reprocess?: boolean}} */
      let config = {}
      /** @type {Root|undefined} */
      let tree
      /** @type {string|undefined} */
      let result

      file.dirname = ''

      try {
        config = JSON.parse(
          String(await fs.readFile(path.join(fp, 'config.json')))
        )
      } catch {}

      try {
        result = await fs.readFile(path.join(fp, 'result.html'), 'utf8')
      } catch {}

      // @ts-expect-error: to do: type `settings`.
      const node = rehype().data('settings', config).parse(file)

      try {
        tree = JSON.parse(
          String(await fs.readFile(path.join(fp, 'index.json')))
        )
      } catch {
        await fs.writeFile(
          path.join(fp, 'index.json'),
          JSON.stringify(node, null, 2) + '\n'
        )
        return
      }

      hastAssert(node)

      assert.deepEqual(tree, node, 'should parse `' + fixture + '`')

      // @ts-expect-error: to do: type `settings`.
      const out = rehype().data('settings', config).stringify(node)

      if (result) {
        assert.equal(out, result, 'should stringify `' + fixture + '`')
      } else {
        assert.equal(
          out,
          String(file),
          'should stringify `' + fixture + '` exact'
        )
      }

      removePosition(node)

      // @ts-expect-error: to do: type `settings`.
      const expected = rehype().data('settings', config).parse(out)
      removePosition(expected)

      if (config.reprocess !== false) {
        assert.deepEqual(node, expected, 'should re-parse `' + fixture + '`')
      }
    })
  }
})
