# rehype-parse [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

[Parser][] for [**unified**][unified].  Parses HTML to an
[**hast**][hast] syntax tree.  Used in the [**rehype**
processor][processor].

## Installation

[npm][]:

```bash
npm install rehype-parse
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
    .pipe(process.stdout);
```

## Table of Contents

*   [API](#api)
    *   [processor.use(parse)](#processoruseparse)
    *   [parse.Parser](#parseparser)
*   [License](#license)

## API

### `processor.use(parse)`

Configure the `processor` to read HTML as input and process an
[**hast**][hast] syntax tree.

There is no configuration for the parser.

The parser [warn][]s about potential code-style violations, which are
patched on the processed file’s [`messages`][vfile-messages].

###### `tag-case`

Warn if element tag-names are not lower-cased.

```html
<DIV foo="bar"></Div>
```

Yields:

```txt
1:5 Expected opening tag-name `DIV` to be lower-cased (`div`)
1:21 Expected closing tag-name `Div` to be lower-cased (`div`)
```

###### `attribute-name-case`

Warn if attribute names are not lower-cased.

```html
<div Foo="bar"></div>
```

Yields:

```txt
1:9 Expected attribute name `Foo` to be lower-cased (`foo`)
```

###### `no-duplicate-attribute`

Warn if attribute names are used multiple times.

```html
<div foo="bar" foo="baz"></div>
<div qux="quux" QuX="QUUUX"></div>
```

Yields:

```txt
1:19 Duplicate attribute `foo`
2:20 Duplicate attribute `qux`
```

###### `no-boolean-value`

Warn if boolean attributes have superfluous values.

```html
<div disabled hidden="" download="download"></div>
```

Yields:

```txt
1:23 Found superfluous value for boolean `hidden`
1:43 Found superfluous value for boolean `download`
```

###### `require-attribute-value`

Warn if non-boolean attributes miss their value.

```html
<div id name="" download="picture.png"></div>
```

Yields:

```txt
1:9 Missing value for non-boolean attribute `id`
```

###### `no-close-tag-attributes`

Warn if attributes on element closing-tags are found.

```html
<footer></footer id="baz">
```

Yields:

```txt
1:18 Did not expect `i` after closing tag
```

###### `require-open-tag`

Warn if elements are closed without being open.

```html
</div>

</br>
```

Yields:

```txt
1:1 Stray end tag `div`
3:1 Stray end tag `br`
```

###### `require-close-tag`

Warn if open elements are not closed.

```html
<header>

<div><span></div>
```

Yields:

```txt
1:1-4:1 Unclosed element `header`
3:6-3:12 Expected closing tag for `span`
```

###### `no-self-closing`

Warn if self-closing syntax is used in HTML.

```html
<img />

<article/>
```

Yields:

```txt
1:7 Did not expect self-closing syntax in HTML
3:10 Did not expect self-closing syntax in HTML
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

[unified]: https://github.com/wooorm/unified

[processor]: https://github.com/wooorm/rehype/blob/master/packages/rehype

[hast]: https://github.com/wooorm/hast

[parser]: https://github.com/wooorm/unified#processorparser

[warn]: https://github.com/wooorm/vfile#vfilewarnreason-position

[vfile-messages]: https://github.com/wooorm/vfile#vfilemessages
