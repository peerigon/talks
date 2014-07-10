var path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "./a.js"),
    output: {
        path: __dirname,
        filename: "bundle.js"
    }
};
