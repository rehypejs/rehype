#!/usr/bin/env node
/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module rehype:cli
 * @fileoverview CLI to process HTML.
 */

'use strict';

/* Dependencies. */
var start = require('unified-args');
var processor = require('rehype');
var proc = require('rehype/package.json');
var cli = require('./package.json');

/* Start. */
start({
  processor: processor,
  name: proc.name,
  description: cli.description,
  version: [
    proc.name + ': ' + proc.version,
    cli.name + ': ' + cli.version
  ].join(', '),
  pluginPrefix: proc.name,
  presetPrefix: proc.name + '-preset',
  packageField: proc.name,
  rcName: '.' + proc.name + 'rc',
  ignoreName: '.' + proc.name + 'ignore',
  extensions: [
    'html',
    'htm',
    'xht',
    'xhtml'
  ]
});
