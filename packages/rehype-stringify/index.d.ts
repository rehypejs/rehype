import type {Root} from 'hast'
import type {Plugin} from 'unified'
import type {Options} from 'hast-util-to-html'

export type {CharacterReferences, Options} from 'hast-util-to-html'

// Note: we have to use manual types here,
// instead of getting them from `lib/index.js`,
// because TS generates wrong types for functions that use `this`.
// TS makes them into classes which is incorrect.
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

// Add custom settings supported when `rehype-stringify` is added.
declare module 'unified' {
  interface Settings extends Options {}
}
