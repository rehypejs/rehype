# rehype

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**unified**][unified] processor to parse and compile HTML.
Powered by [plugins][].
Part of the [unified][] [collective][].

*   API by [**unified**][unified]
*   Parses HTML to the tree with [`rehype-parse`][parse]
*   [**hast**][hast] syntax tree
*   [Plugins][] transform the tree
*   Compiles the tree to HTML with [`rehype-stringify`][stringify]

Don’t need the parser?
Or the compiler?
[That’s OK][unified-usage].

If you’re in a browser, trust the content, and value a smaller bundle size, use
[`rehype-dom`][rehype-dom] instead.

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

## Install

[npm][]:

```sh
npm install rehype
```

## Use

```js
var rehype = require('rehype')
var report = require('vfile-reporter')

rehype().process('<title>Hi</title><h2>Hello world!', function(err, file) {
  console.log(report(err || file))
  console.log(String(file))
})
```

Yields:

```txt
no issues found
<html><head><title>Hi</title></head><body><h2>Hello world!</h2></body></html>
```

Configuration for [`rehype-parse`][parse] and [`rehype-stringify`][stringify]
can be set with `.data('settings', {/*...*/})`.

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

[ideas]: https://github.com/rehypejs/ideas

[awesome]: https://github.com/rehypejs/awesome-rehype

[license]: https://github.com/rehypejs/rehype/blob/master/license

[author]: https://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[unified]: https://github.com/unifiedjs/unified

[hast]: https://github.com/syntax-tree/hast

[parse]: https://github.com/rehypejs/rehype/blob/master/packages/rehype-parse

[stringify]: https://github.com/rehypejs/rehype/blob/master/packages/rehype-stringify

[rehype-dom]: https://github.com/rehypejs/rehype-dom/tree/master/packages/rehype-dom

[plugins]: https://github.com/rehypejs/rehype/blob/master/doc/plugins.md

[unified-usage]: https://github.com/unifiedjs/unified#usage

[announcement]: https://medium.com/unifiedjs/collectively-evolving-through-crowdsourcing-22c359ea95cc
