'use strict'

var unified = require('unified')
var parse = require('rehype-parse')
var stringify = require('rehype-stringify')

module.exports = unified().use(parse).use(stringify).freeze()
