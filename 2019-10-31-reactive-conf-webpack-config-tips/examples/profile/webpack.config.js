"use strict";

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

class SlowPlugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync("SlowPlugin", (compilation, callback) => {
            setTimeout(callback, 3000);
        });
    }
}

module.exports = smp.wrap({
    mode: "development",
    entry: require.resolve(__dirname + "/src/a.js"),
    resolve: {
        plugins: [
            {
                apply(resolver) {
                    resolver.hooks.resolve.tapAsync("SlowPlugin", (request, resolveContext, callback) => {
                        setTimeout(() => {
                            resolver.doResolve(resolver.getHook("file"), request, null, resolveContext, callback);
                        }, 1000);
                    });
                }
            }
        ]
    },
    module: {
        rules: [
            {
                include: require.resolve(__dirname + "/src/b.js"),
                use: require.resolve("./slowLoader.js"),
            },
        ],
    },
    plugins: [
        new SlowPlugin(),
    ],
    stats: {
        // Doesn't seem to work currently :(
        // modulesSort: "profile",
        // chunksSort: "profile",
        // modulesSort: "profile",
        maxModules: Infinity, // show all modules
    }
});
