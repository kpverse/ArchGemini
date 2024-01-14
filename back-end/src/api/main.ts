import { Router } from "express";
import { routesPrefix } from "./routes-prefix";
import { DownloadFile } from "./routes/download";
import { GetArch } from "./routes/get-arch";
import { SharePath } from "./routes/share-path";
import mountRoutes from "../helpers/mount-routes";

export const API = {
    path: routesPrefix,
    router: Router(),
};

mountRoutes(API.router, GetArch, SharePath, DownloadFile);
