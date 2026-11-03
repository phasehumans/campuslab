import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'

import authRouter from './modules/auth/auth.route.js'
import problemRouter from './modules/problems/problems.route.js'
import executionRouter from './modules/execution/execution.route.js'
import submissionRouter from './modules/submission/submission.route.js'
import profileRouter from './modules/profile/profile.route.js'
import contestRouter from './modules/contest/contest.route.js'
import { globalRateLimiter } from './middleware/ratelimiter.middleware.js'

export const app = express()
const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:4000'
const allowedOrigins = new Set([
    clientOrigin,
    'http://localhost:4000',
    'http://127.0.0.1:4000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
])

app.use((req, res, next) => {
    console.log(`[API] ${req.method} ${req.url} (Origin: ${req.headers.origin ?? 'none'})`)
    const origin = req.headers.origin

    if (origin && (allowedOrigins.has(origin) || origin === clientOrigin)) {
        res.header('Access-Control-Allow-Origin', origin)
        res.header('Access-Control-Allow-Credentials', 'true')
    }

    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
    res.header('Vary', 'Origin')

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204)
    }

    return next()
})

app.use(express.json())
app.use(cookieParser())

app.get('/', (_req, res) => {
    res.json({
        success: true,
        message: 'Campus Lab backend is running',
    })
})

app.post('/api/v1/client-log', (req, res) => {
    console.error('>>> [BROWSER ERROR]', JSON.stringify(req.body, null, 2))
    res.json({ success: true })
})

app.use(globalRateLimiter)

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/problems', problemRouter)
app.use('/api/v1/code-execution', executionRouter)
app.use('/api/v1/submission', submissionRouter)
app.use('/api/v1/profile', profileRouter)
app.use('/api/v1/contests', contestRouter)
