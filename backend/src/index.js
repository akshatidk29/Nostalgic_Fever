import express from "express"
import dotenv from "dotenv"
import AuthRoutes from "./Routes/AuthRoutes.js"
import UserRoutes from "./Routes/UserRoutes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

import { ConnectDB } from "./Lib/Database.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "http://192.168.53.158:5173"],
    credentials: true
}))


app.use("/Api/Auth", AuthRoutes);
app.use("/Api/User", UserRoutes);


app.listen(PORT, "0.0.0.0", () => {
    console.log("Server Running on Port:", PORT)
    ConnectDB();
})