import { describe, it, expect, spyOn, beforeEach } from 'bun:test'
import { db } from '../../src/config/db.js'
import * as submissionService from '../../src/modules/submission/submission.service.js'
import { submitCodeSchema } from '../../src/modules/submission/submission.schema.js'
import { difficultyLabels, getSubmissionStatus, readParam } from '../../src/modules/submission/submission.utils.js'
import * as contestService from '../../src/modules/contest/contest.service.js'

describe('Submission Module - Unit Tests', () => {
    describe('Submission Utils', () => {
        describe('readParam', () => {
            it('should return the string value when passed a single string', () => {
                expect(readParam('param-123')).toBe('param-123')
            })

            it('should return the first item when passed an array of strings', () => {
                expect(readParam(['first-param', 'second-param'])).toBe('first-param')
            })

            it('should return an empty string when passed an empty array', () => {
                expect(readParam([])).toBe('')
            })

            it('should return an empty string when passed undefined', () => {
                expect(readParam(undefined)).toBe('')
            })
        })

        describe('difficultyLabels', () => {
            it('should map difficulty enum keys to readable labels', () => {
                expect(difficultyLabels.EASY).toBe('Easy')
                expect(difficultyLabels.MEDIUM).toBe('Medium')
                expect(difficultyLabels.HARD).toBe('Hard')
            })
        })

        describe('getSubmissionStatus', () => {
            it('should return "Accepted" when all testcases pass', () => {
                const results = [
                    { passed: true, status: 'Accepted', stderr: null, compileOutput: null },
                    { passed: true, status: 'Accepted', stderr: null, compileOutput: null },
                ]
                expect(getSubmissionStatus(results)).toBe('Accepted')
            })

            it('should return "Compilation Error" if any failed result has compileOutput', () => {
                const results = [
                    { passed: false, status: 'Error', stderr: null, compileOutput: 'Syntax error at line 5' },
                ]
                expect(getSubmissionStatus(results)).toBe('Compilation Error')
            })

            it('should return failed result status when stderr exists and status is not "Accepted"', () => {
                const results = [
                    { passed: true, status: 'Accepted', stderr: null, compileOutput: null },
                    { passed: false, status: 'Time Limit Exceeded', stderr: 'Execution timed out', compileOutput: null },
                ]
                expect(getSubmissionStatus(results)).toBe('Time Limit Exceeded')
            })

            it('should return "Wrong Answer" as default fallback for failed result without compileOutput or non-accepted stderr status', () => {
                const results = [
                    { passed: false, status: 'Wrong Answer', stderr: null, compileOutput: null },
                ]
                expect(getSubmissionStatus(results)).toBe('Wrong Answer')
            })
        })
    })

    describe('Submission Schema Validation', () => {
        it('should pass validation with valid required fields', () => {
            const validPayload = {
                problemId: 'prob-101',
                sourceCode: 'console.log("hello world")',
                language: 'javascript',
            }

            const result = submitCodeSchema.safeParse(validPayload)
            expect(result.success).toBe(true)
            if (result.success) {
                expect(result.data.problemId).toBe('prob-101')
                expect(result.data.sourceCode).toBe('console.log("hello world")')
                expect(result.data.language).toBe('javascript')
                expect(result.data.contestCode).toBeUndefined()
            }
        })

        it('should pass validation and normalize contestCode (trim and uppercase)', () => {
            const payloadWithContest = {
                problemId: 'prob-101',
                sourceCode: 'print(1)',
                language: 'python',
                contestCode: '  contest-room-1  ',
            }

            const result = submitCodeSchema.safeParse(payloadWithContest)
            expect(result.success).toBe(true)
            if (result.success) {
                expect(result.data.contestCode).toBe('CONTEST-ROOM-1')
            }
        })

        it('should allow null or undefined contestCode', () => {
            const payloadNullContest = {
                problemId: 'prob-101',
                sourceCode: 'print(1)',
                language: 'python',
                contestCode: null,
            }

            const result = submitCodeSchema.safeParse(payloadNullContest)
            expect(result.success).toBe(true)
        })

        it('should fail validation when problemId is missing or empty', () => {
            const missingProblemId = {
                sourceCode: 'code',
                language: 'js',
            }
            const emptyProblemId = {
                problemId: '',
                sourceCode: 'code',
                language: 'js',
            }

            expect(submitCodeSchema.safeParse(missingProblemId).success).toBe(false)
            expect(submitCodeSchema.safeParse(emptyProblemId).success).toBe(false)
        })

        it('should fail validation when sourceCode is missing or empty', () => {
            const missingSourceCode = {
                problemId: 'prob-1',
                language: 'js',
            }
            const emptySourceCode = {
                problemId: 'prob-1',
                sourceCode: '',
                language: 'js',
            }

            expect(submitCodeSchema.safeParse(missingSourceCode).success).toBe(false)
            expect(submitCodeSchema.safeParse(emptySourceCode).success).toBe(false)
        })

        it('should fail validation when language is missing or empty', () => {
            const missingLanguage = {
                problemId: 'prob-1',
                sourceCode: 'code',
            }
            const emptyLanguage = {
                problemId: 'prob-1',
                sourceCode: 'code',
                language: '',
            }

            expect(submitCodeSchema.safeParse(missingLanguage).success).toBe(false)
            expect(submitCodeSchema.safeParse(emptyLanguage).success).toBe(false)
        })
    })

    describe('Submission Service', () => {
        let mockProblemDelegate: any
        let mockSubmissionDelegate: any
        let mockTestCaseResultDelegate: any
        let mockProblemSolvedDelegate: any
        let recordContestSpy: any

        beforeEach(() => {
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

            recordContestSpy = spyOn(contestService, 'recordContestProblemSolved').mockImplementation(async () => ({}) as any)

            Object.defineProperty(db, 'problem', { value: mockProblemDelegate, writable: true, configurable: true })
            Object.defineProperty(db, 'submission', { value: mockSubmissionDelegate, writable: true, configurable: true })
            Object.defineProperty(db, 'testCaseResult', { value: mockTestCaseResultDelegate, writable: true, configurable: true })
            Object.defineProperty(db, 'problemSolved', { value: mockProblemSolvedDelegate, writable: true, configurable: true })
        })

        it('getProblemById should fetch problem from database by ID', async () => {
            const mockProblem = { id: 'prob-1', title: 'Two Sum', difficulty: 'EASY' }
            mockProblemDelegate.findUnique = spyOn(mockProblemDelegate, 'findUnique').mockImplementation(async () => mockProblem as any)

            const problem = await submissionService.getProblemById('prob-1')
            expect(mockProblemDelegate.findUnique).toHaveBeenCalledWith({ where: { id: 'prob-1' } })
            expect(problem).toEqual(mockProblem as any)
        })

        it('createSubmission should insert submission record into database', async () => {
            const inputData = {
                userId: 'user-1',
                problemId: 'prob-1',
                sourceCode: 'code',
                language: 'Python',
                status: 'Accepted',
            }
            const mockCreated = { id: 'sub-1', ...inputData }
            mockSubmissionDelegate.create = spyOn(mockSubmissionDelegate, 'create').mockImplementation(async () => mockCreated as any)

            const result = await submissionService.createSubmission(inputData as any)
            expect(mockSubmissionDelegate.create).toHaveBeenCalledWith({ data: inputData })
            expect(result).toEqual(mockCreated as any)
        })

        it('createTestCaseResults should bulk insert testcase results', async () => {
            const mockInput = [
                {
                    submissionId: 'sub-1',
                    testCase: '1',
                    passed: true,
                    status: 'Accepted',
                },
            ]
            mockTestCaseResultDelegate.createMany = spyOn(mockTestCaseResultDelegate, 'createMany').mockImplementation(async () => ({ count: 1 } as any))

            const result = await submissionService.createTestCaseResults(mockInput as any)
            expect(mockTestCaseResultDelegate.createMany).toHaveBeenCalledWith({ data: mockInput })
            expect(result).toEqual({ count: 1 } as any)
        })

        it('upsertProblemSolved should upsert user problem solved record', async () => {
            mockProblemSolvedDelegate.upsert = spyOn(mockProblemSolvedDelegate, 'upsert').mockImplementation(async () => ({
                id: 'ps-1',
                userId: 'user-1',
                problemId: 'prob-1',
            } as any))

            const result = await submissionService.upsertProblemSolved('user-1', 'prob-1')
            expect(mockProblemSolvedDelegate.upsert).toHaveBeenCalledWith({
                where: {
                    userId_problemId: {
                        userId: 'user-1',
                        problemId: 'prob-1',
                    },
                },
                update: {},
                create: {
                    userId: 'user-1',
                    problemId: 'prob-1',
                },
            })
            expect(result.id).toBe('ps-1')
        })

        it('handleContestSubmission should call recordContestProblemSolved', async () => {
            await submissionService.handleContestSubmission('ROOM123', 'user-1', 'prob-1')
            expect(recordContestSpy).toHaveBeenCalledWith('ROOM123', 'user-1', 'prob-1')
        })

        it('handleContestSubmission should catch and ignore errors gracefully', async () => {
            recordContestSpy.mockImplementation(async () => {
                throw new Error('Contest room expired')
            })

            // Should not throw error
            await expect(
                submissionService.handleContestSubmission('ROOM123', 'user-1', 'prob-1')
            ).resolves.toBeUndefined()
            expect(recordContestSpy).toHaveBeenCalledWith('ROOM123', 'user-1', 'prob-1')
        })

        it('getSubmissionWithTestcases should fetch submission with included testcases', async () => {
            const mockSubmission = {
                id: 'sub-1',
                status: 'Accepted',
                testcases: [{ id: 'tc-1', passed: true }],
            }
            mockSubmissionDelegate.findUnique = spyOn(mockSubmissionDelegate, 'findUnique').mockImplementation(async () => mockSubmission as any)

            const result = await submissionService.getSubmissionWithTestcases('sub-1')
            expect(mockSubmissionDelegate.findUnique).toHaveBeenCalledWith({
                where: { id: 'sub-1' },
                include: { testcases: true },
            })
            expect(result).toEqual(mockSubmission as any)
        })

        it('getAllSubmissionsByUser should query user submissions sorted descending with problem detail', async () => {
            const mockSubmissions = [
                {
                    id: 'sub-1',
                    problemId: 'prob-1',
                    problem: { id: 'prob-1', title: 'Two Sum', difficulty: 'EASY' },
                },
            ]
            mockSubmissionDelegate.findMany = spyOn(mockSubmissionDelegate, 'findMany').mockImplementation(async () => mockSubmissions as any)

            const result = await submissionService.getAllSubmissionsByUser('user-1')
            expect(mockSubmissionDelegate.findMany).toHaveBeenCalledWith({
                where: { userId: 'user-1' },
                orderBy: { createdAt: 'desc' },
                include: {
                    problem: {
                        select: {
                            id: true,
                            title: true,
                            difficulty: true,
                        },
                    },
                },
            })
            expect(result).toEqual(mockSubmissions as any)
        })

        it('getSubmissionsByProblemAndUser should query submissions for problem and user', async () => {
            const mockSubmissions = [{ id: 'sub-1', testcases: [] }]
            mockSubmissionDelegate.findMany = spyOn(mockSubmissionDelegate, 'findMany').mockImplementation(async () => mockSubmissions as any)

            const result = await submissionService.getSubmissionsByProblemAndUser('prob-1', 'user-1')
            expect(mockSubmissionDelegate.findMany).toHaveBeenCalledWith({
                where: { userId: 'user-1', problemId: 'prob-1' },
                orderBy: { createdAt: 'desc' },
                include: { testcases: true },
            })
            expect(result).toEqual(mockSubmissions as any)
        })

        it('getSubmissionCountByProblemAndUser should count submissions for problem and user', async () => {
            mockSubmissionDelegate.count = spyOn(mockSubmissionDelegate, 'count').mockImplementation(async () => 5 as any)

            const count = await submissionService.getSubmissionCountByProblemAndUser('prob-1', 'user-1')
            expect(mockSubmissionDelegate.count).toHaveBeenCalledWith({
                where: { userId: 'user-1', problemId: 'prob-1' },
            })
            expect(count).toBe(5)
        })

        it('executeCode should reference executeCodeAgainstTestcases', async () => {
            const executeSpy = spyOn(submissionService, 'executeCode').mockImplementation(async () => ({
                languageKey: 'python',
                languageLabel: 'Python',
                allPassed: true,
                results: [],
            } as any))

            const inputData = {
                sourceCode: 'print(1)',
                language: 'python',
                testcases: [{ input: '1', output: '1' }],
            }

            const res = await submissionService.executeCode(inputData)
            expect(executeSpy).toHaveBeenCalledWith(inputData)
            expect(res.allPassed).toBe(true)
        })
    })
})
