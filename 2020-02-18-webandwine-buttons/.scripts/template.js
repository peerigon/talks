const transformIncludes = require("./includes");
const transformCode = require("./codeHighlight");
const { detab } = require("./utils");
const readline = require("readline");
const gist = require("./gist");
const code = require("./codeHighlight");

let html = "";

const transformGists = async html => {
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

const main = async () => {
    let piped = html;
    piped = transformIncludes(piped);
    piped = transformCode(piped);
    piped = await transformGists(piped);
    console.log(piped);
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on("line", line => {
    html += line + "\n";
});

rl.on("close", main);
