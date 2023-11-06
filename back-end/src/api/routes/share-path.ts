import { Router } from "express";
import { getIPv4 } from "../../sender/ip-address/main";
import { setSharedFolder } from "../../sender/shared-folder";
import { isDir } from "../../helpers/path-type/is-dir";
import { join } from "path";
import bodyParser from "body-parser";

export const SharePath = {
    path: "/share-path",
    router: Router(),
};

SharePath.router.use(bodyParser.urlencoded({ extended: false }));

SharePath.router.use(bodyParser.json());

SharePath.router.post("/", (req, res) => {
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
                status: "YOU_DONT_HAVE_PERMISSION_TO_CHANGE",
            });
            return;
        }

        // If the request is coming from receiver, then and then the following code will run.
        let path = req.body["path"];

        if (path === undefined) {
            res.send({
                status: "PATH_IS_NOT_GIVEN",
            });
            return;
        }

        // Check if the path exists or not.
        let pathStatus = isDir(path);
        if (pathStatus === true) {
            setSharedFolder(join(path, "/"));

            res.send({
                status: "PATH_SHARED",
            });
            return;
        }

        if (pathStatus === "PATH_DOES_NOT_EXIST") {
            res.send({
                status: pathStatus,
            });
            return;
        }

        res.send({
            status: "NOT_A_FOLDER",
        });
    })();
});
