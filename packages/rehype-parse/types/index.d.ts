// TypeScript Version: 3.5
import {Parser, Plugin} from 'unified'
import {Node, Parent} from 'unist'
import {HastUtilFromParse5Options} from 'hast-util-from-parse5'

declare namespace rehypeParse {
  interface Parse extends Plugin<[RehypeParseOptions?]> {
    Parser: Parser
  }

  interface RehypeParseOptions
    extends Pick<HastUtilFromParse5Options, 'space' | 'verbose'> {
    /**
     * Specify whether to parse a fragment, instead of a complete document.
     * In document mode, unopened `html`, `head`, and `body` elements are opened in
     * just the right places.
     *
     * @default false
     */
    fragment?: boolean

    /**
     * > ⚠️ Parse errors are currently being added to HTML.
     * > Not all errors emitted by parse5 (or rehype-parse) are specced yet.
     * > Some documentation may still be missing.
     *
     * Emit parse errors while parsing on the [vfile](https://github.com/vfile/vfile)
     *
     * Setting this to true starts emitting
     * [HTML parse errors](https://html.spec.whatwg.org/multipage/parsing.html#parse-errors).
     *
     * Specific rules can be turned off by setting them to `false` (or `0`).
     * The default, when `emitParseErrors: true`, is `true` (or `1`), and means that
     * rules emit as warnings.
     * Rules can also be configured with `2`, to turn them into fatal errors.
     *
     * @default false
     */
    emitParseErrors?: boolean
  }

  type Visitor = (node: Node, parent?: Parent) => string
}

declare const rehypeParse: rehypeParse.Parse

export = rehypeParse
