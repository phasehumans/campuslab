import type { Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../libs/db.js'
import {
    createContestRoomRecord,
    getContestRoomRecord,
    joinContestRoomRecord,
    type ContestRoomRecord,
} from '../libs/contestStore.js'

const createRoomSchema = z.object({
    maxParticipants: z.number().int().positive().nullable(),
    topics: z.array(z.string().min(1)).min(1),
    questionCount: z.number().int().min(1).max(10),
    timeLimitMinutes: z.number().int().min(5).max(180),
})

const readParam = (value: string | string[] | undefined): string =>
    Array.isArray(value) ? (value[0] ?? '') : (value ?? '')

const difficultyLabels = {
    EASY: 'Easy',
    MEDIUM: 'Medium',
    HARD: 'Hard',
} as const

const difficultyPoints = {
    EASY: 100,
    MEDIUM: 200,
    HARD: 300,
} as const

const shuffle = <T>(items: T[]) => {
    const copy = [...items]

    for (let index = copy.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1))
        ;[copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]]
    }

    return copy
}

const buildContestRoomResponse = async (room: ContestRoomRecord, currentUserId?: string) => {
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

export const createContestRoom = async (req: Request, res: Response) => {
    const parseData = createRoomSchema.safeParse(req.body)

    if (!parseData.success) {
        return res.status(400).json({
            success: false,
            message: 'invalid room configuration',
            errors: parseData.error.flatten(),
        })
    }

    const userId = req.user?.id
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized',
        })
    }

    try {
        const { maxParticipants, topics, questionCount, timeLimitMinutes } = parseData.data

        const matchingProblems = await db.problem.findMany({
            where: {
                tags: {
                    hasSome: topics,
                },
            },
            select: {
                id: true,
                difficulty: true,
            },
        })

        if (matchingProblems.length < questionCount) {
            return res.status(400).json({
                success: false,
                message: `Only ${matchingProblems.length} problems are available for the selected topics`,
            })
        }

        const selectedProblems = shuffle(matchingProblems).slice(0, questionCount)
        const room = await createContestRoomRecord({
            hostUserId: userId,
            maxParticipants,
            questionCount,
            timeLimitMinutes,
            topics,
            problemIds: selectedProblems.map((problem) => problem.id),
            problemPoints: Object.fromEntries(
                selectedProblems.map((problem) => [
                    problem.id,
                    difficultyPoints[problem.difficulty],
                ])
            ),
        })

        return res.status(201).json({
            success: true,
            message: 'Contest room created successfully',
            room: await buildContestRoomResponse(room, userId),
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const joinContestRoom = async (req: Request, res: Response) => {
    const userId = req.user?.id
    const roomCode = readParam(req.params.roomCode).toUpperCase()

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized',
        })
    }

    try {
        const room = await joinContestRoomRecord(roomCode, userId)

        return res.status(200).json({
            success: true,
            message: 'Joined contest room successfully',
            room: await buildContestRoomResponse(room, userId),
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: (error as Error).message,
        })
    }
}

export const getContestRoom = async (req: Request, res: Response) => {
    const roomCode = readParam(req.params.roomCode).toUpperCase()

    try {
        const room = await getContestRoomRecord(roomCode)

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Contest room not found',
            })
        }

        return res.status(200).json({
            success: true,
            room: await buildContestRoomResponse(room, req.user?.id),
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}
