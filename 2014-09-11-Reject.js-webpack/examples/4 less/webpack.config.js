var path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "./main.js"),
    output: {
        path: path.resolve(__dirname, "./bundle"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.html$/i, loader: "html" },
            { test: /\.less/i, loader: "style!css!less" },
            { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: "file" }
        ]
    }
};
