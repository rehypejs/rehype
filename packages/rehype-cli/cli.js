#!/usr/bin/env node
'use strict'

var start = require('unified-args')
var processor = require('rehype')
var proc = require('rehype/package.json')
var cli = require('./package.json')

start({
  processor: processor,
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
