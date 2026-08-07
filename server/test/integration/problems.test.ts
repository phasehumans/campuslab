import { describe, it, expect, beforeAll, afterAll, spyOn } from 'bun:test';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../../src/app.js';
import { db } from '../../src/config/db.js';
import * as codeRunner from '../../src/shared/codeRunner.js';

describe('Problems Module - Integration Tests', () => {
    const adminPrn = `INT_ADM_${Date.now()}`;
    const userPrn = `INT_USR_${Date.now()}`;
    const jwtSecret = process.env.JWT_SECRET || 'secret';

    let adminUserId: string;
    let regularUserId: string;
    let adminCookie: string;
    let userCookie: string;
    let createdProblemId: string;

    const validProblemPayload = {
        title: 'Integration Test Problem',
        description: 'Calculate the factorial of a given integer N.',
        difficulty: 'EASY',
        tags: ['math', 'recursion'],
        examples: [
            {
                title: 'Example 1',
                input: '5',
                output: '120',
                explanation: '5! = 5 * 4 * 3 * 2 * 1 = 120',
            },
        ],
        constraints: '0 <= N <= 12',
        testcases: [
            { input: '5', output: '120' },
            { input: '0', output: '1' },
        ],
        codesnippets: {
            python: 'def factorial(n):\n    pass',
            cpp: 'int factorial(int n) {\n    return 0;\n}',
        },
        referenceSolution: {
            python: "def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)",
            cpp: "int factorial(int n) {\n    if (n == 0) return 1;\n    return n * factorial(n - 1);\n}",
        },
        editorial: 'Use a loop or recursion to multiply from 1 to N.',
        hints: 'Base case for 0 is 1.',
    };

    beforeAll(async () => {
        // Clean up any existing test users
        await db.user.deleteMany({ where: { prn: { in: [adminPrn, userPrn] } } });

        // Create Admin user
        const admin = await db.user.create({
            data: {
                prn: adminPrn,
                name: 'Integration Admin',
                password: 'hashedpassword',
                role: 'ADMIN',
            },
        });
        adminUserId = admin.id;

        // Create Regular user
        const regularUser = await db.user.create({
            data: {
                prn: userPrn,
                name: 'Integration User',
                password: 'hashedpassword',
                role: 'USER',
            },
        });
        regularUserId = regularUser.id;

        // Generate JWT tokens and cookies
        const adminToken = jwt.sign({ id: adminUserId }, jwtSecret, { expiresIn: '1h' });
        const userToken = jwt.sign({ id: regularUserId }, jwtSecret, { expiresIn: '1h' });

        adminCookie = `jwt=${adminToken}`;
        userCookie = `jwt=${userToken}`;
    });

    afterAll(async () => {
        if (createdProblemId) {
            await db.problem.deleteMany({ where: { id: createdProblemId } });
        }
        await db.user.deleteMany({ where: { prn: { in: [adminPrn, userPrn] } } });
        await db.$disconnect();
    });

    describe('POST /api/v1/problems/create-problem', () => {
        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .post('/api/v1/problems/create-problem')
                .send(validProblemPayload);

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toContain('Access denied');
        });

        it('should return 403 when a non-admin user attempts to create a problem', async () => {
            const res = await request(app)
                .post('/api/v1/problems/create-problem')
                .set('Cookie', userCookie)
                .send(validProblemPayload);

            expect(res.status).toBe(403);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toContain('admins only');
        });

        it('should return 400 when input body fails schema validation', async () => {
            const invalidPayload = {
                title: '', // Invalid empty title
                difficulty: 'INVALID_DIFFICULTY',
            };

            const res = await request(app)
                .post('/api/v1/problems/create-problem')
                .set('Cookie', adminCookie)
                .send(invalidPayload);

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('input invalid');
            expect(res.body.error).toBeDefined();
        });

        it('should return 400 when reference solution validation fails', async () => {
            const runnerSpy = spyOn(codeRunner, 'executeCodeAgainstTestcases').mockResolvedValue({
                languageKey: 'python',
                languageLabel: 'Python',
                allPassed: false,
                results: [],
            });

            const res = await request(app)
                .post('/api/v1/problems/create-problem')
                .set('Cookie', adminCookie)
                .send(validProblemPayload);

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toContain('Reference solution failed validation');

            runnerSpy.mockRestore();
        });

        it('should create problem successfully when called by ADMIN with valid data', async () => {
            const runnerSpy = spyOn(codeRunner, 'executeCodeAgainstTestcases').mockResolvedValue({
                languageKey: 'python',
                languageLabel: 'Python',
                allPassed: true,
                results: [],
            });

            const res = await request(app)
                .post('/api/v1/problems/create-problem')
                .set('Cookie', adminCookie)
                .send(validProblemPayload);

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Problem created successfully');
            expect(res.body.problem).toBeDefined();
            expect(res.body.problem.title).toBe(validProblemPayload.title);

            createdProblemId = res.body.problem.id;
            runnerSpy.mockRestore();
        });
    });

    describe('GET /api/v1/problems/get-problems & GET /api/v1/problems/', () => {
        it('should fetch all problems without authentication', async () => {
            const res = await request(app).get('/api/v1/problems/get-problems');

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Problems fetched successfully');
            expect(Array.isArray(res.body.problems)).toBe(true);

            const found = res.body.problems.find((p: any) => p.id === createdProblemId);
            expect(found).toBeDefined();
            expect(found.title).toBe(validProblemPayload.title);
            expect(found.status).toBe('Unsolved');
        });

        it('should fetch all problems on root GET endpoint', async () => {
            const res = await request(app).get('/api/v1/problems');

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.problems)).toBe(true);
        });

        it('should fetch all problems with user authentication cookie', async () => {
            const res = await request(app)
                .get('/api/v1/problems/get-problems')
                .set('Cookie', userCookie);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.problems)).toBe(true);
        });
    });

    describe('GET /api/v1/problems/get-problems/:id & GET /api/v1/problems/:id', () => {
        it('should return 404 if problem ID does not exist', async () => {
            const nonExistentId = '00000000-0000-0000-0000-000000000000';
            const res = await request(app).get(`/api/v1/problems/get-problems/${nonExistentId}`);

            expect(res.status).toBe(404);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Problem not found');
        });

        it('should fetch single problem details by ID successfully', async () => {
            const res = await request(app).get(`/api/v1/problems/get-problems/${createdProblemId}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Problem fetched successfully');
            expect(res.body.problem).toBeDefined();
            expect(res.body.problem.id).toBe(createdProblemId);
            expect(res.body.problem.description).toBe(validProblemPayload.description);
            expect(res.body.problem.constraints).toBe(validProblemPayload.constraints);
            expect(res.body.problem.starterCodes).toBeDefined();
            expect(res.body.problem.referenceSolutions).toBeDefined();
        });

        it('should fetch problem details using shortcut route /api/v1/problems/:id', async () => {
            const res = await request(app).get(`/api/v1/problems/${createdProblemId}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.problem.id).toBe(createdProblemId);
        });
    });

    describe('PUT /api/v1/problems/update-problem/:id', () => {
        const updatePayload = {
            ...validProblemPayload,
            title: 'Updated Factorial Calculator',
            difficulty: 'MEDIUM',
        };

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .put(`/api/v1/problems/update-problem/${createdProblemId}`)
                .send(updatePayload);

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });

        it('should return 403 when non-admin user attempts update', async () => {
            const res = await request(app)
                .put(`/api/v1/problems/update-problem/${createdProblemId}`)
                .set('Cookie', userCookie)
                .send(updatePayload);

            expect(res.status).toBe(403);
            expect(res.body.success).toBe(false);
        });

        it('should return 400 if updated body is invalid according to schema', async () => {
            const res = await request(app)
                .put(`/api/v1/problems/update-problem/${createdProblemId}`)
                .set('Cookie', adminCookie)
                .send({ title: '' });

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('invalid inputs');
        });

        it('should return 404 when updating non-existent problem ID', async () => {
            const nonExistentId = '00000000-0000-0000-0000-000000000000';
            const res = await request(app)
                .put(`/api/v1/problems/update-problem/${nonExistentId}`)
                .set('Cookie', adminCookie)
                .send(updatePayload);

            expect(res.status).toBe(404);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Problem not found');
        });

        it('should return 400 if reference solution validation fails during update', async () => {
            const runnerSpy = spyOn(codeRunner, 'executeCodeAgainstTestcases').mockResolvedValue({
                languageKey: 'python',
                languageLabel: 'Python',
                allPassed: false,
                results: [],
            });

            const res = await request(app)
                .put(`/api/v1/problems/update-problem/${createdProblemId}`)
                .set('Cookie', adminCookie)
                .send(updatePayload);

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);

            runnerSpy.mockRestore();
        });

        it('should update problem successfully when ADMIN provides valid data', async () => {
            const runnerSpy = spyOn(codeRunner, 'executeCodeAgainstTestcases').mockResolvedValue({
                languageKey: 'python',
                languageLabel: 'Python',
                allPassed: true,
                results: [],
            });

            const res = await request(app)
                .put(`/api/v1/problems/update-problem/${createdProblemId}`)
                .set('Cookie', adminCookie)
                .send(updatePayload);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Problem updated successfully');
            expect(res.body.problem.title).toBe('Updated Factorial Calculator');
            expect(res.body.problem.difficulty).toBe('MEDIUM');

            runnerSpy.mockRestore();
        });
    });

    describe('GET /api/v1/problems/get-solved-problems & GET /api/v1/problems/solved', () => {
        it('should return 401 when user is not authenticated', async () => {
            const res = await request(app).get('/api/v1/problems/get-solved-problems');

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });

        it('should return 200 with user solved problems list when user is authenticated', async () => {
            // Seed a solved problem record for regular user
            await db.problemSolved.create({
                data: {
                    userId: regularUserId,
                    problemId: createdProblemId,
                },
            });

            const res = await request(app)
                .get('/api/v1/problems/get-solved-problems')
                .set('Cookie', userCookie);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Solved problems fetched successfully');
            expect(Array.isArray(res.body.problems)).toBe(true);
            expect(res.body.problems.some((p: any) => p.id === createdProblemId)).toBe(true);

            // Also test alternative route /solved
            const resAlt = await request(app)
                .get('/api/v1/problems/solved')
                .set('Cookie', userCookie);

            expect(resAlt.status).toBe(200);
            expect(resAlt.body.success).toBe(true);

            // Cleanup solved entry
            await db.problemSolved.deleteMany({ where: { userId: regularUserId } });
        });
    });

    describe('DELETE /api/v1/problems/delete-problem/:id', () => {
        it('should return 401 when no token is provided', async () => {
            const res = await request(app).delete(
                `/api/v1/problems/delete-problem/${createdProblemId}`
            );

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });

        it('should return 403 when non-admin user attempts deletion', async () => {
            const res = await request(app)
                .delete(`/api/v1/problems/delete-problem/${createdProblemId}`)
                .set('Cookie', userCookie);

            expect(res.status).toBe(403);
            expect(res.body.success).toBe(false);
        });

        it('should return 404 when deleting a non-existent problem ID', async () => {
            const nonExistentId = '00000000-0000-0000-0000-000000000000';
            const res = await request(app)
                .delete(`/api/v1/problems/delete-problem/${nonExistentId}`)
                .set('Cookie', adminCookie);

            expect(res.status).toBe(404);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Problem not found');
        });

        it('should delete problem successfully when ADMIN requests deletion', async () => {
            const res = await request(app)
                .delete(`/api/v1/problems/delete-problem/${createdProblemId}`)
                .set('Cookie', adminCookie);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Problem deleted successfully');

            // Verify deletion by GET
            const getRes = await request(app).get(`/api/v1/problems/${createdProblemId}`);
            expect(getRes.status).toBe(404);

            createdProblemId = '';
        });
    });
});
