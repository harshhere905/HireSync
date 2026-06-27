import express from 'express'
import AuthRoutes from '../src/routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { interviewRouter } from './routes/interview.routes.js';
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();

app.use(cors({
    origin: function(origin, callback) {
        callback(null, true)
    },
    credentials: true
}));
app.use(express.json())
app.use(cookieParser());
app.use('/api/v1/auth', AuthRoutes)
app.use('/api/v1/interview', interviewRouter)

// Static files
app.use(express.static(path.join(__dirname, "../../Frontend/dist")))

app.get("/{*path}", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Frontend/dist", "index.html"))
})

export default app;