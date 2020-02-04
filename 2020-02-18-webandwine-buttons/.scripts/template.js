const readline = require("readline");
const gist = require("./gist");
const hljs = require("highlight.js");
const code = require("./codeHighlight");

let fileContent = "";

const makeGist = async html => {
    const re = /{{gist:(\w+)}}/g;
    const matches = re.exec(html);

    if (!matches) {
        return html;
    }
    const id = matches[1];
    const search = matches[0];
    const gistFiles = await gist(id);

    return html.replace(
        search,
        gistFiles
            .map(
                gf => `
                <div class="code">
                    <span class="code-filename">${gf.name}</span>
                    <code class="hljs">${gf.markup}</code>
                </div>
                `
            )
            .join("\n\n")
    );
};

const detab = str => {
    const lines = str.split("\n").filter(line => line.length > 0);
    const minIndent = Math.min(
        ...lines.map(line => line.length - line.trimLeft().length)
    );
    return lines.map(line => line.substr(minIndent)).join("\n");
};

const searchAndReplaceCb = (str, re, cb) => {
    const allMatches = [...str.matchAll(re)];

    allMatches.forEach(([match, ...groups]) => {
        str = str.replace(match, cb(match, ...groups));
    });

    return str;
};

const makeCode = html => {
    return searchAndReplaceCb(
        html,
        /<code([\s\S]*?)>([\s\S]*?)<\/code>/gm,
        (match, params, code) => {
            const result = `
            <div class="code">
                <code class="hljs"${params}>${
                hljs.highlightAuto(detab(code)).value
            }</code>
            </div>
        `;

            return searchAndReplaceCb(
                result,
                /{{{([\s\S]*?)}}}/g,
                (match, line) =>
                    `<span class="code-highlighted-line">${line}</span>`
            );
        }
    );
};

const main = async () => {
    const html = makeCode(fileContent);
    console.log(await makeGist(html));
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on("line", line => {
    fileContent += line + "\n";
});

rl.on("close", main);
