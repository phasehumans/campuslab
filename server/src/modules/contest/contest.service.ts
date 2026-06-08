import { db } from '../../config/db.js'

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

type CreateContestRoomInput = {
    hostUserId: string
    maxParticipants: number | null
    questionCount: number
    timeLimitMinutes: number
    topics: string[]
    problemIds: string[]
    problemPoints: Record<string, number>
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
}: CreateContestRoomInput): Promise<ContestRoomRecord> => {
    const rooms = await db.contestRoom.findMany({ select: { code: true } })
    const code = generateRoomCode(new Set(rooms.map((room) => room.code)))
    const now = new Date()
    const endsAt = new Date(now.getTime() + timeLimitMinutes * 60 * 1000)

    const participants = [{ userId: hostUserId, joinedAt: now.toISOString() }]
    const standings = {
        [hostUserId]: createEmptyStanding(),
    }

    const room = await db.contestRoom.create({
        data: {
            code,
            hostUserId,
            maxParticipants,
            questionCount,
            timeLimitMinutes,
            topics,
            problemIds,
            problemPoints: problemPoints as any,
            participants: participants as any,
            standings: standings as any,
            createdAt: now,
            startsAt: now,
            endsAt,
        },
    })

    return {
        code: room.code,
        hostUserId: room.hostUserId,
        maxParticipants: room.maxParticipants,
        questionCount: room.questionCount,
        timeLimitMinutes: room.timeLimitMinutes,
        topics: room.topics,
        problemIds: room.problemIds,
        problemPoints: room.problemPoints as Record<string, number>,
        participants: room.participants as unknown as ContestParticipantRecord[],
        standings: room.standings as unknown as Record<string, ContestStandingRecord>,
        createdAt: room.createdAt.toISOString(),
        startsAt: room.startsAt.toISOString(),
        endsAt: room.endsAt.toISOString(),
    }
}

export const getContestRoomRecord = async (code: string): Promise<ContestRoomRecord | null> => {
    const room = await db.contestRoom.findUnique({
        where: { code: code.toUpperCase() },
    })
    if (!room) return null
    return {
        code: room.code,
        hostUserId: room.hostUserId,
        maxParticipants: room.maxParticipants,
        questionCount: room.questionCount,
        timeLimitMinutes: room.timeLimitMinutes,
        topics: room.topics,
        problemIds: room.problemIds,
        problemPoints: room.problemPoints as Record<string, number>,
        participants: room.participants as unknown as ContestParticipantRecord[],
        standings: room.standings as unknown as Record<string, ContestStandingRecord>,
        createdAt: room.createdAt.toISOString(),
        startsAt: room.startsAt.toISOString(),
        endsAt: room.endsAt.toISOString(),
    }
}

export const joinContestRoomRecord = async (
    code: string,
    userId: string
): Promise<ContestRoomRecord> => {
    const room = await db.contestRoom.findUnique({
        where: { code: code.toUpperCase() },
    })

    if (!room) {
        throw new Error('Contest room not found')
    }

    const now = new Date()
    if (new Date(room.endsAt).getTime() <= now.getTime()) {
        throw new Error('Contest room has already ended')
    }

    const participants = room.participants as unknown as ContestParticipantRecord[]
    const standings = room.standings as unknown as Record<string, ContestStandingRecord>

    if (!participants.some((participant) => participant.userId === userId)) {
        if (room.maxParticipants !== null && participants.length >= Number(room.maxParticipants)) {
            throw new Error('Contest room is full')
        }

        participants.push({
            userId,
            joinedAt: now.toISOString(),
        })
    }

    if (!standings[userId]) {
        standings[userId] = createEmptyStanding()
    }

    const updatedRoom = await db.contestRoom.update({
        where: { code: code.toUpperCase() },
        data: {
            participants: participants as any,
            standings: standings as any,
        },
    })

    return {
        code: updatedRoom.code,
        hostUserId: updatedRoom.hostUserId,
        maxParticipants: updatedRoom.maxParticipants,
        questionCount: updatedRoom.questionCount,
        timeLimitMinutes: updatedRoom.timeLimitMinutes,
        topics: updatedRoom.topics,
        problemIds: updatedRoom.problemIds,
        problemPoints: updatedRoom.problemPoints as Record<string, number>,
        participants: updatedRoom.participants as unknown as ContestParticipantRecord[],
        standings: updatedRoom.standings as unknown as Record<string, ContestStandingRecord>,
        createdAt: updatedRoom.createdAt.toISOString(),
        startsAt: updatedRoom.startsAt.toISOString(),
        endsAt: updatedRoom.endsAt.toISOString(),
    }
}

