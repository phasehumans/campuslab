import type { Request, Response } from 'express'
import { createRoomSchema } from './contest.schema.js'
import { db } from '../../config/db.js'
import { difficultyPoints, readParam, shuffle } from './contest.utils.js'
import * as contestService from './contest.service.js'

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
        const room = await contestService.createContestRoomRecord({
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
            room: await contestService.buildContestRoomResponse(room, userId),
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
        const room = await contestService.joinContestRoomRecord(roomCode, userId)

        return res.status(200).json({
            success: true,
            message: 'Joined contest room successfully',
            room: await contestService.buildContestRoomResponse(room, userId),
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
        const room = await contestService.getContestRoomRecord(roomCode)

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Contest room not found',
            })
        }

        return res.status(200).json({
            success: true,
            room: await contestService.buildContestRoomResponse(room, req.user?.id),
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}
