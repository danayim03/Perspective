// lib/socket.js

import { io } from "socket.io-client";

// Initialize the Socket.io client
const socket = io("http://localhost:3000", {
    reconnection: true, // Automatically reconnect if the connection is lost
    reconnectionAttempts: 5, // Retry connecting 5 times
    path: "/socket.io/",
    transports: ["websocket"], // Use WebSocket transport for better performance
});

// Handle connection and disconnection events
socket.on("connect", () => {
    console.log("Connected to the WebSocket server!");
});

socket.on("disconnect", (reason) => {
    console.warn("Disconnected from the WebSocket server:", reason);
});

export default socket;
