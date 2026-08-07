import { describe, it, expect, spyOn, afterEach } from 'bun:test'
import { executeCode } from '../../src/modules/execution/execution.service.js'
import { executeCodeSchema } from '../../src/modules/execution/execution.schema.js'
import * as codeRunner from '../../src/shared/codeRunner.js'

describe('Execution Module Unit Tests', () => {
    describe('Execution Schema Validation', () => {
        it('should pass validation for a valid payload', () => {
            const validPayload = {
                sourceCode: 'print("Hello World")',
                language: 'python',
                testcases: [
                    { input: '1', output: '1' },
                    { input: '2' },
                ],
            }
            const result = executeCodeSchema.safeParse(validPayload)
            expect(result.success).toBe(true)
            if (result.success) {
                expect(result.data.sourceCode).toBe('print("Hello World")')
                expect(result.data.language).toBe('python')
                expect(result.data.testcases).toHaveLength(2)
            }
        })

        it('should fail validation when sourceCode is empty string', () => {
            const invalidPayload = {
                sourceCode: '',
                language: 'python',
                testcases: [{ input: '1', output: '1' }],
            }
            const result = executeCodeSchema.safeParse(invalidPayload)
            expect(result.success).toBe(false)
        })

        it('should fail validation when language is empty string', () => {
            const invalidPayload = {
                sourceCode: 'print(1)',
                language: '',
                testcases: [{ input: '1', output: '1' }],
            }
            const result = executeCodeSchema.safeParse(invalidPayload)
            expect(result.success).toBe(false)
        })

        it('should fail validation when testcases array is empty', () => {
            const invalidPayload = {
                sourceCode: 'print(1)',
                language: 'python',
                testcases: [],
            }
            const result = executeCodeSchema.safeParse(invalidPayload)
            expect(result.success).toBe(false)
        })

        it('should fail validation when missing required fields', () => {
            const invalidPayload = {
                language: 'python',
            }
            const result = executeCodeSchema.safeParse(invalidPayload)
            expect(result.success).toBe(false)
        })
    })

    describe('Execution Service Tests', () => {
        let spyCodeRunner: any

        afterEach(() => {
            if (spyCodeRunner) {
                spyCodeRunner.mockRestore()
            }
        })

        it('should return execution results when code runner succeeds', async () => {
            const mockRunnerResult = {
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

            spyCodeRunner = spyOn(codeRunner, 'executeCodeAgainstTestcases').mockResolvedValue(
                mockRunnerResult as any
            )

            const inputData = {
                sourceCode: 'a, b = map(int, input().split()); print(a + b)',
                language: 'python',
                testcases: [{ input: '2 3', output: '5' }],
            }

            const result = await executeCode(inputData)

            expect(spyCodeRunner).toHaveBeenCalledWith(inputData)
            expect(result).toEqual(mockRunnerResult as any)
            expect(result.allPassed).toBe(true)
            expect(result.results).toHaveLength(1)
            expect(result.results[0].passed).toBe(true)
        })

        it('should handle execution with failing testcases', async () => {
            const mockRunnerResult = {
                languageKey: 'cpp',
                languageLabel: 'C++',
                allPassed: false,
                results: [
                    {
                        testcase: 1,
                        input: '2 3',
                        stdout: '6',
                        expectedOutput: '5',
                        passed: false,
                        compileOutput: null,
                        stderr: null,
                        status: 'Wrong Answer',
                        memory: '2048 KB',
                        time: '0.02 sec',
                    },
                ],
            }

            spyCodeRunner = spyOn(codeRunner, 'executeCodeAgainstTestcases').mockResolvedValue(
                mockRunnerResult as any
            )

            const inputData = {
                sourceCode: '#include <iostream>\nusing namespace std;\nint main() { cout << 6; }',
                language: 'cpp',
                testcases: [{ input: '2 3', output: '5' }],
            }

            const result = await executeCode(inputData)

            expect(result.allPassed).toBe(false)
            expect(result.results[0].passed).toBe(false)
            expect(result.results[0].status).toBe('Wrong Answer')
        })

        it('should propagate errors thrown by code runner', async () => {
            spyCodeRunner = spyOn(codeRunner, 'executeCodeAgainstTestcases').mockRejectedValue(
                new Error('Unsupported programming language: brainfuck')
            )

            const inputData = {
                sourceCode: '+++++.',
                language: 'brainfuck',
                testcases: [{ input: '' }],
            }

            expect(executeCode(inputData)).rejects.toThrow('Unsupported programming language: brainfuck')
        })
    })
})
