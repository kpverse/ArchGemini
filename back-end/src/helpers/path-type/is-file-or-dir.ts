import { PathLike, statSync } from "fs";
import { checkIfPathExists } from "./check-if-path-exists";

export function isFileOrDir(
    path: PathLike
): "PATH_DOES_NOT_EXIST" | "DIR" | "FILE" {
    if (checkIfPathExists(path) === "NO") return "PATH_DOES_NOT_EXIST";

    let stat = statSync(path);

    try {
        if (stat.isDirectory()) return "DIR";
        else if (stat.isFile()) return "FILE";
    } catch (error) {
        console.log(`\n${error}`);
    }
    return "PATH_DOES_NOT_EXIST";
}
