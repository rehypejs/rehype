# rehype [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

The [**rehype**][rehype] processor is a HTML processor powered by
[plug-ins][plugins].

*   Interface by [**unified**][unified];
*   [**hast**][hast] syntax tree;
*   Parses HTML to the tree with [**rehype-parse**][parse];
*   [Plug-ins][plugins] transform the tree;
*   Compiles the tree to HTML using [**rehype-stringify**][stringify].

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

rehype().process('<h2>Hello world!', function (err, file) {
    file.filename = 'example';
    file.extension = 'html';
    console.log(file.toString());
    console.error(report(file));
});
```

Yields:

```txt
<h2>Hello world!</h2>
example.html
     1-1:17  warning  Unclosed element `h2`       require-close-tag

⚠ 1 warning
```

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

[rehype]: https://github.com/wooorm/rehype

[unified]: https://github.com/wooorm/unified

[hast]: https://github.com/wooorm/hast

[parse]: https://github.com/wooorm/rehype/blob/master/packages/rehype-parse

[stringify]: https://github.com/wooorm/rehype/blob/master/packages/rehype-stringify

[plugins]: https://github.com/wooorm/rehype/blob/master/doc/plugins.md

[unified-usage]: https://github.com/wooorm/unified#usage
