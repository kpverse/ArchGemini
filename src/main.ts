import express from "express";
import { getPortValue } from "./host/port";
import { IPv4 } from "./host/ip-address/main";
import { API } from "./api/main";
import { platform } from "process";

const ExpressApp = express();

// An API to check if service is available or not.
ExpressApp.get("/service-availability", (req, res) => {
    res.send({
        ServiceAvailable: true,
    });
});

ExpressApp.use(API.path, API.router);

(async () => {
    let port = await getPortValue();

    ExpressApp.listen(port, () => {
        console.log(`
Server is running at http://${IPv4}:${port}

Press ${platform === "darwin" ? "command" : "control"} + c to close this app.`);
    });
})();
