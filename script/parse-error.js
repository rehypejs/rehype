'use strict'

var u = require('unist-builder')
var unified = require('unified')
var parse = require('remark-parse')
var zone = require('mdast-zone')
var errors = require('../packages/rehype-parse/errors.json')

var repo = require('../package.json').repository

var whatwg = 'https://html.spec.whatwg.org/multipage/parsing.html#parse-error-'
var base = 'https://github.com/' + repo + '/blob/main'

var ignoreFixture = {
  surrogateInInputStream: true
}

module.exports = parseErrors

function parseErrors() {
  return transform
}

function transform(tree) {
  zone(tree, 'parse-error', visit)
}

function visit(start, nodes, end) {
  return [
    start,
    u('list', {ordered: false, spread: false}, Object.keys(errors).map(map)),
    end
  ]

  function map(name) {
    var info = errors[name]
    var kebab = name.replace(/[A-Z]/g, replacer)
    var reason = info.reason.charAt(0).toLowerCase() + info.reason.slice(1)
    var head = u('inlineCode', name)
    var fields = [
      info.url === false ? head : u('link', {url: whatwg + kebab}, [head]),
      u('text', ' — ')
    ].concat(unified().use(parse).parse(reason).children)

    if (!ignoreFixture[name]) {
      fields.push(
        u('text', ' ('),
        u('link', {url: base + '/test/parse-error/' + kebab + '/index.html'}, [
          u('text', 'example')
        ]),
        u('text', ')')
      )
    }

    return u('listItem', [u('paragraph', fields)])
  }

  function replacer($0) {
    return '-' + $0.toLowerCase()
  }
}
