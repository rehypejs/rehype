// This wrapper exists because JS in TS can’t export a `@type` of a function.
import type {Options, ErrorCode, ErrorSeverity} from './lib/index.js'
import type {Root} from 'hast'
import type {Plugin} from 'unified'
const rehypeParse: Plugin<[Options] | [], Root, string>
export default rehypeParse
export type {Options, ErrorCode, ErrorSeverity}
