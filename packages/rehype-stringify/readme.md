# rehype-stringify [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

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

[build-badge]: https://img.shields.io/travis/rehypejs/rehype.svg

[build-status]: https://travis-ci.org/rehypejs/rehype

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype.svg

[coverage-status]: https://codecov.io/github/rehypejs/rehype

[chat-badge]: https://img.shields.io/gitter/room/rehypejs/Lobby.svg

[chat]: https://gitter.im/rehypejs/Lobby

[license]: https://github.com/rehypejs/rehype/blob/master/license

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[unified]: https://github.com/unifiedjs/unified

[processor]: https://github.com/rehypejs/rehype

[compiler]: https://github.com/unifiedjs/unified#processorcompiler

[hast]: https://github.com/syntax-tree/hast

[hast-util-to-html]: https://github.com/syntax-tree/hast-util-to-html#tohtmlnode-options
