import {
    getJudge0LanguageDisplayName,
    getJudge0LanguageId,
    normalizeJudge0LanguageKey,
    pollBatchResults,
    submitBatch,
} from './judge0.lib.js'

export type ExecutionTestcase = {
    input: string
    output?: string
}

export type ExecutionResult = {
    testcase: number
    input: string
    stdout: string
    expectedOutput: string | null
    passed: boolean
    compileOutput: string | null
    stderr: string | null
    status: string
    memory: string | null
    time: string | null
}

type ExecuteCodeParams = {
    sourceCode: string
    language: string
    testcases: ExecutionTestcase[]
}

export const executeCodeAgainstTestcases = async ({
    sourceCode,
    language,
    testcases,
}: ExecuteCodeParams) => {
    const languageKey = normalizeJudge0LanguageKey(language)
    const languageId = getJudge0LanguageId(language)

    if (!languageKey || !languageId) {
        throw new Error(`Unsupported programming language: ${language}`)
    }

    const submissions = testcases.map((testcase) => ({
        source_code: sourceCode,
        language_id: languageId,
        stdin: testcase.input,
    }))

    const submissionResults = await submitBatch(submissions)
    const tokens = submissionResults.map((result) => result.token)
    const results = await pollBatchResults(tokens)

    const detailedResults: ExecutionResult[] = results.map((result, index) => {
        const stdout = result.stdout?.trim() ?? ''
        const expectedOutput = testcases[index]?.output?.trim() ?? null
        const passed =
            result.status.id === 3 && (expectedOutput === null ? true : stdout === expectedOutput)

        return {
            testcase: index + 1,
            input: testcases[index]?.input ?? '',
            stdout,
            expectedOutput,
            passed,
            compileOutput: result.compile_output,
            stderr: result.stderr,
            status: result.status.description,
            memory: result.memory ? `${result.memory} KB` : null,
            time: result.time ? `${result.time} sec` : null,
        }
    })

    return {
        languageKey,
        languageLabel: getJudge0LanguageDisplayName(language),
        allPassed: detailedResults.every((result) => result.passed),
        results: detailedResults,
    }
}
