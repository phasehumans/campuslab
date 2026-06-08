export const readParam = (value: string | string[] | undefined): string =>
    Array.isArray(value) ? (value[0] ?? '') : (value ?? '')

export const difficultyLabels = {
    EASY: 'Easy',
    MEDIUM: 'Medium',
    HARD: 'Hard',
} as const

export const getSubmissionStatus = (
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
