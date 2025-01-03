// lib/socket.js
// websocket logic (matchmaking logic)
// frontend

import { io } from "socket.io-client";

// Initialize the Socket.IO client
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000", {
    path: "/socket.io/",
    transports: ["websocket"], // Use WebSocket for faster communication
    reconnection: true,        // Reconnect if the connection is lost
    reconnectionAttempts: 5,   // Retry up to 5 times
});

// Handle connection and disconnection events
socket.on("connect", () => {
    console.log(`Connected to the WebSocket server! Socket ID: ${socket.id}`);
});

socket.on("disconnect", (reason) => {
    console.warn(`Disconnected from the WebSocket server: ${reason}`);
    if (reason === "io server disconnect") {
        // The server disconnected; try to reconnect
        socket.connect();
    }
});

socket.on("match-found", (match) => {
    console.log("Match found:", match);
    // Handle the match-found event here
});

socket.on("no-match", () => {
    console.log("No match found. Retrying...");
    // Handle no-match events (e.g., show a retry message)
});

export default socket;
