import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('error_rate');

export const options = {
    stages: [
        { duration: '30s', target: 20 }, // Ramp up to 20 users over 30s
        { duration: '1m', target: 20 },  // Stay at 20 users for 1 minute
        { duration: '30s', target: 50 }, // Spike to 50 users over 30s
        { duration: '1m', target: 50 },  // Stay at 50 users for 1 minute
        { duration: '30s', target: 0 },  // Ramp down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        error_rate: ['rate<0.05'],         // Errors must be less than 5%
    },
};

const BASE_URL = 'http://localhost:3000/api/v1';

export default function () {
    // 1. Test the root health endpoint
    let res = http.get('http://localhost:3000/');
    let success = check(res, {
        'Root is status 200': (r) => r.status === 200,
        'Root has success true': (r) => JSON.parse(r.body).success === true,
    });
    errorRate.add(!success);

    // 2. Fetch problems list
    res = http.get(`${BASE_URL}/problems/`);
    success = check(res, {
        'Problems GET is status 200': (r) => r.status === 200,
    });
    errorRate.add(!success);

    // 3. Attempt to fetch a non-existent problem (should 404 or 400)
    res = http.get(`${BASE_URL}/problems/invalid-id`);
    success = check(res, {
        'Invalid problem returns 4xx': (r) => r.status >= 400 && r.status < 500,
    });
    errorRate.add(!success);
    
    // Simulate user reading problem for a few seconds
    sleep(Math.random() * 3 + 1);

    // 4. Try unauthenticated profile fetch (should 401)
    res = http.get(`${BASE_URL}/profile/me`);
    success = check(res, {
        'Unauth profile returns 401': (r) => r.status === 401,
    });
    errorRate.add(!success);

    sleep(1);
}
