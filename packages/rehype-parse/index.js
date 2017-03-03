'use strict';

var fromParse5 = require('hast-util-from-parse5');
var Parser5 = require('parse5/lib/parser');
var xtend = require('xtend');

module.exports = parse;

function parse(options) {
  var settings = xtend(options, this.data('settings'));
  var position = typeof settings.position === 'boolean' ? settings.position : true;
  var parse5 = new Parser5({locationInfo: position});

  this.Parser = parser;

  function parser(doc, file) {
    var fn = settings.fragment ? 'parseFragment' : 'parse';

    return fromParse5(parse5[fn](String(file)), {
      file: file,
      verbose: settings.verbose
    });
  }
}
