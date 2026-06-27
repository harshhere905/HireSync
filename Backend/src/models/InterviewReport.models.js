import mongoose from "mongoose";

const technicalQuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, "Technical question is required"],
            trim: true
        },
        intention: {
            type: String,
            required: [true, "Intention is required"],
            trim: true
        },
        answer: {
            type: String,
            required: [true, "Answer is required"],
            trim: true
        },
        keyTopics: [{
            type: String,
            trim: true
        }],
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"]
        }
    },
    {
        _id: false
    }
);

const behavioralQuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, "Behavioral question is required"],
            trim: true
        },
        intention: {
            type: String,
            required: [true, "Intention is required"],
            trim: true
        },
        answer: {
            type: String,
            required: [true, "Answer is required"],
            trim: true
        },
        traitsEvaluated: [{
            type: String,
            trim: true
        }],
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"]
        }
    },
    {
        _id: false
    }
);

const skillGapSchema = new mongoose.Schema(
    {
        skill: {
            type: String,
            required: [true, "Skill is required"],
            trim: true
        },
        severity: {
            type: String,
            enum: ["low", "medium", "high"],
            required: [true, "Severity is required"]
        },
        reason: {
            type: String,
            trim: true
        },
        recommendation: {
            type: String,
            trim: true
        },
        resources: [{
            type: String,
            trim: true
        }]
    },
    {
        _id: false
    }
);

const preparationPlanSchema = new mongoose.Schema(
    {
        day: {
            type: Number,
            required: [true, "Day is required"],
            min: 1
        },
        focus: {
            type: String,
            required: [true, "Focus is required"],
            trim: true
        },
        tasks: [{
            type: String,
            required: [true, "Task is required"],
            trim: true
        }],
        resources: [{        // 👈 ye add karo
            title: {
                type: String,
                trim: true
            },
            url: {
                type: String,
                trim: true
            }
        }],
        estimatedHours: {
            type: Number,
            min: 0
        },
        expectedOutcome: {
            type: String,
            trim: true
        }
    },
    {
        _id: false
    }
);
const interviewReportSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Job title is required"],
            trim: true
        },

        jobDescription: {
            type: String,
            required: [true, "Job description is required"],
            trim: true
        },

        resume: {
            type: String,
            trim: true
        },

        selfDescription: {
            type: String,
            trim: true
        },

        matchScore: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },

        technicalQuestions: {
            type: [technicalQuestionSchema],
            default: []
        },

        behavioralQuestions: {
            type: [behavioralQuestionSchema],
            default: []
        },

        skillGaps: {
            type: [skillGapSchema],
            default: []
        },

        preparationPlan: {
            type: [preparationPlanSchema],
            default: []
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const interviewReportModel = mongoose.model(
    "InterviewReport",
    interviewReportSchema
);

export default interviewReportModel