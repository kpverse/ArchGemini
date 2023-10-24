export default [
    process.env.reason === "bundling" && {
        input: "./build/main.js",
        output: {
            file: "./bin/index.esm.js",
            format: "esm",
        },
        external: ["express"],
    },

    //     ...["esm", "cjs"].map((type) => {
    //         return (
    //             process.env.reason === "license-comment" && {
    //                 input: `./bin/index.${type}.js`,
    //                 output: {
    //                     file: `./bin/index.${type}.js`,
    //                     format: type,

    //                     banner: `#!/usr/bin/env node

    // /**
    //  * Copyright © Kartavya Patel, KPVERSE - All Rights Reserved.
    //  */`,
    //                 },
    //             }
    //         );
    //     }),
].filter(Boolean);
