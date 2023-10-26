import { Router } from "express";
import { FolderTree } from "./routes/folder-tree";
import { RegisterPath } from "./routes/register-path";
import { routesPrefix } from "./routes-prefix";

export const API = {
    path: routesPrefix,
    router: Router(),
};

API.router.use(FolderTree.path, FolderTree.router);

API.router.use(RegisterPath.path, RegisterPath.router);
