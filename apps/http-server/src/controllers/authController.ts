import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import { signinSchema, signupSchema } from "../schemas/authSchema.js"
import { password } from "bun"
import { generateToken } from "../utils/tokens.js"

const users: any[] = []

export const signup = async (req: Request, res: Response) => {
   try {
      const data = signupSchema.parse(req.body)
      const existing = users.find((u) => u.email === data.email)
      if (existing) return res.status(400).json({ message: "User already exists" })

      const hashedPassword = await bcrypt.hash(data.password, 10)
      const newUser = {
         id: Date.now().toString,
         ...data,
         password: hashedPassword
      }
      users.push(newUser)
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