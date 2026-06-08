export const getJwtSecret = (): string => {
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not configured')
    }
    return jwtSecret
}

export const getCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === 'production'

    return {
        httpOnly: true,
        sameSite: 'lax' as const,
        secure: isProduction,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }
}
