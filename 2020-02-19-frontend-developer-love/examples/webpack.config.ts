import path from "path";
import webpack from "webpack";

type WebpackEnv = {
    mode?: webpack.Configuration["mode"];
};

const createConfig = ({
    mode = "production",
}: WebpackEnv = {}) => {
    const isDev = mode === "development";
    const outputFilenamePattern = isDev ? "[name].js" : "[name].[contenthash].js";
    const publicPath = "/";
    const config: webpack.Configuration = {
        mode: "none",
        entry: require.resolve("./src/main.ts"),
        output: {
            filename: outputFilenamePattern,
            chunkFilename: outputFilenamePattern,
            publicPath,
        },
        resolve: {
            extensions: [".tsx", ".ts", ".wasm", ".mjs", ".js", ".json"],
        },
        // devtool: mode === "development" ?
        //     "eval-source-map" :
        //     "nosources-source-map",
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
    };

    process.env.BROWSERSLIST_ENV = process.env.BABEL_ENV = isDev ? "development" : "production";

    return config;
};

export default createConfig;
