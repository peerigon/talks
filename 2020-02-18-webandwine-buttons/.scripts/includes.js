const fs = require("fs");
const path = require("path");
const {reReplace} = require("./utils");

module.exports = html => {
    return reReplace(
        html,
        /<r:include src=["']+(.+?)["']+[ /]*>/gm,
        (match, src) => {
            const file = fs.readFileSync(path.join(process.cwd(), src), "utf-8");

            return file ? file : "";
        }
    );
};
