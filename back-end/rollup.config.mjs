export default {
    input: "./build/main.js",
    output: {
        file: "./bin/index.esm.js",
        format: "esm",
        banner: "#!/usr/bin/env node",
    },
    external: [
        "os",
        "process",
        "path",
        "fs",
        "readline",
        //
        "body-parser",
        "chalk",
        "cors",
        "detect-port",
        "express",
        "open",
        "table",
    ],
};
