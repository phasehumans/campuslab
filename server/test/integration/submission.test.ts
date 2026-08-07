import { describe, it, expect, spyOn, beforeEach, afterEach } from 'bun:test'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import { app } from '../../src/app.js'
import { db } from '../../src/config/db.js'
import * as submissionService from '../../src/modules/submission/submission.service.js'

const TEST_JWT_SECRET = 'test-secret-key-for-submission-integration-tests'
process.env.JWT_SECRET = process.env.JWT_SECRET || TEST_JWT_SECRET

const createAuthCookie = (userId = 'test-user-id') => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET!)
    return `jwt=${token}`
}

describe('Submission Module - Integration Tests', () => {
    let mockUserDelegate: any
    let mockProblemDelegate: any
    let mockSubmissionDelegate: any
    let mockTestCaseResultDelegate: any
    let mockProblemSolvedDelegate: any
    let spies: any[] = []

    const testUserId = 'test-user-id'
    const testAuthCookie = createAuthCookie(testUserId)

    beforeEach(() => {
        mockUserDelegate = {
            findUnique: spyOn(db.user, 'findUnique').mockImplementation(async (args: any) => {
                if (args?.where?.id === testUserId) {
                    return {
                        id: testUserId,
                        name: 'Test User',
                        prn: 'TESTPRN123',
                        role: 'USER',
                    } as any
                }
                return null
            }),
        }

        mockProblemDelegate = {
            findUnique: spyOn(db.problem, 'findUnique').mockImplementation(async () => null),
        }

        mockSubmissionDelegate = {
            create: spyOn(db.submission, 'create').mockImplementation(async () => ({}) as any),
            findUnique: spyOn(db.submission, 'findUnique').mockImplementation(async () => null),
            findMany: spyOn(db.submission, 'findMany').mockImplementation(async () => []),
            count: spyOn(db.submission, 'count').mockImplementation(async () => 0),
        }

        mockTestCaseResultDelegate = {
            createMany: spyOn(db.testCaseResult, 'createMany').mockImplementation(async () => ({ count: 0 })),
        }

        mockProblemSolvedDelegate = {
            upsert: spyOn(db.problemSolved, 'upsert').mockImplementation(async () => ({}) as any),
        }

        Object.defineProperty(db, 'user', { value: mockUserDelegate, writable: true, configurable: true })
        Object.defineProperty(db, 'problem', { value: mockProblemDelegate, writable: true, configurable: true })
        Object.defineProperty(db, 'submission', { value: mockSubmissionDelegate, writable: true, configurable: true })
        Object.defineProperty(db, 'testCaseResult', { value: mockTestCaseResultDelegate, writable: true, configurable: true })
        Object.defineProperty(db, 'problemSolved', { value: mockProblemSolvedDelegate, writable: true, configurable: true })
    })

    afterEach(() => {
        spies.forEach((spy) => spy.mockRestore())
        spies = []
    })

    describe('Authentication Guarding (401 Unauthorized)', () => {
        it('should block POST /api/v1/submission/submit without auth cookie', async () => {
            const res = await request(app)
                .post('/api/v1/submission/submit')
                .send({
                    problemId: 'prob-1',
                    sourceCode: 'print(1)',
                    language: 'python',
                })

            expect(res.status).toBe(401)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toContain('Access denied')
        })

        it('should block GET /api/v1/submission/getallsubmissions without auth cookie', async () => {
            const res = await request(app).get('/api/v1/submission/getallsubmissions')

            expect(res.status).toBe(401)
            expect(res.body.success).toBe(false)
        })

        it('should block GET /api/v1/submission/get-submissions/:id without auth cookie', async () => {
            const res = await request(app).get('/api/v1/submission/get-submissions/prob-1')

            expect(res.status).toBe(401)
            expect(res.body.success).toBe(false)
        })

        it('should block GET /api/v1/submission/get-submission-count/:id without auth cookie', async () => {
            const res = await request(app).get('/api/v1/submission/get-submission-count/prob-1')

            expect(res.status).toBe(401)
            expect(res.body.success).toBe(false)
        })

        it('should block GET /api/v1/submission/ without auth cookie', async () => {
            const res = await request(app).get('/api/v1/submission/')

            expect(res.status).toBe(401)
            expect(res.body.success).toBe(false)
        })

        it('should block GET /api/v1/submission/problem/:id without auth cookie', async () => {
            const res = await request(app).get('/api/v1/submission/problem/prob-1')

            expect(res.status).toBe(401)
            expect(res.body.success).toBe(false)
        })

        it('should block GET /api/v1/submission/problem/:id/count without auth cookie', async () => {
            const res = await request(app).get('/api/v1/submission/problem/prob-1/count')

            expect(res.status).toBe(401)
            expect(res.body.success).toBe(false)
        })
    })

    describe('POST /api/v1/submission/submit', () => {
        it('should return 400 invalid input when payload fails schema validation', async () => {
            const res = await request(app)
                .post('/api/v1/submission/submit')
                .set('Cookie', testAuthCookie)
                .send({
                    problemId: '', // invalid empty string
                    sourceCode: 'print(1)',
                })

            expect(res.status).toBe(400)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('invalid input')
            expect(res.body.details).toBeDefined()
        })

        it('should return 404 when target problem is not found', async () => {
            spies.push(spyOn(submissionService, 'getProblemById').mockImplementation(async () => null))

            const res = await request(app)
                .post('/api/v1/submission/submit')
                .set('Cookie', testAuthCookie)
                .send({
                    problemId: 'non-existent-problem',
                    sourceCode: 'print("hello")',
                    language: 'python',
                })

            expect(res.status).toBe(404)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('Problem not found')
        })

        it('should evaluate submission as Accepted when execution passes all testcases', async () => {
            const mockProblem = {
                id: 'prob-1',
                title: 'Two Sum',
                testcases: [{ input: '1 2', output: '3' }],
            }

            const mockExecution = {
                languageKey: 'python',
                languageLabel: 'Python',
                allPassed: true,
                results: [
                    {
                        testcase: 1,
                        input: '1 2',
                        stdout: '3',
                        expectedOutput: '3',
                        passed: true,
                        compileOutput: null,
                        stderr: null,
                        status: 'Accepted',
                        memory: '100 KB',
                        time: '0.01 sec',
                    },
                ],
            }

            const mockSubmission = {
                id: 'sub-101',
                userId: testUserId,
                problemId: 'prob-1',
                sourceCode: 'print(3)',
                language: 'Python',
                status: 'Accepted',
                createdAt: new Date().toISOString(),
            }

            const mockSubmissionWithTestcases = {
                ...mockSubmission,
                testcases: [
                    {
                        id: 'tc-1',
                        submissionId: 'sub-101',
                        testCase: '1',
                        passed: true,
                        status: 'Accepted',
                    },
                ],
            }

            spies.push(spyOn(submissionService, 'getProblemById').mockImplementation(async () => mockProblem as any))
            spies.push(spyOn(submissionService, 'executeCode').mockImplementation(async () => mockExecution as any))
            spies.push(spyOn(submissionService, 'createSubmission').mockImplementation(async () => mockSubmission as any))
            spies.push(spyOn(submissionService, 'createTestCaseResults').mockImplementation(async () => ({ count: 1 } as any)))
            const upsertSpy = spyOn(submissionService, 'upsertProblemSolved').mockImplementation(async () => ({}) as any)
            spies.push(upsertSpy)
            spies.push(spyOn(submissionService, 'getSubmissionWithTestcases').mockImplementation(async () => mockSubmissionWithTestcases as any))

            const res = await request(app)
                .post('/api/v1/submission/submit')
                .set('Cookie', testAuthCookie)
                .send({
                    problemId: 'prob-1',
                    sourceCode: 'print(3)',
                    language: 'python',
                })

            expect(res.status).toBe(201)
            expect(res.body.success).toBe(true)
            expect(res.body.message).toBe('Submission accepted')
            expect(res.body.submission).toBeDefined()
            expect(res.body.submission.id).toBe('sub-101')
            expect(res.body.execution.allPassed).toBe(true)
            expect(upsertSpy).toHaveBeenCalledWith(testUserId, 'prob-1')
        })

        it('should evaluate submission as Evaluated (non-accepted) when testcases fail', async () => {
            const mockProblem = {
                id: 'prob-1',
                title: 'Two Sum',
                testcases: [{ input: '1 2', output: '3' }],
            }

            const mockExecution = {
                languageKey: 'python',
                languageLabel: 'Python',
                allPassed: false,
                results: [
                    {
                        testcase: 1,
                        input: '1 2',
                        stdout: '4',
                        expectedOutput: '3',
                        passed: false,
                        compileOutput: null,
                        stderr: null,
                        status: 'Wrong Answer',
                        memory: '100 KB',
                        time: '0.01 sec',
                    },
                ],
            }

            const mockSubmission = {
                id: 'sub-102',
                userId: testUserId,
                problemId: 'prob-1',
                sourceCode: 'print(4)',
                language: 'Python',
                status: 'Wrong Answer',
            }

            spies.push(spyOn(submissionService, 'getProblemById').mockImplementation(async () => mockProblem as any))
            spies.push(spyOn(submissionService, 'executeCode').mockImplementation(async () => mockExecution as any))
            spies.push(spyOn(submissionService, 'createSubmission').mockImplementation(async () => mockSubmission as any))
            spies.push(spyOn(submissionService, 'createTestCaseResults').mockImplementation(async () => ({ count: 1 } as any)))
            const upsertSpy = spyOn(submissionService, 'upsertProblemSolved').mockImplementation(async () => ({}) as any)
            spies.push(upsertSpy)
            spies.push(spyOn(submissionService, 'getSubmissionWithTestcases').mockImplementation(async () => mockSubmission as any))

            const res = await request(app)
                .post('/api/v1/submission/submit')
                .set('Cookie', testAuthCookie)
                .send({
                    problemId: 'prob-1',
                    sourceCode: 'print(4)',
                    language: 'python',
                })

            expect(res.status).toBe(201)
            expect(res.body.success).toBe(true)
            expect(res.body.message).toBe('Submission evaluated')
            expect(upsertSpy).not.toHaveBeenCalled()
        })

        it('should handle contestCode submission when code is accepted', async () => {
            const mockProblem = {
                id: 'prob-1',
                title: 'Two Sum',
                testcases: [{ input: '1 2', output: '3' }],
            }

            const mockExecution = {
                languageKey: 'python',
                languageLabel: 'Python',
                allPassed: true,
                results: [
                    {
                        testcase: 1,
                        input: '1 2',
                        stdout: '3',
                        expectedOutput: '3',
                        passed: true,
                        compileOutput: null,
                        stderr: null,
                        status: 'Accepted',
                    },
                ],
            }

            const mockSubmission = { id: 'sub-103', status: 'Accepted' }

            spies.push(spyOn(submissionService, 'getProblemById').mockImplementation(async () => mockProblem as any))
            spies.push(spyOn(submissionService, 'executeCode').mockImplementation(async () => mockExecution as any))
            spies.push(spyOn(submissionService, 'createSubmission').mockImplementation(async () => mockSubmission as any))
            spies.push(spyOn(submissionService, 'createTestCaseResults').mockImplementation(async () => ({ count: 1 } as any)))
            spies.push(spyOn(submissionService, 'upsertProblemSolved').mockImplementation(async () => ({}) as any))
            const contestSpy = spyOn(submissionService, 'handleContestSubmission').mockImplementation(async () => {})
            spies.push(contestSpy)
            spies.push(spyOn(submissionService, 'getSubmissionWithTestcases').mockImplementation(async () => mockSubmission as any))

            const res = await request(app)
                .post('/api/v1/submission/submit')
                .set('Cookie', testAuthCookie)
                .send({
                    problemId: 'prob-1',
                    sourceCode: 'print(3)',
                    language: 'python',
                    contestCode: '  contest123  ',
                })

            expect(res.status).toBe(201)
            expect(res.body.success).toBe(true)
            expect(contestSpy).toHaveBeenCalledWith('CONTEST123', testUserId, 'prob-1')
        })

        it('should return 500 internal server error when code execution throws', async () => {
            spies.push(spyOn(submissionService, 'getProblemById').mockImplementation(async () => {
                throw new Error('Database connection failed')
            }))

            const res = await request(app)
                .post('/api/v1/submission/submit')
                .set('Cookie', testAuthCookie)
                .send({
                    problemId: 'prob-1',
                    sourceCode: 'print(1)',
                    language: 'python',
                })

            expect(res.status).toBe(500)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('internal server error')
            expect(res.body.error).toBe('Database connection failed')
        })
    })

    describe('GET /api/v1/submission/getallsubmissions & GET /api/v1/submission/', () => {
        it('should return formatted submissions list for authenticated user (/getallsubmissions)', async () => {
            const mockUserSubmissions = [
                {
                    id: 'sub-1',
                    problemId: 'prob-1',
                    status: 'Accepted',
                    language: 'Python',
                    createdAt: new Date().toISOString(),
                    problem: {
                        id: 'prob-1',
                        title: 'Two Sum',
                        difficulty: 'EASY',
                    },
                },
                {
                    id: 'sub-2',
                    problemId: 'prob-2',
                    status: 'Wrong Answer',
                    language: 'C++',
                    createdAt: new Date().toISOString(),
                    problem: {
                        id: 'prob-2',
                        title: 'Median of Arrays',
                        difficulty: 'HARD',
                    },
                },
            ]

            spies.push(spyOn(submissionService, 'getAllSubmissionsByUser').mockImplementation(async () => mockUserSubmissions as any))

            const res = await request(app)
                .get('/api/v1/submission/getallsubmissions')
                .set('Cookie', testAuthCookie)

            expect(res.status).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.message).toBe('Submissions fetched successfully')
            expect(res.body.submissions).toHaveLength(2)
            expect(res.body.submissions[0].difficulty).toBe('Easy')
            expect(res.body.submissions[1].difficulty).toBe('Hard')
        })

        it('should return formatted submissions list for root alias GET /api/v1/submission/', async () => {
            const mockUserSubmissions = [
                {
                    id: 'sub-1',
                    problemId: 'prob-1',
                    status: 'Accepted',
                    language: 'Python',
                    createdAt: new Date().toISOString(),
                    problem: {
                        id: 'prob-1',
                        title: 'Two Sum',
                        difficulty: 'MEDIUM',
                    },
                },
            ]

            spies.push(spyOn(submissionService, 'getAllSubmissionsByUser').mockImplementation(async () => mockUserSubmissions as any))

            const res = await request(app)
                .get('/api/v1/submission/')
                .set('Cookie', testAuthCookie)

            expect(res.status).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.submissions[0].difficulty).toBe('Medium')
        })

        it('should return 500 when getAllSubmissionsByUser throws', async () => {
            spies.push(spyOn(submissionService, 'getAllSubmissionsByUser').mockImplementation(async () => {
                throw new Error('Database query failure')
            }))

            const res = await request(app)
                .get('/api/v1/submission/getallsubmissions')
                .set('Cookie', testAuthCookie)

            expect(res.status).toBe(500)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('internal server error')
        })
    })

    describe('GET /api/v1/submission/get-submissions/:id & GET /api/v1/submission/problem/:id', () => {
        it('should return submissions for specific problem ID (/get-submissions/:id)', async () => {
            const mockProblemSubmissions = [
                {
                    id: 'sub-1',
                    problemId: 'prob-1',
                    userId: testUserId,
                    status: 'Accepted',
                    testcases: [],
                },
            ]

            const spy = spyOn(submissionService, 'getSubmissionsByProblemAndUser').mockImplementation(async () => mockProblemSubmissions as any)
            spies.push(spy)

            const res = await request(app)
                .get('/api/v1/submission/get-submissions/prob-1')
                .set('Cookie', testAuthCookie)

            expect(res.status).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.message).toBe('Submissions fetched successfully')
            expect(res.body.submissions).toEqual(mockProblemSubmissions as any)
            expect(spy).toHaveBeenCalledWith('prob-1', testUserId)
        })

        it('should return submissions for specific problem ID via alias (/problem/:id)', async () => {
            const mockProblemSubmissions = [
                {
                    id: 'sub-2',
                    problemId: 'prob-2',
                    userId: testUserId,
                    status: 'Wrong Answer',
                },
            ]

            const spy = spyOn(submissionService, 'getSubmissionsByProblemAndUser').mockImplementation(async () => mockProblemSubmissions as any)
            spies.push(spy)

            const res = await request(app)
                .get('/api/v1/submission/problem/prob-2')
                .set('Cookie', testAuthCookie)

            expect(res.status).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.submissions).toEqual(mockProblemSubmissions as any)
            expect(spy).toHaveBeenCalledWith('prob-2', testUserId)
        })

        it('should return 500 when getSubmissionsByProblemAndUser throws', async () => {
            spies.push(spyOn(submissionService, 'getSubmissionsByProblemAndUser').mockImplementation(async () => {
                throw new Error('Database error')
            }))

            const res = await request(app)
                .get('/api/v1/submission/get-submissions/prob-1')
                .set('Cookie', testAuthCookie)

            expect(res.status).toBe(500)
            expect(res.body.success).toBe(false)
        })
    })

    describe('GET /api/v1/submission/get-submission-count/:id & GET /api/v1/submission/problem/:id/count', () => {
        it('should return submission count for a problem (/get-submission-count/:id)', async () => {
            const spy = spyOn(submissionService, 'getSubmissionCountByProblemAndUser').mockImplementation(async () => 3)
            spies.push(spy)

            const res = await request(app)
                .get('/api/v1/submission/get-submission-count/prob-1')
                .set('Cookie', testAuthCookie)

            expect(res.status).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.message).toBe('Submission count fetched successfully')
            expect(res.body.count).toBe(3)
            expect(spy).toHaveBeenCalledWith('prob-1', testUserId)
        })

        it('should return submission count via alias (/problem/:id/count)', async () => {
            const spy = spyOn(submissionService, 'getSubmissionCountByProblemAndUser').mockImplementation(async () => 7)
            spies.push(spy)

            const res = await request(app)
                .get('/api/v1/submission/problem/prob-5/count')
                .set('Cookie', testAuthCookie)

            expect(res.status).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.count).toBe(7)
            expect(spy).toHaveBeenCalledWith('prob-5', testUserId)
        })

        it('should return 500 when getSubmissionCountByProblemAndUser throws', async () => {
            spies.push(spyOn(submissionService, 'getSubmissionCountByProblemAndUser').mockImplementation(async () => {
                throw new Error('Database count failure')
            }))

            const res = await request(app)
                .get('/api/v1/submission/get-submission-count/prob-1')
                .set('Cookie', testAuthCookie)

            expect(res.status).toBe(500)
            expect(res.body.success).toBe(false)
        })
    })
})
