/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module rehype:script
 * @fileoverview Bundle and mangle `rehype`.
 */

'use strict';

/* Dependencies. */
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var bail = require('bail');
var browserify = require('browserify');
var esprima = require('esprima');
var esmangle = require('esmangle');
var escodegen = require('escodegen');
var pack = require('../packages/rehype/package.json');

/* Methods. */
var write = fs.writeFileSync;

var comment = [
  '/*!',
  ' * @copyright 2016 Titus Wormer',
  ' * @license ' + pack.license,
  ' * @module ' + pack.name,
  ' * @version ' + pack.version,
  ' */',
  ''
].join('\n');

var input = path.join.bind(null, __dirname, '..', 'packages', 'rehype');
var output = path.join.bind(null, __dirname, '..');

var opts = {
  standalone: 'rehype',
  detectGlobals: false,
  insertGlobals: ['process', 'global', '__filename', '__dirname']
};

browserify(input('index.js'), opts).bundle(function (err, buf) {
  bail(err);

  write(output('rehype.js'), comment + buf);

  console.log(chalk.green('✓') + ' wrote `rehype.js`');
});

browserify(input('index.js'), opts)
  .transform('uglifyify', {
    global: true,
    sourcemap: false
  })
  .plugin('bundle-collapser/plugin')
  .bundle(function (err, buf) {
    var ast;

    bail(err);

    ast = esmangle.mangle(esmangle.optimize(esprima.parse(String(buf), {
      loc: true,
      range: true,
      raw: true,
      comment: true,
      tolerant: true
    }), {
      destructive: true,
      directive: true,
      preserveCompletionValue: false,
      legacy: false,
      topLevelContext: null,
      inStrictCode: true
    }));

    write(output('rehype.min.js'), comment + escodegen.generate(ast, {
      format: {
        renumber: true,
        hexadecimal: true,
        escapeless: true,
        compact: true,
        semicolons: false,
        parentheses: false
      }
    }));

    console.log(chalk.green('✓') + ' wrote `rehype.min.js`');
  });
