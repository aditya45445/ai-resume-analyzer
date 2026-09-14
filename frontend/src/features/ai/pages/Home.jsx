import React, { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import InteractiveBackground from '../components/InteractiveBackground.jsx'
import HeroSection from '../components/HeroSection.jsx'
import JobDescriptionCard from '../components/JobDescriptionCard.jsx'
import ProfileCard from '../components/ProfileCard.jsx'
import GenerateSection from '../components/GenerateSection.jsx'
import AnalysisResultModal from '../components/AnalysisResultModal.jsx'
import HowItWorksSection from '../components/HowItWorksSection.jsx'
import Footer from '../components/Footer.jsx'
import HistorySection from '../components/HistorySection.jsx'
import { generateInterviewReportApi, optimizeResume } from '../services/ai.api.js'

const Home = () => {
    const [jobDescription, setJobDescription] = useState('')
    const [resumeFile, setResumeFile] = useState(null)
    const [selfDescription, setSelfDescription] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [analysisResult, setAnalysisResult] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // 🚀 NEW: Tracks active view inside the modal ("report" | "resume")
    const [modalView, setModalView] = useState('report')
    // 🚀 NEW: Holds the optimized resume payload from backend
    const [optimizedResume, setOptimizedResume] = useState(null)
    // 🚀 NEW: Loading state for resume optimization request
    const [isOptimizing, setIsOptimizing] = useState(false)

    // Clear JD handler
    const handleClearJobDescription = () => {
        setJobDescription('')
    }

    // File handlers
    const handleFileSelect = (file) => {
        setResumeFile(file)
        setError(null)
    }

    const handleFileRemove = () => {
        setResumeFile(null)
    }

    const handleSelectHistoryReport = (history) => {
        setAnalysisResult(history)
        setModalView('report')
        setIsModalOpen(true)
    }

    // Scroll to workspace on "Get Started"
    const handleScrollToWorkspace = () => {
        const workspaceEl = document.getElementById('workspace')
        if (workspaceEl) {
            workspaceEl.scrollIntoView({ behavior: 'smooth' })
        }
    }

    // Generate Analysis Handler
    const handleGenerateAnalysis = async () => {
        if (!jobDescription.trim() || !resumeFile) {
            setError('Please provide both a Job Description and your Resume file.')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const data = await generateInterviewReportApi({
                resume: resumeFile,
                jobDescription,
                selfDescription,
            })

            setAnalysisResult(data)
            setModalView('report')
            setIsModalOpen(true)
        } catch (err) {
            console.error('Failed to generate report:', err)
            const errorMsg = err?.response?.data?.message || err?.message || 'Failed to generate report. Please verify your connection or login status.'
            setError(errorMsg)
        } finally {
            setIsLoading(false)
        }
    }

    // 🚀 NEW: Triggers the optimization API and switches view to "resume"
    const handleOptimizeResume = async () => {
        try {
            setIsOptimizing(true)
            const response = await optimizeResume({
                resume: resumeFile,
                jobDescription,
                analysisReport: analysisResult,
            })

            const extracted = response?.data?.resume || response?.resume || response?.data
            setOptimizedResume(extracted)
            setModalView('resume')
        } catch (err) {
            console.error('Failed to optimize resume:', err)
        } finally {
            setIsOptimizing(false)
        }
    }

    // 🚀 NEW: Switch view back from Resume preview to Analysis Report
    const handleBackToReport = () => {
        setModalView('report')
    }

    return (
        <div className="relative min-h-screen bg-[#040507] text-white flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
            <InteractiveBackground />
            <Navbar onGetStartedClick={handleScrollToWorkspace} />

            <main className="relative z-10 flex-1 flex flex-col">
                <HeroSection />

                <section
                    id="workspace"
                    className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                        <div className="h-full flex flex-col">
                            <JobDescriptionCard
                                value={jobDescription}
                                onChange={setJobDescription}
                                onClear={handleClearJobDescription}
                            />
                        </div>

                        <div className="h-full flex flex-col">
                            <ProfileCard
                                file={resumeFile}
                                onFileSelect={handleFileSelect}
                                onFileRemove={handleFileRemove}
                                selfDescription={selfDescription}
                                onSelfDescriptionChange={setSelfDescription}
                            />
                        </div>
                    </div>

                    <GenerateSection
                        onGenerate={handleGenerateAnalysis}
                        isLoading={isLoading}
                        hasJobDescription={Boolean(jobDescription.trim())}
                        hasResume={Boolean(resumeFile)}
                        error={error}
                    />
                </section>

                <HistorySection onSelectReport={handleSelectHistoryReport} />
                <HowItWorksSection />
            </main>

            {/* 🚀 MODAL PASSING NAVIGATION PROPS */}
            <AnalysisResultModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={analysisResult}
                modalView={modalView}
                optimizedResume={optimizedResume}
                isOptimizing={isOptimizing}
                onOptimize={handleOptimizeResume}
                onBackToReport={handleBackToReport}
            />

            <Footer />
        </div>
    )
}

export default Home