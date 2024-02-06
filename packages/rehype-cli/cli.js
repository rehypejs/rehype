#!/usr/bin/env node

/**
 * @typedef Pack
 *   Minimum `package.json`.
 * @property {string} name
 *   Name.
 * @property {string} version
 *   Version.
 * @property {string} description
 *   Description.
 */

import fs from 'node:fs/promises'
import {resolve} from 'import-meta-resolve'
import {rehype} from 'rehype'
import {args} from 'unified-args'

/** @type {Pack} */
const rehypePackage = JSON.parse(
  String(
    await fs.readFile(
      new URL('package.json', resolve('rehype', import.meta.url))
    )
  )
)

/** @type {Pack} */
const cliPackage = JSON.parse(
  String(await fs.readFile(new URL('package.json', import.meta.url)))
)

args({
  description: cliPackage.description,
  extensions: ['html', 'htm', 'xht', 'xhtml'],
  ignoreName: '.' + rehypePackage.name + 'ignore',
  name: rehypePackage.name,
  packageField: rehypePackage.name,
  pluginPrefix: rehypePackage.name,
  processor: rehype,
  rcName: '.' + rehypePackage.name + 'rc',
  version: [
    rehypePackage.name + ': ' + rehypePackage.version,
    cliPackage.name + ': ' + cliPackage.version
  ].join(', ')
})
