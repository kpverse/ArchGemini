import express from "express";
import FolderTree from "../routes/folder-tree";
import RegisterPath from "../routes/register-path";

const Server = express();

Server.get("/service-availability", (req, res) => {
    res.send({
        ServiceAvailable: true,
    });
});

Server.use(FolderTree.path, FolderTree.router);

Server.use(RegisterPath.path, RegisterPath.router);

export default Server;
