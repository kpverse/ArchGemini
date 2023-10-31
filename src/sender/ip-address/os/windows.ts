import { createInterface } from "readline";
import { getIPv4FromNetworkInterface } from "../../../helpers/ip-from-interface";
import { getNetworkInterfaces } from "../../../helpers/network-interfaces";

type validInterfaceTypes = "Ethernet" | "LAC" | "WiFi";

const warningMsg = (validAnswersString: string) => {
    return `
Enter any one from ${validAnswersString} only!
> `;
};

const attentionMsg = (
    interfaceIps: { type: validInterfaceTypes; ip: string }[],
    validAnswersString: string
) => {
    return `
To continue, the receiver device must be connected to any one of the following networks:

${(() => {
    let msglist = interfaceIps.map((ipObject, index) => {
        if (ipObject.type === "WiFi")
            return `${index + 1}. The same Wi-Fi network as your device (${
                ipObject.ip
            }).`;
        else if (ipObject.type === "LAC")
            return `${index + 1}. The Hotspot of your device (${ipObject.ip}).`;
        else if (ipObject.type === "Ethernet")
            return `${index + 1}. The same Ethernet as your device (${
                ipObject.ip
            }).`;
    });
    return msglist.join("\n");
})()}

On which network the receiver device is connected to?
Enter any one from ${validAnswersString}
> `;
};

export async function WindowsIPv4() {
    type interfaceType = {
        address: string;
        family: string;
        internal: boolean;
    }[];

    let interfaces = getNetworkInterfaces() as {
        [_: string]: interfaceType;
    };

    let keys = Object.keys(interfaces);

    let usefulInterfaces:
        | {
              type: validInterfaceTypes;
              value: interfaceType;
          }[]
        | undefined;

    let usefulInterfacesHelper = (type: validInterfaceTypes, key: string) => {
        if (!usefulInterfaces)
            usefulInterfaces = [
                {
                    type: type,
                    value: interfaces[key],
                },
            ];
        else
            usefulInterfaces.push({
                type: type,
                value: interfaces[key],
            });
    };

    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];

        if (key === "Wi-Fi") usefulInterfacesHelper("WiFi", key);
        else if (key.startsWith("Local Area Connection* "))
            usefulInterfacesHelper("LAC", key);
        else if (key === "Ethernet") usefulInterfacesHelper("Ethernet", key);

        if (usefulInterfaces?.length === 3) break;
    }
    if (usefulInterfaces?.length === 0) {
        // If no interfaces are found.

        console.log(
            "ERROR: The connection between sender and receiver can not be created."
        );
        process.exit(1);
    } else if (usefulInterfaces?.length === 1)
        // If only one interface is found.

        return getIPv4FromNetworkInterface(usefulInterfaces[0].value);
    else {
        // If multiple interfaces are found.

        if (usefulInterfaces) {
            const readlineInterface = createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            const interfaceIps = usefulInterfaces.map((interfaceObject) => {
                return {
                    type: interfaceObject.type,
                    ip: getIPv4FromNetworkInterface(interfaceObject.value),
                };
            });

            const validAnswers = interfaceIps.map((_, index) => `${index + 1}`);

            let validAnswersString = "";

            for (let index = 0; index < validAnswers.length; index++) {
                validAnswersString += `${index === 0 ? "" : " "}${
                    validAnswers[index]
                },`;
                if (index === validAnswers.length - 1)
                    validAnswersString += ` and ${validAnswers[index]}`;
            }

            let answer: string = await new Promise(function (resolve) {
                readlineInterface.question(
                    attentionMsg(interfaceIps, validAnswersString),
                    resolve
                );
            });

            while (!validAnswers.includes(answer))
                answer = await new Promise(function (resolve) {
                    readlineInterface.question(
                        warningMsg(validAnswersString),
                        resolve
                    );
                });

            return interfaceIps[Number(answer) - 1].ip;
        }
    }

    return "127.0.0.1";
}
