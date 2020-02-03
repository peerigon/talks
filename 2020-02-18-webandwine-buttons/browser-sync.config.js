// Disabling ESM specific rules
/* eslint-disable strict, import/unambiguous */
"use strict";

module.exports = {
    server: true,
    directory: true, // currently ignored, needs also to be set in the package.json :(
    files: ["./example", "./exercise", "./slide", "./solution"],
    ignore: ["**/node_modules"],
};
