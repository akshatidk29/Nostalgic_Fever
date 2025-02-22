import { GenerateToken } from "../Lib/Utils.js";
import User from "../Models/User.Model.js";
import bcrypt from "bcryptjs";

// ✅ Signup Controller
export const Signup = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // ✅ Allowed domains: @gmail.com, @students.iitmandi.ac.in
        const allowedDomains = ["@gmail.com", "@students.iitmandi.ac.in"];
        if (!allowedDomains.some(domain => email.endsWith(domain))) {
            return res.status(400).json({ message: "Email must be a @gmail.com or @students.iitmandi.ac.in address" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullname, email, password: hashedPassword });

        await newUser.save();
        GenerateToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email,
        });
    } catch (error) {
        console.error("Error in Signup Controller:", error.message); // ❌ Consider removing in production
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Login Controller
export const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        GenerateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            createdAt: user.createdAt,
        });
    } catch (error) {
        console.error("Error in Login Controller:", error.message); // ❌ Console log found
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Logout Controller
export const Logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in Logout Controller", error.message); // ❌ Console log found
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Check Authentication Status
export const CheckAuth = (req, res) => {
    try {
        res.status(200).json({
            _id: req.user._id,
            fullname: req.user.fullname,
            email: req.user.email,
            createdAt: req.user.createdAt,
            profilePic: req.user.profilePic,
        });
    } catch (error) {
        console.log("Error in CheckAuth Controller", error.message); // ❌ Console log found
        res.status(500).json({ message: "Internal Server Error" });
    }
};
