import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic: {
            type: String,  // Stores Cloudinary image URL
            default: "",   // Default is empty
        },
        likesReceived: {
            type: Number,
            default: 0, // Total likes received on all posts
        },
        commentsReceived: {
            type: Number,
            default: 0, // Total comments received on all posts
        },
        streak: {
            type: Number,
            default: 0, // Streak count for user activity
        },
        lastPostedDate: {
            type: Date,
            default: null, // Stores the last post date to calculate streaks
        },
        totalScore: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema);

export default User;
