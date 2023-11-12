import { LocalIPv4ListObject } from "./ip-address/local-ipv4-list";

export function requestFromSender(checkAgainstIPv6: string) {
    if (!LocalIPv4ListObject.isProcessed) {
        LocalIPv4ListObject.value = [
            "::1",
            "::ffff:127.0.0.1",
            LocalIPv4ListObject.value.map((ip) => `::ffff:${ip}`),
        ].flat();

        LocalIPv4ListObject.isProcessed = true;
    }

    return LocalIPv4ListObject.value.includes(checkAgainstIPv6);
}
