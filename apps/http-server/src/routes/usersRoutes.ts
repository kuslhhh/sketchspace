import { Router } from "express"
import { room, signin, signup } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

export const userRouter = Router();

userRouter.post("/signin", signin)
userRouter.post("/signin", signup)
userRouter.get("/signin", verifyToken, room)