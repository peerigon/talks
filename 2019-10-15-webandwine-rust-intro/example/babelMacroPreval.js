import preval from "preval.macro";

const one = preval`module.exports = 1 + 2 - 1 - 1`;
// becomes...
const one = 1;
// also the import is removed
