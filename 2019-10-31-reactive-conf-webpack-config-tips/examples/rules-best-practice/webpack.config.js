"use strict";

const {resolve} = require("path");

module.exports = {
    module: {
        rules: [{
            // oneOf: [{
                include: [
                    resolve(__dirname, "src"),
                ],
                test: [
                    /\.js$/,
                    /\.jpg$/,
                    /\.gif$/,
                    /\.png$/,
                ],
                use: [{
                    loader: "inspect-loader",
                    options: {
                        callback() {
                            console.log("A");
                        },
                    },
                }, {
                    loader: "inspect-loader",
                    options: {
                        callback() {
                            console.log("B");
                        },
                    },
                }],
            }, {
                include: [
                    resolve(__dirname, "src"),
                ],
                test: [
                    /\.js$/,
                    /\.jpg$/,
                    /\.gif$/,
                    /\.png$/,
                ],
                use: {
                    loader: "inspect-loader",
                    options: {
                        callback() {
                            console.log("C");
                        },
                    },
                },
            // }],
        }],
    },
};
