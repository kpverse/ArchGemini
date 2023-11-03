import { resolve } from "path";

export let SharedFolder: string = resolve("");

export function setSharedFolder(newPath: string) {
    SharedFolder = newPath;
    return SharedFolder;
}
