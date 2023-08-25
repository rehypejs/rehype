/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast-util-from-html').Options} FromHtmlOptions
 * @typedef {import('unified').Parser<Root>} Parser
 */

/**
 * @typedef {Omit<FromHtmlOptions, 'onerror'> & RehypeParseFields} Options
 *   Configuration.
 *
 * @typedef RehypeParseFields
 *   Extra fields.
 * @property {boolean | null | undefined} [emitParseErrors=false]
 *   Whether to emit parse errors while parsing (default: `false`).
 *
 *   > 👉 **Note**: parse errors are currently being added to HTML.
 *   > Not all errors emitted by parse5 (or us) are specced yet.
 *   > Some documentation may still be missing.
 */

import {fromHtml} from 'hast-util-from-html'

/**
 * Plugin to add support for parsing from HTML.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {undefined}
 *   Nothing.
 */
export default function rehypeParse(options) {
  /** @type {import('unified').Processor<Root>} */
  // @ts-expect-error: TS in JSDoc generates wrong types if `this` is typed regularly.
  const self = this
  const processorSettings = /** @type {Options} */ (self.data('settings'))
  const {emitParseErrors, ...settings} = {...processorSettings, ...options}

  self.parser = parser

  /**
   * @type {Parser}
   */
  function parser(doc, file) {
    return fromHtml(doc, {
      ...settings,
      onerror: emitParseErrors
        ? function (message) {
            if (file.path) {
              message.name = file.path + ':' + message.name
              message.file = file.path
            }

            file.messages.push(message)
          }
        : undefined
    })
  }
}
