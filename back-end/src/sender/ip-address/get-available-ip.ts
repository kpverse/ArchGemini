import chalk from "chalk";
import {
    getIPv4FromNetworkInterface,
    interfaceObject,
} from "../../helpers/ip-from-interface";
import { getNetworkInterfaces } from "../../helpers/network-interfaces";
import { selectAvailableIP, usefulInterfaceList } from "./select-available-ip";
import { table } from "table";

export async function getAvailableIP() {
    let interfaces = getNetworkInterfaces() as {
            [_: string]: interfaceObject;
        },
        unfilteredUsefulInterfaceList = Object.entries(interfaces).map(
            ([name, interfaceObject]) => {
                return {
                    name,
                    ip: getIPv4FromNetworkInterface(interfaceObject),
                };
            }
        ),
        usefulInterfaceList: usefulInterfaceList = [];

    unfilteredUsefulInterfaceList.forEach(({ name, ip }) => {
        if (ip !== undefined)
            usefulInterfaceList.push({
                name,
                ip,
            });
    });

    if (usefulInterfaceList.length === 0) {
        console.log(
            `\n${chalk.redBright(
                "ERROR:"
            )} No network interfaces detected by ArchGemini.`
        );
        process.exit(1);
    }

    if (usefulInterfaceList.length === 1) {
        console.log(
            chalk.yellow(
                "\n- ArchGemini detected a single network interface and will utilize it as the default network interface."
            )
        );
        console.log(
            "\n" +
                table([
                    [
                        chalk.yellow("Network Interface"),
                        chalk.yellow("IP Address"),
                    ],
                    [
                        chalk.green(usefulInterfaceList[0].name),
                        chalk.blue(usefulInterfaceList[0].ip),
                    ],
                ])
        );

        return usefulInterfaceList[0].ip;
    }

    return await selectAvailableIP(usefulInterfaceList);
}
