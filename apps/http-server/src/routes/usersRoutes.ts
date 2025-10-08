import { Router } from "express"
import {  signin, signup, logout } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { room } from "../controllers/roomController.js";

export const userRouter = Router();

userRouter.post("/signup", signup)
userRouter.post("/signin", signin)
userRouter.post("/logout",  logout)
userRouter.get("/room", verifyToken, room)