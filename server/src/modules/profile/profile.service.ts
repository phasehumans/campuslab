import { db } from '../../config/db.js'

export const getUserProfileStats = async (userId: string) => {
    return Promise.all([
        db.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                prn: true,
                role: true,
                createdAt: true,
            },
        }),
        db.problem.findMany({
            select: {
                id: true,
                difficulty: true,
            },
        }),
        db.problemSolved.findMany({
            where: { userId },
            include: {
                problem: {
                    select: {
                        id: true,
                        difficulty: true,
                    },
                },
            },
        }),
        db.submission.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 8,
            include: {
                problem: {
                    select: {
                        id: true,
                        title: true,
                        difficulty: true,
                    },
                },
            },
        }),
    ])
}
