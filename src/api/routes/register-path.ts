import { Router } from "express";
import { getPortValue } from "../../host/port";
import { IPv4 } from "../../host/ip-address/main";
import { setSharedPath } from "../../host/shared-folder";

export const RegisterPath = {
    path: "/register-path",
    router: Router(),
};

RegisterPath.router.get("/", (req, res) => {
    (async () => {
        // Logic for checking if the request is coming from sender or not.
        let { remoteAddress } = req.socket;
        if (
            remoteAddress &&
            !["::1", "::ffff:127.0.0.1", `::ffff:${IPv4}`].includes(
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
            `http://localhost:${await getPortValue()}${RegisterPath.path}${
                req.url
            }`
        ).searchParams.get("path");

        if (path === null) {
            res.send({
                ERROR: `Can't share path.`,
            });
            return;
        }

        // Check if the path exists or not.
        setSharedPath(path);

        res.send({
            success: "Path shared.",
        });
    })();
});
