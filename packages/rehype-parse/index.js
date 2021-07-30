import fromParse5 from 'hast-util-from-parse5'
import Parser5 from 'parse5/lib/parser/index.js'
import {errors} from './errors.js'

var base = 'https://html.spec.whatwg.org/multipage/parsing.html#parse-error-'

var fatalities = {2: true, 1: false, 0: null}

export default function rehypeParse(options) {
  var settings = Object.assign({}, options, this.data('settings'))
  var position = settings.position

  position = typeof position === 'boolean' ? position : true

  this.Parser = parser

  function parser(doc, file) {
    var fn = settings.fragment ? 'parseFragment' : 'parse'
    var onParseError = settings.emitParseErrors ? onerror : null
    var parse5 = new Parser5({
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
      var code = error.code
      var name = camelcase(code)
      var setting = settings[name]
      var config = setting === undefined || setting === null ? true : setting
      var level = typeof config === 'number' ? config : config ? 1 : 0
      var start = {
        line: error.startLine,
        column: error.startCol,
        offset: error.startOffset
      }
      var end = {
        line: error.endLine,
        column: error.endCol,
        offset: error.endOffset
      }
      var info
      var message

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
        var offset = $1 ? -parseInt($1, 10) : 0
        var char = doc.charAt(error.startOffset + offset)
        return char === '`' ? '` ` `' : char
      }

      function encodedChar() {
        var char = doc.charCodeAt(error.startOffset).toString(16).toUpperCase()

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
