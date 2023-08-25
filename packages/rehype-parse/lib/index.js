/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast-util-from-html').Options} FromHtmlOptions
 */

/**
 * @typedef {Omit<FromHtmlOptions, 'onerror'> & RehypeParseFields} Options
 *   Options.
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
 * @this {import('unified').Processor}
 * @type {import('unified').Plugin<[(Options | null | undefined)?], string, Root>}
 */
export default function rehypeParse(options) {
  const processorSettings = /** @type {Options} */ (this.data('settings'))
  const settings = Object.assign({}, processorSettings, options)

  Object.assign(this, {Parser: parser})

  /** @type {import('unified').Parser<Root>} */
  function parser(doc, file) {
    return fromHtml(doc, {
      ...settings,
      onerror: settings.emitParseErrors
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
