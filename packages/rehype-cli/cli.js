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
const proc = JSON.parse(
  String(
    // To do: this will break when we add export maps.
    await fs.readFile(new URL(resolve('rehype/package.json', import.meta.url)))
  )
)
/** @type {Pack} */
const cli = JSON.parse(
  String(await fs.readFile(new URL(resolve('./package.json', import.meta.url))))
)

args({
  description: cli.description,
  extensions: ['html', 'htm', 'xht', 'xhtml'],
  ignoreName: '.' + proc.name + 'ignore',
  name: proc.name,
  packageField: proc.name,
  pluginPrefix: proc.name,
  processor: rehype,
  rcName: '.' + proc.name + 'rc',
  version: [
    proc.name + ': ' + proc.version,
    cli.name + ': ' + cli.version
  ].join(', ')
})
