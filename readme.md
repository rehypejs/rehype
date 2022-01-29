# [![rehype][logo]][unified]

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**rehype** is a tool that transforms HTML with plugins.
These plugins can inspect and change the HTML.
You can use rehype on the server, the client, CLIs, deno, etc.

## Intro

rehype is an ecosystem of plugins that work with HTML as structured data,
specifically ASTs (abstract syntax trees).
ASTs make it easy for programs to deal with HTML.
We call those programs plugins.
Plugins inspect and change trees.
You can use the many existing plugins or you can make your own.

*   to learn HTML, see [MDN][] and [WHATWG HTML][html]
*   for more about us, see [`unifiedjs.com`][site]
*   for updates, see [Twitter][]
*   for questions, see [support][]
*   to help, see [contribute][] or [sponsor][] below

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Plugins](#plugins)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Contribute](#contribute)
*   [Sponsor](#sponsor)
*   [License](#license)

## What is this?

You can use plugins to format or minify HTML.
**In**:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Saturn</title>
  </head>
  <body>
    <h1>Saturn</h1>
    <p>Saturn is a gas giant composed predominantly of hydrogen and helium.</p>
  </body>
</html>
```

**Out**:

```html
<!doctypehtml><html lang=en><meta charset=utf8><title>Saturn</title><h1>Saturn</h1><p>Saturn is a gas giant composed predominantly of hydrogen and helium.
```

You can use plugins to change HTML.
**In**:

```html
<h1>Hi, Saturn!</h1>
```

**Plugin**:

```js
import {visit} from 'unist-util-visit'

/** @type {import('unified').Plugin<[], import('hast').Root>} */
function myRehypePluginToIncreaseHeadings() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (['h1', 'h2', 'h3', 'h4', 'h5'].includes(node.tagName)) {
        node.tagName = 'h' + (Number(node.tagName.charAt(1)) + 1)
      }
    })
  }
}
```

**Out**:

```html
<h2>Hi, Saturn!</h2>
```

You can use rehype for many different things.
**[unified][]** is the core project that transforms content with ASTs.
**rehype** adds support for HTML to unified.
**[hast][]** is the HTML AST that rehype uses.

This GitHub repository is a monorepo that contains the following packages:

*   [`rehype-parse`][rehype-parse]
    — plugin to take HTML as input and turn it into a syntax tree (hast)
*   [`rehype-stringify`][rehype-stringify]
    — plugin to take a syntax tree (hast) and turn it into HTML as output
*   [`rehype`][rehype-core]
    — `unified`, `rehype-parse`, and `rehype-stringify`, useful when input and
    output are HTML
*   [`rehype-cli`][rehype-cli]
    — CLI around `rehype` to inspect and format HTML in scripts

## When should I use this?

Depending on the input you have and output you want, you can use different parts
of rehype.
If the input is HTML, you can use `rehype-parse` with `unified`.
If the output is HTML, you can use `rehype-stringify` with `unified`
If both the input and output are HTML, you can use `rehype` on its own.
When you want to inspect and format HTML files in a project, you can use
`rehype-cli`.

## Plugins

rehype plugins deal with HTML.
You can choose from the many plugins that already exist.
Here are three good ways to find plugins:

*   [`awesome-rehype`][awesome-rehype]
    — selection of the most awesome projects
*   [List of plugins][list-of-plugins]
    — list of all plugins
*   [`rehype-plugin` topic][topic]
    — any tagged repo on GitHub

Some plugins are maintained by us here in the `@rehypejs` organization while
others are maintained by folks elsewhere.
Anyone can make rehype plugins, so as always when choosing whether to include
dependencies in your project, make sure to carefully assess the quality of
rehype plugins too.

## Types

The rehype organization and the unified collective as a whole is fully typed
with [TypeScript][].
Types for hast are available in [`@types/hast`][types-hast].

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Security

As improper use of HTML can open you up to a [cross-site scripting (XSS)][xss]
attacks, use of rehype can also be unsafe.
Use [`rehype-sanitize`][rehype-sanitize] to make the tree safe.

Use of rehype plugins could also open you up to other attacks.
Carefully assess each plugin and the risks involved in using them.

For info on how to submit a report, see our [security policy][security].

## Contribute

See [`contributing.md`][contributing] in [`rehypejs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.
Join us in [Discussions][chat] to chat with the community and contributors.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## Sponsor

Support this effort and give back by sponsoring on [OpenCollective][collective]!

<!--lint ignore no-html-->

<table>
<tr valign="middle">
<td width="20%" align="center" rowspan="2" colspan="2">
  <a href="https://vercel.com">Vercel</a><br><br>
  <a href="https://vercel.com"><img src="https://avatars1.githubusercontent.com/u/14985020?s=256&v=4" width="128"></a>
</td>
<td width="20%" align="center" rowspan="2" colspan="2">
  <a href="https://motif.land">Motif</a><br><br>
  <a href="https://motif.land"><img src="https://avatars1.githubusercontent.com/u/74457950?s=256&v=4" width="128"></a>
