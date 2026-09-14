import { Router } from 'express'
import * as authController from '../controllers/auth.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const authRouter = Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.get('/logout', authController.logout)
authRouter.get('/getMe', authMiddleware, authController.getMe)

export default authRouter