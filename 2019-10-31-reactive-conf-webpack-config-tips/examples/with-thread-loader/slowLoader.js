"use strict";

function slowLoader(input) {
    let i = 0;

    // Block the event loop
    for (i = 0; i < 2000000000; i++) {}

    return input;
}

module.exports = slowLoader;
