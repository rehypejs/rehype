// This wrapper exists because JS in TS can’t export a `@type` of a function.
import type {Root} from 'hast'
import type {Plugin} from 'unified'
import type {Options} from './lib/index.js'

export type {Options} from './lib/index.js'
// Note: defining all nodes here, such as with `Root | Element | ...` seems
// to trip TS up.
declare const rehypeStringify: Plugin<
  [(Options | null | undefined)?],
  Root,
  string
>
export default rehypeStringify
