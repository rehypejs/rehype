#!/usr/bin/env node
import start from 'unified-args'
import {rehype} from 'rehype'
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

const proc = require('rehype/package.json')
const cli = require('./package.json')

start({
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
