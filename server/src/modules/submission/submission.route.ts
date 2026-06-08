import { Router } from 'express'
import { authMiddleware } from '../../middleware/auth.middleware.js'
import {
    getAllSubmissions,
    getSubmissionCountById,
    getSubmissionsById,
    submitCode,
} from './submission.controller.js'

const submissionRouter = Router()

submissionRouter.post('/submit', authMiddleware, submitCode)
submissionRouter.get('/getallsubmissions', authMiddleware, getAllSubmissions)
submissionRouter.get('/get-submissions/:id', authMiddleware, getSubmissionsById)
submissionRouter.get('/get-submission-count/:id', authMiddleware, getSubmissionCountById)
submissionRouter.get('/', authMiddleware, getAllSubmissions)
submissionRouter.get('/problem/:id', authMiddleware, getSubmissionsById)
submissionRouter.get('/problem/:id/count', authMiddleware, getSubmissionCountById)

export default submissionRouter
