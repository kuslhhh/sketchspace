import express, { Router } from "express"
import { verifyToken } from "../middleware/authMiddleware.js"
import { roomGet, roomPost, slug } from "../controllers/roomController.js"

export const roomRouter = Router()


roomRouter.post("/rooms", roomPost)
roomRouter.get("/:roomId", roomGet)
roomRouter.get("/:slug", slug)
