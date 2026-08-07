import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import { getUserProfileStats } from '../../src/modules/profile/profile.service.js';
import { difficultyLabels } from '../../src/modules/profile/profile.utils.js';
import { db } from '../../src/config/db.js';

describe('Profile Module Unit Tests', () => {
    const testPrn = `PRF_UNIT_${Date.now()}`;
    let userId: string;
    let easyProblemId: string;
    let mediumProblemId: string;
    let hardProblemId: string;

    beforeAll(async () => {
        // Clean up previous test records if any
        await db.user.deleteMany({ where: { prn: { startsWith: 'PRF_UNIT_' } } });

        // Create test user
        const user = await db.user.create({
            data: {
                name: 'Profile Unit Test User',
                prn: testPrn,
                password: 'password123',
            },
        });
        userId = user.id;

        // Create test problems of different difficulties
        const easyProblem = await db.problem.create({
            data: {
                title: 'Unit Easy Problem',
                description: 'Easy description',
                difficulty: 'EASY',
                tags: ['array'],
                userId: userId,
                examples: [],
                constraints: '1 <= N <= 100',
                testcases: [],
                codesnippets: {},
                referenceSolution: {},
            },
        });
        easyProblemId = easyProblem.id;

        const mediumProblem = await db.problem.create({
            data: {
                title: 'Unit Medium Problem',
                description: 'Medium description',
                difficulty: 'MEDIUM',
                tags: ['tree'],
                userId: userId,
                examples: [],
                constraints: '1 <= N <= 1000',
                testcases: [],
                codesnippets: {},
                referenceSolution: {},
            },
        });
        mediumProblemId = mediumProblem.id;

        const hardProblem = await db.problem.create({
            data: {
                title: 'Unit Hard Problem',
                description: 'Hard description',
                difficulty: 'HARD',
                tags: ['dp'],
                userId: userId,
                examples: [],
                constraints: '1 <= N <= 10000',
                testcases: [],
                codesnippets: {},
                referenceSolution: {},
            },
        });
        hardProblemId = hardProblem.id;

        // Create problemSolved entries
        await db.problemSolved.create({
            data: {
                userId,
                problemId: easyProblemId,
            },
        });
        await db.problemSolved.create({
            data: {
                userId,
                problemId: mediumProblemId,
            },
        });

        // Create 12 submissions to verify limit of 10 and ordering
        for (let i = 0; i < 12; i++) {
            await db.submission.create({
                data: {
                    userId,
                    problemId: i % 2 === 0 ? easyProblemId : mediumProblemId,
                    sourceCode: { code: `console.log(${i})` },
                    language: 'javascript',
                    status: i % 2 === 0 ? 'ACCEPTED' : 'WRONG_ANSWER',
                },
            });
        }
    });

    afterAll(async () => {
        try {
            await db.submission.deleteMany({ where: { userId } });
            await db.problemSolved.deleteMany({ where: { userId } });
            await db.problem.deleteMany({
                where: { id: { in: [easyProblemId, mediumProblemId, hardProblemId] } },
            });
            await db.user.deleteMany({ where: { id: userId } });
        } catch {
            // ignore cleanup errors
        }
        await db.$disconnect();
    });

    describe('profile.utils', () => {
        it('should export correct difficultyLabels mapping', () => {
            expect(difficultyLabels).toBeDefined();
            expect(difficultyLabels.EASY).toBe('Easy');
            expect(difficultyLabels.MEDIUM).toBe('Medium');
            expect(difficultyLabels.HARD).toBe('Hard');
        });
    });

    describe('profile.service - getUserProfileStats', () => {
        it('should return null user when userId is non-existent', async () => {
            const nonExistentId = '00000000-0000-0000-0000-000000000000';
            const [user, problems, solvedProblems, recentSubmissions] =
                await getUserProfileStats(nonExistentId);

            expect(user).toBeNull();
            expect(Array.isArray(problems)).toBe(true);
            expect(solvedProblems).toEqual([]);
            expect(recentSubmissions).toEqual([]);
        });

        it('should retrieve complete user profile stats for a valid user', async () => {
            const [user, problems, solvedProblems, recentSubmissions] =
                await getUserProfileStats(userId);

            // User verification
            expect(user).toBeDefined();
            expect(user?.id).toBe(userId);
            expect(user?.name).toBe('Profile Unit Test User');
            expect(user?.prn).toBe(testPrn);
            expect(user?.role).toBe('USER');
            expect(user?.createdAt).toBeDefined();

            // Total problems verification
            expect(problems.length).toBeGreaterThanOrEqual(3);
            const problemIds = problems.map((p) => p.id);
            expect(problemIds).toContain(easyProblemId);
            expect(problemIds).toContain(mediumProblemId);
            expect(problemIds).toContain(hardProblemId);

            // Solved problems verification
            expect(solvedProblems.length).toBe(2);
            const solvedProblemIds = solvedProblems.map((sp) => sp.problemId);
            expect(solvedProblemIds).toContain(easyProblemId);
            expect(solvedProblemIds).toContain(mediumProblemId);

            // Submissions limit verification (take: 10)
            expect(recentSubmissions.length).toBe(10);
            expect(recentSubmissions[0].userId).toBe(userId);
            expect(recentSubmissions[0].problem).toBeDefined();
            expect(recentSubmissions[0].problem.title).toBeDefined();
            expect(recentSubmissions[0].problem.difficulty).toBeDefined();
        });

        it('should return empty solvedProblems and recentSubmissions for a user with no activity', async () => {
            const newPrn = `PRF_EMPTY_${Date.now()}`;
            const emptyUser = await db.user.create({
                data: {
                    name: 'Empty Activity User',
                    prn: newPrn,
                    password: 'password123',
                },
            });

            try {
                const [user, problems, solvedProblems, recentSubmissions] =
                    await getUserProfileStats(emptyUser.id);

                expect(user).toBeDefined();
                expect(user?.id).toBe(emptyUser.id);
                expect(solvedProblems).toHaveLength(0);
                expect(recentSubmissions).toHaveLength(0);
                expect(problems.length).toBeGreaterThanOrEqual(3);
            } finally {
                await db.user.delete({ where: { id: emptyUser.id } });
            }
        });
    });
});
