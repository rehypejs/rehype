import fs from 'fs'
import path from 'path'
import {bail} from 'bail'
import {rehype} from '../packages/rehype/index.js'

const join = path.join

const root = join(process.cwd(), 'test', 'fixtures')

fs.readdir(join(root), (error, files) => {
  let index = -1

  bail(error)

  while (++index < files.length) {
    const base = join(root, files[index])
    let config

    if (files[index].charAt(0) === '.') {
      continue
    }

    try {
      config = JSON.parse(fs.readFileSync(join(base, 'config.json')))
    } catch {
      config = {}
    }

    fs.readFile(join(base, 'index.html'), 'utf8', (error, doc) => {
      const processor = rehype().use({settings: config})
      const tree = processor.parse(doc)
      const result = processor.stringify(tree)

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
  }
})
