# [![rehype][logo]][unified]

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**rehype** is an HTML processor powered by [plugins][] part of the [unified][]
[collective][].

## Intro

**rehype** is an ecosystem of [plugins][] for processing HTML to do all kinds of
things: [format it][format], [minify it][minify], or [wrap it programmatically
into a document][document].

*   Visit [`unified.js.org`][website] and try its [guides][] for an overview
*   Read [unified][]’s readme for a technical intro
*   Browse [awesome rehype][awesome] to find out more about the ecosystem
*   Follow us on [Medium][] and [Twitter][] to see what we’re up to
*   Check out [Contribute][] below to find out how to help out

This repository contains the following projects:

*   [`rehype-parse`][parse] — Parse HTML documents to syntax trees
*   [`rehype-stringify`][stringify] — Stringify syntax trees to HTML documents
*   [`rehype`][api] — Programmatic interface with both `rehype-parse` and `rehype-stringify`
*   [`rehype-cli`][cli] — Command-line interface wrapping `rehype`

## Sponsors

<!--lint ignore no-html maximum-line-length-->

<table>
  <tr valign="top">
    <td width="20%" align="center">
      <a href="https://zeit.co"><img src="https://avatars1.githubusercontent.com/u/14985020?s=400&v=4"></a>
      <br><br>🥇
      <a href="https://zeit.co">ZEIT</a>
    </td>
    <td width="20%" align="center">
      <a href="https://www.gatsbyjs.org"><img src="https://avatars1.githubusercontent.com/u/12551863?s=400&v=4"></a>
      <br><br>🥇
      <a href="https://www.gatsbyjs.org">Gatsby</a></td>
    <td width="20%" align="center">
      <a href="https://compositor.io"><img src="https://avatars1.githubusercontent.com/u/19245838?s=400&v=4"></a>
      <br><br>🥉
      <a href="https://compositor.io">Compositor</a>
    </td>
    <td width="20%" align="center">
      <a href="https://www.holloway.com"><img src="https://avatars1.githubusercontent.com/u/35904294?s=400&v=4"></a>
      <br><br>
      <a href="https://www.holloway.com">Holloway</a>
    </td>
    <td width="20%" align="center">
      <br><br><br><br>
      <a href="https://opencollective.com/unified"><strong>You?</strong>
    </td>
  </tr>
</table>

[**Read more about the unified collective on Medium »**][announcement]

## Security

As **rehype** works on HTML, and improper use of HTML can open you up to a
[cross-site scripting (XSS)][xss] attack, use of rehype can also be unsafe.
Use [`rehype-sanitize`][sanitize] to make the tree safe.

## Contribute

See [`contributing.md`][contributing] in [`rehypejs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.
Ideas for new plugins and tools can be posted in [`rehypejs/ideas`][ideas].

A curated list of awesome rehype resources can be found in [**awesome
rehype**][awesome].

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[logo]: https://raw.githubusercontent.com/rehypejs/rehype/90b8f34/logo.svg?sanitize=true

[build-badge]: https://img.shields.io/travis/rehypejs/rehype.svg

[build]: https://travis-ci.org/rehypejs/rehype

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype.svg

[coverage]: https://codecov.io/github/rehypejs/rehype

[downloads-badge]: https://img.shields.io/npm/dm/rehype.svg

[downloads]: https://www.npmjs.com/package/rehype

[size-badge]: https://img.shields.io/bundlephobia/minzip/rehype.svg

[size]: https://bundlephobia.com/result?p=rehype

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/rehype

[health]: https://github.com/rehypejs/.github

[contributing]: https://github.com/rehypejs/.github/blob/master/contributing.md

[support]: https://github.com/rehypejs/.github/blob/master/support.md

[coc]: https://github.com/rehypejs/.github/blob/master/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[unified]: https://github.com/unifiedjs/unified

[website]: https://unified.js.org

[guides]: https://unified.js.org/#guides

[medium]: https://medium.com/unifiedjs

[announcement]: https://medium.com/unifiedjs/collectively-evolving-through-crowdsourcing-22c359ea95cc

[twitter]: https://twitter.com/unifiedjs

[parse]: https://github.com/rehypejs/rehype/tree/master/packages/rehype-parse

[stringify]: https://github.com/rehypejs/rehype/tree/master/packages/rehype-stringify

[api]: https://github.com/rehypejs/rehype/tree/master/packages/rehype

[cli]: https://github.com/rehypejs/rehype/tree/master/packages/rehype-cli

[plugins]: https://github.com/rehypejs/rehype/tree/master/doc/plugins.md

[ideas]: https://github.com/rehypejs/ideas

[awesome]: https://github.com/rehypejs/awesome-rehype

[format]: https://github.com/rehypejs/rehype-format

[minify]: https://github.com/rehypejs/rehype-minify

[document]: https://github.com/rehypejs/rehype-document

[sanitize]: https://github.com/rehypejs/rehype-sanitize

[contribute]: #contribute

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
