import { networkInterfaces } from "os";

export function UnixLikeOsCommonCode(OS: "macOS" | "Linux") {
    let interfaces = networkInterfaces()[OS === "macOS" ? "en0" : "wlo1"] as
        | { address: string; family: string; internal: boolean }[]
        | undefined;

    if (!interfaces) {
        console.error("ERROR: Device is not connected to internet.");
        process.exit(1);
    }

    let { address } = interfaces.filter(
        ({ family, internal }) => !internal && family === "IPv4"
    )[0];

    return address || "127.0.0.1";
}
