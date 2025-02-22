import express from "express";
import multer from "multer";
import { AddCapsule, GetCapsuleById, GetPublicCapsules, GetUserCapsules } from "../Controllers/CapsuleController.js";
import { ProtectRoute } from "../MiddleWare/ProtectRoute.js";

const router = express.Router();


// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/CreateCapsule", ProtectRoute, upload.fields([{ name: "images", maxCount: 5 }, { name: "videos", maxCount: 2 }]), AddCapsule);
// Get user's capsules (private only)
router.get("/MyCapsules", ProtectRoute, GetUserCapsules);
// Get public capsules
router.get("/PublicCapsule", GetPublicCapsules);
// Get a single capsule by ID
router.get("/:id", ProtectRoute, GetCapsuleById);


export default router;
