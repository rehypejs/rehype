/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module rehype
 * @fileoverview HTML processor powered by plugins.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies. */
var unified = require('unified');
var parse = require('rehype-parse');
var stringify = require('rehype-stringify');
var voids = require('html-void-elements');

/* Expose. */
module.exports = unified()
    .data('void', voids)
    .use(parse)
    .use(stringify)
    .abstract();
