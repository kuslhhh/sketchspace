import {JWT_SECRET} from "@repo/backend-config/config"
import jwt from "jsonwebtoken"

export const generateToken = (userId: string) => {
   return jwt.sign({ 
      id: userId 
   }, JWT_SECRET as string, {
      expiresIn: "1d"
   })
}
