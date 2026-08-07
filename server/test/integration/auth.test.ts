import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import request from 'supertest';
import { app } from '../../src/app.js';
import { db } from '../../src/config/db.js';

describe('Auth Module Integration Tests', () => {
    const testPrn = `INT${Date.now()}`;
    const testPassword = 'securepassword123';
    let jwtCookie: string;

    beforeAll(async () => {
        // Clear any previous test user
        await db.user.deleteMany({ where: { prn: testPrn } });
    });

    afterAll(async () => {
        // Clean up after finishing
        await db.user.deleteMany({ where: { prn: testPrn } });
        await db.$disconnect();
    });

    it('should register a new user successfully', async () => {
        const res = await request(app)
            .post('/api/v1/auth/register')
            .send({
                name: 'Integration Test User',
                prn: testPrn,
                password: testPassword,
            });

        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.user).toBeDefined();
        expect(res.body.user.prn).toBe(testPrn);
        
        // Ensure cookie is set
        expect(res.headers['set-cookie']).toBeDefined();
    });

    it('should fail to register with duplicate PRN', async () => {
        const res = await request(app)
            .post('/api/v1/auth/register')
            .send({
                name: 'Another User',
                prn: testPrn,
                password: testPassword,
            });

        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('user already exists');
    });

    it('should login successfully with correct credentials', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                prn: testPrn,
                password: testPassword,
            });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user.prn).toBe(testPrn);
        
        // Save cookie for subsequent requests
        jwtCookie = res.headers['set-cookie'][0];
    });

    it('should fail login with incorrect password', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                prn: testPrn,
                password: 'wrongpassword',
            });

        expect(res.status).toBe(400); // the controller returns 400 for invalid credentials
        expect(res.body.success).toBe(false);
    });

    it('should fetch current user profile with valid token', async () => {
        const res = await request(app)
            .get('/api/v1/auth/me')
            .set('Cookie', jwtCookie);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user.prn).toBe(testPrn);
    });

    it('should fail to fetch current user profile without token', async () => {
        const res = await request(app)
            .get('/api/v1/auth/me');

        expect(res.status).toBe(401);
        expect(res.body.success).toBe(false);
    });

    it('should logout user successfully', async () => {
        const res = await request(app)
            .post('/api/v1/auth/logout')
            .set('Cookie', jwtCookie);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        // The clearCookie should set Max-Age=0 or expire the token
        expect(res.headers['set-cookie'][0]).toContain('jwt=;');
    });
});
