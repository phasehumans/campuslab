import type { Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../libs/db.js'
import { executeCodeAgainstTestcases } from '../libs/codeRunner.js'
import { recordContestProblemSolved } from '../libs/contestStore.js'

const submitCodeSchema = z.object({
    problemId: z.string().min(1),
    sourceCode: z.string().min(1),
    language: z.string().min(1),
    contestCode: z.string().trim().toUpperCase().nullish(),
})

const readParam = (value: string | string[] | undefined): string =>
    Array.isArray(value) ? (value[0] ?? '') : (value ?? '')

const difficultyLabels = {
    EASY: 'Easy',
    MEDIUM: 'Medium',
    HARD: 'Hard',
} as const

const getSubmissionStatus = (
    results: Array<{
        passed: boolean
        status: string
        stderr: string | null
        compileOutput: string | null
    }>
) => {
    if (results.every((result) => result.passed)) {
        return 'Accepted'
    }

    const failedResult = results.find((result) => !result.passed)

    if (failedResult?.compileOutput) {
        return 'Compilation Error'
    }

    if (failedResult?.stderr && failedResult.status !== 'Accepted') {
        return failedResult.status
    }

    return 'Wrong Answer'
}

export const submitCode = async (req: Request, res: Response) => {
    const parsed = submitCodeSchema.safeParse(req.body)
    const userId = req.user?.id

    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            message: 'invalid input',
            details: parsed.error.flatten(),
        })
    }

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized',
        })
    }

    try {
        const { problemId, sourceCode, language, contestCode } = parsed.data
        const problem = await db.problem.findUnique({
            where: { id: problemId },
        })

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found',
            })
        }

        const execution = await executeCodeAgainstTestcases({
            sourceCode,
            language,
            testcases: problem.testcases as Array<{ input: string; output: string }>,
        })

        const status = getSubmissionStatus(execution.results)
        const accepted = status === 'Accepted'

        const submission = await db.submission.create({
            data: {
                userId,
                problemId,
                sourceCode,
                language: execution.languageLabel,
                stdin: JSON.stringify(execution.results.map((result) => result.input)),
                stdout: JSON.stringify(execution.results.map((result) => result.stdout)),
                stderr: execution.results.some((result) => result.stderr)
                    ? JSON.stringify(execution.results.map((result) => result.stderr))
                    : null,
                compilationOutput: execution.results.some((result) => result.compileOutput)
                    ? JSON.stringify(execution.results.map((result) => result.compileOutput))
                    : null,
                status,
                memoryUsage: execution.results.some((result) => result.memory)
                    ? JSON.stringify(execution.results.map((result) => result.memory))
                    : null,
                timeTaken: execution.results.some((result) => result.time)
                    ? JSON.stringify(execution.results.map((result) => result.time))
                    : null,
            },
        })

        await db.testCaseResult.createMany({
            data: execution.results.map((result) => ({
                submissionId: submission.id,
                testCase: String(result.testcase),
                passed: result.passed,
                stdout: result.stdout,
                expectedOutput: result.expectedOutput,
                stderr: result.stderr,
                compileOutput: result.compileOutput,
                status: result.status,
                memoryUsage: result.memory,
                timeTaken: result.time,
            })),
        })

        if (accepted) {
            await db.problemSolved.upsert({
                where: {
                    userId_problemId: {
                        userId,
                        problemId,
                    },
                },
                update: {},
                create: {
                    userId,
                    problemId,
                },
            })

            if (contestCode) {
                try {
                    await recordContestProblemSolved(contestCode, userId, problemId)
                } catch {
                    // Contest updates are best-effort and should not hide the submission result.
                }
            }
        }

        const submissionWithTestcases = await db.submission.findUnique({
            where: { id: submission.id },
            include: { testcases: true },
        })

        return res.status(201).json({
            success: true,
            message: accepted ? 'Submission accepted' : 'Submission evaluated',
            submission: submissionWithTestcases,
            execution: {
                language: execution.languageLabel,
                allPassed: execution.allPassed,
                results: execution.results,
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

export const getAllSubmissions = async (req: Request, res: Response) => {
    const userId = req.user?.id

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized',
        })
    }

    try {
        const submissions = await db.submission.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                problem: {
                    select: {
                        id: true,
                        title: true,
                        difficulty: true,
                    },
                },
            },
        })

        return res.status(200).json({
            success: true,
            message: 'Submissions fetched successfully',
            submissions: submissions.map((submission) => ({
                id: submission.id,
                problemId: submission.problemId,
                title: submission.problem.title,
                difficulty: difficultyLabels[submission.problem.difficulty],
                status: submission.status,
                language: submission.language,
                createdAt: submission.createdAt,
            })),
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const getSubmissionsById = async (req: Request, res: Response) => {
    const userId = req.user?.id
    const problemId = readParam(req.params.id)

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized',
        })
    }

    try {
        const submissions = await db.submission.findMany({
            where: {
                userId,
                problemId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                testcases: true,
            },
        })

        return res.status(200).json({
            success: true,
            message: 'Submissions fetched successfully',
            submissions,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const getSubmissionCountById = async (req: Request, res: Response) => {
    const userId = req.user?.id
    const problemId = readParam(req.params.id)

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized',
        })
    }

    try {
        const submissionCount = await db.submission.count({
            where: {
                userId,
                problemId,
            },
        })

        return res.status(200).json({
            success: true,
            message: 'Submission count fetched successfully',
            count: submissionCount,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}
