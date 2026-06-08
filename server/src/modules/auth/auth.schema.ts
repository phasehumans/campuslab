import { z } from 'zod'

export const registerUserSchema = z.object({
    name: z.string().min(1),
    prn: z.string().min(9).max(9),
    password: z.string().min(6),
})

export const loginUserSchema = z.object({
    prn: z.string().min(9).max(9),
    password: z.string().min(1),
})
