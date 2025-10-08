import { z } from "zod"

const strongPwdRegex = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};:'",.<>/?\\|])(?!.*\s).*$/


export const signupSchema = z.object({
   username: z.string().min(3, "Username must be at least 3 characters"),
   email: z.email("Invalid email"),
   password: z.string().regex(strongPwdRegex, { message: "Password must be 8 characters, include uppercase, lowercase, number and special character, and have no spaces" })
})

export const signinSchema = z.object({
   email: z.email("Invalid email"),
   password: z.string().regex(strongPwdRegex, { message: "Password must be 8 characters, include uppercase, lowercase, number and special character, and have no spaces" })
})

export const roomSchema = z.object({
   name: z.string().min(3).max(20)
})