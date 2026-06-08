import type { Difficulty } from '../../generated/prisma/enums.js'

export const difficultyLabels = {
    EASY: 'Easy',
    MEDIUM: 'Medium',
    HARD: 'Hard',
} as const

export const readParam = (value: string | string[] | undefined): string =>
    Array.isArray(value) ? (value[0] ?? '') : (value ?? '')

export const getProblemStatus = (
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

export const serializeProblemSummary = (
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
