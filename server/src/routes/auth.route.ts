import { Router } from 'express'
import {
    loginUser,
    logoutUser,
    registerUser,
    getCurrentUser,
} from '../controllers/auth.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const authRouter = Router()

authRouter.post('/signup', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', authMiddleware, logoutUser)
authRouter.get('/me', authMiddleware, getCurrentUser)
authRouter.get('/getcurrentuser', authMiddleware, getCurrentUser)

export default authRouter
