'use strict'

var fs = require('fs')
var path = require('path')
var bail = require('bail')
var rehype = require('../packages/rehype')

var join = path.join

var root = join(__dirname, '..', 'test', 'fixtures')

fs.readdir(join(root), function (error, files) {
  bail(error)

  files.forEach(function (name) {
    var base = join(root, name)
    var config

    if (name.charAt(0) === '.') {
      return
    }

    try {
      config = JSON.parse(fs.readFileSync(join(base, 'config.json')))
    } catch (_) {
      config = {}
    }

    fs.readFile(join(base, 'index.html'), 'utf8', function (error, doc) {
      var processor = rehype().use({settings: config})
      var tree = processor.parse(doc)
      var result = processor.stringify(tree)

      bail(error)

      fs.writeFile(
        join(base, 'index.json'),
        JSON.stringify(tree, 0, 2) + '\n',
        bail
      )

      if (result === doc) {
        fs.unlink(join(base, 'result.html'), Function.prototype)
      } else {
        fs.writeFile(join(base, 'result.html'), result, bail)
      }
    })
  })
})
