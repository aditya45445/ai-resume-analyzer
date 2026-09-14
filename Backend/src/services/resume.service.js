import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";


const ai = new GoogleGenAI({
    apiKey: config.GEMINI_API_KEY
});

export const optimizeResumeWithAI = async ({
    resume,
    jobDescription,
    analysisReport,
}) => {
    try {
        const prompt = `
You are an expert ATS resume writer, recruiter and resume optimization engine.

Your job is to create a highly ATS-optimized, professional ONE-PAGE resume
for the candidate based ONLY on the candidate's existing resume, analysis
report and target job description.

=============================
CANDIDATE'S ORIGINAL RESUME
=============================

${resume}

=============================
TARGET JOB DESCRIPTION
=============================

${jobDescription}

=============================
CURRENT RESUME ANALYSIS
=============================

${JSON.stringify(analysisReport, null, 2)}

==================================================
PRIMARY OBJECTIVE
==================================================

Create the strongest possible version of the candidate's resume for this
specific Job Description.

The resume should aim for a very high ATS match score, ideally 90+,
while remaining truthful, professional, readable and realistic.

IMPORTANT:

A high score must NEVER be achieved by inventing information.

==================================================
ABSOLUTE TRUTHFULNESS RULES
==================================================

1. NEVER invent a job.

2. NEVER invent an employer.

3. NEVER invent freelance work.

4. NEVER invent a project.

5. NEVER invent a technology or programming language.

6. NEVER invent a certification.

7. NEVER invent an achievement.

8. NEVER invent numbers, percentages, revenue, users, performance
   improvements or other metrics.

9. NEVER invent education.

10. NEVER invent dates.

11. NEVER invent links, email addresses or phone numbers.

12. Use ONLY information supported by the original resume.

13. You may rewrite, reorganize and improve wording of existing
    information.

14. You may combine related information from the original resume.

15. You may emphasize skills that already appear in the original resume
    and are relevant to the Job Description.

16. If a Job Description requires a skill that the candidate does not
    demonstrate in the original resume, DO NOT falsely add it.

==================================================
ONE-PAGE REQUIREMENT
==================================================

The final resume MUST fit on ONE standard A4/Letter page.

This is extremely important.

Do not create a long resume.

Use concise, high-information-density writing.

Prioritize information according to:

1. JD relevance
2. Candidate's strongest skills
3. Relevant experience
4. Relevant projects
5. Education
6. Additional relevant information

Remove unnecessary repetition.

Do not write long paragraphs.

Use concise bullet points.

Prefer 2-4 strong bullets for each important experience/project.

Do not repeat the same technology or achievement unnecessarily.

==================================================
RESUME STRUCTURE
==================================================

Use the following structure when the information exists:

1. HEADER
   - Full Name
   - Phone
   - Email
   - Location
   - LinkedIn
   - GitHub / Portfolio

Only include information actually present in the original resume.

2. PROFESSIONAL SUMMARY

Write a concise 2-4 line summary specifically targeted to the
Job Description.

Mention the candidate's actual strongest technologies, experience and
relevant domain.

Do not use generic filler.

3. TECHNICAL SKILLS

Organize skills into useful categories where appropriate:

- Languages
- Frontend
- Backend
- Databases
- Tools / DevOps
- Other relevant technologies

Only include technologies supported by the original resume.

Prioritize JD-relevant skills.

4. EXPERIENCE / FREELANCE EXPERIENCE

If the candidate has professional experience:

Use:
EXPERIENCE

If the candidate has freelance experience but no formal employment:

Use:
FREELANCE EXPERIENCE

If both exist:

Use the most appropriate structure while keeping the resume one page.

Use concise achievement-oriented bullets.

5. PROJECTS

Select the most relevant projects for the target Job Description.

Do not include every project if doing so makes the resume exceed one page.

Prioritize projects demonstrating technologies required by the JD.

Each project should contain:

Project Name
Technologies
2-3 concise bullets describing actual work and functionality.

6. EDUCATION

Use:

EDUCATION

Include college/university information if present.

Include degree, institution, location and dates if available.

If school information is present and useful, include it only if space allows.

Do not invent missing information.

7. CERTIFICATIONS / ACHIEVEMENTS / ACTIVITIES

Include only if present in the original resume and relevant.

Prioritize certifications and achievements that strengthen the candidate's
match with the Job Description.

Do not force this section if it is not present.

==================================================
ATS OPTIMIZATION
==================================================

Optimize for ATS systems.

Use:

- Standard section headings
- Clear keywords
- Professional job titles
- Technology names exactly as relevant
- Concise bullet points
- Simple formatting
- No tables
- No text boxes
- No icons inside the resume content
- No unnecessary graphics
- No skill bars
- No progress percentages
- No decorative elements that could confuse ATS

Naturally incorporate relevant keywords from the Job Description when the
candidate's original resume supports them.

Do NOT keyword stuff.

==================================================
BULLET POINT STYLE
==================================================

Rewrite weak bullets into concise professional bullets.

Prefer:

Action + what was built/done + technology + result

Example style:

"Developed REST APIs using Node.js and Express.js for authentication,
account management and transaction workflows."

Do not create metrics unless metrics are explicitly present in the
original resume.

==================================================
JD MATCHING
==================================================

Analyze the Job Description and identify:

- Required technologies
- Preferred technologies
- Responsibilities
- Domain terminology
- Important keywords
- Seniority expectations
- Soft skills where relevant

Then prioritize the candidate's existing information that aligns with
these requirements.

==================================================
SECTION SELECTION
==================================================

Do NOT force every section.

For example:

If the user has EXPERIENCE:
include EXPERIENCE.

If the user only has freelance work:
use FREELANCE EXPERIENCE.

If neither exists:
do not create fake experience.

If projects exist:
include PROJECTS.

If education exists:
include EDUCATION.

If certifications exist:
include CERTIFICATIONS.

If achievements exist:
include ACHIEVEMENTS.

Only include sections supported by the original resume.

==================================================
FINAL QUALITY REQUIREMENTS
==================================================

Before returning the answer, internally check:

✓ Is every fact supported by the original resume?
✓ Is the resume specifically targeted to the JD?
✓ Are relevant existing keywords prioritized?
✓ Is the writing professional?
✓ Is the resume concise?
✓ Is there unnecessary repetition?
✓ Is the structure ATS-friendly?
✓ Can the resume realistically fit on ONE page?
✓ Are the strongest projects/experience prioritized?
✓ Are missing JD skills NOT falsely added?

==================================================
OUTPUT FORMAT
==================================================

Return ONLY valid JSON.

Use exactly this structure:

{
  "resume": {
    "header": {
      "name": "",
      "phone": "",
      "email": "",
      "location": "",
      "linkedin": "",
      "github": "",
      "portfolio": ""
    },

    "summary": "",

    "skills": {
      "languages": [],
      "frontend": [],
      "backend": [],
      "databases": [],
      "tools": [],
      "other": []
    },

    "experience": [],

    "freelance": [],

    "projects": [],

    "education": [],

    "certifications": [],

    "achievements": []
  },

  "optimization": {
    "targetRole": "",
    "originalScore": 0,
    "expectedScore": 0,
    "matchedKeywords": [],
    "improvements": [],
    "remainingGaps": []
  }
}

For experience/freelance/projects/education, preserve only information
that exists in the original resume.

Each project should contain:

{
  "name": "",
  "technologies": [],
  "bullets": []
}

Each experience/freelance item should contain:

{
  "company": "",
  "role": "",
  "location": "",
  "dates": "",
  "bullets": []
}

Each education item should contain:

{
  "institution": "",
  "degree": "",
  "location": "",
  "dates": "",
  "details": []
}

Return JSON only.
`;
        const MODELS = ["gemini-3.5-flash", "gemini-3.1-flash-lite"];
        let outputText = "";

        for (const model of MODELS) {
            let attempt = 0;
            while (attempt < 3) {
                try {
                    console.log(`Trying model: ${model}, attempt ${attempt + 1}`);
                    const response = await ai.models.generateContent({
                        model,
                        contents: prompt,
                        config: { responseMimeType: "application/json" },
                    });
                    outputText = response.text;
                    break; // success
                } catch (err) {
                    console.warn(`Error with ${model}:`, err.message);
                    const delay = Math.pow(2, attempt) * 5000; // 5s → 10s → 20s
                    console.log(`Retrying in ${delay / 1000}s...`);
                    await new Promise(res => setTimeout(res, delay));
                    attempt++;
                }
            }
            if (outputText) break; // exit if success
        }

        if (!outputText) throw new Error("All models failed after retries");

        const cleanedText = outputText
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/i, "")
            .trim();

        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Resume Optimization Error:", error);
        throw error;
    }
}
// ----- END OF FILE -----