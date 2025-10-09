import {JWT_SECRET} from "@repo/backend-config/config"
import jwt from "jsonwebtoken"

export const generateToken = (userId: string | number) => {
   return jwt.sign({ 
      userId: userId 
   }, JWT_SECRET as string, {
      expiresIn: "1d"
   })
}
