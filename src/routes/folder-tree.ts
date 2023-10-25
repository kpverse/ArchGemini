import { Router } from "express";
import { getSharedPath } from "../server/shared-folder";
import { PORT } from "../server/port";
import { join } from "path";

export let FolderTree = {
    path: "/folder-tree",
    router: Router(),
};

FolderTree.router.get("/", (req, res) => {
    let rootPath = getSharedPath(),
        path = new URL(
            `http://localhost:${PORT}${FolderTree.path}${req.url}`
        ).searchParams.get("path");

    if (rootPath === undefined) {
        res.send({
            ERROR: "There are no shared paths.",
        });
        return;
    } else res.send(join(rootPath, path ? path : ""));
});
