/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module rehype:stringify
 * @fileoverview HTML Compiler.
 */

'use strict';

/* Dependencies. */
var xtend = require('xtend');
var toHTML = require('hast-util-to-html');

/* Expose. */
module.exports = stringify;

/**
 * Attacher.
 *
 * @param {unified} processor - Unified processor.
 * @param {Object?} [config={}] - Configuration.
 */
function stringify(processor, config) {
  /* Patch. */
  processor.Compiler = Compiler;
  Compiler.prototype.compile = compile;

  /**
   * Construct a new compiler.
   *
   * @param {File} file - Virtual file.
   * @param {Object?} options - Configuration.
   * @param {Rehype} processor - Processor.
   */
  function Compiler(file, options) {
    this.options = options;
    this.file = file;
  }

  /**
   * Compile the bound file.
   *
   * @param {Node} tree - HAST node.
   * @return {string} - HTML.
   */
  function compile(tree) {
    return toHTML(tree, xtend(config, this.options));
  }
}
