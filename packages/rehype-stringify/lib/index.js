/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast-util-to-html').Options} Options
 * @typedef {import('unified').Compiler<Root, string>} Compiler
 */

import {toHtml} from 'hast-util-to-html'

/**
 * Plugin to add support for serializing as HTML.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {undefined}
 *   Nothing.
 */
export default function rehypeStringify(options) {
  /** @type {import('unified').Processor<undefined, undefined, undefined, Root, string>} */
  // @ts-expect-error: TS in JSDoc generates wrong types if `this` is typed regularly.
  const self = this
  const settings = {...self.data('settings'), ...options}

  self.compiler = compiler

  /**
   * @type {Compiler}
   */
  function compiler(tree) {
    return toHtml(tree, settings)
  }
}
