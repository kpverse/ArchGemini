import { createInterface } from "readline";
import { getIPv4FromNetworkInterface } from "../../../helpers/ip-from-interface";
import { getNetworkInterfaces } from "../../../helpers/network-interfaces";

const warningMsg = () => {
    return `
Enter 1 or 2 only
> `;
};

const attentionMsg = (wifiIP: string, LocalAreaConnectionIP: string) => {
    return `
ATTENTION REQUIRED: Your device is connected to Wi-Fi, and Hotspot is on as well.

To continue, the receiver device must be connected to one of the following options:

1. The same Wi-Fi network as your device (${wifiIP})
2. The Hotspot of your device (${LocalAreaConnectionIP})

Enter 1 or 2
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

    let wifiInterface: interfaceType | undefined = undefined;
    let LocalAreaConnectionInterface: interfaceType | undefined = undefined;

    let keys = Object.keys(interfaces);

    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];

        if (key === "Wi-Fi") wifiInterface = interfaces[key];
        else if (key.startsWith("Local Area Connection* "))
            LocalAreaConnectionInterface = interfaces[key];

        if (
            wifiInterface !== undefined &&
            LocalAreaConnectionInterface !== undefined
        )
            break;
    }

    if (
        wifiInterface !== undefined &&
        LocalAreaConnectionInterface !== undefined
    ) {
        let [wifiIP, LocalAreaConnectionIP] = [
            getIPv4FromNetworkInterface(wifiInterface),
            getIPv4FromNetworkInterface(LocalAreaConnectionInterface),
        ];

        const readlineInterface = createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        let answer: string = await new Promise(function (resolve) {
            readlineInterface.question(
                attentionMsg(wifiIP, LocalAreaConnectionIP),
                resolve
            );
        });

        while (!["1", "2"].includes(answer))
            answer = await new Promise(function (resolve) {
                readlineInterface.question(warningMsg(), resolve);
            });

        if (answer === "1") return wifiIP;
        else return LocalAreaConnectionIP;
    }

    if (wifiInterface) return getIPv4FromNetworkInterface(wifiInterface);
    else if (LocalAreaConnectionInterface)
        return getIPv4FromNetworkInterface(LocalAreaConnectionInterface);

    if (
        wifiInterface === undefined &&
        LocalAreaConnectionInterface === undefined
    ) {
        console.log(
            "ERROR: The connection between sender and receiver can not be created."
        );
        process.exit(1);
    }

    return "127.0.0.1";
}
