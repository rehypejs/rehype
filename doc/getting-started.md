![rehype][logo]

# Getting Started

**rehype** transforms HTML.  It’s an ecosystem of [plug-ins][plugins].
If you get stuck, [issues][] and [Gitter][] are good places to get help.

## Table of Contents

*   [Introduction](#introduction)
*   [Command-line](#command-line)
*   [Programmatic usage](#programmatic-usage)

## Introduction

Out of the box, **rehype** doesn’t do much.  HTML is given, and
written:

```html
<p>Some <em>emphasis</em>, <strong>importance</strong>, and <code>code</code>.
```

Yields (in fragment mode):

```html
<p>Some <em>emphasis</em>, <strong>importance</strong>, and <code>code</code>.</p>
```

But, much can be done, [through plug-ins][plugins].

## Command-line

**rehype**’s CLI is a simple way to process HTML files from the
command line.  Its interface is provided by [**unified-args**][unified-args].

Install [`rehype-cli`][cli] and dependencies with [npm][]:

```bash
npm install --global rehype-cli rehype-minify
```

`index.html` contains:

```md
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hello</title>
  </head>
  <body>
    <p>World!</p>
  </body>
</html>
```

`rehype index.html --preset minify` yields:

```txt
<!DOCTYPE html><meta charset=utf8><title>Hello</title><p>World!
index.html: no issues found
```

## Programmatic usage

The programmatic interface of **rehype** is provided by
[**unified**][unified].  In fact, [`rehype`][api] is two plug-ins:
[`rehype-parse`][parse] and [`rehype-stringify`][stringify].

Install [`rehype`][api] with [npm][]:

```bash
npm install rehype
```

`index.js` contains:

```js
var rehype = require('rehype');
var report = require('vfile-reporter');

rehype().process('<title>Hi</title><h2>Hello world!', function (err, file) {
  console.log(report(err || file));
  console.log(String(file));
});
```

`node index.js` yields:

```txt
no issues found
<html><head><title>Hi</title></head><body><h2>Hello world!</h2></body></html>
```

<!-- Definitions -->

[logo]: https://cdn.rawgit.com/wooorm/rehype/5835753/logo.svg

[issues]: https://github.com/wooorm/rehype/issues

[gitter]: https://gitter.im/wooorm/rehype

[npm]: https://docs.npmjs.com/cli/install

[api]: https://github.com/wooorm/rehype/tree/master/packages/rehype

[plugins]: https://github.com/wooorm/rehype/tree/master/doc/plugins.md

[unified]: https://github.com/wooorm/unified

[parse]: https://github.com/wooorm/rehype/tree/master/packages/rehype-parse

[stringify]: https://github.com/wooorm/rehype/tree/master/packages/rehype-stringify

[unified-args]: https://github.com/wooorm/unified-args

[cli]: https://github.com/wooorm/rehype/tree/master/packages/rehype-cli
