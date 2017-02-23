// MIT © 2017 azu
"use strict";
const debug = require("debug")("uni-gitbook-server:book-serve");
const browserSync = require("browser-sync");
const fs = require("fs");
const chokidar = require("chokidar");
module.exports = function (bookRoot, watchPattern, onReload) {
    const bs = browserSync.create("GitBook Server");
    debug(`watchPattern: ${watchPattern}`);
    const watcher = chokidar.watch(watchPattern, {
        persistent: true
    });
    // Add event listeners.
    const onChange = (filePath, stats) => {
        debug(`Change Path: ${filePath}`);
        if (fs.existsSync(filePath)) {
            bs.reload(filePath);
            onReload(filePath);
        }
    };
    watcher.on('add', onChange).on('change', onChange);
    bs.init({
        server: bookRoot,
        open: false,
        scrollRestoreTechnique: "cookie",
        scrollElements: ['.body-inner'],
        reloadDebounce: 2000
    });
};
//# sourceMappingURL=book-serve.js.map