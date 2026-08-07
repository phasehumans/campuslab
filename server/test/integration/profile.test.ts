import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../../src/app.js';
import { db } from '../../src/config/db.js';

describe('Profile Module Integration Tests', () => {
    const testPrn = `INT_PRF_${Date.now()}`;
    const testPassword = 'profilePassword123';
    let jwtCookie: string;
    let registeredUserId: string;

    let easyProblemId: string;
    let mediumProblemId: string;
    let hardProblemId: string;

    beforeAll(async () => {
        // Clear any previous test users with INT_PRF_ prefix
        await db.user.deleteMany({ where: { prn: { startsWith: 'INT_PRF_' } } });
    });

    afterAll(async () => {
        // Clean up test data
        try {
            if (registeredUserId) {
                await db.submission.deleteMany({ where: { userId: registeredUserId } });
                await db.problemSolved.deleteMany({ where: { userId: registeredUserId } });
                await db.user.deleteMany({ where: { id: registeredUserId } });
            }
            if (easyProblemId || mediumProblemId || hardProblemId) {
                await db.problem.deleteMany({
                    where: { id: { in: [easyProblemId, mediumProblemId, hardProblemId].filter(Boolean) } },
                });
            }
        } catch {
            // Ignore cleanup errors
        }
        await db.$disconnect();
    });

    it('should fail to get profile without authentication cookie', async () => {
        const res = await request(app).get('/api/v1/profile/me');

        expect(res.status).toBe(401);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Access denied: no token provided');
    });

    it('should fail to get profile with an invalid token', async () => {
        const res = await request(app)
            .get('/api/v1/profile/me')
            .set('Cookie', ['jwt=invalid.token.here']);

        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Invalid token');
    });

    it('should fail to get profile if token user does not exist in DB', async () => {
        const jwtSecret = process.env.JWT_SECRET || 'super-secret-jwt-key';
        const fakeToken = jwt.sign(
            { id: '00000000-0000-0000-0000-000000000000' },
            jwtSecret
        );

        const res = await request(app)
            .get('/api/v1/profile/me')
            .set('Cookie', [`jwt=${fakeToken}`]);

        expect(res.status).toBe(404);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('User not found');
    });

    it('should register a new user and fetch initial empty profile stats', async () => {
        // Register user
        const regRes = await request(app)
            .post('/api/v1/auth/register')
            .send({
                name: 'Profile Integration User',
                prn: testPrn,
                password: testPassword,
            });

        expect(regRes.status).toBe(201);
        expect(regRes.body.success).toBe(true);
        expect(regRes.headers['set-cookie']).toBeDefined();

        jwtCookie = regRes.headers['set-cookie'][0];
        registeredUserId = regRes.body.user.id;

        // Fetch profile
        const res = await request(app)
            .get('/api/v1/profile/me')
            .set('Cookie', jwtCookie);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.profile).toBeDefined();

        // User payload verification
        const user = res.body.profile.user;
        expect(user.id).toBe(registeredUserId);
        expect(user.name).toBe('Profile Integration User');
        expect(user.prn).toBe(testPrn);
        expect(user.role).toBe('USER');

        // Stats verification (initially 0 solved)
        const stats = res.body.profile.stats;
        expect(stats.totalSolved).toBe(0);
        expect(stats.byDifficulty).toHaveLength(3);

        const easyStat = stats.byDifficulty.find((s: { name: string }) => s.name === 'Easy');
        const mediumStat = stats.byDifficulty.find((s: { name: string }) => s.name === 'Medium');
        const hardStat = stats.byDifficulty.find((s: { name: string }) => s.name === 'Hard');

        expect(easyStat).toBeDefined();
        expect(easyStat.value).toBe(0);
        expect(mediumStat).toBeDefined();
        expect(mediumStat.value).toBe(0);
        expect(hardStat).toBeDefined();
        expect(hardStat.value).toBe(0);

        expect(res.body.profile.recentSubmissions).toEqual([]);
    });

    it('should fetch updated profile stats and formatted recent submissions after activity', async () => {
        // Create test problems
        const easyProb = await db.problem.create({
            data: {
                title: 'Int Easy Title',
                description: 'Int Easy Desc',
                difficulty: 'EASY',
                tags: ['basic'],
                userId: registeredUserId,
                examples: [],
                constraints: 'None',
                testcases: [],
                codesnippets: {},
                referenceSolution: {},
            },
        });
        easyProblemId = easyProb.id;

        const mediumProb = await db.problem.create({
            data: {
                title: 'Int Medium Title',
                description: 'Int Medium Desc',
                difficulty: 'MEDIUM',
                tags: ['medium-tag'],
                userId: registeredUserId,
                examples: [],
                constraints: 'None',
                testcases: [],
                codesnippets: {},
                referenceSolution: {},
            },
        });
        mediumProblemId = mediumProb.id;

        const hardProb = await db.problem.create({
            data: {
                title: 'Int Hard Title',
                description: 'Int Hard Desc',
                difficulty: 'HARD',
                tags: ['hard-tag'],
                userId: registeredUserId,
                examples: [],
                constraints: 'None',
                testcases: [],
                codesnippets: {},
                referenceSolution: {},
            },
        });
        hardProblemId = hardProb.id;

        // Record problem solved for EASY problem
        await db.problemSolved.create({
            data: {
                userId: registeredUserId,
                problemId: easyProblemId,
            },
        });

        // Record submissions for EASY and HARD problems
        const sub1 = await db.submission.create({
            data: {
                userId: registeredUserId,
                problemId: easyProblemId,
                sourceCode: { code: 'print("hello")' },
                language: 'python',
                status: 'ACCEPTED',
            },
        });

        const sub2 = await db.submission.create({
            data: {
                userId: registeredUserId,
                problemId: hardProblemId,
                sourceCode: { code: 'print("hard")' },
                language: 'python',
                status: 'WRONG_ANSWER',
            },
        });

        // Fetch profile
        const res = await request(app)
            .get('/api/v1/profile/me')
            .set('Cookie', jwtCookie);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);

        const stats = res.body.profile.stats;
        expect(stats.totalSolved).toBe(1);

        const easyStat = stats.byDifficulty.find((s: { name: string }) => s.name === 'Easy');
        expect(easyStat.value).toBe(1);

        // Check recent submissions formatting
        const submissions = res.body.profile.recentSubmissions;
        expect(submissions.length).toBe(2);

        // Should be ordered descending by createdAt (sub2 was created second)
        expect(submissions[0].id).toBe(sub2.id);
        expect(submissions[0].title).toBe('Int Hard Title');
        expect(submissions[0].difficulty).toBe('Hard');
        expect(submissions[0].status).toBe('WRONG_ANSWER');
        expect(submissions[0].language).toBe('python');

        expect(submissions[1].id).toBe(sub1.id);
        expect(submissions[1].title).toBe('Int Easy Title');
        expect(submissions[1].difficulty).toBe('Easy');
        expect(submissions[1].status).toBe('ACCEPTED');
    });
});
