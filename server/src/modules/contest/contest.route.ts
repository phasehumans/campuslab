import { Router } from 'express'
import { createContestRoom, getContestRoom, joinContestRoom } from './contest.controller.js'
import { authMiddleware, optionalAuthMiddleware } from '../../middleware/auth.middleware.js'

const contestRouter = Router()

contestRouter.post('/rooms', authMiddleware, createContestRoom)
contestRouter.post('/rooms/:roomCode/join', authMiddleware, joinContestRoom)
contestRouter.get('/rooms/:roomCode', optionalAuthMiddleware, getContestRoom)

export default contestRouter
