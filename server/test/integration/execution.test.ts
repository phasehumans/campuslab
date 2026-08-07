import { describe, it, expect, beforeAll, afterAll, spyOn, afterEach } from 'bun:test'
import request from 'supertest'
import { app } from '../../src/app.js'
import { db } from '../../src/config/db.js'
import * as executionService from '../../src/modules/execution/execution.service.js'

describe('Execution Module Integration Tests', () => {
    const testPrn = `EXEC_INT_${Date.now()}`
    const testPassword = 'password123'
    let jwtCookie: string
    let executeCodeSpy: any

    beforeAll(async () => {
        // Clean up before starting
        try {
            await db.user.deleteMany({ where: { prn: testPrn } })
            
            // Register a user for authentication
            const res = await request(app)
                .post('/api/v1/auth/register')
                .send({
                    name: 'Execution Integration User',
                    prn: testPrn,
                    password: testPassword,
                })

            if (res.headers['set-cookie']) {
                jwtCookie = res.headers['set-cookie'][0]
            }
        } catch {
            // DB might not be accessible during some test setups
        }
    })

    afterAll(async () => {
        // Clean up after finishing
        try {
            await db.user.deleteMany({ where: { prn: testPrn } })
            await db.$disconnect()
        } catch {
            // Ignore DB disconnect errors
        }
    })

    afterEach(() => {
        if (executeCodeSpy) {
            executeCodeSpy.mockRestore()
        }
    })

    describe('Authentication Protection', () => {
        it('should reject POST /api/v1/code-execution without auth cookie', async () => {
            const res = await request(app)
                .post('/api/v1/code-execution')
                .send({
                    sourceCode: 'print("hello")',
                    language: 'python',
                    testcases: [{ input: '1', output: '1' }],
                })

            expect(res.status).toBe(401)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('Access denied: no token provided')
        })

        it('should reject POST /api/v1/code-execution/run without auth cookie', async () => {
            const res = await request(app)
                .post('/api/v1/code-execution/run')
                .send({
                    sourceCode: 'print("hello")',
                    language: 'python',
                    testcases: [{ input: '1', output: '1' }],
                })

            expect(res.status).toBe(401)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('Access denied: no token provided')
        })

        it('should reject POST /api/v1/code-execution with invalid cookie', async () => {
            const res = await request(app)
                .post('/api/v1/code-execution')
                .set('Cookie', 'jwt=invalid_token_str')
                .send({
                    sourceCode: 'print("hello")',
                    language: 'python',
                    testcases: [{ input: '1', output: '1' }],
                })

            expect(res.status).toBe(400)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('Invalid token')
        })
    })

    describe('Input Schema Validation (with authenticated user)', () => {
        it('should return 400 for empty request body', async () => {
            if (!jwtCookie) return

            const res = await request(app)
                .post('/api/v1/code-execution')
                .set('Cookie', jwtCookie)
                .send({})

            expect(res.status).toBe(400)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('invalid input')
            expect(res.body.details).toBeDefined()
        })

        it('should return 400 when sourceCode is missing', async () => {
            if (!jwtCookie) return

            const res = await request(app)
                .post('/api/v1/code-execution')
                .set('Cookie', jwtCookie)
                .send({
                    language: 'python',
                    testcases: [{ input: '1' }],
                })

            expect(res.status).toBe(400)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('invalid input')
        })

        it('should return 400 when language is empty string', async () => {
            if (!jwtCookie) return

            const res = await request(app)
                .post('/api/v1/code-execution')
                .set('Cookie', jwtCookie)
                .send({
                    sourceCode: 'print(1)',
                    language: '',
                    testcases: [{ input: '1' }],
                })

            expect(res.status).toBe(400)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('invalid input')
        })

        it('should return 400 when testcases is empty array', async () => {
            if (!jwtCookie) return

            const res = await request(app)
                .post('/api/v1/code-execution')
                .set('Cookie', jwtCookie)
                .send({
                    sourceCode: 'print(1)',
                    language: 'python',
                    testcases: [],
                })

            expect(res.status).toBe(400)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('invalid input')
        })
    })

    describe('Code Execution API Handling', () => {
        it('should successfully execute code via POST /api/v1/code-execution', async () => {
            if (!jwtCookie) return

            const mockExecutionResult = {
                languageKey: 'python',
                languageLabel: 'Python',
                allPassed: true,
                results: [
                    {
                        testcase: 1,
                        input: '2 3',
                        stdout: '5',
                        expectedOutput: '5',
                        passed: true,
                        compileOutput: null,
                        stderr: null,
                        status: 'Accepted',
                        memory: '1024 KB',
                        time: '0.01 sec',
                    },
                ],
            }

            executeCodeSpy = spyOn(executionService, 'executeCode').mockResolvedValue(
                mockExecutionResult as any
            )

            const res = await request(app)
                .post('/api/v1/code-execution')
                .set('Cookie', jwtCookie)
                .send({
                    sourceCode: 'a, b = map(int, input().split()); print(a + b)',
                    language: 'python',
                    testcases: [{ input: '2 3', output: '5' }],
                })

            expect(res.status).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.message).toBe('Code executed successfully')
            expect(res.body.execution).toEqual({
                language: 'Python',
                allPassed: true,
                results: mockExecutionResult.results,
            })
        })

        it('should successfully execute code via POST /api/v1/code-execution/run', async () => {
            if (!jwtCookie) return

            const mockExecutionResult = {
                languageKey: 'cpp',
                languageLabel: 'C++',
                allPassed: true,
                results: [
                    {
                        testcase: 1,
                        input: '10',
                        stdout: '10',
                        expectedOutput: '10',
                        passed: true,
                        compileOutput: null,
                        stderr: null,
                        status: 'Accepted',
                        memory: '512 KB',
                        time: '0.005 sec',
                    },
                ],
            }

            executeCodeSpy = spyOn(executionService, 'executeCode').mockResolvedValue(
                mockExecutionResult as any
            )

            const res = await request(app)
                .post('/api/v1/code-execution/run')
                .set('Cookie', jwtCookie)
                .send({
                    sourceCode: '#include <iostream>\nusing namespace std;\nint main() { int x; cin >> x; cout << x; }',
                    language: 'cpp',
                    testcases: [{ input: '10', output: '10' }],
                })

            expect(res.status).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.message).toBe('Code executed successfully')
            expect(res.body.execution.language).toBe('C++')
            expect(res.body.execution.allPassed).toBe(true)
        })

        it('should return 500 internal server error when execution service throws', async () => {
            if (!jwtCookie) return

            executeCodeSpy = spyOn(executionService, 'executeCode').mockRejectedValue(
                new Error('Judge0 service unavailable')
            )

            const res = await request(app)
                .post('/api/v1/code-execution')
                .set('Cookie', jwtCookie)
                .send({
                    sourceCode: 'print(1)',
                    language: 'python',
                    testcases: [{ input: '1' }],
                })

            expect(res.status).toBe(500)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBe('internal server error')
            expect(res.body.error).toBe('Judge0 service unavailable')
        })
    })
})
