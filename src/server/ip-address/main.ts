import { platform } from "process";
import { MacOSIPv4 } from "./MacOSIPv4";
import { WindowsIPv4 } from "./WindowsIPv4";
import { LinuxIPv4 } from "./LinuxIPv4";

let IPv4: string | undefined;

type Options = { forceRefresh?: boolean };

export function getIPv4(Options?: Options) {
    if (!Options) Options = { forceRefresh: false };

    let { forceRefresh } = Options;

    if (IPv4 === undefined || forceRefresh === true) {
        if (platform === "darwin") IPv4 = MacOSIPv4();
        else if (platform === "win32") IPv4 = WindowsIPv4();
        else IPv4 = LinuxIPv4();
    }
    return IPv4;
}
