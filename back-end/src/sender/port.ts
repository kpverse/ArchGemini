import detectPort from "detect-port";

let PORT: number | undefined = undefined;

export async function getPortValue() {
    if (PORT !== undefined) return PORT;

    PORT = await detectPort(2211); // If available, use 2211 as dafault port.
    return PORT;
}
