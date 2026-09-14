import { Router } from 'express'
import { getHistory, getHistoryById } from '../controllers/history.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const historyRouter = Router()

historyRouter.get('/', authMiddleware, getHistory)
historyRouter.get('/:id', authMiddleware, getHistoryById)

export default historyRouter  