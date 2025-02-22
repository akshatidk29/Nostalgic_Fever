import express from "express";
import { ProtectRoute } from "../MiddleWare/ProtectRoute.js";
import { GetMessages, GetUserForSidebar, SendMessages } from "../Controllers/MessageController.js";

const router = express.Router()



router.get("/User", ProtectRoute, GetUserForSidebar);
router.get("/:id", ProtectRoute, GetMessages);
router.post("/Send/:id", ProtectRoute, SendMessages);


export default router;