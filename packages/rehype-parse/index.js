/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module rehype:parse
 * @fileoverview HTML parser.
 */

'use strict';

/* Dependencies. */
var Parser = require('./lib/parser.js');

/* Expose */
module.exports = exports = parse;
exports.Parser = Parser;

/**
 * Attacher.
 *
 * @param {unified} processor - Unified processor.
 */
function parse(processor) {
  processor.Parser = Parser;
}
