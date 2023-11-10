import { resolve } from "path";
import { isDir } from "../helpers/path-type/is-dir";
import chalk from "chalk";

export let SharedFolder: string = resolve("");

export function defaultShareFolder() {
    let SharedFolderStatus = isDir(SharedFolder);

    if (SharedFolderStatus === "PATH_DOES_NOT_EXIST") {
        console.log(`\n${chalk.redBright("ERROR:")} Path does not exist.`);
        process.exit(1);
    } else if (!SharedFolderStatus) {
        console.log(
            `\n${chalk.redBright("ERROR:")} Shared path is not folder.`
        );
        process.exit(1);
    } else
        console.log(
            `\nDefault shared folder is "${chalk.green(SharedFolder)}".`
        );
}

export function setSharedFolder(newPath: string) {
    SharedFolder = newPath;

    console.log(`\nNow sharing ${chalk.underline.green(SharedFolder)}.`);

    return SharedFolder;
}
