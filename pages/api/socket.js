// pages/api/socket.js

import { Server } from "socket.io";

// Create a shared map to store user connections (in memory)
const userSockets = new Map();

let io;

export default function handler(req, res) {
    console.log("Socket.IO API handler invoked"); // Add this log

    if (!io) {
        // Initialize Socket.IO if it isn't already initialized
        io = new Server(res.socket.server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"],
            },
        });

        console.log("WebSocket server initialized");

        // Handle WebSocket connections
        io.on("connection", (socket) => {
            console.log("A user connected:", socket.id);

            // Listen for "find-match" event
            socket.on("find-match", (data) => {
                console.log("Find match event received:", data);

                // Store user in the map
                userSockets.set(socket.id, {
                    id: socket.id,
                    ...data, // userGender, userSexuality, desiredGender, desiredSexuality
                });

                // Matchmaking logic
                const match = findMatch(socket.id, data);
                if (match) {
                    // Notify both users of the match
                    io.to(socket.id).emit("match-found", match);
                    io.to(match.id).emit("match-found", userSockets.get(socket.id));

                    // Remove both users from the map after matching
                    userSockets.delete(socket.id);
                    userSockets.delete(match.id);
                } else {
                    // Notify the user if no match found
                    socket.emit("no-match");
                }
            });

            // Handle disconnect
            socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id);
                userSockets.delete(socket.id);
            });
        });
    }
    res.end();
}

// Matchmaking function
function findMatch(socketId, userData) {
    // Iterate over users to find a match
    for (const [id, user] of userSockets) {
        if (
            id !== socketId && // Don't match with self
            user.desiredGender === userData.userGender &&
            user.desiredSexuality === userData.userSexuality &&
            user.userGender === userData.desiredGender &&
            user.userSexuality === userData.desiredSexuality
        ) {
            return user; // Return matched user
            }
        }
        return null; // No match found
}
