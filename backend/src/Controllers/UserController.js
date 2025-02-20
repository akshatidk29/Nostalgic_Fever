import cloudinary from "../Lib/Cloudinary.js";
import User from "../Models/User.Model.js";

export const UploadProfilePic = async (req, res) => {
    try {
        const {profilePic} = req.body; 
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "ProfilePic is Required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);

    } catch (error) {
        console.error("Error in UploadProfilePic:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
