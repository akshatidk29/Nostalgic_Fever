import User from "../Models/User.Model.js";
import Message from "../Models/Message.Model.js";
import { getRecieverSocketId, io } from "../Lib/Socket.js";

export const GetUserForSidebar = async (req, res) => {

    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in GetUserForSidebar Controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

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
        console.error("Error in GetMessage Controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const SendMessages = async (req, res) => {
    try {
        const { text } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        const newMessage = new Message({ senderId, recieverId, text });
        await newMessage.save();

        const recieverSocketId = getRecieverSocketId(recieverId);
        const senderSocketId = getRecieverSocketId(senderId);

        // ✅ Emit message to receiver (if online)
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        // ✅ Emit message to sender (so they see their own message instantly)
        if (senderSocketId) {
            io.to(senderSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in SendMessage Controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
