# rehype

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Chat][chat-badge]][chat]

The [**rehype**][rehype] processor is an HTML processor powered by
[plugins][].

*   Interface by [**unified**][unified]
*   [**hast**][hast] syntax tree
*   Parses HTML to the tree with [**rehype-parse**][parse]
*   [Plug-ins][plugins] transform the tree
*   Compiles the tree to HTML using [**rehype-stringify**][stringify]

Don’t need the parser?  Or the compiler?  [That’s OK][unified-usage].

## Installation

[npm][]:

```bash
npm install rehype
```

## Usage

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

Configuration for [**rehype-parse**][parse] and
[**rehype-stringify**][stringify] can be set with
`.data('settings', {/*...*/})`.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/rehypejs/rehype/master.svg

[build]: https://travis-ci.org/rehypejs/rehype

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype.svg

[coverage]: https://codecov.io/github/rehypejs/rehype

[downloads-badge]: https://img.shields.io/npm/dm/rehype.svg

[downloads]: https://www.npmjs.com/package/rehype

[size-badge]: https://img.shields.io/bundlephobia/minzip/rehype.svg

[size]: https://bundlephobia.com/result?p=rehype

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/rehype

[license]: https://github.com/rehypejs/rehype/blob/master/license

[author]: https://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[rehype]: https://github.com/rehypejs/rehype

[unified]: https://github.com/unifiedjs/unified

[hast]: https://github.com/syntax-tree/hast

[parse]: https://github.com/rehypejs/rehype/blob/master/packages/rehype-parse

[stringify]: https://github.com/rehypejs/rehype/blob/master/packages/rehype-stringify

[plugins]: https://github.com/rehypejs/rehype/blob/master/doc/plugins.md

[unified-usage]: https://github.com/unifiedjs/unified#usage
