import unified = require('unified')
import stringify = require('rehype-stringify')

unified().use(stringify)

unified().use(stringify, {})

unified().use(stringify, {
  upperDoctype: true
})
