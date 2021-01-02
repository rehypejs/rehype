![rehype][logo]

# Plugins

**rehype** is an HTML processor powered by plugins part of the [unified][]
[collective][].

## Contents

*   [List of plugins](#list-of-plugins)
*   [List of utilities](#list-of-utilities)
*   [Use plugins](#use-plugins)
*   [Create plugins](#create-plugins)

## List of plugins

See [awesome rehype][awesome] for the most awesome projects in the ecosystem.
More plugins can be found on GitHub tagged with the [`rehype-plugin`
topic][topic].

Have a good idea for a new plugin?
See [Create plugins][create] below.

*   [`rehype-accessible-emojis`](https://github.com/GaiAma/Coding4GaiAma/tree/HEAD/packages/rehype-accessible-emojis)
    — make emojis accessible adding role & aria-label
*   [`rehype-add-classes`](https://github.com/martypdx/rehype-add-classes)
    — add classes by selector
*   [`rehype-annotate`](https://github.com/baldurbjarnason/rehype-annotate)
    — add W3C-style annotations
*   [`rehype-autolink-headings`](https://github.com/rehypejs/rehype-autolink-headings)
    — add links to headings
*   [`rehype-components`](https://github.com/marekweb/rehype-components)
    — render components (custom elements)
*   [`rehype-document`](https://github.com/rehypejs/rehype-document)
    — wrap in a document
*   [`rehype-dom`](https://github.com/kmck/rehype-dom)
    — use the native DOM API in browsers instead of parse5
*   [`rehype-format`](https://github.com/rehypejs/rehype-format)
    — format HTML
*   [`rehype-highlight`](https://github.com/rehypejs/rehype-highlight)
    — syntax highlight code blocks with [`lowlight`](https://github.com/wooorm/lowlight)
*   [`rehype-highlight-code-block`](https://github.com/mapbox/rehype-highlight-code-block)
    — syntax highlight code blocks with any function you provide
*   [`rehype-inline`](https://github.com/marko-knoebl/rehype-inline)
    — inline js, css and img files
*   [`rehype-inline-svg`](https://github.com/JS-DevTools/rehype-inline-svg)
    — Inlines and optimizes SVG images
*   [`rehype-join-line`](https://github.com/unix/rehype-join-line)
    — resolve line breaks in Chinese paragraphs
*   [`rehype-katex`](https://github.com/remarkjs/remark-math/tree/HEAD/packages/rehype-katex)
    — render math inline and block with [KaTeX](https://github.com/Khan/KaTeX)
*   [`rehype-meta`](https://github.com/rehypejs/rehype-meta)
    — add metadata to the head of a document
*   [`rehype-minify`](https://github.com/rehypejs/rehype-minify)
    — minify HTML
*   [`rehype-partials`](https://github.com/mrzmmr/rehype-partials)
    — partials support for rehype
*   [`rehype-picture`](https://github.com/rehypejs/rehype-picture)
    — wrap images in `<picture>`s
*   [`rehype-prism`](https://github.com/mapbox/rehype-prism)
    — syntax highlight code blocks with [Prism](https://prismjs.com), via [`refractor`](https://github.com/wooorm/refractor#browser)
*   [`rehype-raw`](https://github.com/rehypejs/rehype-raw)
    — parse the tree again (and raw nodes)
*   [`rehype-react`](https://github.com/rhysd/rehype-react)
    — compile to React
*   [`rehype-remark`](https://github.com/rehypejs/rehype-remark)
    — [`remark`](https://github.com/wooorm/remark) support
*   [`rehype-remove-unused-css`](https://github.com/nzt/rehype-remove-unused-css)
    — Remove unused css
*   [`rehype-resolution`](https://github.com/michaelnisi/rehype-resolution)
    — inject resolution `srcset` into images
*   [`rehype-retext`](https://github.com/rehypejs/rehype-retext)
    — [`retext`](https://github.com/wooorm/retext) support
*   [`rehype-sanitize`](https://github.com/rehypejs/rehype-sanitize)
    — sanitize HTML
*   [`rehype-section`](https://github.com/agentofuser/rehype-section)
    — wrap headings and their contents into nested `<section>` elements
*   [`rehype-shiki`](https://github.com/rsclarke/rehype-shiki)
    — syntax highlight code blocks with [Shiki](https://github.com/octref/shiki/)
*   [`rehype-slots`](https://github.com/marekweb/rehype-slots)
    — replace slot elements with injected content
*   [`rehype-slug`](https://github.com/rehypejs/rehype-slug)
    — add `id`s to headings
*   [`rehype-template`](https://github.com/nzt/rehype-template)
    — wrap content with template literal
*   [`rehype-toc`](https://github.com/JS-DevTools/rehype-toc)
    — Adds a table of contents (TOC) to the page
*   [`rehype-truncate`](https://github.com/luk707/rehype-truncate)
    — Truncate HTML while preserving its structure
*   [`rehype-urls`](https://github.com/brechtcs/rehype-urls)
    — rewrite URLs of `href` and `src` attributes
*   [`rehype-url-inspector`](https://github.com/JS-DevTools/rehype-url-inspector)
    — inspect, validate, or rewrite URLs anywhere in the document
*   [`rehype-webparser`](https://github.com/Prettyhtml/prettyhtml/tree/HEAD/packages/rehype-webparser)
    — less strict HTML parser
*   [`rehype-wrap`](https://github.com/mrzmmr/rehype-wrap)
    — wrap selected elements with a given element
*   [`rehype-wrap-all`](https://github.com/florentb/rehype-wrap-all)
    — wrap all matching elements with a given element

## List of utilities

See [**hast**][hast-util] for a list of utilities for working with the syntax
tree.
See [`unist`][unist-util] for other utilities which work with **hast**
nodes, too.
Finally, see [**vfile**][vfile-util] for a list of utilities working with
virtual files.

## Use plugins

To use a plugin programmatically, invoke the [`use()`][unified-use]
function.

To use plugin with `rehype-cli`, pass a [`--use` flag][unified-args-use]
or specify it in a [configuration file][config-file-use].

## Create plugins

Have an idea for a plugin?
Post it on [ideas][] and make it happen!

To create a plugin, first read up on the [concept of plugins][unified-plugins].
Then, read the [guide on “Creating a plugin with unified”][guide].
Finally, take one of existing plugins, which looks similar to what you’re about
to make, and work from there.
If you get stuck, [ideas][], [issues][], and [discussions][] are good places to
get help.

You should pick a name prefixed by `'rehype-'`, such as `rehype-lint`.

**Do not use the `rehype-` prefix** if the thing you create doesn’t work with
`rehype().use()`: it isn’t a “plugin” and will confuse users.
If it works with hast, use `'hast-util-'`, if it works with any unist tree,
use `unist-util-`, and if it works with virtual files, use `vfile-`.

<!--Definitions:-->

[logo]: https://raw.githubusercontent.com/rehypejs/rehype/90b8f34/logo.svg?sanitize=true

[hast-util]: https://github.com/syntax-tree/hast#list-of-utilities

[unist-util]: https://github.com/syntax-tree/unist#unist-utilities

[vfile-util]: https://github.com/vfile/vfile#utilities

[unified-use]: https://github.com/unifiedjs/unified#processoruseplugin-options

[unified-args-use]: https://github.com/unifiedjs/unified-args#--use-plugin

[config-file-use]: https://github.com/unifiedjs/unified-engine/blob/HEAD/doc/configure.md#plugins

[unified-plugins]: https://github.com/unifiedjs/unified#plugin

[issues]: https://github.com/rehypejs/rehype/issues

[discussions]: https://github.com/rehypejs/rehype/discussions

[guide]: https://unifiedjs.com/learn/guide/create-a-plugin/

[awesome]: https://github.com/rehypejs/awesome-rehype

[ideas]: https://github.com/rehypejs/ideas

[topic]: https://github.com/topics/rehype-plugin

[unified]: https://github.com/unifiedjs/unified

[collective]: https://opencollective.com/unified

[create]: #create-plugins