export const recordContestProblemSolved = async (
    code: string,
    userId: string,
    problemId: string
): Promise<ContestRoomRecord> => {
    const room = await db.contestRoom.findUnique({
        where: { code: code.toUpperCase() },
    })

    if (!room) {
        throw new Error('Contest room not found')
    }

    if (!room.problemIds.includes(problemId)) {
        throw new Error('Problem does not belong to this contest room')
    }

    const participants = room.participants as unknown as ContestParticipantRecord[]
    if (!participants.some((participant) => participant.userId === userId)) {
        throw new Error('You have not joined this contest room')
    }

    const now = new Date()
    if (new Date(room.endsAt).getTime() <= now.getTime()) {
        return {
            code: room.code,
            hostUserId: room.hostUserId,
            maxParticipants: room.maxParticipants,
            questionCount: room.questionCount,
            timeLimitMinutes: room.timeLimitMinutes,
            topics: room.topics,
            problemIds: room.problemIds,
            problemPoints: room.problemPoints as Record<string, number>,
            participants: room.participants as unknown as ContestParticipantRecord[],
            standings: room.standings as unknown as Record<string, ContestStandingRecord>,
            createdAt: room.createdAt.toISOString(),
            startsAt: room.startsAt.toISOString(),
            endsAt: room.endsAt.toISOString(),
        }
    }

    const standings = room.standings as unknown as Record<string, ContestStandingRecord>
    const standing = standings[userId] ?? createEmptyStanding()

    if (!standing.solvedProblemIds.includes(problemId)) {
        standing.solvedProblemIds.push(problemId)
        const problemPoints = room.problemPoints as Record<string, number>
        standing.score += problemPoints[problemId] ?? 0
        standing.lastAcceptedAt = now.toISOString()
        standings[userId] = standing

        const updatedRoom = await db.contestRoom.update({
            where: { code: code.toUpperCase() },
            data: {
                standings: standings as any,
            },
        })

        return {
            code: updatedRoom.code,
            hostUserId: updatedRoom.hostUserId,
            maxParticipants: updatedRoom.maxParticipants,
            questionCount: updatedRoom.questionCount,
            timeLimitMinutes: updatedRoom.timeLimitMinutes,
            topics: updatedRoom.topics,
            problemIds: updatedRoom.problemIds,
            problemPoints: updatedRoom.problemPoints as Record<string, number>,
            participants: updatedRoom.participants as unknown as ContestParticipantRecord[],
            standings: updatedRoom.standings as unknown as Record<string, ContestStandingRecord>,
            createdAt: updatedRoom.createdAt.toISOString(),
            startsAt: updatedRoom.startsAt.toISOString(),
            endsAt: updatedRoom.endsAt.toISOString(),
        }
    }

    return {
        code: room.code,
        hostUserId: room.hostUserId,
        maxParticipants: room.maxParticipants,
        questionCount: room.questionCount,
        timeLimitMinutes: room.timeLimitMinutes,
        topics: room.topics,
        problemIds: room.problemIds,
        problemPoints: room.problemPoints as Record<string, number>,
        participants: room.participants as unknown as ContestParticipantRecord[],
        standings: room.standings as unknown as Record<string, ContestStandingRecord>,
        createdAt: room.createdAt.toISOString(),
        startsAt: room.startsAt.toISOString(),
        endsAt: room.endsAt.toISOString(),
    }
}
import { difficultyPoints, difficultyLabels } from './contest.utils.js'

export const buildContestRoomResponse = async (room: ContestRoomRecord, currentUserId?: string) => {
    const [problems, users] = await Promise.all([
        db.problem.findMany({
            where: {
                id: {
                    in: room.problemIds,
                },
            },
            select: {
                id: true,
                title: true,
                difficulty: true,
                tags: true,
            },
        }),
        db.user.findMany({
            where: {
                id: {
                    in: room.participants.map((participant) => participant.userId),
                },
            },
            select: {
                id: true,
                name: true,
                prn: true,
            },
        }),
    ])

    const usersById = new Map(users.map((user) => [user.id, user]))
    const problemsById = new Map(problems.map((problem) => [problem.id, problem]))
    const currentStanding = currentUserId ? room.standings[currentUserId] : undefined
    const solvedByCurrentUser = new Set(currentStanding?.solvedProblemIds ?? [])

    const questions = room.problemIds
        .map((problemId) => problemsById.get(problemId))
        .filter(Boolean)
        .map((problem) => ({
            id: problem!.id,
            title: problem!.title,
            difficulty: difficultyLabels[problem!.difficulty],
            tags: problem!.tags,
            points: room.problemPoints[problem!.id] ?? difficultyPoints[problem!.difficulty],
            solved: solvedByCurrentUser.has(problem!.id),
        }))

    const leaderboard = room.participants
        .map((participant) => {
            const user = usersById.get(participant.userId)
            const standing = room.standings[participant.userId] ?? {
                score: 0,
                solvedProblemIds: [],
                lastAcceptedAt: null,
            }

            return {
                userId: participant.userId,
                name: user?.name ?? user?.prn ?? 'Anonymous',
                prn: user?.prn ?? '',
                score: standing.score,
                solved: standing.solvedProblemIds.length,
                lastAcceptedAt: standing.lastAcceptedAt,
                isYou: participant.userId === currentUserId,
            }
        })
        .sort((left, right) => {
            if (right.score !== left.score) {
                return right.score - left.score
            }

            if (right.solved !== left.solved) {
                return right.solved - left.solved
            }

            if (!left.lastAcceptedAt && !right.lastAcceptedAt) {
                return left.name.localeCompare(right.name)
            }

            if (!left.lastAcceptedAt) {
                return 1
            }

            if (!right.lastAcceptedAt) {
                return -1
            }

            return (
                new Date(left.lastAcceptedAt).getTime() - new Date(right.lastAcceptedAt).getTime()
            )
        })
        .map((entry, index) => ({
            rank: index + 1,
            ...entry,
        }))

    return {
        code: room.code,
        maxParticipants: room.maxParticipants,
        participantCount: room.participants.length,
        questionCount: room.questionCount,
        timeLimitMinutes: room.timeLimitMinutes,
        topics: room.topics,
        startsAt: room.startsAt,
        endsAt: room.endsAt,
        meJoined: currentUserId ? room.participants.some((p) => p.userId === currentUserId) : false,
        participants: room.participants.map((participant) => {
            const user = usersById.get(participant.userId)
            return {
                userId: participant.userId,
                name: user?.name ?? user?.prn ?? 'Anonymous',
                prn: user?.prn ?? '',
                isHost: participant.userId === room.hostUserId,
            }
        }),
        questions,
        leaderboard,
    }
}
