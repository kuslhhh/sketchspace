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
      const newUser = await prisma.user.create({
         data: {
            username: data.username,
            email: data.email,
            password: hashedPassword
         }
      })

      const token = generateToken(newUser.userId)
      res.cookie("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "lax",
         maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      return res.json({
         message: "Signin successful",
         user: {
            id: newUser.userId,
            username: newUser.username,
            email: newUser.email
         }
      })
   } catch (e: any) {
      res.status(400).json({ message: e.errors || e.message })
   }
}

export const signin = async (req: Request, res: Response) => {
   try {
      const data = signinSchema.parse(req.body)
      const user = await prisma.user.findUnique({
         where: { email: data.email }
      })
      if (!user) return res.status(404).json({ message: "User not found" })

      const isMatch = await bcrypt.compare(data.password, user.password)
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" })

      const token = generateToken(user.userId)
      res.cookie("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "lax",
         maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      return res.json({
         message: "Signin successfull",
         user: {
            id: user.userId,
            username: user.username,
            email: user.email
         }

      })
   } catch (e: any) {
      res.status(400).json({ message: e.errors || e.message })
   }
}

export const logout = (req: Request, res: Response) => {
   res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
   })

   res.status(200).json({message: "Logout successful"})
}