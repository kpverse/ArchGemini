export type interfaceObject = {
    address: string;
    family: string;
    internal: boolean;
}[];

export function getIPv4FromNetworkInterface(_interface: interfaceObject) {
    try {
        let { address } = _interface.filter(
            ({ family, internal }) => !internal && family === "IPv4"
        )[0];

        return address;
    } catch (error) {}
}
