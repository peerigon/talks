"use strict";

module.exports = {
    module: {
        rules: [{
            oneOf: [{
                test: /\.svg$/,
                resourceQuery: "?component",
                use: ["react-svg-loader"],
            },
            {
                test: /\.css$/,
                use: ["css-loader"],
            },
            {
                test: /\.svg$/,
                use: ["file-loader"],
            }]
        }],
    },
};
