type Difficulty = 'Easy' | 'Medium' | 'Hard'
type ProblemStatus = 'Solved' | 'Attempted' | 'Unsolved'
export type EditorLanguage = 'cpp'

export type User = {
    id: string
    name: string | null
    email?: string | null
    avatar?: string | null
    provider?: string | null
    role: 'ADMIN' | 'USER'
}

export type ProblemExample = {
    title?: string
    input: string
    output: string
    explanation?: string
}

type ProblemTestcase = {
    input: string
    output: string
}

export type ProblemSummary = {
    id: string
    title: string
    difficulty: Difficulty
    tags: string[]
    status: ProblemStatus
    submissionCount: number
}

export type ProblemsResponse = {
    problems: ProblemSummary[]
    total: number
    count: number
    page: number
    limit: number
    totalPages: number
    allTags: string[]
}

export type ProblemDetail = ProblemSummary & {
    description: string
    constraints: string
    examples: ProblemExample[]
    testcases: ProblemTestcase[]
    starterCodes: Partial<Record<EditorLanguage, string>>
}

type ExecutionResult = {
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

export type ExecutionResponse = {
    language: string
    allPassed: boolean
    results: ExecutionResult[]
}

export type SubmissionItem = {
    id: string
    userId: string
    problemId: string
    status: string
    language: string
    timeTaken?: string | null
    memoryUsage?: string | null
    userSolveTime?: number | null
    createdAt: string
}

export type SubmissionDetail = SubmissionItem & {
    sourceCode?: string | null
    testcases?: Array<{
        testCase: string
        passed: boolean
        stdout?: string | null
        expectedOutput?: string | null
        status: string
        timeTaken?: string | null
        memoryUsage?: string | null
    }>
}

export type SubmissionRecord = {
    id: string
    problemId: string
    title?: string
    difficulty?: Difficulty
    status: string
    language: string
    createdAt: string
}

export type ProfileResponse = {
    user: User & { createdAt: string }
    stats: {
        totalSolved: number
        byDifficulty: Array<{
            name: Difficulty
            value: number
            total: number
        }>
    }
    recentSubmissions: SubmissionRecord[]
}

type ContestQuestion = {
    id: string
    title: string
    difficulty: Difficulty
    tags: string[]
    points: number
    solved: boolean
}

type ContestLeaderboardEntry = {
    rank: number
    userId: string
    name: string
    avatar?: string | null
    score: number
    solved: number
    lastAcceptedAt: string | null
    isYou: boolean
    isDisqualified?: boolean
}

type ContestParticipant = {
    userId: string
    name: string
    avatar?: string | null
    isHost: boolean
    isDisqualified?: boolean
    disqualifiedReason?: string
}

export type ContestRoom = {
    code: string
    maxParticipants: number | null
    participantCount: number
    questionCount: number
    timeLimitMinutes: number
    topics: string[]
    startsAt: string
    endsAt: string
    isEnded?: boolean
    meJoined: boolean
    participants: ContestParticipant[]
    questions: ContestQuestion[]
    leaderboard: ContestLeaderboardEntry[]
}
