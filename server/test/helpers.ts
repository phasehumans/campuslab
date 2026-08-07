import { db } from '../src/config/db.js';

/**
 * Helper to clear specific tables in the database before/after tests.
 * Adjust table names based on your Prisma schema.
 */
export async function clearDatabase() {
    // Example: await db.user.deleteMany();
    // Example: await db.problem.deleteMany();
}

/**
 * Helper to disconnect database after all tests complete.
 */
export async function disconnectDatabase() {
    await db.$disconnect();
}

/**
 * Helper to generate a mock user for testing.
 */
export function generateMockUser() {
    return {
        email: `testuser_${Date.now()}@example.com`,
        password: 'password123',
        name: 'Test User'
    };
}
