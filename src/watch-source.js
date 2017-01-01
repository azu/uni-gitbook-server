// MIT © 2017 azu
"use strict";
const chokidar = require("chokidar");
module.exports = function watchSources(watchSource, onChange) {
  const watcher = chokidar.watch(watchSource, {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });
  // Add event listeners.
  watcher.on('add', onChange).on('change', onChange);
};