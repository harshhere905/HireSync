import { getInterviewReport, generateResumePdf } from "../services/ai.services.js";
import interviewReportModel from "../models/InterviewReport.models.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const PDFParser = require("pdf2json");

async function parseResumeText(file) {
    if (!file) return "";
    return new Promise((resolve, reject) => {
        const parser = new PDFParser();
        parser.on("pdfParser_dataReady", (data) => {
            const text = data.Pages
                .flatMap(p => p.Texts)
                .map(t => decodeURIComponent(t.R.map(r => r.T).join("")))
                .join(" ")
                .trim();
            resolve(text);
        });
        parser.on("pdfParser_dataError", reject);
        parser.parseBuffer(file.buffer);
    });
}

const generateInterviewReport = async (req, res) => {
    try {
        const { title, selfDescription = "", jobDescription = "" } = req.body;

        console.log("=== GENERATE REPORT ===")
        console.log("Title:", title)
        console.log("Has file:", !!req.file)
        console.log("Self desc:", selfDescription?.slice(0, 50))
        console.log("Job desc length:", jobDescription?.length)

        const resumeText = await parseResumeText(req.file);
        console.log("Final resume text length:", resumeText.length)

        if (!resumeText && !selfDescription.trim()) {
            return res.status(400).json({
                message: "Please provide a resume file or a self-description."
            });
        }

        if (!jobDescription.trim()) {
            return res.status(400).json({ message: "Job description is required." });
        }

        const aiResponse = await getInterviewReport({
            title: title || "Interview Preparation Report",
            resume: resumeText,
            selfDescription,
            jobDescription
        });

        console.log("matchScore:", aiResponse.matchScore)
        console.log("Day 1 resources:", JSON.stringify(aiResponse.preparationPlan[0]?.resources))
        console.log("technicalQuestions:", aiResponse.technicalQuestions?.length)
        console.log("First q type:", typeof aiResponse.technicalQuestions?.[0])

        if (!Array.isArray(aiResponse.technicalQuestions) || typeof aiResponse.technicalQuestions[0] === "string") {
            return res.status(500).json({ message: "AI returned invalid format. Please try again." });
        }

        const interviewReport = await interviewReportModel.create({
            user: req.user?._id || req.user?.id,
            title: aiResponse.title || title || "Interview Preparation Report",
            jobDescription,
            resume: resumeText,
            selfDescription,
            matchScore: aiResponse.matchScore,
            technicalQuestions: aiResponse.technicalQuestions.map(q => ({
                question: q.question,
                intention: q.intention,
                answer: q.answer,
            })),
            behavioralQuestions: aiResponse.behavioralQuestions.map(q => ({
                question: q.question,
                intention: q.intention,
                answer: q.answer,
            })),
            skillGaps: aiResponse.skillGaps.map(g => ({
                skill: g.skill,
                severity: g.severity,
            })),
            preparationPlan: aiResponse.preparationPlan.map(p => ({
            day: p.day,
            focus: p.focus,
            tasks: p.tasks,
            resources: p.resources || [], 
            })),
        });

        console.log("Saved! ID:", interviewReport._id)

        return res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        });

    } catch (error) {
        console.error("Generate report error:", error.message)
        return res.status(500).json({
            message: "Failed to generate interview report.",
            error: error.message
        });
    }
};

const getInterviewReportById = async (req, res) => {
    try {
        const { interviewId } = req.params;
        const report = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user._id
        });
        if (!report) return res.status(404).json({ message: "Interview report not found!!" });
        return res.status(200).json({ message: "Report fetched successfully!!", report });
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch report", error: err.message });
    }
};

const getAllInterviewReports = async (req, res) => {
    try {
        const reports = await interviewReportModel
            .find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");
        return res.status(200).json({ message: "Reports fetched successfully!!", reports });
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch reports", error: err.message });
    }
};

async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}


const deleteInterviewReport = async (req, res) => {
    try {
        const { interviewId } = req.params;
        const deletedReport = await interviewReportModel.findOneAndDelete({
            _id: interviewId,
            user: req.user._id
        });
        if (!deletedReport) return res.status(404).json({ message: "Interview report not found" });
        return res.status(200).json({ message: "Report deleted successfully", deletedReportId: interviewId });
    } catch (err) {
        return res.status(500).json({ message: "Failed to delete report", error: err.message });
    }
};

export {
    generateInterviewReport,
    getInterviewReportById,
    getAllInterviewReports,
    generateResumePdfController,
    deleteInterviewReport
};