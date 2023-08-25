import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import {unified} from 'unified'

/**
 * Processor for HTML.
 */
export const rehype = unified().use(rehypeParse).use(rehypeStringify).freeze()
