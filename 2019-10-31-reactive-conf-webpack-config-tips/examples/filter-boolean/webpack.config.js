"use strict";

const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

module.exports = ({mode = "development", analyze = false} = {}) => {
    const isDev = mode === "development";

    return {
        mode,
        module: {
            rules: [
                isDev && {
                    include: /\.css$/,
                    loader: "style-loader",
                },
            ].filter(Boolean),
        },
        plugins: [
            analyze && new BundleAnalyzerPlugin(),
        ].filter(Boolean),
    };
};
