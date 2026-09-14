import express from 'express'
import authRouter from './Routes/auth.routes.js'
import interviewRouter from './Routes/interview.routes.js';
import historyRouter from './Routes/history.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://ai-resume-analyzer-eight-eosin.vercel.app",
    credentials: true
}))

app.use('/api/history', historyRouter)
app.use('/api/report', interviewRouter)
app.use('/api/auth', authRouter)

export default app