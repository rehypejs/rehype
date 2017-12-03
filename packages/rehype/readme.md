# rehype [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

The [**rehype**][rehype] processor is an HTML processor powered by
[plug-ins][plugins].

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
var rehype = require('rehype');
var report = require('vfile-reporter');

rehype().process('<title>Hi</title><h2>Hello world!', function (err, file) {
  console.log(report(err || file));
  console.log(String(file));
});
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

[build-badge]: https://img.shields.io/travis/rehypejs/rehype.svg

[build-status]: https://travis-ci.org/rehypejs/rehype

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype.svg

[coverage-status]: https://codecov.io/github/rehypejs/rehype

[chat-badge]: https://img.shields.io/gitter/room/rehypejs/Lobby.svg

[chat]: https://gitter.im/rehypejs/Lobby

[license]: https://github.com/rehypejs/rehype/blob/master/LICENSE

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[rehype]: https://github.com/rehypejs/rehype

[unified]: https://github.com/unifiedjs/unified

[hast]: https://github.com/syntax-tree/hast

[parse]: https://github.com/rehypejs/rehype/blob/master/packages/rehype-parse

[stringify]: https://github.com/rehypejs/rehype/blob/master/packages/rehype-stringify

[plugins]: https://github.com/rehypejs/rehype/blob/master/doc/plugins.md

[unified-usage]: https://github.com/unifiedjs/unified#usage
