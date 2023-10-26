import { networkInterfaces } from "os";
import { platform } from "process";

export function WindowsIPv4() {
    console.log(`Platform is "${platform}".`);

    console.log(JSON.stringify(networkInterfaces()));

    return "127.0.0.1";
}
