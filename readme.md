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

*   Visit [`unifiedjs.com`][website] and try its [guides][] for an overview
*   Read [unified][]’s readme for a technical intro
*   Browse [awesome rehype][awesome] to find out more about the ecosystem
*   Follow us on [Medium][] and [Twitter][] to see what we’re up to
*   Check out [Contribute][] below to find out how to help out

This repository contains the following projects:

*   [`rehype-parse`][parse] — Parse HTML documents to syntax trees
*   [`rehype-stringify`][stringify] — Serialize syntax trees to HTML documents
*   [`rehype`][api] — Programmatic interface with both `rehype-parse` and `rehype-stringify`
*   [`rehype-cli`][cli] — Command-line interface wrapping `rehype`

## Sponsors

<!--lint ignore no-html-->

<table>
  <tr valign="top">
    <td width="33.33%" align="center" colspan="2">
      <a href="https://www.gatsbyjs.org">Gatsby</a><br>🥇<br><br>
      <a href="https://www.gatsbyjs.org"><img src="https://avatars1.githubusercontent.com/u/12551863?s=900&v=4"></a>
    </td>
    <td width="33.33%" align="center" colspan="2">
      <a href="https://vercel.com">Vercel</a><br>🥇<br><br>
      <!--OC has a sharper image-->
      <a href="https://vercel.com"><img src="https://images.opencollective.com/vercel/d8a5bee/logo/512.png"></a>
    </td>
    <td width="33.33%" align="center" colspan="2">
      <a href="https://www.netlify.com">Netlify</a><br><br><br>
      <!--OC has a sharper image-->
      <a href="https://www.netlify.com"><img src="https://images.opencollective.com/netlify/4087de2/logo/512.png"></a>
    </td>
  </tr>
  <tr valign="top">
    <td width="16.67%" align="center">
      <a href="https://www.holloway.com">Holloway</a><br><br><br>
      <a href="https://www.holloway.com"><img src="https://avatars1.githubusercontent.com/u/35904294?s=300&v=4"></a>
    </td>
    <td width="16.67%" align="center">
      <a href="https://themeisle.com">ThemeIsle</a><br>🥉<br><br>
      <a href="https://themeisle.com"><img src="https://twitter-avatar.now.sh/themeisle"></a>
    </td>
    <td width="16.67%" align="center">
      <a href="https://boostio.co">BoostIO</a><br>🥉<br><br>
      <a href="https://boostio.co"><img src="https://avatars1.githubusercontent.com/u/13612118?s=300&v=4"></a>
    </td>
    <td width="16.67%" align="center">
      <a href="https://expo.io">Expo</a><br>🥉<br><br>
      <a href="https://expo.io"><img src="https://avatars1.githubusercontent.com/u/12504344?s=300&v=4"></a>
    </td>
    <td width="50%" align="center" colspan="2">
      <br><br><br><br>
      <a href="https://opencollective.com/unified"><strong>You?</strong></a>
    </td>
  </tr>
</table>

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

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
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

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/rehype

[health]: https://github.com/rehypejs/.github

[contributing]: https://github.com/rehypejs/.github/blob/master/contributing.md

[support]: https://github.com/rehypejs/.github/blob/master/support.md

[coc]: https://github.com/rehypejs/.github/blob/master/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[unified]: https://github.com/unifiedjs/unified

[website]: https://unifiedjs.com

[guides]: https://unifiedjs.com/#guides

[medium]: https://medium.com/unifiedjs

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
