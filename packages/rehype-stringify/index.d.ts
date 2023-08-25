import type {Root} from 'hast'
import type {Plugin} from 'unified'
import type {Options} from './lib/index.js'

export type {Options} from './lib/index.js'

/**
 * Plugin to add support for serializing as HTML.
 *
 * @this
 *   Unified processor.
 * @param
 *   Configuration (optional).
 * @returns
 *   Nothing.
 */
declare const rehypeStringify: Plugin<
  [(Options | null | undefined)?],
  Root,
  string
>
export default rehypeStringify
