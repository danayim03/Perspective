import { io } from "socket.io-client";

const socket = io("http://localhost:5001", {
    transports: ["websocket"],
    reconnection: true,
});

export default socket;
