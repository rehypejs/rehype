![rehype][logo]

# Getting started

**rehype** transforms HTML.
It’s an ecosystem of [plugins][].
If you get stuck, [issues][] and [spectrum][] are good places to get help.

rehype is built on [unified][], make sure to read it and its [website][] too.

## Contents

*   [Intro](#intro)
*   [Command line](#command-line)
*   [Programmatic](#programmatic)

## Intro

Out of the box, **rehype** processes HTML: it’s given, reformatted, and
written:

```html
<p>Some <em>emphasis</em>, <strong>importance</strong>, and <code>code</code>.
```

Yields (in fragment mode):

```html
<p>Some <em>emphasis</em>, <strong>importance</strong>, and <code>code</code>.</p>
```

But much can be done [through plugins][plugins].

## Command line

**rehype**’s CLI is a simple way to process markdown files from the
command line.
Its interface is provided by [**unified-args**][unified-args].

Install [`rehype-cli`][cli] and dependencies with [npm][]:

```sh
npm install --global rehype-cli rehype-preset-minify
```

`index.html` contains:

```html
<!doctype html>
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

`rehype index.html --use preset-minify` yields:

```html
<!doctypehtml><meta charset=utf8><title>Hello</title><p>World!
```

```txt
index.html: no issues found
```

## Programmatic

The programmatic interface of **rehype** is provided by [**unified**][unified].
In fact, [`rehype`][api] is two plugins:
[`rehype-parse`][parse] and [`rehype-stringify`][stringify].

Install [`rehype`][api] with [npm][]:

```sh
npm install rehype
```

`index.js` contains:

```js
var rehype = require('rehype')
var report = require('vfile-reporter')

rehype().process('<title>Hi</title><h2>Hello world!', function(err, file) {
  console.log(String(file))
  console.log(report(err || file))
})
```

`node index.js` yields:

```html
<html><head><title>Hi</title></head><body><h2>Hello world!</h2></body></html>
```

```txt
no issues found
```

<!-- Definitions -->

[logo]: https://raw.githubusercontent.com/rehypejs/rehype/90b8f34/logo.svg?sanitize=true

[issues]: https://github.com/rehypejs/rehype/issues

[spectrum]: https://spectrum.chat/unified/rehype

[npm]: https://docs.npmjs.com/cli/install

[api]: https://github.com/rehypejs/rehype/tree/master/packages/rehype

[plugins]: https://github.com/rehypejs/rehype/tree/master/doc/plugins.md

[unified]: https://github.com/unifiedjs/unified

[website]: https://unifiedjs.com

[parse]: https://github.com/rehypejs/rehype/tree/master/packages/rehype-parse

[stringify]: https://github.com/rehypejs/rehype/tree/master/packages/rehype-stringify

[unified-args]: https://github.com/unifiedjs/unified-args

[cli]: https://github.com/rehypejs/rehype/tree/master/packages/rehype-cli
