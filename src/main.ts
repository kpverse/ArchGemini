import Server from "./server/main";
import port from "./server/port";

Server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}

Press control/command + c to close the server.
`);
});
