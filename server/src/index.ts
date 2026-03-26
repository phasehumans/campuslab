import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'

import authRouter from './routes/auth.route.js'
import problemRouter from './routes/problems.route.js'
import executionRouter from './routes/execution.route.js'
import submissionRouter from './routes/submission.route.js'
import playListRouter from './routes/playlist.route.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', (_req, res) => {
  res.send('Backend is running')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/problems', problemRouter)
app.use('/api/v1/code-execution', executionRouter)
app.use('/api/v1/submission', submissionRouter)
app.use('/api/v1/playlist', playListRouter)

const PORT = Number(process.env.PORT) || 3000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`)
})