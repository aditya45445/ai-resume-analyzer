import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})

/**
 * Sends resume file, jobDescription, and selfDescription to backend AI service
 * @param {Object} params
 * @param {File} params.resume
 * @param {string} params.jobDescription
 * @param {string} params.selfDescription
 */
export async function generateInterviewReportApi({ resume, jobDescription, selfDescription }) {
    const formData = new FormData()
    if (resume) {
        formData.append('resume', resume)
    }
    formData.append('jobDescription', jobDescription || '')
    formData.append('selfDescription', selfDescription || '')

    const response = await api.post('/report/generateInterviewReport', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
}
export async function optimizeResume({
    resume,
    jobDescription,
    analysisReport
}) {
    // The resume text is already extracted and stored in the DB report.
    // analysisReport.resume is the authoritative source (set by the controller when analysis was run).
    const resumeText =
        (typeof resume === 'string' && resume) ||
        analysisReport?.resume ||
        analysisReport?.interviewReport?.resume ||
        '';

    const response = await api.post(
        '/report/optimizeResume',
        {
            resume: resumeText,
            jobDescription: jobDescription || analysisReport?.jobDescription || analysisReport?.interviewReport?.jobDescription || '',
            analysisReport
        }
    );

    return response.data;
}