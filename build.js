const { execSync } = require("child_process");

let commands = [
    "rm -rf ./build/",
    "npx swc ./src -d ./build --config-file config1.swcrc",
    "npx rollup -c --environment reason:bundling",
    "npx swc ./bin/index.esm.js -o ./bin/index.esm.js --config-file config2.swcrc -C module.type=es6",
    "npx swc ./bin/index.esm.js -o ./bin/index.cjs.js --config-file config2.swcrc",
    // "npx rollup -c --environment reason:license-comment",
];

function runCommand(index = 0) {
    let output = execSync(commands[index]);

    console.log(output.toString());

    if (index < commands.length - 1) runCommand(index + 1);
}

runCommand();
