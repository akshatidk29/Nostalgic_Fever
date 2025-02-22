import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// ✅ Setup Socket.io server with CORS for local & LAN access
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://192.168.53.158:5173"],
        credentials: true
    }
});

const userSocketMap = {}; // ✅ Store userId → socketId mapping

// ✅ Retrieve recipient's socket ID for real-time messaging
export function getRecieverSocketId(userId) {
    return userSocketMap[userId];
}

io.on("connection", (socket) => {
    console.log("🔵 A User Connected:", socket.id); // ❌ Console log found

    const userId = socket.handshake.query.userId;
    if (!userId) {
        socket.disconnect();
        return;
    }

    // ✅ Store user's socket ID
    userSocketMap[userId] = socket.id;

    // ✅ Notify all clients about online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log(`❌ User Disconnected: ${socket.id} (User ID: ${userId})`); // ❌ Console log found
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

    // ✅ Handle new message event
    socket.on("newMessage", (message) => {
    });

    socket.on("error", (err) => {
        console.error("⚠️ Socket Error:", err); // ❌ Console log found
    });
});

export { io, app, server };
