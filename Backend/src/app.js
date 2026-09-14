import express from 'express'
import authRouter from './Routes/auth.routes.js'
import interviewRouter from './Routes/interview.routes.js';
import historyRouter from './Routes/history.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();

app.set('trust proxy', 1);
app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://ai-resume-analyzer-pd6inzjeg-struglers.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS Not Allowed'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/history', historyRouter)
app.use('/api/report', interviewRouter)
app.use('/api/auth', authRouter)

export default app