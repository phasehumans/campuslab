import type { Request, Response } from 'express'
import { difficultyLabels } from './profile.utils.js'
import * as profileService from './profile.service.js'

export const getMyProfile = async (req: Request, res: Response) => {
    const userId = req.user?.id

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized',
        })
    }

    try {
        const [user, problems, solvedProblems, recentSubmissions] =
            await profileService.getUserProfileStats(userId)

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
