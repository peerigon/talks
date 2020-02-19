const r2 = require("r2");
const hljs = require("highlight.js");

const getGistFiles = async url => {
    try {
        const response = await r2(url).json;

        return Object.values(response.files);
    } catch (error) {
        console.error(error);
    }

    return [];
};

const main = async gistId => {
    const url = `https://api.github.com/gists/${gistId}`;
    const files = await getGistFiles(url);

    return files.map(file => ({
        markup: hljs.highlightAuto(file.content).value,
        name: file.filename,
    }));
};

module.exports = main;

(async () => {
    if (require.main === module) {
        console.log(await main(process.argv[2]));
    }
})();
