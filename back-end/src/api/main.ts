import { Router } from "express";
import { routesPrefix } from "./routes-prefix";
import { DownloadFile } from "./routes/download";
import { GetArch } from "./routes/get-arch";
import { SharePath } from "./routes/share-path";

export const API = {
    path: routesPrefix,
    router: Router(),
};

API.router.use(GetArch.path, GetArch.router);

API.router.use(SharePath.path, SharePath.router);

API.router.use(DownloadFile.path, DownloadFile.router);
