# rehype-cli [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

Command-line interface for [**rehype**][rehype].

*   Loads [`rehype-` plugins][plugins]
*   Searches for HTML extensions (`html`, `htm`, `xht`, `xhtml`)
*   Ignores paths found in [`.rehypeignore` files][ignore-file]
*   Loads configuration from [`.rehyperc`, `.rehyperc.js`, etc][config-file]
*   Uses configuration from [`rehype` fields in `package.json`
    files][config-file]

## Installation

[npm][]:

```bash
npm install rehype-cli
```

## Usage

```bash
# Minify `index.html` with `rehype-preset-minify`
$ rehype index.html --use preset-minify --output
```

## CLI

See [**unified-args**][unified-args], which provides the interface,
for more information on all available options.

```txt
Usage: rehype [options] [path | glob ...]

  CLI to process HTML with rehype using plugins

Options:

  -h  --help                output usage information
  -v  --version             output version number
  -o  --output [path]       specify output location
  -r  --rc-path <path>      specify configuration file
  -i  --ignore-path <path>  specify ignore file
  -s  --setting <settings>  specify settings
  -e  --ext <extensions>    specify extensions
  -u  --use <plugins>       use plugins
  -w  --watch               watch for changes and reprocess
  -q  --quiet               output only warnings and errors
  -S  --silent              output only errors
  -f  --frail               exit with 1 on warnings
  -t  --tree                specify input and output as syntax tree
      --file-path <path>    specify path to process as
      --tree-in             specify input as syntax tree
      --tree-out            output syntax tree
      --[no-]stdout         specify writing to stdout (on by default)
      --[no-]color          specify color in report (on by default)
      --[no-]config         search for configuration files (on by default)
      --[no-]ignore         search for ignore files (on by default)

Examples:

  # Process `input.html`
  $ rehype input.html -o output.html

  # Pipe
  $ rehype < input.html > output.html

  # Rewrite all applicable files
  $ rehype . -o
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

[plugins]: https://github.com/wooorm/rehype/blob/master/doc/plugins.md

[config-file]: https://github.com/unifiedjs/unified-engine/blob/master/doc/configure.md

[ignore-file]: https://github.com/unifiedjs/unified-engine/blob/master/doc/ignore.md

[unified-args]: https://github.com/unifiedjs/unified-args#cli
