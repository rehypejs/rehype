![rehype][logo]

# Plugins

**rehype** is an ecosystem of [plug-ins][plugins].

## Table of Contents

*   [List of Plugins](#list-of-plugins)
*   [List of Utilities](#list-of-utilities)
*   [Using plugins](#using-plugins)
*   [Creating plugins](#creating-plugins)

## List of Plugins

Have a good idea for a new plugin?  Let’s [chat][gitter] and make it happen!

*   [`rehype-autolink-headings`](https://github.com/wooorm/rehype-autolink-headings)
    — Add links to headings
*   [`rehype-document`](https://github.com/wooorm/rehype-document)
    — Wrap in a document
*   [`rehype-format`](https://github.com/wooorm/rehype-format)
    — Format HTML
*   [`rehype-highlight`](https://github.com/wooorm/rehype-highlight)
    — Syntax highlight code blocks with [`lowlight`](https://github.com/wooorm/lowlight)
*   [`rehype-highlight-code-block`](https://github.com/mapbox/rehype-highlight-code-block)
    — Syntax highlight code blocks with any function you provide
*   [`rehype-katex`](https://github.com/rokt33r/remark-math/blob/master/packages/rehype-katex)
    — Render math inline and block with [KaTeX](https://github.com/Khan/KaTeX)
*   [`rehype-minify`](https://github.com/wooorm/rehype-minify)
    — Minify HTML
*   [`rehype-picture`](https://github.com/wooorm/rehype-picture)
    — Wrap images in `<picture>`s
*   [`rehype-raw`](https://github.com/wooorm/rehype-raw)
    — Parse the tree again (and raw nodes)
*   [`rehype-react`](https://github.com/rhysd/rehype-react)
    — Compile to React
*   [`rehype-remark`](https://github.com/wooorm/rehype-remark)
    — [`remark`](https://github.com/wooorm/remark) support
*   [`rehype-retext`](https://github.com/wooorm/rehype-retext)
    — [`retext`](https://github.com/wooorm/retext) support
*   [`rehype-sanitize`](https://github.com/wooorm/rehype-sanitize)
    — Sanitize HTML
*   [`rehype-slug`](https://github.com/wooorm/rehype-slug)
    — Add `id` attributes to headings

## List of Utilities

See [**hast**][hast-util] for a list of utilities for working with the syntax
tree.  See [`unist`][unist-util] for other utilities which work with **hast**
nodes, too.

And finally, see [**vfile**][vfile-util] for a list of utilities for working
with virtual files.

## Using plugins

To use a plug-in programmatically, invoke the [`use()`][unified-use]
function.

To use plug-in with `rehype-cli`, pass [a `--use`][use] flag or specify
it in a [configuration file][rcfile].

## Creating plugins

First, read up on the [concept of plug-ins][unified-plugins].  Then, read the
[guide on “Creating a plugin with unified”][guide].  Finally, take one of
existing [plug-ins][plugins], which looks similar to what you’re about to do,
and work from there.  If you get stuck, [issues][] and [Gitter][] are good
places to get help.

You should pick a name prefixed by `'rehype-'`, such as `rehype-lint`.

Note that, if the thing you create cannot be given to `rehype().use()`,
it isn’t a “plug-in”.  Don’t use the `rehype-` prefix as that could
confuse users.  If it works with the HAST tree, use `'hast-util-'`, if
it works with any Unist tree, use `unist-util-`, if it works with virtual
files, use `vfile-`.

<!--Definitions:-->

[logo]: https://cdn.rawgit.com/rehypejs/rehype/9222605/logo.svg

[plugins]: #list-of-plugins

[hast-util]: https://github.com/syntax-tree/hast#list-of-utilities

[unist-util]: https://github.com/syntax-tree/unist#unist-node-utilties

[vfile-util]: https://github.com/vfile/vfile#related-tools

[unified-use]: https://github.com/unifiedjs/unified#processoruseplugin-options

[unified-plugins]: https://github.com/unifiedjs/unified#plugin

[issues]: https://github.com/rehypejs/rehype/issues

[gitter]: https://gitter.im/rehypejs/rehype

[use]: https://github.com/unifiedjs/unified-args#--use-plugin

[rcfile]: https://github.com/unifiedjs/unified-engine/blob/master/doc/configure.md#plugins

[guide]: https://unifiedjs.github.io/create-a-plugin.html
