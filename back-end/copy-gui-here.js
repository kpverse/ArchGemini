const { cpSync, readdirSync, rmSync } = require("fs");
const { resolve, join } = require("path");

function clearFolderContent(path, leave = []) {
    let files = readdirSync(path);

    files.forEach((file) => {
        if (!leave.includes(file))
            rmSync(join(path, file), {
                force: true,
                recursive: true,
            });
    });
}

function copyFolderContent(from, to) {
    clearFolderContent(to);
    cpSync(from, to, { recursive: true });
}

copyFolderContent(resolve("../front-end/out"), resolve("./gui/"));
