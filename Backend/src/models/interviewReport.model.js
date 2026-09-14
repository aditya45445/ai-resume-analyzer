import mongoose from "mongoose";

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'technical questions are required']
    },
    intention: {
        type: String,
        required: [true, 'intention of the interviewer is required']
    },
    answer: {
        type: String,
        required: [true, 'answers are required']
    }
}, {
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true]
    },
    intention: {
        type: String,
        required: [true]
    },
    answer: {
        type: String,
        required: [true]
    }
}, { _id: false })

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true]
    },
    severity: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        required: [true]
    }
}, { _id: false })

const preperationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, 'day is required']
    },
    focus: {
        type: String,
        required: [true, 'focus is required']
    },
    task: {
        type: String,
        required: [true, 'task is required']
    }
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, 'job description is required']
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preperationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const interviewReportModel = mongoose.model('interviewReport', interviewReportSchema)

export default interviewReportModel 