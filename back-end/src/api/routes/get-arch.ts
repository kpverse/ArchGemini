import { Router } from "express";
import { SharedFolder } from "../../sender/shared-folder";
import { basename, join } from "path";
import { getPortValue } from "../../sender/port";
import { routesPrefix } from "../routes-prefix";
import { getPathData } from "../../helpers/file-system/path-data";
import { isDir } from "../../helpers/path-type/is-dir";
import { platform } from "process";
import { requestFromSender } from "../../sender/request-from-sender";

export const GetArch = {
    path: "/get-arch",
    router: Router(),
};

GetArch.router.get("/", (req, res) => {
    (async () => {
        // Logic for checking if the request is coming from sender or not.
        let { remoteAddress } = req.socket;
        if (remoteAddress && requestFromSender(remoteAddress)) {
            res.send({
                status: "REQUEST_FROM_SENDER",
            });
            return;
        }

        let path =
                new URL(
                    `http://localhost:${await getPortValue()}${join(
                        routesPrefix,
                        GetArch.path,
                        req.url
                    )}`
                ).searchParams.get("path") || "/",
            finalPath = join(SharedFolder, path),
            pathStatus = isDir(finalPath),
            pathList = join(basename(SharedFolder), path).split(
                platform === "win32" ? `\\` : "/"
            );

        pathList = pathList.filter((folder) => folder !== "");

        if (pathStatus === true) {
            res.send(getPathData(finalPath, pathList));
            return;
        }

        res.send({
            status: "PATH_IS_NOT_FOLDER",
        });
    })();
});
