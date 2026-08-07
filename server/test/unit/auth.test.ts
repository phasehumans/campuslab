import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import { findUserByPrn, findUserById, createUser } from '../../src/modules/auth/auth.service.js';
import { db } from '../../src/config/db.js';

describe('Auth Service Unit Tests', () => {
    const testPrn = `T${Date.now()}`;
    let createdUserId: string;

    beforeAll(async () => {
        // Clean up before starting
        await db.user.deleteMany({ where: { prn: testPrn } });
    });

    afterAll(async () => {
        // Clean up after finishing
        await db.user.deleteMany({ where: { prn: testPrn } });
        await db.$disconnect();
    });

    it('should create a new user', async () => {
        const user = await createUser({
            prn: testPrn,
            name: 'Unit Test User',
            password: 'hashedpassword',
        });
        
        expect(user).toBeDefined();
        expect(user.prn).toBe(testPrn);
        expect(user.name).toBe('Unit Test User');
        expect(user.role).toBe('USER');
        createdUserId = user.id;
    });

    it('should find user by PRN', async () => {
        const user = await findUserByPrn(testPrn);
        expect(user).toBeDefined();
        expect(user?.prn).toBe(testPrn);
    });

    it('should find user by ID', async () => {
        const user = await findUserById(createdUserId);
        expect(user).toBeDefined();
        expect(user?.id).toBe(createdUserId);
    });
});
