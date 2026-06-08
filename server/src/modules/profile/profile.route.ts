import { Router } from 'express'
import { authMiddleware } from '../../middleware/auth.middleware.js'
import { getMyProfile } from './profile.controller.js'

const profileRouter = Router()

profileRouter.get('/me', authMiddleware, getMyProfile)

export default profileRouter
