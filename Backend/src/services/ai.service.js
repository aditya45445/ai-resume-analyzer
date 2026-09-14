import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";
import * as z from "zod";


const ai = new GoogleGenAI({
    apiKey: config.GEMINI_API_KEY
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("The match score between the candidate's profile and the job description, on the scale of 0 to 100"),

    technicalQuestions: z.array(
        z.object({
            question: z.string().describe("The technical question can be asked in the interview"),
            intention: z.string().describe("The intention of the interviewer behind asking this question"),
            answer: z.string().describe("How to answer this question, what points to cover, what approach to follow"),
        })
    ).describe("Technical questions that can be asked in interview, along with their intention and answer"),
    behavioralQuestions: z.array(
        z.object({
            question: z.string().describe("The behavioral question can be asked in interview"),
            intention: z.string().describe("The intention of the interviewer behind asking this question"),
            answer: z.string().describe("How to answer this question, what points to cover, what approach to follow"),
        })
    ).describe("List of behavioral questions that can be asked in the interview along with the intention behind asking them and how to answer them"),
    skillGaps: z.array(
        z.object({
            skill: z.string().describe("The skill that is  identified as gap"),
            severity: z.enum(["High", "Medium", "Low"]).describe("The severity of the skill gap"),
        })
    ).describe("List of skill gaps identified in the candidate's profile along with their severity"),
    preparationPlan: z.array(
        z.object({
            day: z.number().describe("The day of the preparation plan"),
            focus: z.string().describe("The main focus of this day in the preperation plan, e.g. learn about X, strengthen Y and Z  "),
            task: z.string().describe("list of the task to be done on this day to follow the preperation plan, e.g. complete X, practice Y and Z"),
        })
    ).describe("A day wise preperation plan for the candidate to follow in order to get success in the interview")
});

async function generateInterviewReport(param1, param2, param3) {
    let resume = "";
    let selfDescription = "";
    let jobDescription = "";

    if (param1 && typeof param1 === "object") {
        resume = param1.resume || "";
        selfDescription = param1.selfDescription || "";
        jobDescription = param1.jobDescription || "";
    } else {
        resume = param1 || "";
        selfDescription = param2 || "";
        jobDescription = param3 || "";
    }

    const prompt = `
You are an expert technical recruiter, hiring manager, and ATS (Applicant Tracking System) evaluation engine.

Analyze the candidate's actual resume against the target job description dynamically, objectively, and rigorously.

=========================================
CANDIDATE RESUME:
${resume || "No resume text provided"}
=========================================

=========================================
CANDIDATE SELF-DESCRIPTION:
${selfDescription || "None provided"}
=========================================

=========================================
TARGET JOB DESCRIPTION:
${jobDescription || "General Software Engineering Role"}
=========================================

=========================================
ATS SCORING RULES (CRITICAL):
=========================================
1. Calculate a dynamic ATS 'matchScore' (integer 0 to 100) based strictly on this specific resume and JD:
   - Hard Skills & Tech Stack match (40% weight)
   - Relevant Work / Project experience alignment (30% weight)
   - Scope of responsibilities, seniority, and domain relevance (20% weight)
   - Education and certifications match (10% weight)
2. DO NOT return a static or hardcoded score. The score MUST reflect the actual overlap:
   - High match (85 - 98): Candidate demonstrates nearly all required technologies, strong projects, and relevant experience.
   - Moderate match (60 - 84): Candidate possesses core basics but is missing several requested tools, depth, or years of experience.
   - Low match (20 - 59): Candidate has significant skill gaps or fundamentally different stack/domain.
3. Identify specific skill gaps found in the candidate's profile vs the target JD, marking severity as High, Medium, or Low.
4. Generate 3 targeted technical questions and 2 behavioral questions tailored directly to this candidate's specific background and the JD.
5. Provide a realistic day-by-day preparation plan.
`;

    const interviewReportJsonSchema = z.toJSONSchema(interviewReportSchema);

    let outputText = "";
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: interviewReportJsonSchema,
            },
        });
        outputText = response.text;
    } catch (err) {
        console.warn("Retrying with gemini-3.8-flash due to:", err.message);
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: interviewReportJsonSchema,
            },
        });
        outputText = response.text;
    }

    const interviewReport = interviewReportSchema.parse(JSON.parse(outputText));
    return interviewReport;
}

export default generateInterviewReport;