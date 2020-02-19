"use strict";

const {resolve} = require("path");
const I18nPlugin = require("i18n-webpack-plugin");

const loadLanguagesFromProvider = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        en: null, // use actual string from __()
        de: {
            "Hello world": "Hallo Welt",
        },
    };
};

const loadEntriesFromDb = async (language) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        main: "./src/index.js",
        [language === "de" ? "über-uns" : "about-us"]:
            `./src/${language === "de" ? "über-uns" : "about-us"}.js`
    };
};

module.exports = async () => {
    const languages = await loadLanguagesFromProvider();

    return Object
        .entries(languages)
        .map(([language, translations]) => ({
            name: language,
            entry: async () => loadEntriesFromDb(language),
            output: {
                path: resolve(__dirname, "dist", language)
            },
            plugins: [new I18nPlugin(translations)]
        }));
};
