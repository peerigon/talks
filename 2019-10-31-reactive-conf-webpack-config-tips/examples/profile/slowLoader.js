"use strict";

function slowLoader(input) {
    const callback = this.async();

    setTimeout(callback, 2000, null, input);
}

module.exports = slowLoader;
