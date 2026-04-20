import type { Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../libs/db.js'
import { executeCodeAgainstTestcases } from '../libs/codeRunner.js'
import type { Difficulty } from '../generated/prisma/enums.js'

const testcaseSchema = z.object({
    input: z.string(),
    output: z.string(),
})

const problemSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
    tags: z.array(z.string()).min(1),
    examples: z.array(
        z.object({
            title: z.string().optional(),
            input: z.string(),
            output: z.string(),
            explanation: z.string().optional(),
        })
    ),
    constraints: z.string().min(1),
    testcases: z.array(testcaseSchema).nonempty(),
    codesnippets: z.record(z.string(), z.string()),
    editorial: z.string().optional(),
    hints: z.string().optional(),
    referneceSolution: z.record(z.string(), z.string()),
})

const difficultyLabels = {
    EASY: 'Easy',
    MEDIUM: 'Medium',
    HARD: 'Hard',
} as const

const readParam = (value: string | string[] | undefined): string =>
    Array.isArray(value) ? (value[0] ?? '') : (value ?? '')

const getProblemStatus = (
    problemId: string,
    solvedProblemIds: Set<string>,
    attemptedProblemIds: Set<string>
) => {
    if (solvedProblemIds.has(problemId)) {
        return 'Solved'
    }

    if (attemptedProblemIds.has(problemId)) {
        return 'Attempted'
    }

    return 'Unsolved'
}

const getUserProblemMeta = async (userId?: string) => {
    if (!userId) {
        return {
            solvedProblemIds: new Set<string>(),
            attemptedProblemIds: new Set<string>(),
            submissionCounts: new Map<string, number>(),
        }
    }

    const [solvedProblems, submissions] = await Promise.all([
        db.problemSolved.findMany({
            where: { userId },
            select: { problemId: true },
        }),
        db.submission.findMany({
            where: { userId },
            select: { problemId: true },
        }),
    ])

    const solvedProblemIds = new Set(solvedProblems.map((problem) => problem.problemId))
    const attemptedProblemIds = new Set(submissions.map((submission) => submission.problemId))
    const submissionCounts = new Map<string, number>()

    for (const submission of submissions) {
        submissionCounts.set(
            submission.problemId,
            (submissionCounts.get(submission.problemId) ?? 0) + 1
        )
    }

    return {
        solvedProblemIds,
        attemptedProblemIds,
        submissionCounts,
    }
}

const serializeProblemSummary = (
    problem: {
        id: string
        title: string
        difficulty: Difficulty
        tags: string[]
    },
    meta: {
        solvedProblemIds: Set<string>
        attemptedProblemIds: Set<string>
        submissionCounts: Map<string, number>
    }
) => ({
    id: problem.id,
    title: problem.title,
    difficulty: difficultyLabels[problem.difficulty],
    tags: problem.tags,
    status: getProblemStatus(problem.id, meta.solvedProblemIds, meta.attemptedProblemIds),
    submissionCount: meta.submissionCounts.get(problem.id) ?? 0,
})

const validateReferenceSolutions = async (
    testcases: Array<{ input: string; output: string }>,
    referneceSolution: Record<string, string>
): Promise<{ ok: true } | { ok: false; message: string }> => {
    for (const [language, sourceCode] of Object.entries(referneceSolution)) {
        try {
            const execution = await executeCodeAgainstTestcases({
                sourceCode,
                language,
                testcases,
            })

            if (!execution.allPassed) {
                return {
                    ok: false,
                    message: `Reference solution failed validation for ${language}`,
                }
            }
        } catch (error) {
            return {
                ok: false,
                message: (error as Error).message,
            }
        }
    }

    return { ok: true }
}

