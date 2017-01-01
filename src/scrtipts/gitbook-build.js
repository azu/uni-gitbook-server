// MIT © 2017 azu
"use strict";
const spawn = require("cross-spawn");
const gitbook = require.resolve('.bin/gitbook');
module.exports = function(args, cwd, onExit) {
  const child = spawn(gitbook, args, {
    cwd
  });
  child.stderr.on('data', function(data) {
    process.stderr.write(data);
  });
  child.stdout.on('data', function(data) {
    process.stdout.write(data);
  });
  child.on('error', function(error) {
    console.error(error);
  });
  child.on('exit', function(code) {
    onExit(code);
  });
};