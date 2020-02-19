"use strict";

module.exports = {
    module: {
        rules: [{
            oneOf: [{
                test: /\.svg$/,
                issuer: /\.jsx?$/,
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
