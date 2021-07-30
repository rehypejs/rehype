import fromParse5 from 'hast-util-from-parse5'
import Parser5 from 'parse5/lib/parser/index.js'
import {errors} from './errors.js'

const base = 'https://html.spec.whatwg.org/multipage/parsing.html#parse-error-'

const fatalities = {2: true, 1: false, 0: null}

export default function rehypeParse(options) {
  const settings = Object.assign({}, options, this.data('settings'))
  let position = settings.position

  position = typeof position === 'boolean' ? position : true

  this.Parser = parser

  function parser(doc, file) {
    const fn = settings.fragment ? 'parseFragment' : 'parse'
    const onParseError = settings.emitParseErrors ? onerror : null
    const parse5 = new Parser5({
      sourceCodeLocationInfo: position,
      onParseError,
      scriptingEnabled: false
    })

    return fromParse5(parse5[fn](doc), {
      space: settings.space,
      file,
      verbose: settings.verbose
    })

    function onerror(error) {
      const code = error.code
      const name = camelcase(code)
      const setting = settings[name]
      const config = setting === undefined || setting === null ? true : setting
      const level = typeof config === 'number' ? config : config ? 1 : 0
      const start = {
        line: error.startLine,
        column: error.startCol,
        offset: error.startOffset
      }
      const end = {
        line: error.endLine,
        column: error.endCol,
        offset: error.endOffset
      }
      let info
      let message

      if (level) {
        /* c8 ignore next */
        info = errors[name] || {reason: '', description: ''}

        message = file.message(format(info.reason), {start, end})
        message.source = 'parse-error'
        message.ruleId = code
        message.fatal = fatalities[level]
        message.note = format(info.description)
        message.url = info.url === false ? null : base + code
      }

      function format(value) {
        return value.replace(/%c(?:-(\d+))?/g, char).replace(/%x/g, encodedChar)
      }

      function char($0, $1) {
        const offset = $1 ? -Number.parseInt($1, 10) : 0
        const char = doc.charAt(error.startOffset + offset)
        return char === '`' ? '` ` `' : char
      }

      function encodedChar() {
        const char = doc
          .charCodeAt(error.startOffset)
          .toString(16)
          .toUpperCase()

        return '0x' + char
      }
    }
  }
}

function camelcase(value) {
  return value.replace(/-[a-z]/g, replacer)
}

function replacer($0) {
  return $0.charAt(1).toUpperCase()
}
