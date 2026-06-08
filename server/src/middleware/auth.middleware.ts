import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { db } from '../config/db.js'

type AuthTokenPayload = {
    id: string
}

const getJwtSecret = (): string => {
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not configured')
    }
    return jwtSecret
}

const getUserFromToken = async (token?: string) => {
    if (!token) {
        return null
    }

    const verified = jwt.verify(token, getJwtSecret()) as AuthTokenPayload

    return db.user.findUnique({
        where: {
            id: verified.id,
        },
        select: {
            id: true,
            name: true,
            prn: true,
            role: true,
        },
    })
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.jwt as string | undefined

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied: no token provided',
        })
    }

    try {
        const user = await getUserFromToken(token)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            })
        }

        req.user = user
        return next()
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Invalid token',
            error: (error as Error).message,
        })
    }
}

export const optionalAuthMiddleware = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const token = req.cookies?.jwt as string | undefined

    if (!token) {
        return next()
    }

    try {
        const user = await getUserFromToken(token)

        if (user) {
            req.user = user
        }
    } catch {
        req.user = undefined
    }

    return next()
}

export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({
                message: 'Access Denied: Please login',
            })
        }

        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                role: true,
            },
        })

        if (!user || user.role !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'Access denied: admins only',
            })
        }

        return next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: (error as Error).message,
        })
    }
}
