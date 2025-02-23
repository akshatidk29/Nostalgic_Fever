import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },

        recieverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },
 
        text: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;
