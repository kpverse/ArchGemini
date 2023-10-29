import { platform } from "process";
import { MacOSIPv4 } from "./os/macos";
import { WindowsIPv4 } from "./os/windows";
import { LinuxIPv4 } from "./os/linux";

let IPv4: string | undefined = undefined;

type Options = { forceRefresh?: boolean };

export async function getIPv4(Options?: Options) {
    if (!Options) Options = { forceRefresh: false };

    let { forceRefresh } = Options;

    if (IPv4 === undefined || forceRefresh === true) {
        if (platform === "darwin") IPv4 = MacOSIPv4();
        else if (platform === "win32") IPv4 = await WindowsIPv4();
        else IPv4 = LinuxIPv4();
    }

    return IPv4;
}
