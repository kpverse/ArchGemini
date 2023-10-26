import { Router } from "express";
import { FolderTree } from "./routes/folder-tree";
import { RegisterPath } from "./routes/register-path";

export const API = {
    path: "/api/project-z",
    router: Router(),
};

API.router.use(FolderTree.path, FolderTree.router);

API.router.use(RegisterPath.path, RegisterPath.router);
