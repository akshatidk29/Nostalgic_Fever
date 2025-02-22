import Capsule from "../Models/Capsule.Model.js";
import { analyzeSentiment } from "../Utils/SentimentAPI.js"; // Helper for sentiment analysis

// ✅ Like a Capsule
export const likeCapsule = async (req, res) => {
    try {
        const { capsuleId } = req.params;

        const capsule = await Capsule.findById(capsuleId);
        if (!capsule) {
            return res.status(404).json({ success: false, message: "Capsule not found" });
        }

        capsule.likes += 1; // Increment the like count
        await capsule.save();

        res.json({ success: true, likes: capsule.likes });
    } catch (error) {
        console.error("Error liking capsule:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ✅ Add a Comment to a Capsule
export const addComment = async (req, res) => {
    try {
        const { capsuleId } = req.params;
        let { content } = req.body;

        console.log("🔍 User from Request:", req.user);

        if (!req.user || !req.user.fullname) {
            return res.status(401).json({ success: false, message: "Unauthorized: User data missing" });
        }

        if (!content || !content.trim()) {
            return res.status(400).json({ success: false, message: "Comment cannot be empty" });
        }
        content = content.trim();

        const capsule = await Capsule.findById(capsuleId);
        if (!capsule) {
            return res.status(404).json({ success: false, message: "Capsule not found" });
        }

        const newComment = {
            user: req.user._id,  // Store user ID
            username: req.user.fullname, // Use `fullname` instead of `username`
            content,
            createdAt: new Date(),
        };

        capsule.comments.push(newComment);
        await capsule.save();

        res.json({ success: true, comments: capsule.comments });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};























// ✅ Add a new Capsule
export const AddCapsule = async (req, res) => {
    try {
        const { title, content, isPrivate, openDate, images, videos } = req.body;
        const userId = req.user.id;
        const username = req.user.fullname;

        // Validate required fields
        if (!title || !openDate) {
            return res.status(400).json({ success: false, message: "Title and Open Date are required." });
        }

        // ✅ Sentiment Analysis on Capsule Content
        let sentimentResult = { sentiment: "neutral", confidence: 0.5 }; // Default values
        if (content) {
            sentimentResult = await analyzeSentiment(content);
        }

        // ✅ Save Capsule to Database
        const capsule = new Capsule({
            user: userId,
            username,
            title,
            content,
            images,
            videos,
            isPrivate,
            openDate,
            analysis: {
                sentiment: sentimentResult.sentiment,
                confidence: sentimentResult.confidence,
            },
        });

        await capsule.save();
        res.status(201).json({ success: true, message: "Capsule created successfully", capsule });

    } catch (error) {
        console.error("Error creating capsule:", error); // ❌ Console log found
        res.status(500).json({ success: false, message: "Server error" });
    }
};
export const GetUserCapsules = async (req, res) => {
    try {
        console.log("🔵 GetUserCapsules function called"); // ✅ Log each function execution
        console.log("User ID:", req.user._id); // ✅ Log user ID

        const userId = req.user._id;
        const capsules = await Capsule.find({ user: userId })
            .sort({ openDate: 1 })
            .select("-__v")
            .lean();

        console.log("Capsules retrieved from DB:", capsules.length); // ✅ Log number of capsules

        // Ensure unique capsules
        const uniqueCapsules = [...new Map(capsules.map(c => [c._id.toString(), c])).values()];

        console.log("Unique Capsules Count:", uniqueCapsules.length); // ✅ Log unique count
        res.json({ success: true, capsules: uniqueCapsules });

    } catch (error) {
        console.error("Error fetching user capsules:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ✅ Get all public capsules
export const GetPublicCapsules = async (req, res) => {
    try {
        const capsules = await Capsule.find({ isPrivate: false })
            .sort({ openDate: -1 }) // Show latest first
            .select("-__v")
            .lean();

        res.json({ success: true, capsules });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ✅ Get a capsule by its ID (Checks for privacy)
export const GetCapsuleById = async (req, res) => {
    try {
        const capsule = await Capsule.findById(req.params.id);

        if (!capsule) {
            return res.status(404).json({ success: false, message: "Capsule not found" });
        }

        // Restrict access to private capsules
        if (capsule.isPrivate && capsule.user.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        res.json({ success: true, capsule });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
