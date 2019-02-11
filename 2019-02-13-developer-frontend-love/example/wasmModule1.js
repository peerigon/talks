const req = fetch("./myModule.wasm");
const imports = {
    aModule: {
        anImport: 42,
    },
};

WebAssembly.instantiateStreaming(req, imports).then(obj =>
    obj.instance.exports.foo()
);
