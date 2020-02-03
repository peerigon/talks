const readline = require("readline");
const gist = require("./gist");

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
                <div class="gist">
                    <span class="gist-filename">${gf.name}</span>
                    <code class="hljs">${gf.markup}</code>
                </div>
                `
            )
            .join("\n\n")
    );
};

const main = async () => {
    console.log(await makeGist(fileContent));
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

rl.on("line", line => {
    fileContent += line + "\n";
});

rl.on("close", main);
