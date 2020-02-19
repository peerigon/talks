import {resolve} from "path";
import webpack from "webpack";

const config: webpack.Configuration = {
    entry: resolve(process.cwd(), "src", "index.ts"),
    output: {
        path: resolve(process.cwd(), "dist"),
        filename: "main.js"
    }
};

export default config;
