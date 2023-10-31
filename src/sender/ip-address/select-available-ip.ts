import { createInterface } from "readline";
import { table } from "table";

export type usefulInterfaceList = {
    name: string;
    ip: string;
}[];

type tableContent = [string | number, string, string][];

let consoleMsg = (tableContent: tableContent, validAnswersString: string) => {
    return `
Multiple network interfaces found

${table(tableContent)}

On which network the receiver device is connected to?
Enter any one from ${validAnswersString}
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

    const validAnswers = usefulInterfaceList.map((_, index) => `${index + 1}`);

    let validAnswersString = "";

    for (let index = 0; index < validAnswers.length; index++) {
        validAnswersString += `${index === 0 ? "" : " "}${
            validAnswers[index]
        },`;
        if (index === validAnswers.length - 1)
            validAnswersString += ` and ${validAnswers[index]}`;
    }

    let tableContent: tableContent = [["", "Network Interface", "IP Address"]];

    usefulInterfaceList.forEach(({ name, ip }, index) => {
        tableContent.push([index + 1, name, ip]);
    });

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
