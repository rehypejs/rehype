/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module rehype:stringify
 * @fileoverview HTML Compiler.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies. */
var xtend = require('xtend');
var toHTML = require('hast-util-to-html');

/**
 * Attacher.
 *
 * @param {unified} processor - Unified processor.
 * @param {Object?} [config={}] - Configuration.
 */
function stringify(processor, config) {
    /**
     * Construct a new compiler.
     *
     * @param {File} file - Virtual file.
     * @param {Object?} options - Configuration.
     * @param {Rehype} processor - Processor.
     */
    function Compiler(file, options, processor) {
        this.options = options;
        this.data = processor.data;
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

    /* Expose methods. */
    Compiler.prototype.compile = compile;

    processor.Compiler = Compiler;
}

/* Expose. */
module.exports = stringify;
