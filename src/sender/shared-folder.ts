export let sharedPath: string | undefined;

export function setSharedPath(newPath?: string) {
    sharedPath = newPath;
    return sharedPath;
}
