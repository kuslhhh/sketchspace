import { Request, Response } from "express"


export const room = (req: Request, res: Response) => {
   res.json({
      message: "Welcome to your SketchSpace room!"
   })
}