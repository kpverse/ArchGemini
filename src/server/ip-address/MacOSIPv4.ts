import { networkInterfaces } from "os";

export function MacOSIPv4() {
    let interfaces = networkInterfaces() as {
            en0?: { address: string; family: string }[];
        },
        { en0 } = interfaces;

    if (!en0) {
        console.error("ERROR: Device is not connected to internet.");
        process.exit(1);
    }

    let { address } = en0.filter(({ family }) => family === "IPv4")[0];

    return address;
}
