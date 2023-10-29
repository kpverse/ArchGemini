import { getIPv4FromNetworkInterface } from "../../../helpers/ip-from-interface";
import { getNetworkInterfaces } from "../../../helpers/network-interfaces";

export function UnixLikeOsCommonCode(OS: "macOS" | "Linux") {
    let _interface = getNetworkInterfaces()[OS === "macOS" ? "en0" : "wlo1"] as
        | { address: string; family: string; internal: boolean }[]
        | undefined;

    if (!_interface) {
        console.log("ERROR: You are not connected to the internet.");
        process.exit(1);
    }

    return getIPv4FromNetworkInterface(_interface);
}
