import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export type ContestParticipantRecord = {
    userId: string
    joinedAt: string
}

export type ContestStandingRecord = {
    score: number
    solvedProblemIds: string[]
    lastAcceptedAt: string | null
}

export type ContestRoomRecord = {
    code: string
    hostUserId: string
    maxParticipants: number | null
    questionCount: number
    timeLimitMinutes: number
    topics: string[]
    problemIds: string[]
    problemPoints: Record<string, number>
    participants: ContestParticipantRecord[]
    standings: Record<string, ContestStandingRecord>
    createdAt: string
    startsAt: string
    endsAt: string
}

type ContestStore = {
    rooms: ContestRoomRecord[]
}

type CreateContestRoomInput = {
    hostUserId: string
    maxParticipants: number | null
    questionCount: number
    timeLimitMinutes: number
    topics: string[]
    problemIds: string[]
    problemPoints: Record<string, number>
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const storePath = path.resolve(__dirname, '../../data/contest-rooms.json')

const ensureStore = async () => {
    await fs.mkdir(path.dirname(storePath), { recursive: true })
    try {
        await fs.access(storePath)
    } catch {
        await fs.writeFile(storePath, JSON.stringify({ rooms: [] }, null, 2))
    }
}

const readStore = async (): Promise<ContestStore> => {
    await ensureStore()
    const raw = await fs.readFile(storePath, 'utf-8')
    return JSON.parse(raw) as ContestStore
}

const writeStore = async (store: ContestStore) => {
    await fs.writeFile(storePath, JSON.stringify(store, null, 2))
}

const generateRoomCode = (existingCodes: Set<string>) => {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

    for (let attempt = 0; attempt < 100; attempt += 1) {
        let code = ''
        for (let index = 0; index < 6; index += 1) {
            code += alphabet[Math.floor(Math.random() * alphabet.length)]
        }

        if (!existingCodes.has(code)) {
            return code
        }
    }

    throw new Error('Failed to generate a unique room code')
}

const createEmptyStanding = (): ContestStandingRecord => ({
    score: 0,
    solvedProblemIds: [],
    lastAcceptedAt: null,
})

export const createContestRoomRecord = async ({
    hostUserId,
    maxParticipants,
    questionCount,
    timeLimitMinutes,
    topics,
    problemIds,
    problemPoints,
}: CreateContestRoomInput) => {
    const store = await readStore()
    const now = new Date()
    const code = generateRoomCode(new Set(store.rooms.map((room) => room.code)))

    const room: ContestRoomRecord = {
        code,
        hostUserId,
        maxParticipants,
        questionCount,
        timeLimitMinutes,
        topics,
        problemIds,
        problemPoints,
        participants: [{ userId: hostUserId, joinedAt: now.toISOString() }],
        standings: {
            [hostUserId]: createEmptyStanding(),
        },
        createdAt: now.toISOString(),
        startsAt: now.toISOString(),
        endsAt: new Date(now.getTime() + timeLimitMinutes * 60 * 1000).toISOString(),
    }

    store.rooms.push(room)
    await writeStore(store)
    return room
}

export const getContestRoomRecord = async (code: string) => {
    const store = await readStore()
    return store.rooms.find((room) => room.code === code.toUpperCase()) ?? null
}

export const joinContestRoomRecord = async (code: string, userId: string) => {
    const store = await readStore()
    const room = store.rooms.find((item) => item.code === code.toUpperCase())

    if (!room) {
        throw new Error('Contest room not found')
    }

    const now = new Date()
    if (new Date(room.endsAt).getTime() <= now.getTime()) {
        throw new Error('Contest room has already ended')
    }

    if (!room.participants.some((participant) => participant.userId === userId)) {
        if (
            room.maxParticipants !== null &&
            room.participants.length >= Number(room.maxParticipants)
        ) {
            throw new Error('Contest room is full')
        }

        room.participants.push({
            userId,
            joinedAt: now.toISOString(),
        })
    }

    room.standings[userId] = room.standings[userId] ?? createEmptyStanding()
    await writeStore(store)
    return room
}

export const recordContestProblemSolved = async (
    code: string,
    userId: string,
    problemId: string
) => {
    const store = await readStore()
    const room = store.rooms.find((item) => item.code === code.toUpperCase())

    if (!room) {
        throw new Error('Contest room not found')
    }

    if (!room.problemIds.includes(problemId)) {
        throw new Error('Problem does not belong to this contest room')
    }

    if (!room.participants.some((participant) => participant.userId === userId)) {
        throw new Error('You have not joined this contest room')
    }

    const now = new Date()
    if (new Date(room.endsAt).getTime() <= now.getTime()) {
        return room
    }

    const standing = room.standings[userId] ?? createEmptyStanding()

    if (!standing.solvedProblemIds.includes(problemId)) {
        standing.solvedProblemIds.push(problemId)
        standing.score += room.problemPoints[problemId] ?? 0
        standing.lastAcceptedAt = now.toISOString()
        room.standings[userId] = standing
        await writeStore(store)
    }

    return room
}
