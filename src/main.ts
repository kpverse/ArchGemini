import express from "express";
import { getPortValue } from "./sender/port";
import { getIPv4 } from "./sender/ip-address/main";
import { API } from "./api/main";
import { platform } from "process";
import cors from "cors";
import { join } from "path";
import openLink from "open";

const ExpressApp = express();

ExpressApp.use(cors());

ExpressApp.use(API.path, API.router);

ExpressApp.use(
    "/archgemini/sender",
    express.static(join(__dirname, "../gui/sender"))
);

async function main() {
    let port = await getPortValue(),
        ip = await getIPv4();

    ExpressApp.listen(port, () => {
        let url = `http://${ip}:${port}/archgemini/sender`;

        console.log(`
Server is running at ${url}

Press ${platform === "darwin" ? "command" : "control"} + c to close this app.`);

        openLink(url);
    });
}

main();
