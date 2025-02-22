import Capsule from "../Models/Capsule.Model.js";

export const AddCapsule = async (req, res) => {
    console.log(req.body);
    try {
        const { title, content, isPrivate, openDate, images, videos } = req.body;
        const userId = req.user.id; // Get user ID from token
        const username = req.user.fullname;
        // Validate fields
        if (!title || !openDate) {
            return res.status(400).json({ success: false, message: "Title and Open Date are required." });
        }

        // Create capsule in database
        const capsule = new Capsule({
            user: userId,
            username,
            title,
            content,
            images,  // Directly storing images from req.body
            videos,  // Directly storing videos from req.body
            isPrivate,
            openDate,
        });

        await capsule.save();
        res.status(201).json({ success: true, message: "Capsule created successfully", capsule });

    } catch (error) {
        console.error("Error creating capsule:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const GetUserCapsules = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from JWT token

        const capsules = await Capsule.find({ user: userId })
            .sort({ openDate: 1 }) // Sort by open date (earliest first)
            .select("-__v") // Remove unwanted fields
            .lean(); // Optimize query for performance

        res.json({ success: true, capsules });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const GetPublicCapsules = async (req, res) => {
    try {
        const capsules = await Capsule.find({ isPrivate: false })
            .sort({ openDate: -1 }) // Show recent public capsules first
            .select("-__v")
            .lean();

        res.json({ success: true, capsules });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const GetCapsuleById = async (req, res) => {
    try {
        const capsule = await Capsule.findById(req.params.id);

        if (!capsule) {
            return res.status(404).json({ success: false, message: "Capsule not found" });
        }

        if (capsule.isPrivate && capsule.user.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        res.json({ success: true, capsule });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
