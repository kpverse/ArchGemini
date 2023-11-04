import { getAvailableIP } from "./get-available-ip";

let IPv4: string | undefined = undefined;

type Options = { forceRefresh?: boolean };

export async function getIPv4(Options?: Options) {
    if (!Options) Options = { forceRefresh: false };

    let { forceRefresh } = Options;

    if (IPv4 === undefined || forceRefresh === true)
        IPv4 = await getAvailableIP();

    return IPv4;
}
