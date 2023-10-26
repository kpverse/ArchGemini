import express from "express";
import { PORT } from "./port";
import { IPv4 } from "../host/ip-address/main";
import { API } from "../api/main";

const ExpressApp = express();

ExpressApp.get("/service-availability", (req, res) => {
    res.send({
        ServiceAvailable: true,
    });
});

ExpressApp.use(API.path, API.router);

export const Server = ExpressApp.listen(PORT, () => {
    console.log(`
Server is running at http://${IPv4}:${PORT}

Press control/command + c to close the server.
`);
});
