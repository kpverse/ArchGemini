import express from "express";
import { FolderTree } from "../routes/folder-tree";
import { RegisterPath } from "../routes/register-path";
import { PORT } from "./port";
import { getIPv4 } from "./ip-address/main";

const ExpressApp = express();

ExpressApp.get("/service-availability", (req, res) => {
    res.send({
        ServiceAvailable: true,
    });
});

ExpressApp.use(FolderTree.path, FolderTree.router);

ExpressApp.use(RegisterPath.path, RegisterPath.router);

export const Server = ExpressApp.listen(PORT, () => {
    console.log(`
Server is running at http://${getIPv4()}:${PORT}

Press control/command + c to close the server.
`);
});
