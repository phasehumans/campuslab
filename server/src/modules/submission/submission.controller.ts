import type { Request, Response } from 'express'
import { submitCodeSchema } from './submission.schema.js'
import { difficultyLabels, getSubmissionStatus, readParam } from './submission.utils.js'
import * as submissionService from './submission.service.js'

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
        const problem = await submissionService.getProblemById(problemId)

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found',
            })
        }

        const execution = await submissionService.executeCode({
            sourceCode,
            language,
            testcases: problem.testcases as Array<{ input: string; output: string }>,
        })

        const status = getSubmissionStatus(execution.results)
        const accepted = status === 'Accepted'

        const submission = await submissionService.createSubmission({
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
        })

        await submissionService.createTestCaseResults(
            execution.results.map((result) => ({
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
            }))
        )

        if (accepted) {
            await submissionService.upsertProblemSolved(userId, problemId)

            if (contestCode) {
                await submissionService.handleContestSubmission(contestCode, userId, problemId)
            }
        }

        const submissionWithTestcases = await submissionService.getSubmissionWithTestcases(submission.id)

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
        const submissions = await submissionService.getAllSubmissionsByUser(userId)

        return res.status(200).json({
            success: true,
            message: 'Submissions fetched successfully',
            submissions: submissions.map((submission) => ({
                id: submission.id,
                problemId: submission.problemId,
                title: submission.problem.title,
                difficulty: difficultyLabels[submission.problem.difficulty as keyof typeof difficultyLabels],
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
        const submissions = await submissionService.getSubmissionsByProblemAndUser(problemId, userId)

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
        const count = await submissionService.getSubmissionCountByProblemAndUser(problemId, userId)

        return res.status(200).json({
            success: true,
            message: 'Submission count fetched successfully',
            count,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}
