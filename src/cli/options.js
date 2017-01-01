// MIT © 2017 azu
"use strict";

const optionator = require("optionator");
module.exports = optionator({
  prepend: "uni-gitbook-server --bookSource [file|dir|glob*]",
  concatRepeatedArrays: true,
  mergeRepeatedObjects: true,
  options: [
    {heading: "Options"},
    {
      option: "help",
      alias: "h",
      type: "Boolean",
      description: "Show help."
    },
    {
      option: "bookSource",
      type: "path::String",
      description: "book source pattern.",
      required: true
    },
    {
      option: "bookRoot",
      type: "path::String",
      description: "Path to `_book`",
      default: "_book"
    },
    {
      option: "buildCommand",
      type: "String",
      description: "build command for GitBook",
      default: "build"
    }
  ]
});