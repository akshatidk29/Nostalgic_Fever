import User from "../Models/User.Model.js";
import Message from "../Models/Message.Model.js";
import { getRecieverSocketId, io } from "../Lib/Socket.js";

// ✅ Get all users except the logged-in user (for chat sidebar)
export const GetUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in GetUserForSidebar Controller:", error.message); // ❌ Console log found
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Fetch chat messages between two users
export const GetMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: myId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: myId }
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in GetMessage Controller:", error.message); // ❌ Console log found
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Send a message and notify the receiver (if online)
export const SendMessages = async (req, res) => {
    try {
        const { text } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        // Save message to database
        const newMessage = new Message({ senderId, recieverId, text });
        await newMessage.save();

        // Get socket IDs for both sender & receiver
        const recieverSocketId = getRecieverSocketId(recieverId);
        const senderSocketId = getRecieverSocketId(senderId);

        // Notify the receiver in real-time if they are online
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        // Notify the sender to update their chat instantly
        if (senderSocketId) {
            io.to(senderSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in SendMessage Controller:", error.message); // ❌ Console log found
        res.status(500).json({ message: "Internal Server Error" });
    }
};
