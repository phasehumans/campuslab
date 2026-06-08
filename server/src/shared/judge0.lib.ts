import axios from 'axios'

type Judge0BatchTokenResponse = { token: string }

type Judge0Result = {
    status: { id: number; description: string }
    stdout: string | null
    stderr: string | null
    compile_output: string | null
    memory: number | null
    time: string | null
}

type Judge0BatchResultsResponse = { submissions: Judge0Result[] }

type Judge0Submission = {
    source_code: string
    language_id: number
    stdin?: string
    expected_output?: string
    cpu_time_limit?: number
    memory_limit?: number
}

const judge0LanguageRegistry = {
    cpp: {
        aliases: ['cpp', 'c++'],
        id: 54,
        label: 'C++',
    },
    python: {
        aliases: ['python', 'py'],
        id: 71,
        label: 'Python',
    },
    java: {
        aliases: ['java'],
        id: 62,
        label: 'Java',
    },
    rust: {
        aliases: ['rust', 'rs'],
        id: 73,
        label: 'Rust',
    },
} as const

const getJudge0ApiUrl = () => {
    const apiUrl = process.env.JUDGE_API_URL

    if (!apiUrl) {
        throw new Error('JUDGE_API_URL is not configured')
    }

    return apiUrl
}

export const normalizeJudge0LanguageKey = (language: string) => {
    const normalized = language.trim().toLowerCase()

    return (
        Object.entries(judge0LanguageRegistry).find(([, config]) =>
            config.aliases.some((alias) => alias === normalized)
        )?.[0] ?? null
    )
}

export const getJudge0LanguageId = (language: string): number | null => {
    const normalizedKey = normalizeJudge0LanguageKey(language)
    return normalizedKey ? judge0LanguageRegistry[normalizedKey].id : null
}

export const getJudge0LanguageDisplayName = (language: string) => {
    const normalizedKey = normalizeJudge0LanguageKey(language)
    return normalizedKey ? judge0LanguageRegistry[normalizedKey].label : language
}

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

export const pollBatchResults = async (tokens: string[]): Promise<Judge0Result[]> => {
    while (true) {
        const { data } = await axios.get<Judge0BatchResultsResponse>(
            `${getJudge0ApiUrl()}/submissions/batch`,
            {
                params: {
                    tokens: tokens.join(','),
                    base64_encoded: false,
                },
            }
        )

        const results = data.submissions
        const isAllDone = results.every(
            (result) => result.status.id !== 1 && result.status.id !== 2
        )

        if (isAllDone) {
            return results
        }

        await sleep(1000)
    }
}

export const submitBatch = async (
    submissions: Judge0Submission[]
): Promise<Judge0BatchTokenResponse[]> => {
    const { data } = await axios.post<
        Judge0BatchTokenResponse[] | { submissions: Judge0BatchTokenResponse[] }
    >(`${getJudge0ApiUrl()}/submissions/batch?base64_encoded=false`, {
        submissions,
    })

    // Judge0 CE returns a plain array, while some versions wrap it in { submissions: [...] }
    const tokens = Array.isArray(data) ? data : data.submissions

    if (!tokens || tokens.length === 0) {
        throw new Error('Judge0 returned no submission tokens')
    }

    return tokens
}

export const getJudge0LanguageName = (languageId: number): string => {
    return (
        Object.values(judge0LanguageRegistry).find((language) => language.id === languageId)
            ?.label ?? 'Unknown'
    )
}
