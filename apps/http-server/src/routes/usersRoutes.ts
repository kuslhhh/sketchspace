import { Router } from "express"
import { room, signin, signup } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

export const userRouter = Router();

userRouter.post("/signup", signup)
userRouter.post("/signin", signin)
userRouter.get("/room", verifyToken, room)