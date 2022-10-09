![rehype][logo]

# Plugins

**rehype** is a tool that transforms HTML with plugins.
See [the monorepo readme][rehype] for info on what the rehype ecosystem is.
This page lists existing plugins.

## Contents

*   [List of plugins](#list-of-plugins)
*   [List of utilities](#list-of-utilities)
*   [Use plugins](#use-plugins)
*   [Create plugins](#create-plugins)

## List of plugins

See [`awesome-rehype`][awesome-rehype] for the most awesome projects in the
ecosystem.
More plugins can be found on GitHub tagged with the
[`rehype-plugin` topic][topic].

> 💡 **Tip**: rehype plugins work with HTML and **remark** plugins work with
> markdown.
> See remark’s [List of plugins][remark-plugins] for more plugins.

The list of plugins:

*   [`rehype-accessible-emojis`](https://github.com/GaiAma/Coding4GaiAma/tree/HEAD/packages/rehype-accessible-emojis)
    — make emojis accessible adding role & aria-label
*   [`rehype-add-classes`](https://github.com/martypdx/rehype-add-classes)
    — add classes by selector
*   [`rehype-annotate`](https://github.com/baldurbjarnason/rehype-annotate)
    — add W3C-style annotations
*   [`rehype-attr`](https://github.com/jaywcjlove/rehype-attr)
    — new markdown syntax to add attributes.
*   [`rehype-autolink-headings`](https://github.com/rehypejs/rehype-autolink-headings)
    — add links to headings
*   [`rehype-citation`](https://github.com/timlrx/rehype-citation)
    — add citation and bibliography from bibtex
*   [`rehype-components`](https://github.com/marekweb/rehype-components)
    — render components (custom elements)
*   [`rehype-concat-css-style`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-concat-css-style)
    — concatenate `<style>`s together
*   [`rehype-concat-javascript`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-concat-javascript)
    — concatenate `<script>`s together
*   [`rehype-css-to-top`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-css-to-top)
    — move `<link>`s to `<head>`
*   [`rehype-document`](https://github.com/rehypejs/rehype-document)
    — wrap in a document
*   [`rehype-dom-parse`](https://github.com/rehypejs/rehype-dom/tree/main/packages/rehype-dom-parse)
    — add support for parsing HTML input in browsers
*   [`rehype-dom-stringify`](https://github.com/rehypejs/rehype-dom/tree/main/packages/rehype-dom-stringify)
    — add support for serializing HTML in browsers
*   [`rehype-external-links`](https://github.com/rehypejs/rehype-external-links)
    — add rel (and target) to external links
*   [`rehype-figure`](https://github.com/josestg/rehype-figure)
    — support figure and caption from images
*   [`rehype-format`](https://github.com/rehypejs/rehype-format)
    — format HTML
*   [`rehype-highlight`](https://github.com/rehypejs/rehype-highlight)
    — syntax highlight code blocks with Highlight.js via `lowlight`
*   [`rehype-highlight-code-block`](https://github.com/mapbox/rehype-highlight-code-block)
    — syntax highlight code blocks with any function you provide
*   [`rehype-infer-description-meta`](https://github.com/rehypejs/rehype-infer-description-meta)
    — infer file metadata from the contents of the document
*   [`rehype-infer-reading-time-meta`](https://github.com/rehypejs/rehype-infer-reading-time-meta)
    — infer reading time as file metadata from the document
*   [`rehype-infer-title-meta`](https://github.com/rehypejs/rehype-infer-title-meta)
    — infer file metadata from the main title of a document
*   [`rehype-inline`](https://github.com/marko-knoebl/rehype-inline)
    — inline JS, CSS, and image files
*   [`rehype-inline-svg`](https://github.com/JS-DevTools/rehype-inline-svg)
    — inline and optimize SVG images
*   [`rehype-ignore`](https://github.com/jaywcjlove/rehype-ignore)
    — ignore content display via HTML comments.
*   [`rehype-jargon`](https://github.com/freesewing/freesewing/tree/develop/packages/rehype-jargon)
    — inserts definitions for jargon terms
*   [`rehype-javascript-to-bottom`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-javascript-to-bottom)
    — move `<script>`s to the end of `<body>`
*   [`rehype-join-line`](https://github.com/unix/rehype-join-line)
    — resolve line breaks in Chinese paragraphs
*   [`rehype-katex`](https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex)
    — render math with KaTeX
*   [`rehype-lodash-template`](https://github.com/viktor-yakubiv/rehype-lodash-template)
    — replace template strings with values from the dictionary
*   [`rehype-mathjax`](https://github.com/remarkjs/remark-math/tree/main/packages/rehype-mathjax)
    — render math with MathJax
*   [`rehype-meta`](https://github.com/rehypejs/rehype-meta)
    — add metadata to the head of a document
*   [`rehype-minify`](https://github.com/rehypejs/rehype-minify)
    — minify HTML
*   [`rehype-minify-attribute-whitespace`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-minify-attribute-whitespace)
    — minify whitespace in attributes
*   [`rehype-minify-css-style`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-minify-css-style)
    — minify CSS in `<style>`s
*   [`rehype-minify-enumerated-attribute`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-minify-enumerated-attribute)
    — minify enumerated attributes
*   [`rehype-minify-event-handler`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-minify-event-handler)
    — minify event handler attributes
*   [`rehype-minify-javascript-script`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-minify-javascript-script)
    — minify JS in `<script>`s
*   [`rehype-minify-javascript-url`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-minify-javascript-url)
    — minify `javascript:` URLs
*   [`rehype-minify-json-script`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-minify-json-script)
    — minify JSON in `<script>`s
*   [`rehype-minify-language`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-minify-language)
    —  minify `lang` attributes
*   [`rehype-minify-media-attribute`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-minify-media-attribute)
    — minify `media` attributes
*   [`rehype-minify-meta-color`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-minify-meta-color)
    — minify `content` of theme color `<meta>`s
*   [`rehype-minify-meta-content`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-minify-meta-content)
    — minify `content` on `<meta>`s
*   [`rehype-minify-style-attribute`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-minify-style-attribute)
    — minify `style` attributes
*   [`rehype-minify-url`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-minify-url)
    — minify URL attributes
*   [`rehype-minify-whitespace`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-minify-whitespace)
    — minify whitespace between elements
*   [`rehype-normalize-attribute-value-case`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-normalize-attribute-value-case)
    — normalize casing of attribute values
*   [`rehype-partials`](https://github.com/mrzmmr/rehype-partials)
    — partials support for rehype
*   [`rehype-picture`](https://github.com/rehypejs/rehype-picture)
    — wrap images in `<picture>`s
*   [`rehype-postcss`](https://github.com/viktor-yakubiv/rehype-postcss)
    — run PostCSS on `<style>` nodes and elements with a `style` attribute
*   [`rehype-prevent-favicon-request`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-prevent-favicon-request)
    — prevent a request by setting an empty `favicon.ico`
*   [`rehype-prism`](https://github.com/mapbox/rehype-prism)
    — syntax highlighting with Prism via `refractor`
*   [`rehype-prism-plus`](https://github.com/timlrx/rehype-prism-plus)
    — syntax highlighting with Prism via `refractor` with extras
*   [`rehype-raw`](https://github.com/rehypejs/rehype-raw)
    — parse the tree again (and raw nodes)
*   [`rehype-react`](https://github.com/rehypejs/rehype-react)
    — compile to React
*   [`rehype-remark`](https://github.com/rehypejs/rehype-remark)
    — remark support
*   [`rehype-remove-comments`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-remove-comments)
    — remove comments
*   [`rehype-remove-duplicate-attribute-values`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-remove-duplicate-attribute-values)
    — remove duplicate attribute values
*   [`rehype-remove-empty-attribute`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-remove-empty-attribute)
    — remove empty attributes
*   [`rehype-remove-external-script-content`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-remove-external-script-content)
    — remove content on `<script>`s w/ `src`
*   [`rehype-remove-meta-http-equiv`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-remove-meta-http-equiv)
    — replace certain `http-equiv`s with shorter alternatives
*   [`rehype-remove-script-type-javascript`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-remove-script-type-javascript)
    — remove `type` and `language` on JS `<script>`s
*   [`rehype-remove-style-type-css`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-remove-style-type-css)
    — remove `type` on CSS `<style>`s and `<link>`s
*   [`rehype-remove-unused-css`](https://github.com/nzt/rehype-remove-unused-css)
    — remove unused css
*   [`rehype-resolution`](https://github.com/michaelnisi/rehype-resolution)
    — inject resolution `srcset` into images
*   [`rehype-retext`](https://github.com/rehypejs/rehype-retext)
    — retext support
*   [`rehype-rewrite`](https://github.com/jaywcjlove/rehype-rewrite)
    — rewrite element with rehype
*   [`rehype-sanitize`](https://github.com/rehypejs/rehype-sanitize)
    — sanitize HTML
*   [`rehype-section`](https://github.com/agentofuser/rehype-section)
    — wrap headings and their contents into nested `<section>` elements
*   [`rehype-shift-heading`](https://github.com/rehypejs/rehype-shift-heading)
    — change the rank of headings
*   [`rehype-shiki`](https://github.com/rsclarke/rehype-shiki)
    — syntax highlight code blocks with Shiki
*   [`rehype-slots`](https://github.com/marekweb/rehype-slots)
    — replace slot elements with injected content
*   [`rehype-slug`](https://github.com/rehypejs/rehype-slug)
    — add `id`s to headings
*   [`rehype-slug-custom-id`](https://github.com/unicorn-utterances/rehype-slug-custom-id)
    — add `id`s to headings, also supports `{#custom-ids}`
*   [`rehype-sort-attribute-values`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-sort-attribute-values)
    — sort attribute values
*   [`rehype-sort-attributes`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-sort-attributes)
    — sort attributes
*   [`rehype-sort-tailwind-classes`](https://github.com/bitcrowd/rehype-sort-tailwind-classes)
    — sort tailwind classes
*   [`rehype-template`](https://github.com/nzt/rehype-template)
    — wrap content with template literal
*   [`rehype-toc`](https://github.com/JS-DevTools/rehype-toc)
    — add a table of contents (TOC) to the page
*   [`rehype-truncate`](https://github.com/luk707/rehype-truncate)
    — truncate HTML while preserving its structure
*   [`rehype-twemojify`](https://github.com/cliid/rehype-twemojify)
    — turn emoji shortcodes into twemoji
*   [`rehype-urls`](https://github.com/brechtcs/rehype-urls)
    — rewrite URLs of `href` and `src` attributes
*   [`rehype-url-inspector`](https://github.com/JS-DevTools/rehype-url-inspector)
    — inspect, validate, or rewrite URLs anywhere in the document
*   [`rehype-video`](https://jaywcjlove.github.io/rehype-video)
    — improved video syntax: links to `.mp4` and `.mov` turn into videos
*   [`rehype-webparser`](https://github.com/Prettyhtml/prettyhtml/tree/HEAD/packages/rehype-webparser)
    — less strict HTML parser
*   [`rehype-widont`](https://github.com/radiojhero/rehype-widont)
    — prevent lines with single words
*   [`rehype-wrap`](https://github.com/mrzmmr/rehype-wrap)
    — wrap selected elements with a given element
*   [`rehype-wrap-all`](https://github.com/florentb/rehype-wrap-all)
    — wrap all matching elements with a given element

## List of utilities

See [hast][hast-util] for a list of utilities that work with the syntax tree.
See [unist][unist-util] for other utilities which work with hast and other
syntax trees too.
Finally, see [vfile][vfile-util] for a list of utilities working with virtual
files.

## Use plugins

To use a plugin programmatically, call the [`use()`][unified-use] function.
To use plugin with `rehype-cli`, pass a [`--use` flag][unified-args-use] or
specify it in a [configuration file][config-file-use].

## Create plugins

To create a plugin, first read up on the [concept of plugins][unified-plugins].
Then, read the [guide on “Creating a plugin with unified”][guide].
Finally, take one of existing plugins, which looks similar to what you’re about
to make, and work from there.
If you get stuck, [discussions][] is a good place to get help.

You should pick a name prefixed by `'rehype-'` (such as `rehype-format`).
**Do not use the `rehype-` prefix** if the thing you create doesn’t work with
`rehype().use()`: it isn’t a “plugin” and will confuse users.
If it works with hast, use `'hast-util-'`, if it works with any unist tree, use
`unist-util-`, and if it works with virtual files, use `vfile-`.

Use default exports to expose plugins from your packages, add `rehype-plugin`
keywords in `package.json`, add a `rehype-plugin` topic to your repo on GitHub,
and create a pull request to add the plugin here on this page!

<!--Definitions:-->

[logo]: https://raw.githubusercontent.com/rehypejs/rehype/cb624bd/logo.svg?sanitize=true

[rehype]: https://github.com/rehypejs/rehype

[awesome-rehype]: https://github.com/rehypejs/awesome-rehype

[topic]: https://github.com/topics/rehype-plugin

[hast-util]: https://github.com/syntax-tree/hast#list-of-utilities

[unist-util]: https://github.com/syntax-tree/unist#unist-utilities

[vfile-util]: https://github.com/vfile/vfile#utilities

[unified-use]: https://github.com/unifiedjs/unified#processoruseplugin-options

[unified-args-use]: https://github.com/unifiedjs/unified-args#--use-plugin

[config-file-use]: https://github.com/unifiedjs/unified-engine/blob/main/doc/configure.md#plugins

[unified-plugins]: https://github.com/unifiedjs/unified#plugin

[guide]: https://unifiedjs.com/learn/guide/create-a-plugin/

[discussions]: https://github.com/rehypejs/rehype/discussions

[remark-plugins]: https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins
