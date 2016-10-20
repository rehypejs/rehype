![rehype][logo]

# Plugins

**rehype** plug-ins lie at the core of **rehype**’s vision.

## Table of Contents

*   [List of Plugins](#list-of-plugins)
*   [List of Utilities](#list-of-utilities)
*   [Using plugins](#using-plugins)
*   [Creating plugins](#creating-plugins)

## List of Plugins

There currently aren’t that many plug-ins.  More will come soon.  Have
a good idea?  Let’s [chat][gitter] and make it happen!

*   [`wooorm/rehype-document`](https://github.com/wooorm/rehype-document)
    — Wrap in a document;
*   [`wooorm/rehype-highlight`](https://github.com/wooorm/rehype-highlight)
    — Syntax highlight code blocks;
*   [`wooorm/rehype-minify`](https://github.com/wooorm/rehype-minify)
    — Minify HTML;
*   [`wooorm/rehype-retext`](https://github.com/wooorm/rehype-retext)
    — [`retext`](https://github.com/wooorm/retext) support;
*   [`wooorm/rehype-raw`](https://github.com/wooorm/rehype-raw)
    — Parse the tree again (and raw nodes).

## List of Utilities

See [**hast**][hast-util] for a list of utilities for working with
the AST.  See [`unist`][unist-util] for other utilities which work with
**hast** nodes, too.

And finally, see [**vfile**][vfile-util] for a list of utilities
for working with virtual files.

## Using plugins

To use a plug-in programmatically, invoke the [`use()`][unified-use]
function.

To use plug-in with `rehype-cli`, pass [a `--use`][use] flag or specify
it in a [configuration file][rcfile].

## Creating plugins

First, read up on the [concept of plug-ins][unified-plugins].
Then, I suggest taking one of existing [plug-ins][plugins], which looks
similar to what you’re about to do, and work from there.  If you get
stuck, [issues][] and [Gitter][] are good places to get help.

A good place for publishing plug-ins is [npm][npm-publish].

You should pick a name prefixed by `'rehype-'`, such as `rehype-lint`.

Note that, if the thing you create cannot be given to `rehype().use()`,
it not a “plug-in”.  Don’t use the `rehype-` prefix as that could
confuse users.  If it works with the HAST tree, use `'hast-util-'`, if
it works with any Unist tree, use `unist-util-`, if it works with virtual
files, use `vfile-`.

When publishing a plug-in, you should use the package manager’s keywords
functionality and include `"rehype"` in the list.

<!--Definitions:-->

[logo]: https://cdn.rawgit.com/wooorm/rehype/5835753/logo.svg

[plugins]: #list-of-plugins

[hast-util]: https://github.com/wooorm/hast#list-of-utilities

[unist-util]: https://github.com/wooorm/unist#unist-node-utilties

[vfile-util]: https://github.com/wooorm/vfile#related-tools

[unified-use]: https://github.com/wooorm/unified#processoruseplugin-options

[unified-plugins]: https://github.com/wooorm/unified#plugin

[npm-publish]: https://docs.npmjs.com/getting-started/publishing-npm-packages

[issues]: https://github.com/wooorm/rehype/issues

[gitter]: https://gitter.im/wooorm/rehype

[use]: https://github.com/wooorm/unified-args#--use-plugin

[rcfile]: https://github.com/wooorm/unified-engine/blob/master/doc/configure.md#plugins
