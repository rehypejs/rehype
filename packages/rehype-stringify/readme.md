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
var unified = require('unified');
var parse = require('rehype-parse');
var stringify = require('rehype-stringify');

process.stdin
  .pipe(unified())
  .use(parse)
  .use(stringify)
  .pipe(process.stdout, {
    quoteSmart: true,
    closeSelfClosing: true,
    omitOptionalTags: true,
    entities: {useShortestReferences: true}
  });
```

## API

### `processor.use(stringify[, options])`

Configure the `processor` to stringify [**hast**][hast] syntax trees
to HTML.

###### `options`

Options can be passed when using `processor.use(stringify, options)`,
and later through [`processor.stringify()`][stringify],
[`processor.process()`][process], or [`processor.pipe()`][pipe].

All settings are passed to [`hast-util-to-html`][hast-util-to-html].

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

[unified]: https://github.com/wooorm/unified

[processor]: https://github.com/wooorm/rehype

[stringify]: https://github.com/wooorm/unified#processorstringifynode-filevalue-options

[process]: https://github.com/wooorm/unified#processorprocessfilevalue-options-done

[pipe]: https://github.com/wooorm/unified#processorpipestream-options

[compiler]: https://github.com/wooorm/unified#processorcompiler

[hast]: https://github.com/wooorm/hast

[hast-util-to-html]: https://github.com/wooorm/hast-util-to-html#tohtmlnode-options
