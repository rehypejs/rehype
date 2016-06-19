/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module rehype:parse
 * @fileoverview HTML parser.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies. */
var Parser = require('./lib/parser.js');

/**
 * Attacher.
 *
 * @param {unified} processor - Unified processor.
 */
function parse(processor) {
    processor.Parser = Parser;
}

/* Patch `Parser`. */
parse.Parser = Parser;

/* Expose */
module.exports = parse;
