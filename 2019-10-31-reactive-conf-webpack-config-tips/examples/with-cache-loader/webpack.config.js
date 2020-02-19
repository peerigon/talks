"use strict";

// Run webpack two times to see the effect.
// The first run will be slow.
// The second run will re-use the result of slowLoader.js
// The cached result is written to `node_modules/.cache/cache-loader`
module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                use: [
                    "cache-loader",
                    require.resolve("./slowLoader.js"),
                ]
            },
        ],
    },
};
