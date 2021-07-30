import fs from 'fs'
import u from 'unist-builder'
import unified from 'unified'
import parse from 'remark-parse'
import zone from 'mdast-zone'
import {errors} from '../packages/rehype-parse/errors.js'

const pkg = JSON.parse(fs.readFileSync('package.json'))

const repo = pkg.repository

const whatwg =
  'https://html.spec.whatwg.org/multipage/parsing.html#parse-error-'
const base = 'https://github.com/' + repo + '/blob/main'

const ignoreFixture = {
  surrogateInInputStream: true
}

export default function remarkParseErrors() {
  return transform
}

function transform(tree) {
  zone(tree, 'parse-error', visit)
}

function visit(start, _, end) {
  return [
    start,
    u(
      'list',
      {ordered: false, spread: false},
      Object.keys(errors).map((name) => {
        const info = errors[name]
        const kebab = name.replace(/[A-Z]/g, ($0) => '-' + $0.toLowerCase())
        const reason =
          info.reason.charAt(0).toLowerCase() + info.reason.slice(1)
        const head = u('inlineCode', name)
        const fields = [
          info.url === false ? head : u('link', {url: whatwg + kebab}, [head]),
          u('text', ' — ')
        ].concat(unified().use(parse).parse(reason).children)

        if (!ignoreFixture[name]) {
          fields.push(
            u('text', ' ('),
            u(
              'link',
              {url: base + '/test/parse-error/' + kebab + '/index.html'},
              [u('text', 'example')]
            ),
            u('text', ')')
          )
        }

        return u('listItem', [u('paragraph', fields)])
      })
    ),
    end
  ]
}
