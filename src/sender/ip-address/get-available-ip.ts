import {
    getIPv4FromNetworkInterface,
    interfaceObject,
} from "../../helpers/ip-from-interface";
import { getNetworkInterfaces } from "../../helpers/network-interfaces";
import { selectAvailableIP, usefulInterfaceList } from "./select-available-ip";

export async function getAvailableIP() {
    let interfaces = getNetworkInterfaces() as {
        [_: string]: interfaceObject;
    };

    let unfilteredUsefulInterfaceList = Object.entries(interfaces).map(
        ([name, interfaceObject]) => {
            return {
                name,
                ip: getIPv4FromNetworkInterface(interfaceObject),
            };
        }
    );

    let usefulInterfaceList: usefulInterfaceList = [];

    unfilteredUsefulInterfaceList.forEach(({ name, ip }) => {
        if (ip)
            usefulInterfaceList.push({
                name,
                ip,
            });
    });

    if (usefulInterfaceList.length === 0) {
        console.log("ERROR: No network interfaces found.");
        process.exit(1);
    }

    if (usefulInterfaceList.length === 1) return usefulInterfaceList[0].ip;

    return await selectAvailableIP(usefulInterfaceList);
}
