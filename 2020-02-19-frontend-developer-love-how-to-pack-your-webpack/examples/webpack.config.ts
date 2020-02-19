import path from "path";
import webpack from "webpack";
import TreatPlugin from "treat/webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

type WebpackEnv = {
    mode?: webpack.Configuration["mode"];
};

const createConfig = ({mode = "production"}: WebpackEnv = {}) => {
    const isDev = mode === "development";
    const outputFilenamePattern = isDev ?
        "[name].js" :
        "[name].[contenthash].js";
    const publicPath = "/";

    const config: webpack.Configuration = {
        mode,
        bail: isDev === false,
        entry: require.resolve("./src/start.ts"),
        output: {
            filename: outputFilenamePattern,
            chunkFilename: outputFilenamePattern,
            publicPath,
        },
        resolve: {
            extensions: [".tsx", ".ts", ".wasm", ".mjs", ".js", ".json"],
            alias: {
                "react-dom": "@hot-loader/react-dom",
            },
        },
        devtool:
            mode === "development" ? "eval-source-map" : "nosources-source-map",
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            include: [path.resolve(__dirname, "src")],
                            test: [/\.ts$/, /\.tsx$/],
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    "@babel/typescript",
                                    "@babel/react",
                                    [
                                        "@babel/env",
                                        {
                                            modules: false,
                                            useBuiltIns: "usage",
                                            corejs: 3,
                                        },
                                    ],
                                ],
                                plugins: ["babel-plugin-treat"],
                                cacheDirectory: true,
                            },
                        },
                        {
                            test: [/\.png$/, /\.jpe?g$/, /\.gif$/, /\.svg$/],
                            use: ["file-loader"],
                        },
                    ],
                },
            ],
        },
        plugins: [
            new TreatPlugin({
                outputLoaders: [isDev ? "style-loader" : MiniCssExtractPlugin.loader],
            }),
            new MiniCssExtractPlugin({
                filename: "[name].[chunkhash].css",
                chunkFilename: "[name].[chunkhash].css",
            }),
            new HtmlWebpackPlugin({
                template: require.resolve("./src/index.html"),
            }),
        ],
    };

    process.env.BROWSERSLIST_ENV = process.env.BABEL_ENV = isDev ?
        "development" :
        "production";

    return config;
};

export default createConfig;
