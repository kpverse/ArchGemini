import { networkInterfaces } from "os";

export function getNetworkInterfaces() {
    let interfaces = networkInterfaces();

    if (!interfaces) {
        console.error("ERROR: No network interfaces found.");
        process.exit(1);
    }

    return interfaces;
}
