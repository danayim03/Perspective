import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000", {
    transports: ["websocket"],
    reconnection: true,
});

export default socket;
