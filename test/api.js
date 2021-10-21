/**
 * @typedef {import('hast').Root} Root
 */

import fs from 'node:fs'
import path from 'node:path'
import test from 'tape'
import {readSync} from 'to-vfile'
import {removePosition} from 'unist-util-remove-position'
import {assert} from 'hast-util-assert'
import {unified} from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import {rehype} from 'rehype'

const fragment = {fragment: true}

test('rehype().parse(file)', (t) => {
  t.deepEqual(
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

  t.deepEqual(
    unified()
      .data('settings', {fragment: true})
      .use(rehypeParse, {fragment: false})
      .use(rehypeStringify)
      .processSync('a')
      .toString(),
    '<html><head></head><body>a</body></html>',
    'should prefer options given to `rehypeParse` over `settings`'
  )

  t.deepEqual(
    unified()
      .data('settings', {quote: '"'})
      .use(rehypeParse, {fragment: true})
      .use(rehypeStringify, {quote: "'"})
      .processSync('<a title="b">c</a>')
      .toString(),
    "<a title='b'>c</a>",
    'should prefer options given to `rehypeStringify` over `settings`'
  )

  t.deepEqual(
    removePosition(
      unified().use(rehypeParse, {fragment: true}).parse('<img><span></span>'),
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
    removePosition(
      unified().use(rehypeParse, fragment).parse('<foo><span></span>'),
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

test('rehype().stringify(ast, file, options?)', (t) => {
  t.throws(
    () => {
      // @ts-expect-error: incorrect value.
      unified().use(rehypeStringify).stringify(false)
    },
    /false/,
    'should throw when `ast` is not a node'
  )

  t.throws(
    () => {
      // @ts-expect-error: unknown node.
      unified().use(rehypeStringify).stringify({type: 'unicorn'})
    },
    /unicorn/,
    'should throw when `ast` is not a valid node'
  )

  t.equal(
    unified()
      .use(rehypeStringify)
      .stringify({
        type: 'root',
        children: [{type: 'text', value: 'alpha < bravo'}]
      }),
    'alpha &#x3C; bravo',
    'should escape entities'
  )

  t.equal(
    unified()
      .use(rehypeStringify, {entities: {}})
      .stringify({
        type: 'root',
        children: [{type: 'text', value: 'alpha < bravo'}]
      }),
    'alpha &#x3C; bravo',
    'should encode entities (numbered by default)'
  )

  t.equal(
    unified()
      .use(rehypeStringify, {entities: {useNamedReferences: true}})
      .stringify({
        type: 'root',
        children: [{type: 'text', value: 'alpha < bravo'}]
      }),
    'alpha &lt; bravo',
    'should encode entities (numbered by default)'
  )

  t.equal(
    unified()
      .use(rehypeStringify)
      .stringify({
        type: 'root',
        children: [{type: 'element', tagName: 'img', children: []}]
      }),
    '<img>',
    'should not close void elements'
  )

  t.equal(
    unified()
      .use(rehypeStringify, {closeSelfClosing: true})
      .stringify({
        type: 'root',
        children: [{type: 'element', tagName: 'img', children: []}]
      }),
    '<img />',
    'should close void elements if `closeSelfClosing` is given'
  )

  t.equal(
    unified()
      .use(rehypeStringify)
      .stringify({
        type: 'root',
        children: [{type: 'element', tagName: 'foo', children: []}]
      }),
    '<foo></foo>',
    'should not close unknown elements by default'
  )

  t.equal(
    unified()
      .use(rehypeStringify, {voids: ['foo']})
      .stringify({
        type: 'root',
        children: [{type: 'element', tagName: 'foo', children: []}]
      }),
    '<foo>',
    'should close void elements if configured'
  )

  t.deepEqual(
    rehype()
      .processSync('<!doctypehtml>')
      .messages.map((d) => String(d)),
    [],
    'should not emit parse errors by default'
  )

  t.deepEqual(
    rehype()
      .data('settings', {emitParseErrors: true})
      .processSync('<!doctypehtml>')
      .messages.map((d) => String(d)),
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
      .messages.map((d) => String(d)),
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
      .messages.map((d) => String(d)),
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

test('fixtures', (t) => {
  let index = -1
  const root = path.join('test', 'fixtures')
  const fixtures = fs.readdirSync(root)

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
      const file = readSync(path.join(fp, 'index.html'))
      /** @type {{fragment?: boolean, reprocess?: boolean}} */
      let config = {}
      /** @type {Root|undefined} */
      let tree
      /** @type {string|undefined} */
      let result

      file.dirname = ''

      try {
        config = JSON.parse(
          String(fs.readFileSync(path.join(fp, 'config.json')))
        )
      } catch {}

      try {
        result = fs.readFileSync(path.join(fp, 'result.html'), 'utf8')
      } catch {}

      const node = rehype().data('settings', config).parse(file)

      try {
        tree = JSON.parse(String(fs.readFileSync(path.join(fp, 'index.json'))))
      } catch {
        fs.writeFileSync(
          path.join(fp, 'index.json'),
          JSON.stringify(node, null, 2) + '\n'
        )
        return
      }

      assert(node)

      st.deepEqual(tree, node, 'should parse `' + fixture + '`')

      const out = rehype().data('settings', config).stringify(node)

      if (result) {
        st.equal(out, result, 'should stringify `' + fixture + '`')
      } else {
        st.equal(out, String(file), 'should stringify `' + fixture + '` exact')
      }

      if (config.reprocess !== false) {
        st.deepEqual(
          removePosition(node),
          removePosition(rehype().data('settings', config).parse(out)),
          'should re-parse `' + fixture + '`'
        )
      }

      st.end()
    })
  }

  next()
})
