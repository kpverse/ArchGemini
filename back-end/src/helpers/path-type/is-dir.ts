import { PathLike } from "fs";
import { checkIfPathExists } from "./check-if-path-exists";
import { isFileOrDir } from "./is-file-or-dir";

export function isDir(path: PathLike): boolean | "PATH_DOES_NOT_EXIST" {
    if (checkIfPathExists(path) === "NO") return "PATH_DOES_NOT_EXIST";
    return isFileOrDir(path) === "DIR";
}
