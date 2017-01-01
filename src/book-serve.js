// MIT © 2017 azu
"use strict";
const browserSync = require("browser-sync");
const fs = require("fs");
module.exports = function(_bookRoot, watchPattern, onReload) {
  const bs = browserSync.create("GitBook Server");
  bs.watch(watchPattern).on("change", function(path) {
    setTimeout(() => {
      if (fs.existsSync(path)) {
        bs.reload(path);
        onReload(path);
      }
    }, 2000);
  });
  bs.init({
    server: _bookRoot,
    open: false,
    scrollElementMapping: ['.body-inner'],
    reloadDelay: 2000,
    reloadDebounce: 2000
  });
};
//# sourceMappingURL=book-serve.js.map