import { db } from '../../config/db.js'
import { executeCodeAgainstTestcases } from '../../shared/codeRunner.js'
import { recordContestProblemSolved } from '../contest/contest.service.js'
import type { Prisma } from '../../generated/prisma/client.js'

export const getProblemById = async (id: string) => {
    return db.problem.findUnique({
        where: { id },
    })
}

export const createSubmission = async (data: Prisma.SubmissionUncheckedCreateInput) => {
    return db.submission.create({ data })
}

export const createTestCaseResults = async (data: Prisma.TestCaseResultCreateManyInput[]) => {
    return db.testCaseResult.createMany({ data })
}

export const upsertProblemSolved = async (userId: string, problemId: string) => {
    return db.problemSolved.upsert({
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
}

export const handleContestSubmission = async (contestCode: string, userId: string, problemId: string) => {
    try {
        await recordContestProblemSolved(contestCode, userId, problemId)
    } catch {
        // Contest updates are best-effort and should not hide the submission result.
    }
}

export const getSubmissionWithTestcases = async (id: string) => {
    return db.submission.findUnique({
        where: { id },
        include: { testcases: true },
    })
}

export const getAllSubmissionsByUser = async (userId: string) => {
    return db.submission.findMany({
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
}

export const getSubmissionsByProblemAndUser = async (problemId: string, userId: string) => {
    return db.submission.findMany({
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
}

export const getSubmissionCountByProblemAndUser = async (problemId: string, userId: string) => {
    return db.submission.count({
        where: {
            userId,
            problemId,
        },
    })
}

export const executeCode = executeCodeAgainstTestcases