export const createProblem = async (req: Request, res: Response) => {
    const parseData = problemSchema.safeParse(req.body)

    if (!parseData.success) {
        return res.status(400).json({
            success: false,
            message: 'input invalid',
            error: parseData.error.flatten(),
        })
    }

    if (req.user?.role !== 'ADMIN' || !req.user?.id) {
        return res.status(403).json({
            success: false,
            message: 'you are not allowed to create problem',
        })
    }

    const validation = await validateReferenceSolutions(
        parseData.data.testcases,
        parseData.data.referneceSolution
    )

    if ('message' in validation) {
        return res.status(400).json({
            success: false,
            message: validation.message,
        })
    }

    try {
        const newProblem = await db.problem.create({
            data: {
                ...parseData.data,
                difficulty: parseData.data.difficulty as Difficulty,
                userId: req.user.id,
            },
        })

        return res.status(201).json({
            success: true,
            message: 'Problem created successfully',
            problem: newProblem,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const getAllProblems = async (req: Request, res: Response) => {
    try {
        const [problems, meta] = await Promise.all([
            db.problem.findMany({
                orderBy: {
                    createdAt: 'asc',
                },
                select: {
                    id: true,
                    title: true,
                    difficulty: true,
                    tags: true,
                },
            }),
            getUserProblemMeta(req.user?.id),
        ])

        return res.status(200).json({
            success: true,
            message: 'Problems fetched successfully',
            problems: problems.map((problem) => serializeProblemSummary(problem, meta)),
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const getProblemById = async (req: Request, res: Response) => {
    const id = readParam(req.params.id)

    try {
        const [problem, meta] = await Promise.all([
            db.problem.findUnique({
                where: {
                    id,
                },
            }),
            getUserProblemMeta(req.user?.id),
        ])

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Problem fetched successfully',
            problem: {
                ...serializeProblemSummary(problem, meta),
                description: problem.description,
                constraints: problem.constraints,
                hints: problem.hints,
                editorial: problem.editorial,
                examples: problem.examples,
                testcases: problem.testcases,
                starterCodes: problem.codesnippets,
                referenceSolutions: problem.referneceSolution,
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

export const updateProblem = async (req: Request, res: Response) => {
    const parseData = problemSchema.safeParse(req.body)

    if (!parseData.success) {
        return res.status(400).json({
            success: false,
            message: 'invalid inputs',
            error: parseData.error.flatten(),
        })
    }

    const id = readParam(req.params.id)

    try {
        const problem = await db.problem.findUnique({
            where: {
                id,
            },
        })

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found',
            })
        }

        const validation = await validateReferenceSolutions(
            parseData.data.testcases,
            parseData.data.referneceSolution
        )

        if ('message' in validation) {
            return res.status(400).json({
                success: false,
                message: validation.message,
            })
        }

        const updatedProblem = await db.problem.update({
            where: {
                id,
            },
            data: {
                ...parseData.data,
                difficulty: parseData.data.difficulty as Difficulty,
            },
        })

        return res.status(200).json({
            success: true,
            message: 'Problem updated successfully',
            problem: updatedProblem,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const deleteProblem = async (req: Request, res: Response) => {
    const id = readParam(req.params.id)

    try {
        const problem = await db.problem.findUnique({
            where: {
                id,
            },
        })

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found',
            })
        }

        await db.problem.delete({
            where: {
                id,
            },
        })

        return res.status(200).json({
            success: true,
            message: 'Problem deleted successfully',
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const getSolvedProblems = async (req: Request, res: Response) => {
    const userId = req.user?.id

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized',
        })
    }

    try {
        const [problems, meta] = await Promise.all([
            db.problem.findMany({
                where: {
                    problemSolveds: {
                        some: {
                            userId,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'asc',
                },
                select: {
                    id: true,
                    title: true,
                    difficulty: true,
                    tags: true,
                },
            }),
            getUserProblemMeta(userId),
        ])

        return res.status(200).json({
            success: true,
            message: 'Solved problems fetched successfully',
            problems: problems.map((problem) => serializeProblemSummary(problem, meta)),
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}
