import express from 'express'
import AuthRoutes from '../src/routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import {interviewRouter} from './routes/interview.routes.js';
const app=express();

app.use(cors({
    origin: ['https://hire-sync-alpha-livid.vercel.app', 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json())
app.use(cookieParser());
app.use('/api/v1/auth',AuthRoutes)
app.use('/api/v1/interview',interviewRouter)


export default app;