/*jshint node: true */
'use strict';

var checker = require('ember-cli-version-checker');
var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');

module.exports = {
  name: 'liquid-fire',

  init: function() {
    checker.assertAbove(this, '0.2.0');
  },

  treeForVendor: function(tree){
    var velocityPath = path.dirname(require.resolve('velocity-animate'));
    var velocityTree = pickFiles(this.treeGenerator(velocityPath), {
      srcDir: '/',
      destDir: 'velocity'
    });
    var matchMediaPath = path.dirname(require.resolve('match-media'));
    var matchMediaTree = pickFiles(this.treeGenerator(matchMediaPath), {
      srcDir: '/',
      destDir: 'match-media'
    });
    return mergeTrees([tree, velocityTree, matchMediaTree]);
  },

  included: function(app){
    app.import('vendor/liquid-fire/dom-guard-begin.js');
    app.import('vendor/velocity/velocity.js');
    app.import('vendor/liquid-fire/dom-guard-end.js');

    app.import('vendor/liquid-fire.css');
    app.import('vendor/match-media/matchMedia.js');
  },

  setupPreprocessorRegistry: function(type, registry) {
    var TransformLiquidWithAsToHash = require('./ext/plugins/transform-liquid-with-as-to-hash');

    registry.add('htmlbars-ast-plugin', {
      name: "transform-liquid-with-as-to-hash",
      plugin: TransformLiquidWithAsToHash
    });
  }
};
