import express from "express";
import { getPortValue } from "./sender/port";
import { getIPv4 } from "./sender/ip-address/main";
import { API } from "./api/main";
import { platform } from "process";
import cors from "cors";
import { join } from "path";
import openLink from "open";
import { table } from "table";
import chalk from "chalk";
import { defaultShareFolder } from "./sender/shared-folder";
import VERSION from "./metadata/VERSION";

const ExpressApp = express();

ExpressApp.use(cors());

ExpressApp.use(API.path, API.router);

ExpressApp.use(
  "/archgemini/",
  express.static(join(__dirname, "../../front-end/out/"))
);

let welcomeMsg = (url: string) => {
  return `
${chalk.green.bold("ArchGemini started successfully.")}

${table([
  [chalk.yellow("Available services"), chalk.yellow("Service URL")],
  ["ArchGemini Sender", chalk.blue.underline(url + "/sender")],
  ["ArchGemini Receiver", chalk.blue.underline(url + "/receiver")],
])}

${chalk.cyan("- Trying to open")} ${chalk.blue.bold.underline(
    url + "/sender"
  )}${chalk.cyan(".")}
    
${chalk.cyan(
  "- If it does not open automatically, open"
)} ${chalk.blue.bold.underline(url + "/sender")} ${chalk.cyan(
    "in your browser."
  )}

${chalk.yellow("Press")} ${chalk.magenta.bold(
    `${platform === "darwin" ? "command" : "control"} + c`
  )} ${chalk.yellow("to close this app.")}

${chalk.green("Thank you for using ArchGemini!")}
`;
};

async function main() {
  console.log(`\n${chalk.green.bold(`ArchGemini v${VERSION} starting...`)}`);

  let port = await getPortValue(),
    ip = await getIPv4();

  defaultShareFolder();

  ExpressApp.listen(port, () => {
    let url = `http://${ip}:${port}/archgemini`;

    console.log(welcomeMsg(url));

    try {
      openLink(url + "/sender");
    } catch (error) {
      console.log(error.message);
    }
  });
}

main();
