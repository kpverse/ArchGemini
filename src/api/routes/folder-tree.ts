import { Router } from "express";
import { sharedPath } from "../../host/shared-folder";
import { join } from "path";
import { PORT } from "../../server/port";
import { routesPrefix } from "../routes-prefix";
import { IPv4 } from "../../host/ip-address/main";

export const FolderTree = {
    path: "/folder-tree",
    router: Router(),
};

FolderTree.router.get("/", (req, res) => {
    if (sharedPath === undefined) {
        res.send({
            ERROR: "There are no shared paths.",
        });
        return;
    }

    let path =
        new URL(
            `http://${IPv4}:${PORT}${join(
                routesPrefix,
                FolderTree.path,
                req.url
            )}`
        ).searchParams.get("path") || "/";

    res.send(
        // Temporarily sending full path as return value.
        join(sharedPath, path)
    );
});
