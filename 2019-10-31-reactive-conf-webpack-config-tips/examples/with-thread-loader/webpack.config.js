"use strict";

module.exports = {
    mode: "development",
    entry: [
        require.resolve(__dirname + "/src/a.js"),
        require.resolve(__dirname + "/src/b.js"),
        require.resolve(__dirname + "/src/c.js"),
    ],
    module: {
        rules: [
            {
                use: [
                    // Remove the thread-loader and compare the build times
                    "thread-loader",
                    // The slow loader blocks the event loop.
                    // This is pretty similar to what Babel or PostCSS might cause
                    // when they are traversing the AST.
                    require.resolve("./slowLoader.js"),
                ]
            },
        ],
    },
};
