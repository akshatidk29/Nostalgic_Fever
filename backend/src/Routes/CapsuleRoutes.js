import express from "express";
import multer from "multer";
import { AddCapsule, addComment, GetCapsuleById, GetPublicCapsules, GetUserCapsules, likeCapsule } from "../Controllers/CapsuleController.js";
import { ProtectRoute } from "../MiddleWare/ProtectRoute.js";

const router = express.Router();


// Multer setup for handling file uploads 
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/CreateCapsule", ProtectRoute, upload.fields([{ name: "images", maxCount: 5 }, { name: "videos", maxCount: 2 }]), AddCapsule);
router.get("/MyCapsules", ProtectRoute, GetUserCapsules);
router.get("/PublicCapsule", GetPublicCapsules);
router.get("/:id", ProtectRoute, GetCapsuleById);
router.post("/Like/:capsuleId", ProtectRoute, likeCapsule);
router.post("/Comment/:capsuleId", ProtectRoute, addComment);


export default router;
