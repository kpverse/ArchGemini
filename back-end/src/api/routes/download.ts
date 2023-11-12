import { Router } from "express";
import { routesPrefix } from "../routes-prefix";
import { getPortValue } from "../../sender/port";
import { join } from "path";
import { SharedFolder } from "../../sender/shared-folder";
import { isFile } from "../../helpers/path-type/is-file";
import { requestFromSender } from "../../sender/request-from-sender";

export const DownloadFile = {
    path: "/download",
    router: Router(),
};

DownloadFile.router.get("/file", (req, res) => {
    (async () => {
        // Logic for checking if the request is coming from sender or not.
        let { remoteAddress } = req.socket;
        if (remoteAddress && requestFromSender(remoteAddress)) {
            res.send({
                status: "REQUEST_FROM_SENDER",
            });
            return;
        }

        let path = new URL(
            `http://localhost:${await getPortValue()}${join(
                routesPrefix,
                DownloadFile.path,
                req.url
            )}`
        ).searchParams.get("path");

        if (!path) {
            res.send({
                status: "PATH_NOT_PROVIDED",
            });
            return;
        }

        let finalPath = join(SharedFolder, path),
            pathStatus = isFile(finalPath);

        if (pathStatus === true) {
            try {
                res.download(finalPath);
            } catch (error) {
                res.send({
                    message: error.message,
                });
            }
            return;
        }

        if (pathStatus === false) {
            res.send({
                status: "ONLY_FILES_CAN_BE_DOWNLOADED",
            });
            return;
        }

        res.send({
            status: "PATH_DOES_NOT_EXIST",
        });
    })();
});
