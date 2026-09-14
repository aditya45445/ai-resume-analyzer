import { Router } from 'express'
import { generateInterviewReportController, optimizeResume } from '../controllers/interview.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import upload from '../middleware/file.middleware.js'
const interviewRouter = Router()

interviewRouter.post('/generateInterviewReport', authMiddleware, upload.single('resume'), generateInterviewReportController)
interviewRouter.post('/optimizeResume', authMiddleware, optimizeResume)


export default interviewRouter   