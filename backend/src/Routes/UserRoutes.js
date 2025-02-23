import express from "express";

import { getUserById, UploadProfilePic } from "../Controllers/UserController.js";
import { ProtectRoute } from "../MiddleWare/ProtectRoute.js";

const router = express.Router();

router.put("/UploadPic", ProtectRoute, UploadProfilePic);
router.get("/:id", getUserById);

export default router;
