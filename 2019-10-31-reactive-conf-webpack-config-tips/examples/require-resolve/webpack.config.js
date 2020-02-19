"use strict";

module.exports = {
    resolve: {
        alias: {
            // Each require.resolve() will throw an error if the module cannot be found
            [require.resolve("./src/index.js")]: require.resolve("./src/replaced.js"),
        },
    },
    module: {
        rules: [
            {
                include: [require.resolve("./src/replaced.js")],
                use: "raw-loader",
            },
        ],
    },
};
