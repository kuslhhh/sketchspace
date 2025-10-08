import { NextFunction, Request, Response } from "express";
import {JWT_SECRET} from "@repo/backend-config/config"
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
   user?: any
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
   const token = req.cookies?.token
   if (!token) return res.status(401).json({ message: "Unauthorized" })

   try {
      const decoded = jwt.verify(token, JWT_SECRET as string)
      req.user = decoded
      next()
   } catch (e: any) {
      res.status(403).json({ message: e.message })
   }
}