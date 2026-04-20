import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserRole } from '../generated/prisma/enums.js'
import { z } from 'zod'
import { db } from '../libs/db.js'

const getJwtSecret = (): string => {
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not configured')
    }
    return jwtSecret
}

const getCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === 'production'

    return {
        httpOnly: true,
        sameSite: 'lax' as const,
        secure: isProduction,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }
}

const registerUserSchema = z.object({
    name: z.string().min(1),
    prn: z.string().min(9).max(9),
    password: z.string().min(6),
})

const loginUserSchema = z.object({
    prn: z.string().min(9).max(9),
    password: z.string().min(1),
})

export const registerUser = async (req: Request, res: Response) => {
    const parseData = registerUserSchema.safeParse(req.body)

    if (!parseData.success) {
        return res.status(400).json({
            success: false,
            message: 'invalid data',
            errors: parseData.error.flatten(),
        })
    }

    const { name, prn, password } = parseData.data

    try {
        const existingUser = await db.user.findUnique({
            where: {
                prn,
            },
        })

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'user already exists',
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await db.user.create({
            data: {
                prn,
                name,
                password: hashPassword,
                role: UserRole.USER,
            },
        })

        const token = jwt.sign({ id: newUser.id }, getJwtSecret(), {
            expiresIn: '7d',
        })

        res.cookie('jwt', token, getCookieOptions())

        return res.status(201).json({
            success: true,
            message: 'user registered successfully',
            user: {
                id: newUser.id,
                name: newUser.name,
                prn: newUser.prn,
                role: newUser.role,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const parseData = loginUserSchema.safeParse(req.body)

    if (!parseData.success) {
        return res.status(400).json({
            success: false,
            message: 'invalid inputs',
            errors: parseData.error.flatten(),
        })
    }

    const { prn, password } = parseData.data

    try {
        const user = await db.user.findUnique({
            where: {
                prn,
            },
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'invalid credentials',
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'invalid credentials',
            })
        }

        const token = jwt.sign({ id: user.id }, getJwtSecret(), {
            expiresIn: '7d',
        })

        res.cookie('jwt', token, getCookieOptions())

        return res.status(200).json({
            success: true,
            message: 'user logged in successfully',
            user: {
                id: user.id,
                name: user.name,
                prn: user.prn,
                role: user.role,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const logoutUser = async (_req: Request, res: Response) => {
    try {
        const { maxAge: _maxAge, ...clearCookieOptions } = getCookieOptions()

        res.clearCookie('jwt', clearCookieOptions)

        return res.status(200).json({
            success: true,
            message: 'user logged out successfully',
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'unauthorized',
            })
        }

        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'user not found',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'User profile fetched successfully',
            user: {
                id: user.id,
                name: user.name,
                prn: user.prn,
                role: user.role,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}
