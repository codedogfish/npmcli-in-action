#!/usr/bin/env node
'use strict';
var meow = require('meow');
var list = require('cli-list');
var pkg = require('../package.json');
var gens = list(process.argv.slice(2));

var cli = gens.map(function (gen) {
  var minicli = meow({ help: false, pkg: pkg, argv: gen });
  var opts = minicli.flags;
  var args = minicli.input;

  // add un-camelized options too, for legacy
  // TODO: remove some time in the future when generators have upgraded
  Object.keys(opts).forEach(function (key) {
    var legacyKey = key.replace(/[A-Z]/g, function (m) {
      return '-' + m.toLowerCase();
    });

    opts[legacyKey] = opts[key];
  });

  return { opts: opts, args: args };
});

console.log('hello');
console.log(cli);
console.log('world');
