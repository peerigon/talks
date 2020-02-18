// Disabling ESM specific rules

module.exports = {
    server: true,
    directory: true, // currently ignored, needs also to be set in the package.json :(
    files: ["./examples", "./slides"],
    ignore: ["**/node_modules"],
};
