import { Router } from "express";
import { PORT } from "../server/port";
import { setSharedPath } from "../server/shared-folder";
import { getIPv4 } from "../server/ip-address/main";

export let RegisterPath = {
    path: "/register-path",
    router: Router(),
};

RegisterPath.router.get("/", (req, res) => {
    // Logic for checking if the request is coming from sender or not.
    let { remoteAddress } = req.socket;
    if (
        remoteAddress &&
        !["::1", "::ffff:127.0.0.1", `::ffff:${getIPv4()}`].includes(
            remoteAddress
        )
    ) {
        res.send({
            ERROR: "You don't have access to change.",
        });
        return;
    }

    // If the request is coming from receiver, then and then the following code will run.
    let path = new URL(
        `http://localhost:${PORT}${RegisterPath.path}${req.url}`
    ).searchParams.get("path");

    if (path === null) {
        res.send({
            ERROR: `Can't share path.`,
        });
        return;
    }

    setSharedPath(path);

    res.send({
        success: "Path shared.",
    });
});
