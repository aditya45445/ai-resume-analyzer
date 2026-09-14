import React from 'react'
import { useNavigate } from 'react-router'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ReportAnalysisPDF from './ReportAnalysisPDF.jsx'
import { Sparkles, X, AlertTriangle, TrendingUp, FileText, Download, Award, Lightbulb, ArrowRight, Wand2 } from 'lucide-react'

const AnalysisResultModal = ({ isOpen, onClose, data }) => {
    const navigate = useNavigate()

    if (!isOpen || !data) return null

    const report = data?.interviewReport || data
    if (!report) return null

    const {
        matchScore = 0,
        technicalQuestions = [],
        behavioralQuestions = [],
        skillGaps = [],
        preparationPlan = []
    } = report

    const atsScore = report?.matchScore ?? report?.atsScore ?? 0
    const canOptimize = atsScore < 90

    const handleNavigateToOptimize = () => {
        const resumeText = report?.resume || data?.resume || ""
        const jdText = report?.jobDescription || data?.jobDescription || ""

        navigate('/update-resume', {
            state: {
                resume: resumeText,
                jobDescription: jdText,
                analysisReport: report,
                atsScore: atsScore,
                skillGaps: skillGaps
            }
        })
        if (onClose) onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-xl animate-fade-in">

            {/* Modal Container */}
            <div className="relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-indigo-500/30 bg-[#090c14] text-white shadow-[0_0_50px_rgba(99,102,241,0.25)]">

                {/* Glow accent */}
                <div className="pointer-events-none absolute -top-24 left-1/2 h-32 w-96 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />

                {/* ================= HEADER ================= */}
                <div className="relative flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-8">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                            <Sparkles className="h-5 w-5" />
                        </div>

                        <div>
                            <div className="flex flex-wrap items-center gap-2">

                                <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                                    AI Interview Analysis
                                </h3>

                                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                                    Completed
                                </span>

                            </div>

                            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                                Personalized interview preparation based on your job description and resume.
                            </p>
                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="shrink-0 rounded-xl bg-white/[0.05] p-2 text-slate-400 transition-colors hover:bg-white/[0.1] hover:text-white"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" />
                    </button>

                </div>


                {/* ================= SCROLLABLE CONTENT ================= */}
                <div
                    className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">

                    {/* ================= MATCH SCORE ================= */}
                    <section className="mb-6">

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                            {/* Score */}
                            <div className="flex flex-col items-center justify-center rounded-xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/40 to-white/[0.02] p-6 text-center">

                                <span className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-300">
                                    Interview Match Score
                                </span>

                                <div className="relative my-2 flex h-28 w-28 items-center justify-center rounded-full border-4 border-indigo-500/30 bg-indigo-950/60 shadow-[0_0_30px_rgba(99,102,241,0.3)]">

                                    <span className="text-4xl font-extrabold tracking-tighter text-white">
                                        {matchScore}%
                                    </span>

                                </div>

                                <span className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-400">

                                    <TrendingUp className="h-3.5 w-3.5" />

                                    {matchScore >= 80
                                        ? 'Excellent Alignment'
                                        : matchScore >= 60
                                            ? 'Good Alignment'
                                            : 'Needs Improvement'}

                                </span>

                            </div>


                            {/* Score explanation */}
                            <div className="flex flex-col justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 md:col-span-2">

                                <div className="mb-3 flex items-center gap-2">

                                    <Award className="h-4 w-4 text-indigo-400" />

                                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                                        Report Summary
                                    </h4>

                                </div>

                                <p className="text-sm leading-6 text-slate-300 sm:text-base">
                                    Your profile has been evaluated against the
                                    requirements provided in the job description.
                                    Review the skill gaps and preparation roadmap
                                    below to focus your interview preparation.
                                </p>

                                {canOptimize && (
                                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <Wand2 className="h-4 w-4 text-indigo-400 shrink-0" />
                                            <span className="text-xs sm:text-sm text-indigo-200">
                                                ATS Score is <strong className="text-white">{atsScore}%</strong> (below 90%). Boost your match score with tailored keywords & 1-page format.
                                            </span>
                                        </div>
                                        <button
                                            onClick={handleNavigateToOptimize}
                                            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500 active:scale-95"
                                        >
                                            <span>Optimize Now</span>
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                )}

                            </div>

                        </div>

                    </section>


                    {/* ================= SKILL GAPS ================= */}
                    <section className="mb-6">

                        <div className="mb-4">

                            <div className="flex items-center gap-2">

                                <AlertTriangle className="h-5 w-5 text-orange-400" />

                                <h4 className="text-lg font-bold text-white">
                                    Skill Gaps
                                </h4>

                            </div>

                            <p className="mt-1 text-sm text-slate-400">
                                Skills and technologies that may require additional preparation.
                            </p>

                        </div>


                        {skillGaps.length > 0 ? (

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

                                {skillGaps.map((gap, index) => {

                                    const severity = gap.severity?.toLowerCase()

                                    const severityStyles =
                                        severity === 'low'
                                            ? {
                                                badge: 'border-green-500/30 bg-green-500/10 text-green-400',
                                                dot: 'bg-green-400'
                                            }
                                            : severity === 'medium'
                                                ? {
                                                    badge: 'border-orange-500/30 bg-orange-500/10 text-orange-400',
                                                    dot: 'bg-orange-400'
                                                }
                                                : {
                                                    badge: 'border-red-500/30 bg-red-500/10 text-red-400',
                                                    dot: 'bg-red-400'
                                                }

                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]"
                                        >

                                            <div className="flex min-w-0 items-center gap-3">

                                                <span
                                                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${severityStyles.dot}`}
                                                />

                                                <span className="text-sm font-medium text-slate-200">
                                                    {gap.skill}
                                                </span>

                                            </div>


                                            <span
                                                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold uppercase ${severityStyles.badge}`}
                                            >
                                                {gap.severity}
                                            </span>

                                        </div>
                                    )
                                })}

                            </div>

                        ) : (

                            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 text-sm text-emerald-400">
                                No significant skill gaps were identified.
                            </div>

                        )}

                    </section>


                    {/* ================= TECHNICAL QUESTIONS ================= */}
                    <section className="mb-6">

                        <div className="mb-4">

                            <div className="flex items-center gap-2">

                                <FileText className="h-5 w-5 text-indigo-400" />

                                <h4 className="text-lg font-bold text-white">
                                    Technical Questions
                                </h4>

                            </div>

                            <p className="mt-1 text-sm text-slate-400">
                                Technical questions generated from the role requirements and your profile.
                            </p>

                        </div>


                        <div className="space-y-4">

                            {technicalQuestions.length > 0 ? (

                                technicalQuestions.map((item, index) => (

                                    <div
                                        key={index}
                                        className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5"
                                    >

                                        {/* Question */}
                                        <div className="flex gap-3">

                                            <span className="shrink-0 text-sm font-bold text-indigo-400">
                                                Q{index + 1}:
                                            </span>

                                            <h5 className="text-sm font-semibold leading-6 text-white sm:text-base">
                                                {item.question}
                                            </h5>

                                        </div>


                                        {/* Intention */}
                                        <div className="mt-4 rounded-lg border border-indigo-500/10 bg-indigo-500/[0.04] p-4">

                                            <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                                                Intention
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-slate-300">
                                                {item.intention}
                                            </p>

                                        </div>


                                        {/* Answer */}
                                        <div className="mt-3 rounded-lg border border-emerald-500/10 bg-emerald-500/[0.04] p-4">

                                            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                                                Answer
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-slate-300">
                                                {item.answer}
                                            </p>

                                        </div>

                                    </div>

                                ))

                            ) : (

                                <p className="text-sm text-slate-500">
                                    No technical questions were generated.
                                </p>

                            )}

                        </div>

                    </section>


                    {/* ================= BEHAVIORAL QUESTIONS ================= */}
                    <section className="mb-6">

                        <div className="mb-4">

                            <div className="flex items-center gap-2">

                                <Award className="h-5 w-5 text-purple-400" />

                                <h4 className="text-lg font-bold text-white">
                                    Behavioral Questions
                                </h4>

                            </div>

                            <p className="mt-1 text-sm text-slate-400">
                                Questions designed to evaluate communication, teamwork, ownership, and problem-solving.
                            </p>

                        </div>


                        <div className="space-y-4">

                            {behavioralQuestions.length > 0 ? (

                                behavioralQuestions.map((item, index) => (

                                    <div
                                        key={index}
                                        className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5"
                                    >

                                        {/* Question */}
                                        <div className="flex gap-3">

                                            <span className="shrink-0 text-sm font-bold text-purple-400">
                                                Q{index + 1}:
                                            </span>

                                            <h5 className="text-sm font-semibold leading-6 text-white sm:text-base">
                                                {item.question}
                                            </h5>

                                        </div>


                                        {/* Intention */}
                                        <div className="mt-4 rounded-lg border border-purple-500/10 bg-purple-500/[0.04] p-4">

                                            <p className="text-xs font-bold uppercase tracking-wider text-purple-400">
                                                Intention
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-slate-300">
                                                {item.intention}
                                            </p>

                                        </div>


                                        {/* Answer */}
                                        <div className="mt-3 rounded-lg border border-emerald-500/10 bg-emerald-500/[0.04] p-4">

                                            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                                                Answer
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-slate-300">
                                                {item.answer}
                                            </p>

                                        </div>

                                    </div>

                                ))

                            ) : (

                                <p className="text-sm text-slate-500">
                                    No behavioral questions were generated.
                                </p>

                            )}

                        </div>

                    </section>


                    {/* ================= PREPARATION PLAN ================= */}
                    <section className="mb-6">

                        <div className="mb-4">

                            <div className="flex items-center gap-2">

                                <Lightbulb className="h-5 w-5 text-amber-400" />

                                <h4 className="text-lg font-bold text-white">
                                    Preparation Plan
                                </h4>

                            </div>

                            <p className="mt-1 text-sm text-slate-400">
                                Follow this personalized roadmap to prepare for the interview.
                            </p>

                        </div>


                        <div className="space-y-3">

                            {preparationPlan.length > 0 ? (

                                preparationPlan.map((item) => (

                                    <div
                                        key={item._id || item.day}
                                        className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5"
                                    >

                                        <div className="flex gap-4">

                                            {/* Day */}
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-sm font-bold text-indigo-400">
                                                {item.day}
                                            </div>


                                            {/* Content */}
                                            <div className="min-w-0">

                                                <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                                                    Day {item.day}
                                                </p>

                                                <h5 className="mt-1 text-sm font-semibold text-white sm:text-base">
                                                    Focus: {item.focus}
                                                </h5>

                                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                                    <span className="font-semibold text-slate-300">
                                                        Task:
                                                    </span>{' '}
                                                    {item.task}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                ))

                            ) : (

                                <p className="text-sm text-slate-500">
                                    No preparation plan was generated.
                                </p>

                            )}

                        </div>

                    </section>

                </div>

                {/* ================= FOOTER ================= */}
                <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#090c14] px-6 py-4 sm:px-8">

                    <div>
                        {canOptimize ? (
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <span className="inline-flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                                <span>Optimization recommended to reach 90%+ ATS match</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-xs text-emerald-400">
                                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                <span>Strong ATS alignment (90%+)</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {canOptimize && (
                            <button
                                onClick={handleNavigateToOptimize}
                                id="optimize-resume-modal-btn"
                                className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] active:scale-95 cursor-pointer"
                            >
                                <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <Sparkles className="h-4 w-4 text-amber-300" />
                                <span>Optimize Resume</span>
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                            </button>
                        )}

                        <PDFDownloadLink
                            document={<ReportAnalysisPDF data={data} />}
                            fileName="report-analysis-report.pdf"
                            className="flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-2.5 text-sm font-semibold text-indigo-300 transition-all hover:bg-indigo-500/20 active:scale-95"
                        >
                            {({ loading }) => (
                                <>
                                    <Download className="h-4 w-4" />
                                    {loading ? 'Preparing PDF...' : 'Download Report'}
                                </>
                            )}
                        </PDFDownloadLink>

                        <button
                            onClick={onClose}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white active:scale-95 cursor-pointer"
                        >
                            Done
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AnalysisResultModal
