import { Router } from 'express'
import {
    authMiddleware,
    checkAdmin,
    optionalAuthMiddleware,
} from '../middleware/auth.middleware.js'
import {
    createProblem,
    deleteProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    getSolvedProblems,
} from '../controllers/problems.controller.js'

const problemRouter = Router()

problemRouter.post('/create-problem', authMiddleware, checkAdmin, createProblem)
problemRouter.get('/get-problems', optionalAuthMiddleware, getAllProblems)
problemRouter.get('/get-problems/:id', optionalAuthMiddleware, getProblemById)
problemRouter.put('/update-problem/:id', authMiddleware, checkAdmin, updateProblem)
problemRouter.delete('/delete-problem/:id', authMiddleware, checkAdmin, deleteProblem)
problemRouter.get('/get-solved-problems', authMiddleware, getSolvedProblems)
problemRouter.get('/solved', authMiddleware, getSolvedProblems)
problemRouter.get('/', optionalAuthMiddleware, getAllProblems)
problemRouter.get('/:id', optionalAuthMiddleware, getProblemById)

export default problemRouter
