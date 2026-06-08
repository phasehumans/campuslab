import { Router } from 'express'
import { executeCode } from './execution.controller.js'
import { authMiddleware } from '../../middleware/auth.middleware.js'

const executionRouter = Router()

executionRouter.post('/', authMiddleware, executeCode)
executionRouter.post('/run', authMiddleware, executeCode)

export default executionRouter
