import { describe, it, expect, spyOn, afterEach, beforeEach } from 'bun:test'
import { db } from '../../src/config/db.js'
import {
    createContestRoomRecord,
    getContestRoomRecord,
    joinContestRoomRecord,
    recordContestProblemSolved,
    buildContestRoomResponse,
    type ContestRoomRecord,
} from '../../src/modules/contest/contest.service.js'
import { createRoomSchema } from '../../src/modules/contest/contest.schema.js'
import {
    readParam,
    shuffle,
    difficultyLabels,
    difficultyPoints,
} from '../../src/modules/contest/contest.utils.js'

describe('Contest Module Unit Tests', () => {
    let originalContestRoom: any
    let originalProblem: any
    let originalUser: any

    let mockContestRoom: any
    let mockProblem: any
    let mockUser: any

    beforeEach(() => {
        originalContestRoom = Object.getOwnPropertyDescriptor(db, 'contestRoom')
        originalProblem = Object.getOwnPropertyDescriptor(db, 'problem')
        originalUser = Object.getOwnPropertyDescriptor(db, 'user')

        mockContestRoom = {
            findMany: async () => [] as any[],
            create: async () => ({}) as any,
            findUnique: async () => null as any,
            update: async () => ({}) as any,
        }

        mockProblem = {
            findMany: async () => [] as any[],
        }

        mockUser = {
            findMany: async () => [] as any[],
            findUnique: async () => null as any,
        }

        Object.defineProperty(db, 'contestRoom', {
            value: mockContestRoom,
            configurable: true,
            writable: true,
        })
        Object.defineProperty(db, 'problem', {
            value: mockProblem,
            configurable: true,
            writable: true,
        })
        Object.defineProperty(db, 'user', {
            value: mockUser,
            configurable: true,
            writable: true,
        })
    })

    afterEach(() => {
        if (originalContestRoom) Object.defineProperty(db, 'contestRoom', originalContestRoom)
        if (originalProblem) Object.defineProperty(db, 'problem', originalProblem)
        if (originalUser) Object.defineProperty(db, 'user', originalUser)
    })

    // ----------------------------------------------------
    // Schema Validation Tests
    // ----------------------------------------------------
    describe('createRoomSchema', () => {
        it('should pass validation with valid configuration', () => {
            const validData = {
                maxParticipants: 10,
                topics: ['arrays', 'dp'],
                questionCount: 5,
                timeLimitMinutes: 60,
            }
            const result = createRoomSchema.safeParse(validData)
            expect(result.success).toBe(true)
        })

        it('should accept null for maxParticipants', () => {
            const validData = {
                maxParticipants: null,
                topics: ['arrays'],
                questionCount: 1,
                timeLimitMinutes: 10,
            }
            const result = createRoomSchema.safeParse(validData)
            expect(result.success).toBe(true)
        })

        it('should fail validation when questionCount is less than 1', () => {
            const invalidData = {
                maxParticipants: 5,
                topics: ['arrays'],
                questionCount: 0,
                timeLimitMinutes: 30,
            }
            const result = createRoomSchema.safeParse(invalidData)
            expect(result.success).toBe(false)
        })

        it('should fail validation when questionCount is greater than 10', () => {
            const invalidData = {
                maxParticipants: 5,
                topics: ['arrays'],
                questionCount: 11,
                timeLimitMinutes: 30,
            }
            const result = createRoomSchema.safeParse(invalidData)
            expect(result.success).toBe(false)
        })

        it('should fail validation when timeLimitMinutes is less than 5', () => {
            const invalidData = {
                maxParticipants: 5,
                topics: ['arrays'],
                questionCount: 3,
                timeLimitMinutes: 4,
            }
            const result = createRoomSchema.safeParse(invalidData)
            expect(result.success).toBe(false)
        })

        it('should fail validation when timeLimitMinutes is greater than 180', () => {
            const invalidData = {
                maxParticipants: 5,
                topics: ['arrays'],
                questionCount: 3,
                timeLimitMinutes: 181,
            }
            const result = createRoomSchema.safeParse(invalidData)
            expect(result.success).toBe(false)
        })

        it('should fail validation when topics array is empty', () => {
            const invalidData = {
                maxParticipants: 5,
                topics: [],
                questionCount: 3,
                timeLimitMinutes: 30,
            }
            const result = createRoomSchema.safeParse(invalidData)
            expect(result.success).toBe(false)
        })

        it('should fail validation when topic string is empty', () => {
            const invalidData = {
                maxParticipants: 5,
                topics: [''],
                questionCount: 3,
                timeLimitMinutes: 30,
            }
            const result = createRoomSchema.safeParse(invalidData)
            expect(result.success).toBe(false)
        })
    })

    // ----------------------------------------------------
    // Utility Function Tests
    // ----------------------------------------------------
    describe('contest.utils', () => {
        describe('readParam', () => {
            it('should return string as-is when string is provided', () => {
                expect(readParam('ROOM123')).toBe('ROOM123')
            })

            it('should return first string when array of strings is provided', () => {
                expect(readParam(['ROOM123', 'ROOM456'])).toBe('ROOM123')
            })

            it('should return empty string when undefined is provided', () => {
                expect(readParam(undefined)).toBe('')
            })

            it('should return empty string when empty array is provided', () => {
                expect(readParam([])).toBe('')
            })
        })

        describe('shuffle', () => {
            it('should return an array with the same elements and length', () => {
                const input = [1, 2, 3, 4, 5]
                const result = shuffle(input)
                expect(result).toHaveLength(5)
                expect(result.sort()).toEqual(input.sort())
            })

            it('should not mutate original array', () => {
                const input = [1, 2, 3, 4, 5]
                const copy = [...input]
                shuffle(input)
                expect(input).toEqual(copy)
            })
        })

        describe('difficulty constants', () => {
            it('should map difficulty labels correctly', () => {
                expect(difficultyLabels.EASY).toBe('Easy')
                expect(difficultyLabels.MEDIUM).toBe('Medium')
                expect(difficultyLabels.HARD).toBe('Hard')
            })

            it('should map difficulty points correctly', () => {
                expect(difficultyPoints.EASY).toBe(100)
                expect(difficultyPoints.MEDIUM).toBe(200)
                expect(difficultyPoints.HARD).toBe(300)
            })
        })
    })

    // ----------------------------------------------------
    // Service Function Unit Tests
    // ----------------------------------------------------
    describe('Contest Service Tests', () => {
        describe('createContestRoomRecord', () => {
            it('should create room record with generated room code and host participant', async () => {
                const spyFindMany = spyOn(mockContestRoom, 'findMany').mockResolvedValue([
                    { code: 'EXIST1' },
                ] as any)

                const mockCreatedRoom = {
                    code: 'ABC123',
                    hostUserId: 'user-host',
                    maxParticipants: 5,
                    questionCount: 2,
                    timeLimitMinutes: 30,
                    topics: ['math'],
                    problemIds: ['p1', 'p2'],
                    problemPoints: { p1: 100, p2: 200 },
                    participants: [{ userId: 'user-host', joinedAt: new Date().toISOString() }],
                    standings: {
                        'user-host': { score: 0, solvedProblemIds: [], lastAcceptedAt: null },
                    },
                    createdAt: new Date(),
                    startsAt: new Date(),
                    endsAt: new Date(Date.now() + 30 * 60 * 1000),
                }

                const spyCreate = spyOn(mockContestRoom, 'create').mockResolvedValue(mockCreatedRoom as any)

                const result = await createContestRoomRecord({
                    hostUserId: 'user-host',
                    maxParticipants: 5,
                    questionCount: 2,
                    timeLimitMinutes: 30,
                    topics: ['math'],
                    problemIds: ['p1', 'p2'],
                    problemPoints: { p1: 100, p2: 200 },
                })

                expect(spyFindMany).toHaveBeenCalled()
                expect(spyCreate).toHaveBeenCalled()
                expect(result.hostUserId).toBe('user-host')
                expect(result.maxParticipants).toBe(5)
                expect(result.participants).toHaveLength(1)
                expect(result.participants[0].userId).toBe('user-host')
                expect(result.standings['user-host'].score).toBe(0)
            })

            it('should throw error if unique code cannot be generated', async () => {
                const originalRandom = Math.random
                Math.random = () => 0

                const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
                const repeatingCode = alphabet[0].repeat(6)

                spyOn(mockContestRoom, 'findMany').mockResolvedValue([
                    { code: repeatingCode },
                ] as any)

                try {
                    await expect(
                        createContestRoomRecord({
                            hostUserId: 'user-host',
                            maxParticipants: 5,
                            questionCount: 2,
                            timeLimitMinutes: 30,
                            topics: ['math'],
                            problemIds: ['p1'],
                            problemPoints: { p1: 100 },
                        })
                    ).rejects.toThrow('Failed to generate a unique room code')
                } finally {
                    Math.random = originalRandom
                }
            })
        })

        describe('getContestRoomRecord', () => {
            it('should return room record when code exists (case-insensitive search)', async () => {
                const mockRoom = {
                    code: 'ROOM12',
                    hostUserId: 'user-host',
                    maxParticipants: 10,
                    questionCount: 2,
                    timeLimitMinutes: 60,
                    topics: ['dp'],
                    problemIds: ['p1', 'p2'],
                    problemPoints: { p1: 100, p2: 200 },
                    participants: [{ userId: 'user-host', joinedAt: new Date().toISOString() }],
                    standings: {
                        'user-host': { score: 0, solvedProblemIds: [], lastAcceptedAt: null },
                    },
                    createdAt: new Date(),
                    startsAt: new Date(),
                    endsAt: new Date(Date.now() + 60 * 60 * 1000),
                }

                const spyFindUnique = spyOn(mockContestRoom, 'findUnique').mockResolvedValue(mockRoom as any)

                const result = await getContestRoomRecord('room12')
                expect(spyFindUnique).toHaveBeenCalledWith({ where: { code: 'ROOM12' } })
                expect(result).not.toBeNull()
                expect(result?.code).toBe('ROOM12')
            })

            it('should return null when room code does not exist', async () => {
                spyOn(mockContestRoom, 'findUnique').mockResolvedValue(null)

                const result = await getContestRoomRecord('INVALID')
                expect(result).toBeNull()
            })
        })

        describe('joinContestRoomRecord', () => {
            const getBaseRoom = () => ({
                code: 'ROOM12',
                hostUserId: 'user-host',
                maxParticipants: 2,
                questionCount: 1,
                timeLimitMinutes: 30,
                topics: ['graphs'],
                problemIds: ['p1'],
                problemPoints: { p1: 100 },
                participants: [{ userId: 'user-host', joinedAt: new Date().toISOString() }],
                standings: {
                    'user-host': { score: 0, solvedProblemIds: [], lastAcceptedAt: null },
                },
                createdAt: new Date(),
                startsAt: new Date(),
                endsAt: new Date(Date.now() + 30 * 60 * 1000),
            })

            it('should allow a new user to join an active room', async () => {
                const room = getBaseRoom()
                spyOn(mockContestRoom, 'findUnique').mockResolvedValue(room as any)

                const updatedRoom = {
                    ...room,
                    participants: [
                        ...room.participants,
                        { userId: 'user-2', joinedAt: new Date().toISOString() },
                    ],
                    standings: {
                        ...room.standings,
                        'user-2': { score: 0, solvedProblemIds: [], lastAcceptedAt: null },
                    },
                }

                const spyUpdate = spyOn(mockContestRoom, 'update').mockResolvedValue(updatedRoom as any)

                const result = await joinContestRoomRecord('ROOM12', 'user-2')

                expect(spyUpdate).toHaveBeenCalled()
                expect(result.participants).toHaveLength(2)
                expect(result.participants.some((p) => p.userId === 'user-2')).toBe(true)
                expect(result.standings['user-2']).toBeDefined()
            })

            it('should not duplicate participant if same user joins again', async () => {
                const room = getBaseRoom()
                spyOn(mockContestRoom, 'findUnique').mockResolvedValue(room as any)

                const spyUpdate = spyOn(mockContestRoom, 'update').mockImplementation(async ({ data }: any) => ({
                    ...room,
                    participants: data.participants,
                    standings: data.standings,
                }))

                const result = await joinContestRoomRecord('ROOM12', 'user-host')

                expect(spyUpdate).toHaveBeenCalled()
                expect(result.participants).toHaveLength(1)
            })

            it('should throw error when contest room is not found', async () => {
                spyOn(mockContestRoom, 'findUnique').mockResolvedValue(null)

                expect(joinContestRoomRecord('NOROOM', 'user-1')).rejects.toThrow('Contest room not found')
            })

            it('should throw error when contest room has already ended', async () => {
                const endedRoom = {
                    ...getBaseRoom(),
                    endsAt: new Date(Date.now() - 10000),
                }

                spyOn(mockContestRoom, 'findUnique').mockResolvedValue(endedRoom as any)

                expect(joinContestRoomRecord('ROOM12', 'user-2')).rejects.toThrow(
                    'Contest room has already ended'
                )
            })

            it('should throw error when contest room is full', async () => {
                const fullRoom = {
                    ...getBaseRoom(),
                    maxParticipants: 2,
                    participants: [
                        { userId: 'user-host', joinedAt: new Date().toISOString() },
                        { userId: 'user-2', joinedAt: new Date().toISOString() },
                    ],
                }

                spyOn(mockContestRoom, 'findUnique').mockResolvedValue(fullRoom as any)

                expect(joinContestRoomRecord('ROOM12', 'user-3')).rejects.toThrow(
                    'Contest room is full'
                )
            })
        })

        describe('recordContestProblemSolved', () => {
            const getBaseRoom = () => ({
                code: 'ROOM12',
                hostUserId: 'user-host',
                maxParticipants: 5,
                questionCount: 2,
                timeLimitMinutes: 30,
                topics: ['strings'],
                problemIds: ['p1', 'p2'],
                problemPoints: { p1: 100, p2: 200 },
                participants: [{ userId: 'user-host', joinedAt: new Date().toISOString() }],
                standings: {
                    'user-host': { score: 0, solvedProblemIds: [], lastAcceptedAt: null },
                },
                createdAt: new Date(),
                startsAt: new Date(),
                endsAt: new Date(Date.now() + 30 * 60 * 1000),
            })

            it('should update score, solvedProblemIds, and lastAcceptedAt when problem is solved for the first time', async () => {
                const room = getBaseRoom()
                spyOn(mockContestRoom, 'findUnique').mockResolvedValue(room as any)

                const nowStr = new Date().toISOString()
                const updatedRoom = {
                    ...room,
                    standings: {
                        'user-host': {
                            score: 100,
                            solvedProblemIds: ['p1'],
                            lastAcceptedAt: nowStr,
                        },
                    },
                }

                const spyUpdate = spyOn(mockContestRoom, 'update').mockResolvedValue(updatedRoom as any)

                const result = await recordContestProblemSolved('ROOM12', 'user-host', 'p1')

                expect(spyUpdate).toHaveBeenCalled()
                expect(result.standings['user-host'].score).toBe(100)
                expect(result.standings['user-host'].solvedProblemIds).toContain('p1')
                expect(result.standings['user-host'].lastAcceptedAt).toBe(nowStr)
            })

            it('should not update score or lastAcceptedAt if problem was already solved', async () => {
                const roomAlreadySolved = {
                    ...getBaseRoom(),
                    standings: {
                        'user-host': {
                            score: 100,
                            solvedProblemIds: ['p1'],
                            lastAcceptedAt: '2026-01-01T00:00:00.000Z',
                        },
                    },
                }

                spyOn(mockContestRoom, 'findUnique').mockResolvedValue(roomAlreadySolved as any)
                const spyUpdate = spyOn(mockContestRoom, 'update')

                const result = await recordContestProblemSolved('ROOM12', 'user-host', 'p1')

                expect(spyUpdate).not.toHaveBeenCalled()
                expect(result.standings['user-host'].score).toBe(100)
            })

            it('should throw error if contest room does not exist', async () => {
                spyOn(mockContestRoom, 'findUnique').mockResolvedValue(null)

                expect(recordContestProblemSolved('NOROOM', 'user-host', 'p1')).rejects.toThrow(
                    'Contest room not found'
                )
            })

            it('should throw error if problem does not belong to contest room', async () => {
                spyOn(mockContestRoom, 'findUnique').mockResolvedValue(getBaseRoom() as any)

                expect(recordContestProblemSolved('ROOM12', 'user-host', 'p99')).rejects.toThrow(
                    'Problem does not belong to this contest room'
                )
            })

            it('should throw error if user has not joined contest room', async () => {
                spyOn(mockContestRoom, 'findUnique').mockResolvedValue(getBaseRoom() as any)

                expect(recordContestProblemSolved('ROOM12', 'unjoined-user', 'p1')).rejects.toThrow(
                    'You have not joined this contest room'
                )
            })

            it('should return unchanged room if contest room has ended', async () => {
                const endedRoom = {
                    ...getBaseRoom(),
                    endsAt: new Date(Date.now() - 10000),
                }

                spyOn(mockContestRoom, 'findUnique').mockResolvedValue(endedRoom as any)
                const spyUpdate = spyOn(mockContestRoom, 'update')

                const result = await recordContestProblemSolved('ROOM12', 'user-host', 'p1')

                expect(spyUpdate).not.toHaveBeenCalled()
                expect(result.standings['user-host'].score).toBe(0)
            })
        })

        describe('buildContestRoomResponse', () => {
            it('should format room details, questions, and leaderboard correctly', async () => {
                const mockRoom: ContestRoomRecord = {
                    code: 'ROOM12',
                    hostUserId: 'u1',
                    maxParticipants: 10,
                    questionCount: 2,
                    timeLimitMinutes: 60,
                    topics: ['arrays'],
                    problemIds: ['p1', 'p2'],
                    problemPoints: { p1: 100, p2: 200 },
                    participants: [
                        { userId: 'u1', joinedAt: '2026-08-01T00:00:00.000Z' },
                        { userId: 'u2', joinedAt: '2026-08-01T00:01:00.000Z' },
                    ],
                    standings: {
                        u1: {
                            score: 300,
                            solvedProblemIds: ['p1', 'p2'],
                            lastAcceptedAt: '2026-08-01T00:10:00.000Z',
                        },
                        u2: {
                            score: 100,
                            solvedProblemIds: ['p1'],
                            lastAcceptedAt: '2026-08-01T00:05:00.000Z',
                        },
                    },
                    createdAt: '2026-08-01T00:00:00.000Z',
                    startsAt: '2026-08-01T00:00:00.000Z',
                    endsAt: '2026-08-01T01:00:00.000Z',
                }

                const mockProblems = [
                    { id: 'p1', title: 'Two Sum', difficulty: 'EASY' as const, tags: ['arrays'] },
                    { id: 'p2', title: '3Sum', difficulty: 'MEDIUM' as const, tags: ['arrays'] },
                ]

                const mockUsers = [
                    { id: 'u1', name: 'Alice', prn: 'PRN1' },
                    { id: 'u2', name: 'Bob', prn: 'PRN2' },
                ]

                spyOn(mockProblem, 'findMany').mockResolvedValue(mockProblems as any)
                spyOn(mockUser, 'findMany').mockResolvedValue(mockUsers as any)

                const response = await buildContestRoomResponse(mockRoom, 'u1')

                expect(response.code).toBe('ROOM12')
                expect(response.participantCount).toBe(2)
                expect(response.meJoined).toBe(true)
                expect(response.questions).toHaveLength(2)
                expect(response.questions[0]).toEqual({
                    id: 'p1',
                    title: 'Two Sum',
                    difficulty: 'Easy',
                    tags: ['arrays'],
                    points: 100,
                    solved: true,
                })
                expect(response.leaderboard).toHaveLength(2)
                expect(response.leaderboard[0].rank).toBe(1)
                expect(response.leaderboard[0].userId).toBe('u1')
                expect(response.leaderboard[0].score).toBe(300)
                expect(response.leaderboard[0].isYou).toBe(true)
                expect(response.leaderboard[1].rank).toBe(2)
                expect(response.leaderboard[1].userId).toBe('u2')
                expect(response.leaderboard[1].isYou).toBe(false)
            })

            it('should sort leaderboard by score desc, then solved desc, then lastAcceptedAt asc', async () => {
                const mockRoom: ContestRoomRecord = {
                    code: 'ROOM12',
                    hostUserId: 'u1',
                    maxParticipants: 5,
                    questionCount: 3,
                    timeLimitMinutes: 60,
                    topics: ['algo'],
                    problemIds: ['p1', 'p2', 'p3'],
                    problemPoints: { p1: 100, p2: 100, p3: 100 },
                    participants: [
                        { userId: 'u1', joinedAt: '2026-08-01T00:00:00.000Z' },
                        { userId: 'u2', joinedAt: '2026-08-01T00:00:00.000Z' },
                        { userId: 'u3', joinedAt: '2026-08-01T00:00:00.000Z' },
                        { userId: 'u4', joinedAt: '2026-08-01T00:00:00.000Z' },
                    ],
                    standings: {
                        u1: {
                            score: 200,
                            solvedProblemIds: ['p1', 'p2'],
                            lastAcceptedAt: '2026-08-01T00:20:00.000Z',
                        },
                        u2: {
                            score: 200,
                            solvedProblemIds: ['p1', 'p2'],
                            lastAcceptedAt: '2026-08-01T00:10:00.000Z',
                        },
                        u3: {
                            score: 200,
                            solvedProblemIds: ['p1', 'p2'],
                            lastAcceptedAt: null,
                        },
                        u4: {
                            score: 100,
                            solvedProblemIds: ['p1'],
                            lastAcceptedAt: '2026-08-01T00:05:00.000Z',
                        },
                    },
                    createdAt: '2026-08-01T00:00:00.000Z',
                    startsAt: '2026-08-01T00:00:00.000Z',
                    endsAt: '2026-08-01T01:00:00.000Z',
                }

                const mockProblems = [
                    { id: 'p1', title: 'P1', difficulty: 'EASY' as const, tags: [] },
                    { id: 'p2', title: 'P2', difficulty: 'EASY' as const, tags: [] },
                    { id: 'p3', title: 'P3', difficulty: 'EASY' as const, tags: [] },
                ]

                const mockUsers = [
                    { id: 'u1', name: 'User 1', prn: 'PRN1' },
                    { id: 'u2', name: 'User 2', prn: 'PRN2' },
                    { id: 'u3', name: 'User 3', prn: 'PRN3' },
                    { id: 'u4', name: 'User 4', prn: 'PRN4' },
                ]

                spyOn(mockProblem, 'findMany').mockResolvedValue(mockProblems as any)
                spyOn(mockUser, 'findMany').mockResolvedValue(mockUsers as any)

                const response = await buildContestRoomResponse(mockRoom)

                expect(response.leaderboard[0].userId).toBe('u2')
                expect(response.leaderboard[1].userId).toBe('u1')
                expect(response.leaderboard[2].userId).toBe('u3')
                expect(response.leaderboard[3].userId).toBe('u4')
            })

            it('should fallback to name sorting when scores, solved, and lastAcceptedAt are null/equal', async () => {
                const mockRoom: ContestRoomRecord = {
                    code: 'ROOM12',
                    hostUserId: 'u1',
                    maxParticipants: 5,
                    questionCount: 1,
                    timeLimitMinutes: 30,
                    topics: ['math'],
                    problemIds: ['p1'],
                    problemPoints: { p1: 100 },
                    participants: [
                        { userId: 'u1', joinedAt: '2026-08-01T00:00:00.000Z' },
                        { userId: 'u2', joinedAt: '2026-08-01T00:00:00.000Z' },
                    ],
                    standings: {
                        u1: { score: 0, solvedProblemIds: [], lastAcceptedAt: null },
                        u2: { score: 0, solvedProblemIds: [], lastAcceptedAt: null },
                    },
                    createdAt: '2026-08-01T00:00:00.000Z',
                    startsAt: '2026-08-01T00:00:00.000Z',
                    endsAt: '2026-08-01T01:00:00.000Z',
                }

                spyOn(mockProblem, 'findMany').mockResolvedValue([
                    { id: 'p1', title: 'P1', difficulty: 'EASY' as const, tags: [] },
                ] as any)

                spyOn(mockUser, 'findMany').mockResolvedValue([
                    { id: 'u1', name: 'Zoe', prn: 'PRN1' },
                    { id: 'u2', name: 'Adam', prn: 'PRN2' },
                ] as any)

                const response = await buildContestRoomResponse(mockRoom)

                expect(response.leaderboard[0].name).toBe('Adam')
                expect(response.leaderboard[1].name).toBe('Zoe')
            })

            it('should handle anonymous users and default points fallback', async () => {
                const mockRoom: ContestRoomRecord = {
                    code: 'ROOM12',
                    hostUserId: 'u1',
                    maxParticipants: 5,
                    questionCount: 1,
                    timeLimitMinutes: 30,
                    topics: ['math'],
                    problemIds: ['p1'],
                    problemPoints: {},
                    participants: [{ userId: 'u-anon', joinedAt: '2026-08-01T00:00:00.000Z' }],
                    standings: {},
                    createdAt: '2026-08-01T00:00:00.000Z',
                    startsAt: '2026-08-01T00:00:00.000Z',
                    endsAt: '2026-08-01T01:00:00.000Z',
                }

                spyOn(mockProblem, 'findMany').mockResolvedValue([
                    { id: 'p1', title: 'P1', difficulty: 'HARD' as const, tags: [] },
                ] as any)

                spyOn(mockUser, 'findMany').mockResolvedValue([])

                const response = await buildContestRoomResponse(mockRoom)

                expect(response.questions[0].points).toBe(300)
                expect(response.leaderboard[0].name).toBe('Anonymous')
                expect(response.leaderboard[0].prn).toBe('')
            })
        })
    })
})
