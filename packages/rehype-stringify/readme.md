# rehype-stringify

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Chat][chat-badge]][chat]

[Compiler][] for [**unified**][unified].  Stringifies an
[**HAST**][hast] syntax tree to HTML.  Used in the [**rehype**
processor][processor].

## Installation

[npm][]:

```bash
npm install rehype-stringify
```

## Usage

```js
var unified = require('unified')
var createStream = require('unified-stream')
var parse = require('rehype-parse')
var stringify = require('rehype-stringify')

var processor = unified()
  .use(parse)
  .use(stringify, {
    quoteSmart: true,
    closeSelfClosing: true,
    omitOptionalTags: true,
    entities: {useShortestReferences: true}
  })

process.stdin.pipe(createStream(processor)).pipe(process.stdout)
```

## API

### `processor.use(stringify[, options])`

Configure the `processor` to stringify [**hast**][hast] syntax trees
to HTML.

###### `options`

Options can be passed when using `processor.use(stringify, options)`.
All settings are passed to [`hast-util-to-html`][hast-util-to-html].

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/rehypejs/rehype/master.svg

[build]: https://travis-ci.org/rehypejs/rehype

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype.svg

[coverage]: https://codecov.io/github/rehypejs/rehype

[downloads-badge]: https://img.shields.io/npm/dm/rehype-stringify.svg

[downloads]: https://www.npmjs.com/package/rehype-stringify

[size-badge]: https://img.shields.io/bundlephobia/minzip/rehype-stringify.svg

[size]: https://bundlephobia.com/result?p=rehype-stringify

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/rehype

[license]: https://github.com/rehypejs/rehype/blob/master/license

[author]: https://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[unified]: https://github.com/unifiedjs/unified

[processor]: https://github.com/rehypejs/rehype

[compiler]: https://github.com/unifiedjs/unified#processorcompiler

[hast]: https://github.com/syntax-tree/hast

[hast-util-to-html]: https://github.com/syntax-tree/hast-util-to-html#tohtmlnode-options
