import express from "express";
import User from "../Models/User.Model.js";

const router = express.Router();

// ✅ Get Leaderboard
router.get("/Leaderboard", async (req, res) => {
    try {
        // Fetch all users sorted by totalScore in descending order
        const users = await User.find().sort({ totalScore: -1 }).select("fullname profilePic totalScore streak likesReceived commentsReceived");
        
        res.status(200).json({ success: true, leaderboard: users });
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

export default router;
