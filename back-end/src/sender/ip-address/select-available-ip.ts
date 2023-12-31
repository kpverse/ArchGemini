import chalk from "chalk";
import { createInterface } from "readline";
import { table } from "table";
import { LocalIPv4ListObject } from "./local-ipv4-list";

export type usefulInterfaceList = {
    name: string;
    ip: string;
}[];

type tableContent = [string, string, string][];

const consoleMsg = (tableContent: tableContent, validAnswersString: string) => {
    return `
${chalk.green("Multiple network interfaces found")}

${table(tableContent)}

${chalk.green("On which network the receiver device is connected to?")}
Enter any one from ${chalk.yellow(validAnswersString)}.
> `;
};

const warningMsg = (validAnswersString: string) => {
    return `
Enter any one from ${chalk.yellow(validAnswersString)} only!
> `;
};

export async function selectAvailableIP(
    usefulInterfaceList: usefulInterfaceList
) {
    const readlineInterface = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    let tableContent: tableContent = [
            ["", chalk.yellow("Network Interface"), chalk.yellow("IP Address")],
        ],
        validAnswersString = "",
        validAnswers: string[] = [];

    for (let index = 0; index < usefulInterfaceList.length; index++) {
        const indexStr = `${index + 1}`,
            { name, ip } = usefulInterfaceList[index];

        tableContent.push([indexStr, chalk.green(name), chalk.blue(ip)]);

        if (index === 0) validAnswersString += indexStr;
        else if (index === usefulInterfaceList.length - 1)
            validAnswersString += ` and ${indexStr}`;
        else validAnswersString += `, ${indexStr}`;

        validAnswers.push(indexStr);

        LocalIPv4ListObject.value.push(ip);
    }

    let answer: string = await new Promise(function (resolve) {
        readlineInterface.question(
            consoleMsg(tableContent, validAnswersString),
            resolve
        );
    });

    while (!validAnswers.includes(answer))
        answer = await new Promise(function (resolve) {
            readlineInterface.question(warningMsg(validAnswersString), resolve);
        });

    return usefulInterfaceList[Number(answer) - 1].ip;
}
