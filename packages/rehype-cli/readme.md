# rehype-cli

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Command line interface for [**rehype**][rehype].

*   Loads [`rehype-` plugins][plugins]
*   Searches for HTML extensions (`html`, `htm`, `xht`, `xhtml`)
*   Ignores paths found in [`.rehypeignore` files][ignore-file]
*   Loads configuration from [`.rehyperc`, `.rehyperc.js` files][config-file]
*   Uses configuration from [`rehype` fields in `package.json`
    files][config-file]

## Sponsors

Support this effort and give back by sponsoring on [OpenCollective][collective]!

<!--lint ignore no-html-->

<table>
<tr valign="middle">
<td width="20%" align="center" colspan="2">
  <a href="https://www.gatsbyjs.org">Gatsby</a> 🥇<br><br>
  <a href="https://www.gatsbyjs.org"><img src="https://avatars1.githubusercontent.com/u/12551863?s=256&v=4" width="128"></a>
</td>
<td width="20%" align="center" colspan="2">
  <a href="https://vercel.com">Vercel</a> 🥇<br><br>
  <a href="https://vercel.com"><img src="https://avatars1.githubusercontent.com/u/14985020?s=256&v=4" width="128"></a>
</td>
<td width="20%" align="center" colspan="2">
  <a href="https://www.netlify.com">Netlify</a><br><br>
  <!--OC has a sharper image-->
  <a href="https://www.netlify.com"><img src="https://images.opencollective.com/netlify/4087de2/logo/256.png" width="128"></a>
</td>
<td width="10%" align="center">
  <a href="https://www.holloway.com">Holloway</a><br><br>
  <a href="https://www.holloway.com"><img src="https://avatars1.githubusercontent.com/u/35904294?s=128&v=4" width="64"></a>
</td>
<td width="10%" align="center">
  <a href="https://themeisle.com">ThemeIsle</a><br><br>
  <a href="https://themeisle.com"><img src="https://avatars1.githubusercontent.com/u/58979018?s=128&v=4" width="64"></a>
</td>
<td width="10%" align="center">
  <a href="https://boosthub.io">Boost Hub</a><br><br>
  <a href="https://boosthub.io"><img src="https://images.opencollective.com/boosthub/6318083/logo/128.png" width="64"></a>
</td>
<td width="10%" align="center">
  <a href="https://expo.io">Expo</a><br><br>
  <a href="https://expo.io"><img src="https://avatars1.githubusercontent.com/u/12504344?s=128&v=4" width="64"></a>
</td>
</tr>
<tr valign="middle">
<td width="100%" align="center" colspan="10">
  <br>
  <a href="https://opencollective.com/unified"><strong>You?</strong></a>
  <br><br>
</td>
</tr>
</table>

## Install

[npm][]:

```sh
npm install rehype-cli
```

## Use

```sh
# Minify `index.html` with `rehype-preset-minify`:
$ rehype index.html --use preset-minify --output
```

## CLI

See [`unified-args`][unified-args], which provides the interface, for more
information on all available options.

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
      --report <reporter>   specify reporter
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

## Security

As **rehype** works on HTML, and improper use of HTML can open you up to a
[cross-site scripting (XSS)][xss] attack, use of rehype can also be unsafe.
Use [`rehype-sanitize`][sanitize] to make the tree safe.

## Contribute

See [`contributing.md`][contributing] in [`rehypejs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.
Ideas for new plugins and tools can be posted in [`rehypejs/ideas`][ideas].

A curated list of awesome rehype resources can be found in [**awesome
rehype**][awesome].

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/rehypejs/rehype/workflows/main/badge.svg

[build]: https://github.com/rehypejs/rehype/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype.svg

[coverage]: https://codecov.io/github/rehypejs/rehype

[downloads-badge]: https://img.shields.io/npm/dm/rehype-cli.svg

[downloads]: https://www.npmjs.com/package/rehype-cli

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/rehypejs/rehype/discussions

[health]: https://github.com/rehypejs/.github

[contributing]: https://github.com/rehypejs/.github/blob/HEAD/contributing.md

[support]: https://github.com/rehypejs/.github/blob/HEAD/support.md

[coc]: https://github.com/rehypejs/.github/blob/HEAD/code-of-conduct.md

[ideas]: https://github.com/rehypejs/ideas

[awesome]: https://github.com/rehypejs/awesome-rehype

[license]: https://github.com/rehypejs/rehype/blob/main/license

[author]: https://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[rehype]: https://github.com/rehypejs/rehype

[plugins]: https://github.com/rehypejs/rehype/blob/main/doc/plugins.md

[config-file]: https://github.com/unifiedjs/unified-engine/blob/HEAD/doc/configure.md

[ignore-file]: https://github.com/unifiedjs/unified-engine/blob/HEAD/doc/ignore.md

[unified-args]: https://github.com/unifiedjs/unified-args#cli

[sanitize]: https://github.com/rehypejs/rehype-sanitize

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
