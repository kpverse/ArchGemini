import { Router } from "express";
import { sharedPath } from "../../host/shared-folder";
import { join } from "path";
import { PORT } from "../../server/port";

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

    let path = new URL(
        `http://localhost:${PORT}${FolderTree.path}${req.url}`
    ).searchParams.get("path");

    res.send(join(sharedPath, path ? path : ""));
});
