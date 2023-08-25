#!/usr/bin/env node
import {createRequire} from 'node:module'
import {rehype} from 'rehype'
// eslint-disable-next-line import/order
import {args} from 'unified-args'

const require = createRequire(import.meta.url)

const proc = require('rehype/package.json')
const cli = require('./package.json')

args({
  processor: rehype,
  name: proc.name,
  description: cli.description,
  version: [
    proc.name + ': ' + proc.version,
    cli.name + ': ' + cli.version
  ].join(', '),
  pluginPrefix: proc.name,
  packageField: proc.name,
  rcName: '.' + proc.name + 'rc',
  ignoreName: '.' + proc.name + 'ignore',
  extensions: ['html', 'htm', 'xht', 'xhtml']
})
