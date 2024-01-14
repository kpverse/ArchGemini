import { Router } from "express";

type Routes = {
    path: string;
    router: Router;
};

export default function mountRoutes(mountOn: Router, ...toBeMounted: Routes[]) {
    toBeMounted.forEach(({ path, router }) => {
        mountOn.use(path, router);
    });
}
