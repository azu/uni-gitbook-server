// MIT © 2017 azu
"use strict";
const path = require("path");
const debug = require("debug")("uni-gitbook-server:cli");
const optionator = require("optionator");
const options = require("./options");
const bookServe = require("../book-serve");
const watchSource = require("../watch-source");
const buildGitBook = require("../scrtipts/gitbook-build");
module.exports = function(argv) {
  const opts = options.parse(argv);
  if (opts.help) {
    return optionator.generateHelp();
  }

  // build
  const command = opts.buildCommand;
  const bookSource = opts.bookSource;
  const bookRoot = path.resolve(process.cwd(), opts.bookRoot);

  let isExecuting = false;
  let isFirstTime = true;
  const cwd = process.cwd();
  watchSource(bookSource, function onChange() {
    debug("Change book source");
    if (isExecuting) {
      return;
    }
    buildGitBook([command], cwd, () => {
      debug("Finish build GitBook");
      // first time
      if(isFirstTime) {
        bookServe(bookRoot, `${bookRoot}/**/*.html`, function onReload(event) {
          debug("reload", event);
        });
        isFirstTime = false;
      }
      isExecuting = false;
    });
    isExecuting = true;
  });
};