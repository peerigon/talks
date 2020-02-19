const hljs = require("highlight.js");
const {reReplace, unindent} = require("./utils");

module.exports = html => {
    return reReplace(
        html,
        /<script type=["']+hljs["']>([\S\s]*?)<\/script>/gm,
        (match, code) => {
            const result = `
            <div class="code">
                <code class="hljs">${
    hljs.highlightAuto(unindent(code)).value
}</code>
            </div>
        `;

            return reReplace(
                result,
                /{{{([\S\s]*?)}}}/g,
                (match, line) =>
                    `<span class="code-highlighted-line">${line}</span>`
            );
        }
    );
};
