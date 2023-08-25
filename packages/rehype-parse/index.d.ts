// This wrapper exists because JS in TS can’t export a `@type` of a function.
import type {Root} from 'hast'
import type {Plugin} from 'unified'
import type {Options} from './lib/index.js'

export type {ErrorCode, ErrorSeverity} from 'hast-util-from-html'
export type {Options} from './lib/index.js'

declare const rehypeParse: Plugin<[(Options | null | undefined)?], string, Root>
export default rehypeParse
