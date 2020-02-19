"use strict";

const {resolve} = require("path");

module.exports = [
    {
        name: "web",
        target: "web",
        output: {
            path: resolve(__dirname, "dist", "web")
        },
    },
    {
        name: "node",
        target: "node",
        output: {
            path: resolve(__dirname, "dist", "node")
        },
    },
];
