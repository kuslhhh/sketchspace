import { Router } from "express"
import {  signin, signup, logout } from "../controllers/authController.js";

export const userRouter = Router();

userRouter.post("/signup", signup)
userRouter.post("/signin", signin)
userRouter.post("/logout",  logout)