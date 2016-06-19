/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module rehype
 * @fileoverview Map of tags to elements they close.
 */

'use strict';

/* eslint-env commonjs */

/* Constants. */
var p = ['p'];

var inputs = [
    'input',
    'option',
    'optgroup',
    'select',
    'button',
    'datalist',
    'textarea'
];

/* Expose. */
module.exports = {
    body: ['head', 'link', 'script'],
    h1: p,
    h2: p,
    h3: p,
    h4: p,
    h5: p,
    h6: p,
    p: p,
    li: ['li'],
    tr: ['tr', 'th', 'td'],
    th: ['th'],
    td: ['thead', 'th', 'td'],
    select: inputs,
    input: inputs,
    output: inputs,
    button: inputs,
    datalist: inputs,
    textarea: inputs,
    option: ['option'],
    optgroup: ['optgroup']
};
