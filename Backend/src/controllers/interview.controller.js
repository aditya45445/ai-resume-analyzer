import * as pdfParse from 'pdf-parse'
import generateInterviewReport from '../services/ai.service.js'
import interviewReportModel from '../models/interviewReport.model.js'
import { optimizeResumeWithAI } from '../services/resume.service.js'


export async function generateInterviewReportController(req, res) {

    try {
        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
        const { selfDescription, jobDescription } = req.body

        const interviewAiReport = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewAiReport
        })


        return res.status(200).json({
            message: 'Interview report generated successfully',
            interviewReport
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'internal server error',
            error: err.message
        })
    }



}

export async function optimizeResume(req, res) {
    try {
        const {
            resume,
            jobDescription,
            analysisReport
        } = req.body;

        let resumeText = typeof resume === 'string' ? resume : '';
        if (!resumeText && resume && typeof resume === 'object') {
            resumeText = resume.text || resume.resume || '';
        }
        if (!resumeText && analysisReport) {
            resumeText = analysisReport.resume || analysisReport.interviewReport?.resume || '';
        }

        if (!resumeText) {
            return res.status(400).json({
                success: false,
                message: "Could not extract resume text. Please provide a valid resume PDF or ensure the analysis report contains resume content."
            });
        }

        const effectiveJD = jobDescription || analysisReport?.jobDescription || analysisReport?.interviewReport?.jobDescription || "Full Stack Developer";

        const optimizedResume = await optimizeResumeWithAI({
            resume: resumeText,
            jobDescription: effectiveJD,
            analysisReport
        });

        res.status(200).json({
            success: true,
            message: "Resume optimized successfully",
            data: optimizedResume
        });

    } catch (error) {
        console.error("Optimize Resume Controller Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to optimize resume",
            error: error.message
        });
    }
};