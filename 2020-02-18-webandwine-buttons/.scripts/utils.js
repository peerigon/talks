module.exports.reReplace = (str, re, cb) => {
    const allMatches = [...str.matchAll(re)];

    allMatches.forEach(([match, ...groups]) => {
        str = str.replace(match, cb(match, ...groups));
    });

    return str;
};

module.exports.detab = str => {
    const lines = str
        .split("\n")
        .filter(line => line.replace(/\s/g, "").length > 0);

    const minIndent = Math.min(
        ...lines.map(line => line.length - line.trimLeft().length)
    );

    return lines.map(line => line.substr(minIndent)).join("\n");
};
