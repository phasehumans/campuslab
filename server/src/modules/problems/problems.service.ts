import { db } from '../../config/db.js'
import { executeCodeAgainstTestcases } from '../../shared/codeRunner.js'
import type { Difficulty, Prisma } from '../../generated/prisma/client.js'

export const getUserProblemMeta = async (userId?: string) => {
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

export const validateReferenceSolutions = async (
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

export const createProblem = async (data: Prisma.ProblemUncheckedCreateInput) => {
    return db.problem.create({
        data,
    })
}

export const getAllProblems = async () => {
    return db.problem.findMany({
        orderBy: {
            createdAt: 'asc',
        },
        select: {
            id: true,
            title: true,
            difficulty: true,
            tags: true,
        },
    })
}

export const getProblemById = async (id: string) => {
    return db.problem.findUnique({
        where: { id },
    })
}

export const updateProblem = async (id: string, data: Partial<Prisma.ProblemUpdateInput>) => {
    return db.problem.update({
        where: { id },
        data,
    })
}

export const deleteProblem = async (id: string) => {
    return db.problem.delete({
        where: { id },
    })
}

export const getSolvedProblemsByUser = async (userId: string) => {
    return db.problem.findMany({
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
    })
}
