import express from "express";
import { getPortValue } from "./sender/port";
import { getIPv4 } from "./sender/ip-address/main";
import { API } from "./api/main";
import { platform } from "process";

const ExpressApp = express();

ExpressApp.use(API.path, API.router);

(async () => {
    let port = await getPortValue();
    let ip = await getIPv4();

    ExpressApp.listen(port, () => {
        console.log(`
Server is running at http://${ip}:${port}

Press ${platform === "darwin" ? "command" : "control"} + c to close this app.`);
    });
})();
