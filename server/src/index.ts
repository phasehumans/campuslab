import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'

import authRouter from './modules/auth/auth.route.js'
import problemRouter from './modules/problems/problems.route.js'
import executionRouter from './modules/execution/execution.route.js'
import submissionRouter from './modules/submission/submission.route.js'
import playListRouter from './modules/playlist/playlist.route.js'
import profileRouter from './modules/profile/profile.route.js'
import contestRouter from './modules/contest/contest.route.js'
import { ensureSeedData } from './shared/bootstrap.js'
import { globalRateLimiter } from './middleware/ratelimiter.middleware.js'

const app = express()
const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:4000'

app.use((req, res, next) => {
    const origin = req.headers.origin

    if (origin && origin === clientOrigin) {
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

app.use(globalRateLimiter)

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/problems', problemRouter)
app.use('/api/v1/code-execution', executionRouter)
app.use('/api/v1/submission', submissionRouter)
app.use('/api/v1/playlist', playListRouter)
app.use('/api/v1/profile', profileRouter)
app.use('/api/v1/contests', contestRouter)

const PORT = Number(process.env.PORT) || 3000

const startServer = async () => {
    await ensureSeedData()

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on http://0.0.0.0:${PORT}`)
    })
}

startServer().catch((error) => {
    console.error('Failed to start server', error)
    process.exit(1)
})
