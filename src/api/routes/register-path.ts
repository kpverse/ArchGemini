import { Router } from "express";
import { getPortValue } from "../../sender/port";
import { getIPv4 } from "../../sender/ip-address/main";
import { setSharedPath } from "../../sender/shared-folder";
import { isDir } from "../../helpers/path-type/is-dir";

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
            !["::1", "::ffff:127.0.0.1", `::ffff:${await getIPv4()}`].includes(
                remoteAddress
            )
        ) {
            res.send({
                status: "BETTER_LUCK_NEXT_TIME",
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
                status: "PATH_IS_NOT_GIVEN",
            });
            return;
        }

        // Check if the path exists or not.
        let pathStatus = isDir(path);
        if (pathStatus === true) {
            setSharedPath(path);

            res.send({
                status: "PATH_SHARED",
            });
            return;
        }

        if (pathStatus === "PATH_DO_NOT_EXIST") {
            res.send({
                status: pathStatus,
            });
            return;
        }

        res.send({
            status: "NOT_A_DIRECTORY",
        });
    })();
});
