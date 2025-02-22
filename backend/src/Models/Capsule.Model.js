import mongoose from "mongoose";

const CapsuleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        trim: true,
    },
    images: {
        type: [String], // Array of image URLs (Cloudinary links)
        default: [],
    },
    videos: {
        type: [String], // Array of video URLs (Cloudinary links)
        default: [],
    },
    isPrivate: {
        type: Boolean,
        default: true, // Default to private
    },


    // ✅ Updated Analysis: Only Sentiment Analysis (No Image/Video AI)
    analysis: {
        sentiment: {
            type: String,
            enum: ["positive", "neutral", "negative"], // Only valid sentiment values
            default: "neutral",
        },
        confidence: {
            type: Number,
            default: 0.5, // Default confidence score if not analyzed
        }
    },


    openDate: {
        type: Date,
        required: true, // Date when the capsule unlocks
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Capsule = mongoose.model("Capsule", CapsuleSchema);
export default Capsule;
