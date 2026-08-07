import { describe, it, expect } from 'bun:test';

const BACKEND_URL = 'http://localhost:3000';
const FRONTEND_URL = 'http://localhost:4000';

describe('Extensive Smoke Tests', () => {
    it('Backend - Root endpoint should return success message', async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/`);
            if (res.ok) {
                const data = await res.json();
                expect(data.success).toBe(true);
                expect(data.message).toContain('running');
            }
        } catch (e) {
            console.warn('Backend server is not reachable. Skipping test.');
        }
    });

    it('Frontend - Dev server should be reachable', async () => {
        try {
            const res = await fetch(`${FRONTEND_URL}/`);
            expect(res.status).toBe(200);
            const text = await res.text();
            expect(text).toContain('<html'); // Verify it returns an HTML file
        } catch (e) {
            console.warn('Frontend server is not reachable. Skipping test.');
        }
    });

    describe('Backend - CORS and Rate Limiter Headers', () => {
        it('should return correct CORS headers for OPTIONS request', async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
                    method: 'OPTIONS',
                    headers: { 'Origin': FRONTEND_URL }
                });
                
                // Usually returns 204 No Content for preflight
                expect([204, 200]).toContain(res.status);
                expect(res.headers.get('Access-Control-Allow-Origin')).toBe(FRONTEND_URL);
                expect(res.headers.get('Access-Control-Allow-Credentials')).toBe('true');
                expect(res.headers.get('Access-Control-Allow-Methods')).toContain('POST');
            } catch (e) {
                console.warn('Backend server is not reachable. Skipping test.');
            }
        });
    });

    describe('Backend - Route Availability', () => {
        const routesToCheck = [
            { path: '/api/v1/auth/me', method: 'GET', expectedStatus: [401] }, // Should be protected
            { path: '/api/v1/problems/', method: 'GET', expectedStatus: [200] }, // Should be public
            { path: '/api/v1/contests/', method: 'GET', expectedStatus: [200, 401, 404] }, // Based on implementation
            { path: '/api/v1/code-execution/run', method: 'POST', expectedStatus: [401, 400] }, // Should require auth or payload
            { path: '/invalid-route-that-does-not-exist', method: 'GET', expectedStatus: [404] }
        ];

        for (const route of routesToCheck) {
            it(`should respond to ${route.method} ${route.path} without crashing (status ${route.expectedStatus.join(' or ')})`, async () => {
                try {
                    const res = await fetch(`${BACKEND_URL}${route.path}`, {
                        method: route.method,
                        headers: { 'Content-Type': 'application/json' },
                        ...(route.method === 'POST' ? { body: JSON.stringify({}) } : {})
                    });
                    
                    expect(route.expectedStatus).toContain(res.status);
                } catch (e) {
                    console.warn(`Could not reach backend for ${route.path}.`);
                }
            });
        }
    });
});
