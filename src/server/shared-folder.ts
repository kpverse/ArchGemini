let sharedPath: string | undefined;

export function getSharedPath() {
    return sharedPath;
}

export function setSharedPath(newPath?: string) {
    sharedPath = newPath;
    return sharedPath;
}
