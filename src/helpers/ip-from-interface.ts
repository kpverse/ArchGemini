export function getIPv4FromNetworkInterface(
    _interface: { address: string; family: string; internal: boolean }[]
) {
    try {
        let { address } = _interface.filter(
            ({ family, internal }) => !internal && family === "IPv4"
        )[0];

        return address || "127.0.0.1";
    } catch (error) {
        console.log(error);
        return "127.0.0.1";
    }
}
