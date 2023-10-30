import { createInterface } from "readline";
import { getIPv4FromNetworkInterface } from "../../../helpers/ip-from-interface";
import { getNetworkInterfaces } from "../../../helpers/network-interfaces";

const warningMsg = (validAnswersString: string) => {
    return `
Enter ${validAnswersString}.
> `;
};

const attentionMsg = (
    interfaceIps: { type: "e" | "l" | "w"; ip: string }[],
    validAnswersString: string
) => {
    return `
To continue, the receiver device must be connected to one of the following networks:

${interfaceIps.map((ipObject, index) => {
    if (ipObject.type === "w")
        return `${index + 1}. The same Wi-Fi network as your device (${
            ipObject.ip
        }).`;
    else if (ipObject.type === "l")
        return `${index + 1}. The Hotspot of your device (${ipObject.ip}).`;
    else if (ipObject.type === "e")
        return `${index + 1}. The same Ethernet as your device (${
            ipObject.ip
        }).`;
})}

Enter ${validAnswersString}.
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
              type: "e" | "l" | "w";
              value: interfaceType;
          }[]
        | undefined;

    let usefulInterfacesHelper = (type: "e" | "l" | "w", key: string) => {
        if (!usefulInterfaces)
            usefulInterfaces = [
                {
                    type: type,
                    value: interfaces[key],
                },
            ];
        else
            usefulInterfaces.push({
                type: "w",
                value: interfaces[key],
            });
    };

    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];

        if (key === "Wi-Fi") usefulInterfacesHelper("w", key);
        else if (key.startsWith("Local Area Connection* "))
            usefulInterfacesHelper("l", key);
        else if (key === "Ethernet") usefulInterfacesHelper("w", key);

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

            let interfaceIps = usefulInterfaces.map((interfaceObject) => {
                return {
                    type: interfaceObject.type,
                    ip: getIPv4FromNetworkInterface(interfaceObject.value),
                };
            });

            let validAnswers = interfaceIps.map((_, index) => `${index + 1}`);

            let validAnswersString = "";

            for (let index = 0; index < validAnswers.length; index++) {
                validAnswersString += `${index === 0 ? "" : " "}${
                    validAnswers[index]
                },`;
                if (index === validAnswers.length - 1)
                    validAnswersString += ` or ${validAnswers[index]}`;
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
