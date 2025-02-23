import crypto from "crypto";
import Capsule from "../Models/Capsule.Model.js";
import User from "../Models/User.Model.js";
import { getStoredHash, storeCapsuleHash } from "../Utils/Blockchain.js";
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

        // Update the user's total like count
        const user = await User.findById(capsule.user);
        if (user) {
            user.likesReceived += 1;
            user.totalScore += 1;
            await user.save();
        }

        res.json({ success: true, likes: capsule.likes, userLikes: user ? user.likesReceived : 0 });

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

        const user = await User.findById(capsule.user);
        if (user) {
            user.commentsReceived += 1;
            user.totalScore += 2;
            await user.save();
        }

        res.json({ success: true, comments: capsule.comments });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const AddCapsule = async (req, res) => {
    try {
        const { title, content, isPrivate, openDate, images, videos } = req.body;
        const userId = req.user.id;
        const username = req.user.fullname;

        // Validate required fields
        if (!title || !openDate) {
            return res.status(400).json({ success: false, message: "Title and Open Date are required." });
        }

        // ✅ Compute Capsule Hash (Before storing on blockchain)
        console.log("Create Images", images);
        console.log("Create Video", videos);
        const capsuleData = JSON.stringify({
            images: images,
            videos: videos,
        });
        const capsuleHash = crypto.createHash("sha256").update(capsuleData).digest("hex");

        // ✅ Sentiment Analysis on Capsule Content
        let sentimentResult = { sentiment: "neutral", confidence: 0.5 }; // Default values
        if (content) {
            sentimentResult = await analyzeSentiment(content);
        }

        // ✅ Save Capsule to Database (Including Blockchain Hash)
        const capsule = new Capsule({
            user: userId,
            username,
            title,
            content,
            images,
            videos,
            isPrivate,
            openDate,
            blockchainHash: capsuleHash, // Store hash in database
            analysis: {
                sentiment: sentimentResult.sentiment,
                confidence: sentimentResult.confidence,
            },
        });
        await capsule.save();

        try {
            await storeCapsuleHash(capsule._id.toString(), capsuleHash);
        } catch (error) {
            console.error("⚠️ Failed to store hash on blockchain:", error);
            await capsule.save();
        }


        // ✅ Update User Streak and Total Score
        const user = await User.findById(userId);
        if (user) {
            const today = new Date().setHours(0, 0, 0, 0);
            const lastPosted = user.lastPostedDate ? new Date(user.lastPostedDate).setHours(0, 0, 0, 0) : null;

            if (lastPosted && today - lastPosted === 86400000) {
                user.streak += 1; // Increment streak if posting on consecutive days
            } else if (!lastPosted || today - lastPosted > 86400000) {
                user.streak = 1; // Reset streak if posting after a gap
            }

            user.lastPostedDate = new Date();
            user.totalScore += (user.streak * 5);
            await user.save();
        }

        res.status(201).json({ success: true, message: "Capsule created successfully", capsule, streak: user ? user.streak : 0, totalScore: user ? user.totalScore : 0 });
    } catch (error) {
        console.error("Error creating capsule:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



export const GetUserCapsules = async (req, res) => {
    try {
        const userId = req.user._id;
        const capsules = await Capsule.find({ user: userId })
            .sort({ openDate: 1 })
            .select("-__v");

        console.log("Capsules retrieved from DB:", capsules.length);

        // Process each capsule
        for (const capsule of capsules) {
            const currentDate = new Date();
            const unlockDate = new Date(capsule.openDate);

            if (currentDate >= unlockDate && !capsule.isChecked) {
                console.log(`🔍 Verifying blockchain hash for Capsule ID: ${capsule._id}`);
                try {
                    console.log("REcheck Images", capsule.images);
                    console.log("REcheck Video", capsule.videos);
                    const capsuleData = JSON.stringify({
                        images: capsule.images,
                        videos: capsule.videos,
                    });
                    const recomputedHash = crypto.createHash("sha256").update(capsuleData).digest("hex");

                    const storedHash = await getStoredHash(capsule._id.toString());

                    // Add null check for storedHash
                    if (storedHash === null) {
                        console.log(`⚠️ No blockchain hash found for Capsule ID: ${capsule._id}`);
                        capsule.isChanged = true; // Mark as changed since we can't verify
                    } else {
                        capsule.isChanged = storedHash !== recomputedHash;
                        console.log("Stored Hash is ", storedHash)
                        console.log("recomputedHash Hash is ", recomputedHash)
                    }

                    capsule.isChecked = true;
                    await capsule.save();
                } catch (error) {
                    console.error("⚠️ Blockchain verification error:", error);
                    await capsule.save();
                }
            }
        }

        const uniqueCapsules = [...new Map(capsules.map(c => [c._id.toString(), c])).values()];

        console.log("Unique Capsules Count:", uniqueCapsules.length);
        res.json({ success: true, capsules: uniqueCapsules });

    } catch (error) {
        console.error("❌ Error fetching user capsules:", error);
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
