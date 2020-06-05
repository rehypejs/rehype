// TypeScript Version: 3.5

import {Processor} from 'unified'
import {RehypeParserOptions} from 'rehype-parse'
import {RehypeStringifyOptions} from 'rehype-stringify'

declare namespace rehype {
  type RehypeOptions = RehypeStringifyOptions & RehypeParserOptions
}

declare function rehype(): Processor<rehype.RehypeOptions>

export = rehype
