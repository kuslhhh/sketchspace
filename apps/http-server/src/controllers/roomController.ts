import { roomSchema } from "@repo/common-config/schema"
import { prisma } from "@repo/db-config/db";
import { Response } from "express"
import { AuthRequest } from "../middleware/authMiddleware.js";

export const room = async (req: AuthRequest, res: Response) => {

   try {
      const data = roomSchema.safeParse(req.body);
      if (!data.success) {
         return res.json({
            message: "Incorrect Inputs"
         })
      }

      if (!req.user?.userId) {
         return res.status(401).json({ message: "userId not found in token" })
      }
      const userId = req.user.userId;

      const existingRoom = await prisma.room.findUnique({
         where: { slug: data.data.name }
      });

      if (existingRoom) {
         return res.status(400).json({
            message: "Room with this name already exists"
         });
      }

      const room = await prisma.room.create({
         data: {
            slug: data.data.name,
            adminId: userId
         }
      })

      res.json({
         roomId: room.id,
         slug: room.slug
      })
   } catch (e: any) {
      res.status(401).json({ message: e.message })
   }
}