import detectPort from "detect-port";

let PORT: number | undefined = undefined;

export async function getPortValue() {
    if (PORT !== undefined) return PORT;

    // If available, use 2211 as dafault port.
    PORT = await detectPort(2211);
    return PORT;
}
