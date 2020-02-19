module.exports.reReplace = (str, re, cb) => {
    const allMatches = [...str.matchAll(re)];

    allMatches.forEach(([match, ...groups]) => {
        str = str.replace(match, cb(match, ...groups));
    });

    return str;
};

const removeEmptyLinesFromStart = (nextLines, line) => {
    return line.length === 0 && nextLines.length === 0 ?
        nextLines :
        [...nextLines, line];
};

module.exports.unindent = str => {
    const lines = str
        // split into lines
        .split("\n")
        // trim empty lines
        .map(line => (line.replace(/\s/g, "").length > 0 ? line : ""))
        // remove empty lines from start and end
        .reduce(removeEmptyLinesFromStart, [])
        .reduceRight(removeEmptyLinesFromStart, [])
        .reverse();

    // find the lowest amount of whitespace on the left of every line
    const minIndent = Math.min(
        ...lines
            .map(line => line.length - line.trimLeft().length)
            .filter(Boolean)
    );

    // remove minIndent from the left
    const unindented = lines.map(line => line.substr(minIndent)).join("\n");

    return unindented;
};
