import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import {bail} from 'bail'
import {rehype} from '../packages/rehype/index.js'

const root = path.join(process.cwd(), 'test', 'fixtures')

fs.readdir(path.join(root), (error, files) => {
  let index = -1

  bail(error)

  while (++index < files.length) {
    const base = path.join(root, files[index])
    /** @type {Record<string, unknown>|undefined} */
    let config

    if (files[index].charAt(0) === '.') {
      continue
    }

    try {
      config = JSON.parse(
        String(fs.readFileSync(path.join(base, 'config.json')))
      )
    } catch {
      config = {}
    }

    fs.readFile(path.join(base, 'index.html'), 'utf8', (error, doc) => {
      const processor = rehype().use({settings: config})
      const tree = processor.parse(doc)
      const result = processor.stringify(tree)

      bail(error)

      fs.writeFile(
        path.join(base, 'index.json'),
        JSON.stringify(tree, null, 2) + '\n',
        bail
      )

      if (result === doc) {
        fs.unlink(path.join(base, 'result.html'), () => {
          /* Empty */
        })
      } else {
        fs.writeFile(path.join(base, 'result.html'), result, bail)
      }
    })
  }
})
