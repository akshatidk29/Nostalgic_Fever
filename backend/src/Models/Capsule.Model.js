import mongoose from "mongoose";

const CapsuleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    username: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, trim: true },
    images: { type: [String], default: [] }, // Cloudinary image URLs
    videos: { type: [String], default: [] }, // Cloudinary video URLs
    isPrivate: { type: Boolean, default: true }, // Default to private

    // ✅ Sentiment Analysis
    analysis: {
        sentiment: { type: String, enum: ["positive", "neutral", "negative"], default: "neutral" },
        confidence: { type: Number, default: 0.5 }
    },

    // ✅ Likes & Comments
    likes: { type: Number, default: 0 },
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            username: { type: String, required: true },
            content: { type: String, required: true, trim: true },
            createdAt: { type: Date, default: Date.now }
        }
    ],

    openDate: { type: Date, required: true }, // Capsule unlock date
    createdAt: { type: Date, default: Date.now },

    // ✅ Blockchain Integration
    originalHash: String, // Locally computed hash
    blockchainHash: String, // Hash stored on Sepolia Ethereum testnet
    blockchainTx: String, // Transaction hash of blockchain storage
    isChanged: { type: Boolean, default: false }, // If tampered
    isChecked: { type: Boolean, default: false }, // Verification flag
    lastCheckedAt: { type: Date } // Timestamp of last blockchain check
});

// ✅ Indexing for performance
CapsuleSchema.index({ user: 1, createdAt: -1 });

const Capsule = mongoose.model("Capsule", CapsuleSchema);
export default Capsule;
