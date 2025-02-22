import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://192.168.53.158:5173"], // ✅ Allow both local and LAN access
        credentials: true // ✅ Allow credentials for authentication
    }
});

const userSocketMap = {}; // Map userId to socketId

export function getRecieverSocketId(userId) {
    return userSocketMap[userId];
}

io.on("connection", (socket) => {
    console.log("🔵 A User Connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (!userId) {
        console.log("❌ No userId provided. Disconnecting socket:", socket.id);
        socket.disconnect();
        return;
    }

    userSocketMap[userId] = socket.id;
    console.log(`🟢 User ${userId} mapped to socket ${socket.id}`);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log(`❌ User Disconnected: ${socket.id} (User ID: ${userId})`);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

    socket.on("newMessage", (message) => {
        console.log(`📩 Message Received: ${message.text} from ${message.senderId} to ${message.recieverId}`);
    });

    socket.on("error", (err) => {
        console.error("⚠️ Socket Error:", err);
    });
});

export { io, app, server };
