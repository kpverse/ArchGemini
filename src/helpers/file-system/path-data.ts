import { PathLike, readdirSync } from "fs";
import { folderInfoType, getFolderInfo } from "./folder-info";
import { join } from "path";
import { fileInfoType, getFileInfo } from "./file-info";

export function getPathData(path: PathLike, pathList?: string[]) {
    try {
        let pathObj: {
                fld?: folderInfoType[];
                fls?: fileInfoType[];
                pls: string[];
            } = {
                pls: pathList ? pathList : [],
            },
            content = readdirSync(path);

        content.forEach((name) => {
            let wholePath = join(path as string, name),
                fileInfo = getFileInfo(wholePath);

            if (fileInfo.skip === true) {
                let folderInfo = getFolderInfo(wholePath);
                if (!folderInfo.skip) {
                    if (!pathObj.fld) pathObj.fld = [];
                    pathObj.fld.push(folderInfo);
                }
            } else {
                if (!pathObj.fls) pathObj.fls = [];
                pathObj.fls.push(fileInfo);
            }
        });

        return pathObj;
    } catch {
        return { ERROR: "Some error has occured." };
    }
}
