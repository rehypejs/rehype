/**
 * @import {Root} from 'hast'
 * @import {Options} from 'hast-util-to-html'
 * @import {Processor} from 'unified'
 */

import {toHtml} from 'hast-util-to-html'

/**
 * Plugin to add support for serializing as HTML.
 *
 * @this {Processor<undefined, undefined, undefined, Root, string>}
 *   Processor instance.
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {undefined}
 *   Nothing.
 */
export default function rehypeStringify(options) {
  const self = this
  const settings = {...self.data('settings'), ...options}

  self.compiler = compiler

  /**
   * @param {Root} tree
   *   Tree.
   * @returns {string}
   *   Document.
   */
  function compiler(tree) {
    return toHtml(tree, settings)
  }
}
