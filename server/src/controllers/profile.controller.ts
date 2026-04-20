import type { Request, Response } from 'express'
import { db } from '../libs/db.js'

const difficultyLabels = {
    EASY: 'Easy',
    MEDIUM: 'Medium',
    HARD: 'Hard',
} as const

export const getMyProfile = async (req: Request, res: Response) => {
    const userId = req.user?.id

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized',
        })
    }

    try {
        const [user, problems, solvedProblems, recentSubmissions] = await Promise.all([
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

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'user not found',
            })
        }

        const totals = {
            Easy: problems.filter((problem) => problem.difficulty === 'EASY').length,
            Medium: problems.filter((problem) => problem.difficulty === 'MEDIUM').length,
            Hard: problems.filter((problem) => problem.difficulty === 'HARD').length,
        }

        const solved = {
            Easy: solvedProblems.filter((problem) => problem.problem.difficulty === 'EASY').length,
            Medium: solvedProblems.filter((problem) => problem.problem.difficulty === 'MEDIUM')
                .length,
            Hard: solvedProblems.filter((problem) => problem.problem.difficulty === 'HARD').length,
        }

        return res.status(200).json({
            success: true,
            profile: {
                user,
                stats: {
                    totalSolved: solvedProblems.length,
                    byDifficulty: [
                        {
                            name: 'Easy',
                            value: solved.Easy,
                            total: totals.Easy,
                        },
                        {
                            name: 'Medium',
                            value: solved.Medium,
                            total: totals.Medium,
                        },
                        {
                            name: 'Hard',
                            value: solved.Hard,
                            total: totals.Hard,
                        },
                    ],
                },
                recentSubmissions: recentSubmissions.map((submission) => ({
                    id: submission.id,
                    problemId: submission.problemId,
                    title: submission.problem.title,
                    difficulty: difficultyLabels[submission.problem.difficulty],
                    status: submission.status,
                    language: submission.language,
                    createdAt: submission.createdAt,
                })),
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
