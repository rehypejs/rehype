import unified = require('unified')
import parse = require('rehype-parse')

unified().use(parse)

unified().use(parse, {})

unified().use(parse, {fragment: true})

unified().use(parse, {space: 'html'})
unified().use(parse, {space: 'svg'})

unified().use(parse, {emitParseErrors: true})

unified().use(parse, {verbose: true})
