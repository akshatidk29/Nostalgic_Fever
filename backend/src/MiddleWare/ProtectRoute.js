import jwt from "jsonwebtoken";
import User from "../Models/User.Model.js";

export const ProtectRoute = async (req, res, next) => {
    try {
        // ✅ Extract JWT token from cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        // ✅ Verify and decode JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token Provided" });
        }

        // ✅ Retrieve user from DB (excluding password)
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User Not Found" });
        }

        req.user = user; // ✅ Attach user to request object
        next(); // ✅ Proceed to the next middleware

    } catch (error) {
        console.log("Error in ProtectRoute Middleware:", error.message); // ❌ Console log found
        res.status(500).json({ message: "Internal Server Error" });
    }
};
