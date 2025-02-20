import express from "express";

import { UploadProfilePic } from "../Controllers/UserController.js";
import { ProtectRoute } from "../MiddleWare/ProtectRoute.js";

const router = express.Router();

router.put("/UploadPic", ProtectRoute, UploadProfilePic);

export default router;
