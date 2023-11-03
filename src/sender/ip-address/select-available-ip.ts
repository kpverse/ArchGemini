import { createInterface } from "readline";
import { table } from "table";

export type usefulInterfaceList = {
    name: string;
    ip: string;
}[];

type tableContent = [string, string, string][];

const consoleMsg = (tableContent: tableContent, validAnswersString: string) => {
    return `
Multiple network interfaces found

${table(tableContent)}

On which network the receiver device is connected to?
Enter any one from ${validAnswersString}.
> `;
};

const warningMsg = (validAnswersString: string) => {
    return `
Enter any one from ${validAnswersString} only!
> `;
};

export async function selectAvailableIP(
    usefulInterfaceList: usefulInterfaceList
) {
    const readlineInterface = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    let tableContent: tableContent = [["", "Network Interface", "IP Address"]],
        validAnswersString = "",
        validAnswers: string[] = [];
    for (let index = 0; index < usefulInterfaceList.length; index++) {
        const indexStr = `${index + 1}`,
            { name, ip } = usefulInterfaceList[index];

        tableContent.push([indexStr, name, ip]);

        if (index === 0) validAnswersString += indexStr;
        else if (index === usefulInterfaceList.length - 1)
            validAnswersString += ` and ${indexStr}`;
        else validAnswersString += `, ${indexStr}`;

        validAnswers.push(indexStr);
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
