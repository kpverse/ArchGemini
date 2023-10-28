import { Router } from "express";
import { sharedPath } from "../../host/shared-folder";
import { join } from "path";
import { getPortValue } from "../../host/port";
import { routesPrefix } from "../routes-prefix";
import { IPv4 } from "../../host/ip-address/main";
import { getPathData } from "../../helpers/file-system/path-data";
import { isDir } from "../../helpers/path-type/is-dir";

export const FolderTree = {
    path: "/folder-tree",
    router: Router(),
};

FolderTree.router.get("/", (req, res) => {
    (async () => {
        if (sharedPath === undefined) {
            res.send({
                status: "THERE_ARE_NO_SHARED_PATHS",
            });
            return;
        }

        let path =
            new URL(
                `http://${IPv4}:${await getPortValue()}${join(
                    routesPrefix,
                    FolderTree.path,
                    req.url
                )}`
            ).searchParams.get("path") || "/";

        let finalPath = join(sharedPath, path),
            pathStatus = isDir(finalPath);

        if (pathStatus === true) {
            res.send(getPathData(finalPath));
            return;
        }

        res.send({
            status: "NOTHING_TO_SHOW",
        });
    })();
});
