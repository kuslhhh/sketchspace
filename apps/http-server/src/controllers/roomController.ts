import { roomSchema } from "@repo/common-config/schema"
import { prisma } from "@repo/db-config/db";
import { Request, Response } from "express"

interface AuthRequest extends Request {
   userId?: any;
}

export const room = async (req: AuthRequest, res: Response) => {

   try{
      const data = roomSchema.safeParse(req.body);
      if (!data.success) {
         res.json({
            message: "Incorrect Inputs"
         })
         return;
      }

      const userId = req.userId;

      const room = await prisma.room.create({
         data: {
            slug: data.data.name,
            admin: {
               connect: { userId: userId }
            }
         }
      })

      res.json({
         roomId: room.id
      })
   } catch(e:any) {
      res.status(401).json({message : e.message})
   }
}