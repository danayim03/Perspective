// lib/backendSocket.js
const { Server } = require("socket.io");

function initializeSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000", // Update for production
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);
        // Additional backend WebSocket logic
    });

    return io;
}

module.exports = initializeSocket;
