import { describe, it, expect, beforeAll, afterAll, spyOn } from 'bun:test';
import {
    getUserProblemMeta,
    validateReferenceSolutions,
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
    getSolvedProblemsByUser,
} from '../../src/modules/problems/problems.service.js';
import {
    difficultyLabels,
    readParam,
    getProblemStatus,
    serializeProblemSummary,
} from '../../src/modules/problems/problems.utils.js';
import * as codeRunner from '../../src/shared/codeRunner.js';
import { db } from '../../src/config/db.js';
import type { Prisma } from '../../src/generated/prisma/client.js';

describe('Problems Module - Unit Tests', () => {
    describe('Utility Functions (problems.utils.ts)', () => {
        describe('difficultyLabels', () => {
            it('should map difficulty levels to user friendly labels', () => {
                expect(difficultyLabels.EASY).toBe('Easy');
                expect(difficultyLabels.MEDIUM).toBe('Medium');
                expect(difficultyLabels.HARD).toBe('Hard');
            });
        });

        describe('readParam', () => {
            it('should return string when single string parameter is passed', () => {
                expect(readParam('prob-123')).toBe('prob-123');
            });

            it('should return first string element when array of strings is passed', () => {
                expect(readParam(['param-1', 'param-2'])).toBe('param-1');
            });

            it('should return empty string when empty array is passed', () => {
                expect(readParam([])).toBe('');
            });

            it('should return empty string when undefined is passed', () => {
                expect(readParam(undefined)).toBe('');
            });
        });

        describe('getProblemStatus', () => {
            const solvedSet = new Set(['p1', 'p2']);
            const attemptedSet = new Set(['p3']);

            it('should return "Solved" when problem ID is present in solved set', () => {
                expect(getProblemStatus('p1', solvedSet, attemptedSet)).toBe('Solved');
            });

            it('should return "Attempted" when problem ID is present in attempted set but not solved set', () => {
                expect(getProblemStatus('p3', solvedSet, attemptedSet)).toBe('Attempted');
            });

            it('should return "Unsolved" when problem ID is in neither set', () => {
                expect(getProblemStatus('p4', solvedSet, attemptedSet)).toBe('Unsolved');
            });

            it('should prioritize "Solved" status over "Attempted" status if present in both', () => {
                const overlapAttemptedSet = new Set(['p1', 'p3']);
                expect(getProblemStatus('p1', solvedSet, overlapAttemptedSet)).toBe('Solved');
            });
        });

        describe('serializeProblemSummary', () => {
            it('should properly format problem summary with associated user metadata', () => {
                const problem = {
                    id: 'problem-1',
                    title: 'Two Sum',
                    difficulty: 'EASY' as const,
                    tags: ['array', 'hash-map'],
                };

                const meta = {
                    solvedProblemIds: new Set(['problem-1']),
                    attemptedProblemIds: new Set(['problem-1']),
                    submissionCounts: new Map([['problem-1', 4]]),
                };

                const result = serializeProblemSummary(problem, meta);

                expect(result).toEqual({
                    id: 'problem-1',
                    title: 'Two Sum',
                    difficulty: 'Easy',
                    tags: ['array', 'hash-map'],
                    status: 'Solved',
                    submissionCount: 4,
                });
            });

            it('should default to "Unsolved" status and 0 submission count when problem has no user history', () => {
                const problem = {
                    id: 'problem-2',
                    title: 'Reverse Linked List',
                    difficulty: 'MEDIUM' as const,
                    tags: ['linked-list'],
                };

                const meta = {
                    solvedProblemIds: new Set<string>(),
                    attemptedProblemIds: new Set<string>(),
                    submissionCounts: new Map<string, number>(),
                };

                const result = serializeProblemSummary(problem, meta);

                expect(result.status).toBe('Unsolved');
                expect(result.submissionCount).toBe(0);
                expect(result.difficulty).toBe('Medium');
            });
        });
    });

    describe('Service Logic (problems.service.ts)', () => {
        describe('validateReferenceSolutions', () => {
            const testcases = [{ input: '2 3', output: '5' }];
            const referenceSolution = {
                python: 'print(sum(map(int, input().split())))',
            };

            it('should return { ok: true } when reference solution passes code execution against testcases', async () => {
                const runnerSpy = spyOn(codeRunner, 'executeCodeAgainstTestcases').mockResolvedValue({
                    languageKey: 'python',
                    languageLabel: 'Python',
                    allPassed: true,
                    results: [],
                });

                const result = await validateReferenceSolutions(testcases, referenceSolution);

                expect(result).toEqual({ ok: true });
                expect(runnerSpy).toHaveBeenCalledWith({
                    sourceCode: referenceSolution.python,
                    language: 'python',
                    testcases,
                });

                runnerSpy.mockRestore();
            });

            it('should return { ok: false, message } when reference solution execution fails testcases', async () => {
                const runnerSpy = spyOn(codeRunner, 'executeCodeAgainstTestcases').mockResolvedValue({
                    languageKey: 'python',
                    languageLabel: 'Python',
                    allPassed: false,
                    results: [],
                });

                const result = await validateReferenceSolutions(testcases, referenceSolution);

                expect(result.ok).toBe(false);
                if (!result.ok) {
                    expect(result.message).toContain('Reference solution failed validation for python');
                }

                runnerSpy.mockRestore();
            });

            it('should catch error and return { ok: false, message } when codeRunner throws an exception', async () => {
                const runnerSpy = spyOn(codeRunner, 'executeCodeAgainstTestcases').mockRejectedValue(
                    new Error('Runner connection failed')
                );

                const result = await validateReferenceSolutions(testcases, referenceSolution);

                expect(result.ok).toBe(false);
                if (!result.ok) {
                    expect(result.message).toBe('Runner connection failed');
                }

                runnerSpy.mockRestore();
            });
        });

        describe('getUserProblemMeta Service Function', () => {
            it('should return empty metadata structures when userId is undefined', async () => {
                const meta = await getUserProblemMeta(undefined);
                expect(meta.solvedProblemIds).toBeInstanceOf(Set);
                expect(meta.solvedProblemIds.size).toBe(0);
                expect(meta.attemptedProblemIds).toBeInstanceOf(Set);
                expect(meta.attemptedProblemIds.size).toBe(0);
                expect(meta.submissionCounts).toBeInstanceOf(Map);
                expect(meta.submissionCounts.size).toBe(0);
            });
        });

        describe('Database Operations (Prisma DB Integration)', () => {
            const adminPrn = `UNIT_ADM_${Date.now()}`;
            let adminUserId: string;
            let createdProblemId: string;

            const mockProblemInput: Prisma.ProblemUncheckedCreateInput = {
                title: 'Unit Test Add Numbers',
                description: 'Add two numbers and print result.',
                difficulty: 'EASY',
                tags: ['math', 'basics'],
                userId: '',
                examples: [{ input: '1 2', output: '3' }],
                constraints: '1 <= A, B <= 100',
                hints: 'Use standard addition',
                editorial: 'Simple sum',
                testcases: [{ input: '1 2', output: '3' }],
                codesnippets: { python: 'def solve(): pass' },
                referenceSolution: { python: 'print(sum(map(int, input().split())))' },
            };

            beforeAll(async () => {
                await db.user.deleteMany({ where: { prn: adminPrn } });
                const adminUser = await db.user.create({
                    data: {
                        prn: adminPrn,
                        name: 'Unit Test Admin User',
                        password: 'hashedpassword',
                        role: 'ADMIN',
                    },
                });
                adminUserId = adminUser.id;
                mockProblemInput.userId = adminUserId;
            });

            afterAll(async () => {
                if (createdProblemId) {
                    await db.problem.deleteMany({ where: { id: createdProblemId } });
                }
                await db.user.deleteMany({ where: { prn: adminPrn } });
                await db.$disconnect();
            });

            it('createProblem: should insert a new problem into the database', async () => {
                const problem = await createProblem(mockProblemInput);

                expect(problem).toBeDefined();
                expect(problem.id).toBeDefined();
                expect(problem.title).toBe('Unit Test Add Numbers');
                expect(problem.difficulty).toBe('EASY');
                expect(problem.userId).toBe(adminUserId);

                createdProblemId = problem.id;
            });

            it('getAllProblems: should return list of all problems with summary fields', async () => {
                const problems = await getAllProblems();

                expect(Array.isArray(problems)).toBe(true);
                const match = problems.find((p) => p.id === createdProblemId);
                expect(match).toBeDefined();
                expect(match?.title).toBe('Unit Test Add Numbers');
                expect(match?.difficulty).toBe('EASY');
            });

            it('getProblemById: should retrieve full problem details by ID', async () => {
                const problem = await getProblemById(createdProblemId);

                expect(problem).toBeDefined();
                expect(problem?.id).toBe(createdProblemId);
                expect(problem?.title).toBe('Unit Test Add Numbers');
                expect(problem?.constraints).toBe('1 <= A, B <= 100');
            });

            it('getProblemById: should return null when problem ID is not found', async () => {
                const problem = await getProblemById('00000000-0000-0000-0000-000000000000');
                expect(problem).toBeNull();
            });

            it('updateProblem: should update existing problem fields', async () => {
                const updated = await updateProblem(createdProblemId, {
                    title: 'Updated Add Two Numbers',
                    difficulty: 'HARD',
                    hints: 'New hint',
                });

                expect(updated).toBeDefined();
                expect(updated.id).toBeDefined();
                expect(updated.title).toBe('Updated Add Two Numbers');
                expect(updated.difficulty).toBe('HARD');
                expect(updated.hints).toBe('New hint');
            });

            it('getUserProblemMeta & getSolvedProblemsByUser: should correctly track solved and attempted status', async () => {
                await db.submission.create({
                    data: {
                        userId: adminUserId,
                        problemId: createdProblemId,
                        sourceCode: { python: 'code' },
                        language: 'python',
                        status: 'Accepted',
                    },
                });

                await db.problemSolved.create({
                    data: {
                        userId: adminUserId,
                        problemId: createdProblemId,
                    },
                });

                const meta = await getUserProblemMeta(adminUserId);

                expect(meta.solvedProblemIds.has(createdProblemId)).toBe(true);
                expect(meta.attemptedProblemIds.has(createdProblemId)).toBe(true);
                expect(meta.submissionCounts.get(createdProblemId)).toBe(1);

                const solvedList = await getSolvedProblemsByUser(adminUserId);
                expect(solvedList.length).toBeGreaterThanOrEqual(1);
                expect(solvedList.some((p) => p.id === createdProblemId)).toBe(true);

                // Clean up temporary records
                await db.submission.deleteMany({ where: { userId: adminUserId } });
                await db.problemSolved.deleteMany({ where: { userId: adminUserId } });
            });

            it('deleteProblem: should delete problem from the database', async () => {
                const deleted = await deleteProblem(createdProblemId);

                expect(deleted).toBeDefined();
                expect(deleted.id).toBe(createdProblemId);

                const check = await getProblemById(createdProblemId);
                expect(check).toBeNull();
                createdProblemId = '';
            });
        });
    });
});
