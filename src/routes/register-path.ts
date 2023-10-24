import { Router } from "express";
import port from "../server/port";
import { setSharedPath } from "../variables/sharedFolder";

let RegisterPath = {
    path: "/register-path",
    router: Router(),
};

RegisterPath.router.get("/", (req, res) => {
    let path = new URL(
        `http://localhost:${port}${RegisterPath.path}${req.url}`
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

export default RegisterPath;
