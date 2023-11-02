import { resolve } from "path";

export let SharedPath: string = resolve("");

export function setSharedPath(newPath: string) {
    SharedPath = newPath;
    return SharedPath;
}
