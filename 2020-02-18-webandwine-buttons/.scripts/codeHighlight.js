const hljs = require("highlight.js");
const { reReplace, detab } = require("./utils");

module.exports = html => {
    return reReplace(
        html,
        /<script type=['"]+hljs['"]>([\s\S]*?)<\/script>/gm,
        (match, code) => {
            const result = `
            <div class="code">
                <code class="hljs">${
                    hljs.highlightAuto(detab(code)).value
                }</code>
            </div>
        `;

            return reReplace(
                result,
                /{{{([\s\S]*?)}}}/g,
                (match, line) =>
                    `<span class="code-highlighted-line">${line}</span>`
            );
        }
    );
};
