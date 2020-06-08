// TypeScript Version: 3.5

import {Processor} from 'unified'
import {RehypeParseOptions} from 'rehype-parse'
import {RehypeStringifyOptions} from 'rehype-stringify'

declare namespace rehype {
  type RehypeOptions = RehypeStringifyOptions & RehypeParseOptions
}

declare function rehype(): Processor<rehype.RehypeOptions>

export = rehype
