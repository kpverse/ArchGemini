export let SharedPath: string | undefined;

export function setSharedPath(newPath?: string) {
    SharedPath = newPath;
    return SharedPath;
}
