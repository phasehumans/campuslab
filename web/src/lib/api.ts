import type {
    ContestRoom,
    EditorLanguage,
    ExecutionResponse,
    ProblemDetail,
    ProblemExample,
    ProblemsResponse,
    ProfileResponse,
    SubmissionDetail,
    SubmissionItem,
    User,
} from './types'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1'
const TOKEN_STORAGE_KEY = 'auth_token'

export const getAuthToken = (): string | null => {
    try {
        return localStorage.getItem(TOKEN_STORAGE_KEY)
    } catch {
        return null
    }
}

export const setAuthToken = (token: string): void => {
    try {
        localStorage.setItem(TOKEN_STORAGE_KEY, token)
    } catch {
        // ignore storage errors
    }
}

export const clearAuthToken = (): void => {
    try {
        localStorage.removeItem(TOKEN_STORAGE_KEY)
    } catch {
        // ignore storage errors
    }
}

type RequestOptions = {
    allowUnauthorized?: boolean
}

class ApiError extends Error {
    status: number
    data: unknown

    constructor(message: string, status: number, data: unknown) {
        super(message)
        this.name = 'ApiError'
        this.status = status
        this.data = data
    }
}

const getErrorMessage = (payload: unknown, fallback: string) => {
    if (payload && typeof payload === 'object' && 'message' in payload) {
        const message = payload.message
        if (typeof message === 'string') {
            return message
        }
    }

    return fallback
}

const request = async <T>(
    path: string,
    init?: RequestInit,
    options?: RequestOptions
): Promise<T | null> => {
    const token = getAuthToken()
    const authHeaders: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {}

    const response = await fetch(`${API_BASE_URL}${path}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders,
            ...(init?.headers ?? {}),
        },
        ...init,
    })

    const payload = await response.json().catch(() => null)

    if (!response.ok) {
        if (options?.allowUnauthorized && response.status === 401) {
            clearAuthToken()
            return null
        }

        throw new ApiError(getErrorMessage(payload, 'Request failed'), response.status, payload)
    }

    return payload as T
}

export const getApiErrorMessage = (error: unknown, fallback = 'Something went wrong') => {
    if (error instanceof ApiError) {
        return error.message
    }

    if (error instanceof Error) {
        return error.message
    }

    return fallback
}

export const getCurrentUser = async () => {
    const response = await request<{ user: User }>('/auth/me', undefined, {
        allowUnauthorized: true,
    })

    return response?.user ?? null
}

export const oauthLogin = async (payload: {
    provider: 'github' | 'google'
    code?: string
    redirectUri?: string
}) => {
    const response = await request<{ user: User; token: string }>('/auth/oauth', {
        method: 'POST',
        body: JSON.stringify({
            provider: payload.provider,
            code: payload.code,
            redirect_uri: payload.redirectUri,
        }),
    })

    if (response?.token) {
        setAuthToken(response.token)
    }

    return response!.user
}

export const logoutUser = async () => {
    clearAuthToken()
    await request('/auth/logout', {
        method: 'POST',
    }).catch(() => null)
}

export type GetProblemsParams = {
    page?: number
    limit?: number
    search?: string
    difficulty?: string
    topic?: string
    status?: string
}

export const getProblems = async (params?: GetProblemsParams): Promise<ProblemsResponse> => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', String(params.page))
    if (params?.limit) searchParams.set('limit', String(params.limit))
    if (params?.search && params.search.trim()) searchParams.set('search', params.search.trim())
    if (params?.difficulty && params.difficulty !== 'All') {
        searchParams.set('difficulty', params.difficulty)
    }
    if (params?.topic && params.topic !== 'All') {
        searchParams.set('topic', params.topic)
    }
    if (params?.status && params.status !== 'All') {
        searchParams.set('status', params.status)
    }

    const query = searchParams.toString()
    const endpoint = query ? `/problems?${query}` : '/problems'
    const response = await request<ProblemsResponse>(endpoint)
    return response!
}

export const getProblem = async (problemId: string) => {
    const response = await request<{ problem: ProblemDetail }>(`/problems/${problemId}`)
    return response!.problem
}

export const runCode = async (payload: {
    sourceCode: string
    language: EditorLanguage
    testcases: ProblemExample[]
}) => {
    const response = await request<{ execution: ExecutionResponse }>('/code-execution/run', {
        method: 'POST',
        body: JSON.stringify({
            sourceCode: payload.sourceCode,
            language: payload.language,
            testcases: payload.testcases.map((testcase) => ({
                input: testcase.input,
                output: testcase.output,
            })),
        }),
    })

    return response!.execution
}

export const submitCode = async (payload: {
    problemId: string
    sourceCode: string
    language: EditorLanguage
    contestCode?: string | null
    solveDurationSeconds?: number
}) => {
    const response = await request<{
        submission: unknown
        message: string
        execution: ExecutionResponse
    }>('/submission/submit', {
        method: 'POST',
        body: JSON.stringify({
            problemId: payload.problemId,
            sourceCode: payload.sourceCode,
            language: payload.language,
            contestCode: payload.contestCode || undefined,
            solveDurationSeconds: payload.solveDurationSeconds,
        }),
    })

    return response!
}

export const getProblemSubmissions = async (problemId: string): Promise<SubmissionItem[]> => {
    const response = await request<{ submissions: SubmissionItem[] }>(
        `/submission/problem/${problemId}`,
        undefined,
        { allowUnauthorized: true }
    )
    return response?.submissions ?? []
}

export const getSubmissionById = async (submissionId: string): Promise<SubmissionDetail | null> => {
    const response = await request<{ submission: SubmissionDetail }>(
        `/submission/${submissionId}`,
        undefined,
        { allowUnauthorized: true }
    )
    return response?.submission ?? null
}

export const getProfile = async () => {
    const response = await request<{ profile: ProfileResponse }>('/profile/me')
    return response!.profile
}

export const createContestRoom = async (payload: {
    maxParticipants: number | null
    topics: string[]
    questionCount: number
    timeLimitMinutes: number
}) => {
    const response = await request<{ room: ContestRoom }>('/contests/rooms', {
        method: 'POST',
        body: JSON.stringify(payload),
    })

    return response!.room
}

export const joinContestRoom = async (roomCode: string) => {
    const response = await request<{ room: ContestRoom }>(`/contests/rooms/${roomCode}/join`, {
        method: 'POST',
    })

    return response!.room
}

export const getContestRoom = async (roomCode: string) => {
    const response = await request<{ room: ContestRoom }>(`/contests/rooms/${roomCode}`)
    return response!.room
}
