// TypeScript Version: 3.5
import {Parser, Plugin} from 'unified'
import {Node, Parent} from 'unist'

declare namespace rehypeParse {
  interface Parse extends Plugin<[RehypeParserOptions?]> {
    Parser: Parser
  }

  interface RehypeParserOptions {
    /**
     * Specify whether to parse a fragment, instead of a complete document.
     * In document mode, unopened `html`, `head`, and `body` elements are opened in
     * just the right places.
     *
     * @default false
     */
    fragment?: boolean

    /**
     * > ⚠️ rehype is not an XML parser.
     * > It support SVG as embedded in HTML, but not the features available in the rest
     * > of XML/SVG.
     * > Passing SVG files could strip useful information, but fragments of modern SVG
     * > should be fine.
     *
     * Which space the document is in.
     *
     * If an `svg` element is found in the HTML space, `parse` automatically
     * switches to the SVG space when [**entering**](https://github.com/syntax-tree/unist#enter)
     * the element, and switches
     * back when [**exiting**](https://github.com/syntax-tree/unist#exit).
     *
     * **Note**: make sure to set `fragment: true` if `space: 'svg'`.
     *
     * @default 'html'
     */
    space?: 'html' | 'svg'

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

    /**
     * Patch extra positional information.
     *
     * @default false
     */
    verbose?: boolean
  }

  type Visitor = (node: Node, parent?: Parent) => string
}

declare const rehypeParse: rehypeParse.Parse

export = rehypeParse
