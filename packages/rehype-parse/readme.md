# rehype-parse [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

[Parser][] for [**unified**][unified].  Parses HTML to a
[**HAST**][hast] syntax tree.  Used in the [**rehype**
processor][processor].

## Installation

[npm][]:

```bash
npm install rehype-parse
```

## Usage

```js
var unified = require('unified');
var createStream = require('unified-stream');
var parse = require('rehype-parse');
var stringify = require('rehype-stringify');

process.stdin
  .pipe(createStream(unified().use(parse).use(stringify)))
  .pipe(process.stdout);
```

## API

### `processor.use(parse[, options])`

Configure the `processor` to read HTML as input and process an
[**HAST**][hast] syntax tree.

##### `options`

###### `options.fragment`

Specify whether to parse a fragment (`boolean`, default: `false`),
instead of a complete document.  In document mode, unopened `html`,
`head`, and `body` elements are opened in just the right places.

###### `options.verbose`

Patch extra positional information (`boolean`, default: `false`).
If specified, the following element:

```html
<img src="#" alt>
```

...has the following `data`:

```js
{ position:
   { opening:
      { start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 18, offset: 17 } },
     closing: null,
     properties:
      { src:
         { start: { line: 1, column: 6, offset: 5 },
           end: { line: 1, column: 13, offset: 12 } },
        alt:
         { start: { line: 1, column: 14, offset: 13 },
           end: { line: 1, column: 17, offset: 16 } } } } }
```

### `parse.Parser`

Access to the [parser][], if you need it.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/rehype.svg

[build-status]: https://travis-ci.org/wooorm/rehype

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/rehype.svg

[coverage-status]: https://codecov.io/github/wooorm/rehype

[chat-badge]: https://img.shields.io/gitter/room/wooorm/rehype.svg

[chat]: https://gitter.im/wooorm/rehype

[license]: https://github.com/wooorm/rehype/blob/master/LICENSE

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[unified]: https://github.com/unifiedjs/unified

[processor]: https://github.com/wooorm/rehype/blob/master/packages/rehype

[hast]: https://github.com/syntax-tree/hast

[parser]: https://github.com/unifiedjs/unified#processorparser
