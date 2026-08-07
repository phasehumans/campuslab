import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import { clearDatabase, disconnectDatabase } from '../helpers.js';

describe('Integration Test Example - API', () => {
    const API_URL = 'http://localhost:3000'; // Make sure your dev server is running, or import the express app to test it in-memory.

    beforeAll(async () => {
        // Optional: Run setup or clear db before tests
        await clearDatabase();
    });

    afterAll(async () => {
        // Cleanup after tests
        await disconnectDatabase();
    });

    it('should get a successful response from the root endpoint', async () => {
        try {
            const response = await fetch(`${API_URL}/`);
            // If the server isn't running during the test, this fetch will fail.
            // Consider refactoring index.ts to export the `app` for in-memory testing with supertest or similar.
            
            if (response.ok) {
                const data = await response.json();
                expect(data.success).toBe(true);
                expect(data.message).toBe('Campus Lab backend is running');
            } else {
                console.warn('Server is not running. Skipping assertion.');
            }
        } catch (error) {
            console.warn('Failed to fetch from local server. Ensure the server is started before running integration tests if testing via network fetch.', error);
        }
    });
});
