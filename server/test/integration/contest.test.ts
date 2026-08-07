import { describe, it, expect, spyOn, afterEach, beforeEach } from 'bun:test'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import { app } from '../../src/app.js'
import { db } from '../../src/config/db.js'

describe('Contest Module Integration Tests', () => {
    const jwtSecret = process.env.JWT_SECRET || 'secret'
    const testUserId = 'test-user-1'
    const testUserCookie = `jwt=${jwt.sign({ id: testUserId }, jwtSecret)}`

    const testUser2Id = 'test-user-2'
    const testUser2Cookie = `jwt=${jwt.sign({ id: testUser2Id }, jwtSecret)}`

    let originalContestRoom: any
    let originalProblem: any
    let originalUser: any

    let mockContestRoom: any
    let mockProblem: any
    let mockUser: any

    beforeEach(() => {
        process.env.JWT_SECRET = jwtSecret

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
            findUnique: async ({ where }: any) => {
                if (where?.id === testUserId) {
                    return {
                        id: testUserId,
                        name: 'Test Host',
                        prn: 'HOST001',
                        role: 'USER',
                    }
                }
                if (where?.id === testUser2Id) {
                    return {
                        id: testUser2Id,
                        name: 'Test Joiner',
                        prn: 'JOIN002',
                        role: 'USER',
                    }
                }
                return null
            },
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
    // POST /api/v1/contests/rooms (Create Contest Room)
    // ----------------------------------------------------
    describe('POST /api/v1/contests/rooms', () => {
        it('should return 401 if user is not authenticated', async () => {
            const res = await request(app).post('/api/v1/contests/rooms').send({
                maxParticipants: 5,
                topics: ['arrays'],
                questionCount: 2,
                timeLimitMinutes: 30,
            })

            expect(res.status).toBe(401)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('Access denied: no token provided')
        })

        it('should return 404 if authenticated user does not exist in database', async () => {
            const unknownUserCookie = `jwt=${jwt.sign({ id: 'unknown-id' }, jwtSecret)}`

            const res = await request(app)
                .post('/api/v1/contests/rooms')
                .set('Cookie', [unknownUserCookie])
                .send({
                    maxParticipants: 5,
                    topics: ['arrays'],
                    questionCount: 2,
                    timeLimitMinutes: 30,
                })

            expect(res.status).toBe(404)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('User not found')
        })

        it('should return 400 if room configuration payload is invalid', async () => {
            const res = await request(app)
                .post('/api/v1/contests/rooms')
                .set('Cookie', [testUserCookie])
                .send({
                    maxParticipants: 5,
                    topics: [], // Empty topics -> invalid
                    questionCount: 0, // Less than 1 -> invalid
                    timeLimitMinutes: 2, // Less than 5 -> invalid
                })

            expect(res.status).toBe(400)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('invalid room configuration')
            expect(res.body.errors).toBeDefined()
        })

        it('should return 400 if available problems are less than questionCount', async () => {
            // Mock matching problems to return only 1 problem
            spyOn(mockProblem, 'findMany').mockResolvedValue([
                { id: 'p1', difficulty: 'EASY' },
            ] as any)

            const res = await request(app)
                .post('/api/v1/contests/rooms')
                .set('Cookie', [testUserCookie])
                .send({
                    maxParticipants: 5,
                    topics: ['arrays'],
                    questionCount: 3, // Requested 3, but only 1 available
                    timeLimitMinutes: 30,
                })

            expect(res.status).toBe(400)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('Only 1 problems are available for the selected topics')
        })

        it('should create contest room successfully (201 Created)', async () => {
            const mockMatchingProblems = [
                { id: 'p1', title: 'Problem 1', difficulty: 'EASY', tags: ['arrays'] },
                { id: 'p2', title: 'Problem 2', difficulty: 'MEDIUM', tags: ['arrays'] },
            ]

            spyOn(mockProblem, 'findMany').mockImplementation(async () => {
                // Return problems matching query
                return mockMatchingProblems as any
            })

            spyOn(mockUser, 'findMany').mockResolvedValue([
                { id: testUserId, name: 'Test Host', prn: 'HOST001' },
            ] as any)

            spyOn(mockContestRoom, 'findMany').mockResolvedValue([])

            const now = new Date()
            const createdRoomRecord = {
                code: 'ROOM99',
                hostUserId: testUserId,
                maxParticipants: 5,
                questionCount: 2,
                timeLimitMinutes: 30,
                topics: ['arrays'],
                problemIds: ['p1', 'p2'],
                problemPoints: { p1: 100, p2: 200 },
                participants: [{ userId: testUserId, joinedAt: now.toISOString() }],
                standings: {
                    [testUserId]: { score: 0, solvedProblemIds: [], lastAcceptedAt: null },
                },
                createdAt: now,
                startsAt: now,
                endsAt: new Date(now.getTime() + 30 * 60 * 1000),
            }

            spyOn(mockContestRoom, 'create').mockResolvedValue(createdRoomRecord as any)

            const res = await request(app)
                .post('/api/v1/contests/rooms')
                .set('Cookie', [testUserCookie])
                .send({
                    maxParticipants: 5,
                    topics: ['arrays'],
                    questionCount: 2,
                    timeLimitMinutes: 30,
                })

            expect(res.status).toBe(201)
            expect(res.body.success).toBe(true)
            expect(res.body.message).toBe('Contest room created successfully')
            expect(res.body.room).toBeDefined()
            expect(res.body.room.code).toBe('ROOM99')
            expect(res.body.room.meJoined).toBe(true)
            expect(res.body.room.questions).toHaveLength(2)
            expect(res.body.room.leaderboard).toHaveLength(1)
            expect(res.body.room.leaderboard[0].isYou).toBe(true)
        })
    })

    // ----------------------------------------------------
    // POST /api/v1/contests/rooms/:roomCode/join
    // ----------------------------------------------------
    describe('POST /api/v1/contests/rooms/:roomCode/join', () => {
        it('should return 401 if user is not authenticated', async () => {
            const res = await request(app).post('/api/v1/contests/rooms/ROOM99/join')

            expect(res.status).toBe(401)
            expect(res.body.success).toBe(false)
        })

        it('should return 400 if room does not exist', async () => {
            spyOn(mockContestRoom, 'findUnique').mockResolvedValue(null)

            const res = await request(app)
                .post('/api/v1/contests/rooms/NOROOM/join')
                .set('Cookie', [testUser2Cookie])

            expect(res.status).toBe(400)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('Contest room not found')
        })

        it('should return 400 if contest room has ended', async () => {
            const endedRoom = {
                code: 'ROOM99',
                hostUserId: testUserId,
                maxParticipants: 10,
                questionCount: 1,
                timeLimitMinutes: 30,
                topics: ['arrays'],
                problemIds: ['p1'],
                problemPoints: { p1: 100 },
                participants: [{ userId: testUserId, joinedAt: new Date().toISOString() }],
                standings: {
                    [testUserId]: { score: 0, solvedProblemIds: [], lastAcceptedAt: null },
                },
                createdAt: new Date(),
                startsAt: new Date(),
                endsAt: new Date(Date.now() - 10000), // In the past
            }

            spyOn(mockContestRoom, 'findUnique').mockResolvedValue(endedRoom as any)

            const res = await request(app)
                .post('/api/v1/contests/rooms/ROOM99/join')
                .set('Cookie', [testUser2Cookie])

            expect(res.status).toBe(400)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('Contest room has already ended')
        })

        it('should return 400 if contest room is full', async () => {
            const fullRoom = {
                code: 'ROOM99',
                hostUserId: testUserId,
                maxParticipants: 1, // Limit 1 participant
                questionCount: 1,
                timeLimitMinutes: 30,
                topics: ['arrays'],
                problemIds: ['p1'],
                problemPoints: { p1: 100 },
                participants: [{ userId: testUserId, joinedAt: new Date().toISOString() }],
                standings: {
                    [testUserId]: { score: 0, solvedProblemIds: [], lastAcceptedAt: null },
                },
                createdAt: new Date(),
                startsAt: new Date(),
                endsAt: new Date(Date.now() + 30 * 60 * 1000),
            }

            spyOn(mockContestRoom, 'findUnique').mockResolvedValue(fullRoom as any)

            const res = await request(app)
                .post('/api/v1/contests/rooms/ROOM99/join')
                .set('Cookie', [testUser2Cookie])

            expect(res.status).toBe(400)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('Contest room is full')
        })

        it('should join contest room successfully (200 OK)', async () => {
            const now = new Date()
            const activeRoom = {
                code: 'ROOM99',
                hostUserId: testUserId,
                maxParticipants: 10,
                questionCount: 1,
                timeLimitMinutes: 30,
                topics: ['arrays'],
                problemIds: ['p1'],
                problemPoints: { p1: 100 },
                participants: [{ userId: testUserId, joinedAt: now.toISOString() }],
                standings: {
                    [testUserId]: { score: 0, solvedProblemIds: [], lastAcceptedAt: null },
                },
                createdAt: now,
                startsAt: now,
                endsAt: new Date(now.getTime() + 30 * 60 * 1000),
            }

            const updatedRoom = {
                ...activeRoom,
                participants: [
                    ...activeRoom.participants,
                    { userId: testUser2Id, joinedAt: now.toISOString() },
                ],
                standings: {
                    ...activeRoom.standings,
                    [testUser2Id]: { score: 0, solvedProblemIds: [], lastAcceptedAt: null },
                },
            }

            spyOn(mockContestRoom, 'findUnique').mockResolvedValue(activeRoom as any)
            spyOn(mockContestRoom, 'update').mockResolvedValue(updatedRoom as any)

            spyOn(mockProblem, 'findMany').mockResolvedValue([
                { id: 'p1', title: 'Problem 1', difficulty: 'EASY', tags: ['arrays'] },
            ] as any)

            spyOn(mockUser, 'findMany').mockResolvedValue([
                { id: testUserId, name: 'Test Host', prn: 'HOST001' },
                { id: testUser2Id, name: 'Test Joiner', prn: 'JOIN002' },
            ] as any)

            const res = await request(app)
                .post('/api/v1/contests/rooms/room99/join') // Testing case insensitivity
                .set('Cookie', [testUser2Cookie])

            expect(res.status).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.message).toBe('Joined contest room successfully')
            expect(res.body.room).toBeDefined()
            expect(res.body.room.participantCount).toBe(2)
            expect(res.body.room.meJoined).toBe(true)
        })
    })

    // ----------------------------------------------------
    // GET /api/v1/contests/rooms/:roomCode
    // ----------------------------------------------------
    describe('GET /api/v1/contests/rooms/:roomCode', () => {
        it('should return 404 if room does not exist', async () => {
            spyOn(mockContestRoom, 'findUnique').mockResolvedValue(null)

            const res = await request(app).get('/api/v1/contests/rooms/NOROOM')

            expect(res.status).toBe(404)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('Contest room not found')
        })

        it('should return room details for unauthenticated request (meJoined = false)', async () => {
            const now = new Date()
            const roomRecord = {
                code: 'ROOM99',
                hostUserId: testUserId,
                maxParticipants: 10,
                questionCount: 1,
                timeLimitMinutes: 30,
                topics: ['arrays'],
                problemIds: ['p1'],
                problemPoints: { p1: 100 },
                participants: [{ userId: testUserId, joinedAt: now.toISOString() }],
                standings: {
                    [testUserId]: { score: 0, solvedProblemIds: [], lastAcceptedAt: null },
                },
                createdAt: now,
                startsAt: now,
                endsAt: new Date(now.getTime() + 30 * 60 * 1000),
            }

            spyOn(mockContestRoom, 'findUnique').mockResolvedValue(roomRecord as any)
            spyOn(mockProblem, 'findMany').mockResolvedValue([
                { id: 'p1', title: 'Problem 1', difficulty: 'EASY', tags: ['arrays'] },
            ] as any)
            spyOn(mockUser, 'findMany').mockResolvedValue([
                { id: testUserId, name: 'Test Host', prn: 'HOST001' },
            ] as any)

            const res = await request(app).get('/api/v1/contests/rooms/ROOM99')

            expect(res.status).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.room).toBeDefined()
            expect(res.body.room.code).toBe('ROOM99')
            expect(res.body.room.meJoined).toBe(false)
            expect(res.body.room.leaderboard[0].isYou).toBe(false)
        })

        it('should return room details for authenticated user who joined room (meJoined = true)', async () => {
            const now = new Date()
            const roomRecord = {
                code: 'ROOM99',
                hostUserId: testUserId,
                maxParticipants: 10,
                questionCount: 1,
                timeLimitMinutes: 30,
                topics: ['arrays'],
                problemIds: ['p1'],
                problemPoints: { p1: 100 },
                participants: [{ userId: testUserId, joinedAt: now.toISOString() }],
                standings: {
                    [testUserId]: { score: 0, solvedProblemIds: [], lastAcceptedAt: null },
                },
                createdAt: now,
                startsAt: now,
                endsAt: new Date(now.getTime() + 30 * 60 * 1000),
            }

            spyOn(mockContestRoom, 'findUnique').mockResolvedValue(roomRecord as any)
            spyOn(mockProblem, 'findMany').mockResolvedValue([
                { id: 'p1', title: 'Problem 1', difficulty: 'EASY', tags: ['arrays'] },
            ] as any)
            spyOn(mockUser, 'findMany').mockResolvedValue([
                { id: testUserId, name: 'Test Host', prn: 'HOST001' },
            ] as any)

            const res = await request(app)
                .get('/api/v1/contests/rooms/ROOM99')
                .set('Cookie', [testUserCookie])

            expect(res.status).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.room).toBeDefined()
            expect(res.body.room.meJoined).toBe(true)
            expect(res.body.room.leaderboard[0].isYou).toBe(true)
        })
    })
})
