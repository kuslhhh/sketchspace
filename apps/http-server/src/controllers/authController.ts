import { Request, Response } from "express"
import { signinSchema, signupSchema } from "@repo/common-config/schema"
import { prisma } from "@repo/db-config/db"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/tokens.js"

export const signup = async (req: Request, res: Response) => {
   try {
      const data = signupSchema.parse(req.body)
      const existing = await prisma.user.findUnique({
         where: { email: data.email }
      })
      if (existing) return res.status(400).json({ message: "User already exists" })

      const hashedPassword = await bcrypt.hash(data.password, 10)
      const newUser = prisma.user.create({
         data: {
            username: data.username,
            email: data.email,
            password: hashedPassword
         }
      })
      return res.status(201).json({
         message: "Signup successful",

      })
   } catch (e: any) {
      res.status(400).json({ message: e.errors || e.message })
   }

}

export const signin = async (req: Request, res: Response) => {
   try {
      const data = signinSchema.parse(req.body)
      const user = users.find((u) => u.email === data.email)
      if (!user) return res.status(404).json({ message: "User not found" })

      const isMatch = await bcrypt.compare(data.password, user.password)
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" })

      const token = generateToken(user.id)
      res.cookie("token", token, { httpOnly: true, secure: false })
      res.json({ message: "Signin successfull" })
   } catch (e: any) {
      res.status(400).json({ message: e.errors || e.message })
   }
}

export const room = (req: Request, res: Response) => {
   res.json({
      message: "Welcome to your SketchSpace room!"
   })
}