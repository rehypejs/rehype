/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @fileoverview Assert `hast` nodes.
 */

'use strict';

/* eslint-env node */
/* jscs:disable jsDoc */
/* jscs:disable maximumLineLength */

/* Dependencies. */
var assert = require('assert');

/* Validate `node`. */
function hast(node) {
    var keys = Object.keys(node).length;
    var type = node.type;

    assert.ok('type' in node);
    assert.equal(typeof node.type, 'string');

    if ('children' in node) {
        assert.ok(Array.isArray(node.children));
        children(node.children);
    }

    /*
     * Validate position.
     */

    if (node.position) {
        assert.ok('start' in node.position);
        assert.ok('end' in node.position);

        assert.ok('line' in node.position.start);
        assert.ok('column' in node.position.start);
        assert.ok('offset' in node.position.start);

        assert.ok('line' in node.position.end);
        assert.ok('column' in node.position.end);
        assert.ok('offset' in node.position.end);
    }

    if ('position' in node) {
        keys--;
    }

    if ('value' in node) {
        assert.equal(typeof node.value, 'string');
    }

    if (type === 'root') {
        assert.ok('children' in node);

        if (node.footnotes) {
            Object.keys(node.footnotes).forEach(function (id) {
                hast(node.footnotes[id]);
            });
        }

        return;
    }

    if (
        type === 'text' ||
        type === 'characterData' ||
        type === 'comment'
    ) {
        assert.equal(keys, 2);
        assert.ok('value' in node);

        return;
    }

    if (type === 'directive') {
        assert.equal(keys, 3);
        assert.ok('value' in node);
        assert.ok('name' in node);

        return;
    }

    /* This is the last possible type. */
    assert.equal(type, 'element');
    assert.equal(keys, 4);
    assert.ok('tagName' in node);
    assert.ok('properties' in node);
    assert.ok('children' in node);
}

/* Validate `nodes`. */
function children(nodes) {
    nodes.forEach(hast);
}

/* Expose. */
module.exports = hast;
