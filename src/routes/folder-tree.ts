import { Router } from "express";
import port from "../server/port";
import { getSharedPath } from "../variables/sharedFolder";
import { join } from "path";

let FolderTree = {
    path: "/folder-tree",
    router: Router(),
};

FolderTree.router.get("/", (req, res) => {
    let rootPath = getSharedPath(),
        path = new URL(
            `http://localhost:${port}${FolderTree.path}${req.url}`
        ).searchParams.get("path");

    if (rootPath === undefined) {
        res.send({
            ERROR: "There are no shared paths.",
        });
        return;
    } else res.send(join(rootPath, path ? path : ""));
});

export default FolderTree;
