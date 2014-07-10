var path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "./main.js"),
    output: {
        path: path.resolve(__dirname, "./bundle"),
        filename: "bundle.js"
    }
};
