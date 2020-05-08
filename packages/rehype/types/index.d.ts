// TypeScript Version: 3.5

import {Processor} from 'unified'
import {RehypeParserOptions} from 'rehype-parse'
import {HastUtilToHtmlOptions} from 'hast-util-to-html'

declare namespace rehype {
  type RehypeOptions = HastUtilToHtmlOptions & RehypeParserOptions
}

declare function rehype(): Processor<rehype.RehypeOptions>

export = rehype
