import express from 'express'
import AuthRoutes from '../src/routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import {interviewRouter} from './routes/interview.routes.js';
const app=express();

app.use(cors({
    origin: function(origin, callback) {
        callback(null, true)
    },
    credentials: true
}));
app.use(express.json())
app.use(cookieParser());
app.use('/api/v1/auth',AuthRoutes)
app.use('/api/v1/interview',interviewRouter)


export default app;