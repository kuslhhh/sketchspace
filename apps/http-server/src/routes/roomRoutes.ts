import express, { Router } from "express"
import { verifyToken } from "../middleware/authMiddleware.js"
import { roomGet, roomPost } from "../controllers/roomController.js"

export const roomRouter = Router()


roomRouter.post("/rooms", verifyToken, roomPost)
roomRouter.get("/:roomId", verifyToken, roomGet)