</td>
<td width="20%" align="center" rowspan="2" colspan="2">
  <a href="https://www.hashicorp.com">HashiCorp</a><br><br>
  <a href="https://www.hashicorp.com"><img src="https://avatars1.githubusercontent.com/u/761456?s=256&v=4" width="128"></a>
</td>
<td width="20%" align="center" rowspan="2" colspan="2">
  <a href="https://www.gitbook.com">GitBook</a><br><br>
  <a href="https://www.gitbook.com"><img src="https://avatars1.githubusercontent.com/u/7111340?s=256&v=4" width="128"></a>
</td>
<td width="20%" align="center" rowspan="2" colspan="2">
  <a href="https://www.gatsbyjs.org">Gatsby</a><br><br>
  <a href="https://www.gatsbyjs.org"><img src="https://avatars1.githubusercontent.com/u/12551863?s=256&v=4" width="128"></a>
</td>
</tr>
<tr valign="middle">
</tr>
<tr valign="middle">
<td width="20%" align="center" rowspan="2" colspan="2">
  <a href="https://www.netlify.com">Netlify</a><br><br>
  <!--OC has a sharper image-->
  <a href="https://www.netlify.com"><img src="https://images.opencollective.com/netlify/4087de2/logo/256.png" width="128"></a>
</td>
<td width="10%" align="center">
  <a href="https://www.coinbase.com">Coinbase</a><br><br>
  <a href="https://www.coinbase.com"><img src="https://avatars1.githubusercontent.com/u/1885080?s=256&v=4" width="64"></a>
</td>
<td width="10%" align="center">
  <a href="https://themeisle.com">ThemeIsle</a><br><br>
  <a href="https://themeisle.com"><img src="https://avatars1.githubusercontent.com/u/58979018?s=128&v=4" width="64"></a>
</td>
<td width="10%" align="center">
  <a href="https://expo.io">Expo</a><br><br>
  <a href="https://expo.io"><img src="https://avatars1.githubusercontent.com/u/12504344?s=128&v=4" width="64"></a>
</td>
<td width="10%" align="center">
  <a href="https://boostnote.io">Boost Note</a><br><br>
  <a href="https://boostnote.io"><img src="https://images.opencollective.com/boosthub/6318083/logo/128.png" width="64"></a>
</td>
<td width="10%" align="center">
  <a href="https://www.holloway.com">Holloway</a><br><br>
  <a href="https://www.holloway.com"><img src="https://avatars1.githubusercontent.com/u/35904294?s=128&v=4" width="64"></a>
</td>
<td width="10%"></td>
<td width="10%"></td>
<td width="10%"></td>
</tr>
<tr valign="middle">
<td width="100%" align="center" colspan="8">
  <br>
  <a href="https://opencollective.com/unified"><strong>You?</strong></a>
  <br><br>
</td>
</tr>
</table>

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[logo]: https://raw.githubusercontent.com/rehypejs/rehype/cb624bd/logo.svg?sanitize=true

[build-badge]: https://github.com/rehypejs/rehype/workflows/main/badge.svg

[build]: https://github.com/rehypejs/rehype/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype.svg

[coverage]: https://codecov.io/github/rehypejs/rehype

[downloads-badge]: https://img.shields.io/npm/dm/rehype.svg

[downloads]: https://www.npmjs.com/package/rehype

[size-badge]: https://img.shields.io/bundlephobia/minzip/rehype.svg

[size]: https://bundlephobia.com/result?p=rehype

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/rehypejs/rehype/discussions

[health]: https://github.com/rehypejs/.github

[security]: https://github.com/rehypejs/.github/blob/main/security.md

[contributing]: https://github.com/rehypejs/.github/blob/main/contributing.md

[support]: https://github.com/rehypejs/.github/blob/main/support.md

[coc]: https://github.com/rehypejs/.github/blob/main/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[unified]: https://github.com/unifiedjs/unified

[types-hast]: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/HEAD/types/hast

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[typescript]: https://www.typescriptlang.org

[mdn]: https://developer.mozilla.org/docs/Web/HTML

[html]: https://html.spec.whatwg.org/multipage/

[twitter]: https://twitter.com/unifiedjs

[site]: https://unifiedjs.com

[topic]: https://github.com/topics/rehype-plugin

[hast]: https://github.com/syntax-tree/hast

[awesome-rehype]: https://github.com/rehypejs/awesome-rehype

[rehype-sanitize]: https://github.com/rehypejs/rehype-sanitize

[rehype-parse]: packages/rehype-parse/

[rehype-stringify]: packages/rehype-stringify/

[rehype-core]: packages/rehype/

[rehype-cli]: packages/rehype-cli/

[list-of-plugins]: doc/plugins.md#list-of-plugins

[contribute]: #contribute

[sponsor]: #sponsor
