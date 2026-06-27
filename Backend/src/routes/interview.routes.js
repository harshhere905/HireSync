import express from 'express'
import { authUser } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/file.middleware.js";
import {generateInterviewReport,getInterviewReportById,getAllInterviewReports,generateResumePdfController,deleteInterviewReport} from '../controllers/generateInterviewReport.controllers.js';
import interviewReportModel from '../models/InterviewReport.models.js';

const interviewRouter=express.Router();

interviewRouter.post("/",authUser,upload.single("resume"),generateInterviewReport)
interviewRouter.get("/report/:interviewId",authUser,getInterviewReportById)
interviewRouter.get("/reports",authUser,getAllInterviewReports)
interviewRouter.post("/resume/pdf/:interviewReportId",authUser,generateResumePdfController)
interviewRouter.delete("/report/:interviewId",authUser,deleteInterviewReport)

export {interviewRouter}