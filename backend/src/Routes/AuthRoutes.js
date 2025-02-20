import express from "express";
import { Login, Logout, Signup, CheckAuth } from "../Controllers/AuthController.js";
import { ProtectRoute } from "../MiddleWare/ProtectRoute.js";

const router = express.Router()


router.post("/Login", Login);
router.post("/Logout", Logout);
router.post("/Signup", Signup);
router.get("/Check", ProtectRoute, CheckAuth);


export default router;