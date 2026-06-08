import type {
    ContestRoom,
    EditorLanguage,
    ExecutionResponse,
    ProblemDetail,
    ProblemExample,
    ProblemSummary,
    ProfileResponse,
    User,
} from './types'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1'

type RequestOptions = {
    allowUnauthorized?: boolean
}

export class ApiError extends Error {
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
    const response = await fetch(`${API_BASE_URL}${path}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(init?.headers ?? {}),
        },
        ...init,
    })

    const payload = await response.json().catch(() => null)

    if (!response.ok) {
        if (options?.allowUnauthorized && response.status === 401) {
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

export const loginUser = async (payload: { prn: string; password: string }) => {
    const response = await request<{ user: User }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
    })

    return response!.user
}

export const registerUser = async (payload: { name: string; prn: string; password: string }) => {
    const response = await request<{ user: User }>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
    })

    return response!.user
}

export const logoutUser = async () => {
    await request('/auth/logout', {
        method: 'POST',
    })
}

export const getProblems = async () => {
    const response = await request<{ problems: ProblemSummary[] }>('/problems')
    return response!.problems
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
}) => {
    const response = await request<{
        submission: unknown
        message: string
        execution: ExecutionResponse
    }>('/submission/submit', {
        method: 'POST',
        body: JSON.stringify(payload),
    })

    return response!
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
