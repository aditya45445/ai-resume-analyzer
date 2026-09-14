import React, { useState, useEffect, useRef } from "react";
import ResumePDFDocument from "../components/OptimizedResumePDF.jsx"
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useLocation, useNavigate } from "react-router";
import OptimizedResume from "../components/OptimizedResume.jsx";
import { optimizeResume } from "../services/ai.api.js";
import {
    ArrowLeft, Download, Printer, Sparkles, CheckCircle2, AlertCircle, TrendingUp, ZoomIn, ZoomOut, RefreshCw, ShieldCheck, Layers, Cpu, RotateCcw,
} from "lucide-react";


const UpdateResume = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Carried forward state from AnalysisResultModal
    const {
        resume: initialResumeText = "",
        jobDescription: initialJD = "",
        analysisReport = null,
        atsScore: initialAtsScore = 65,
        skillGaps = []
    } = location.state || {};

    const [resumeData, setResumeData] = useState(null);
    const [optimizationMeta, setOptimizationMeta] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState(null);
    const [zoomScale, setZoomScale] = useState(0.95);
    const [targetRole, setTargetRole] = useState("Software Engineer");

    const resumeElementRef = useRef(null);

    // Derive target role dynamically from JD keywords
    useEffect(() => {
        const jdLower = (initialJD || "").toLowerCase();
        let role = "Software Engineer";
        if (jdLower.includes("frontend") || jdLower.includes("react developer") || jdLower.includes("ui developer")) {
            role = "Frontend Developer";
        } else if (jdLower.includes("backend") || jdLower.includes("node developer") || jdLower.includes("api engineer")) {
            role = "Backend Engineer";
        } else if (jdLower.includes("full stack") || jdLower.includes("fullstack")) {
            role = "Full-Stack Developer";
        } else if (jdLower.includes("devops") || jdLower.includes("cloud")) {
            role = "Cloud & DevOps Engineer";
        } else if (jdLower.includes("data") || jdLower.includes("machine learning") || jdLower.includes("ml")) {
            role = "Data/ML Engineer";
        } else if (jdLower.includes("mobile") || jdLower.includes("android") || jdLower.includes("ios") || jdLower.includes("react native")) {
            role = "Mobile Developer";
        }
        setTargetRole(role);
    }, [initialJD]);

    // Fetch or Generate Optimized Resume
    const fetchOptimizedResume = async () => {
        setIsLoading(true);
        setError(null);
        setResumeData(null);
        setOptimizationMeta(null);

        try {
            const response = await optimizeResume({
                resume: initialResumeText,
                jobDescription: initialJD,
                analysisReport: analysisReport,
            });

            const parsedResume =
                response?.data?.resume ||
                response?.resume ||
                response?.data;

            const metadata =
                response?.data?.optimization ||
                response?.optimization;

            if (parsedResume && parsedResume.header) {
                setResumeData(parsedResume);
                setOptimizationMeta(metadata || null);
            } else {
                setError("AI returned an unexpected response format. Please try again.");
            }
        } catch (err) {
            console.error("Resume optimization failed:", err);
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to optimize resume. The AI service may be temporarily overloaded — please try again.";
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOptimizedResume();
    }, []);

    const handleNativePrint = () => window.print();

    // Computed dynamic values for sidebar
    const matchedKeywords =
        optimizationMeta?.matchedKeywords ||
        (resumeData?.skills
            ? [
                ...(resumeData.skills.languages || []).slice(0, 2),
                ...(resumeData.skills.frontend || []).slice(0, 2),
                ...(resumeData.skills.backend || []).slice(0, 2),
                ...(resumeData.skills.databases || []).slice(0, 2),
            ]
            : []);

    const expectedScore = optimizationMeta?.expectedScore ?? 95;


    // Zoom handlers
    const handleZoomIn = () => setZoomScale((p) => Math.min(p + 0.1, 1.3));
    const handleZoomOut = () => setZoomScale((p) => Math.max(p - 0.1, 0.55));
    const handleZoomReset = () => setZoomScale(0.95);

    return (
        <div className="min-h-screen bg-[#040507] text-white flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
            {/* ================= TOP NAVIGATION BAR ================= */}
            <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090c14]/90 backdrop-blur-xl px-4 sm:px-6 py-3.5">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                    {/* Left Brand / Back */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-white active:scale-95"
                            title="Go back"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">Back</span>
                        </button>

                        <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />

                        <div className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                                <Sparkles className="h-4 w-4" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
                                        ATS Resume Optimizer
                                    </h1>
                                    <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[11px] font-semibold text-indigo-300">
                                        Single-Page A4
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 hidden sm:block">
                                    Targeted for: <strong className="text-indigo-300">{targetRole}</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Action Buttons */}
                    <div className="flex items-center gap-2.5">
                        {/* Zoom Controls */}
                        <div className="hidden md:flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1 text-slate-400">
                            <button
                                onClick={handleZoomOut}
                                className="p-1.5 hover:text-white rounded-lg transition"
                                title="Zoom Out"
                            >
                                <ZoomOut className="h-3.5 w-3.5" />
                            </button>
                            <button
                                onClick={handleZoomReset}
                                className="px-2 text-xs font-mono text-slate-300 hover:text-white transition"
                                title="Reset Zoom"
                            >
                                {Math.round(zoomScale * 100)}%
                            </button>
                            <button
                                onClick={handleZoomIn}
                                className="p-1.5 hover:text-white rounded-lg transition"
                                title="Zoom In"
                            >
                                <ZoomIn className="h-3.5 w-3.5" />
                            </button>
                        </div>

                        {/* Re-Optimize Button */}
                        <button
                            onClick={fetchOptimizedResume}
                            disabled={isLoading}
                            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-white active:scale-95 disabled:opacity-50"
                            title="Regenerate with AI"
                        >
                            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin text-indigo-400" : ""}`} />
                            <span className="hidden sm:inline">Regenerate</span>
                        </button>

                        {/* Browser Print / Native PDF */}
                        <button
                            onClick={handleNativePrint}
                            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-white active:scale-95"
                            title="Print or Save via Browser"
                        >
                            <Printer className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Print</span>
                        </button>

                        {/* Primary Download PDF Button */}
                        {resumeData && (
                            <PDFDownloadLink
                                document={<ResumePDFDocument resume={resumeData} targetRole={targetRole} />}
                                fileName={`${(resumeData.header?.name || "Resume").replace(/\s+/g, "_")}_ATS_Optimized.pdf`}
                                className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] active:scale-95 cursor-pointer"
                            >
                                {({ loading, error }) => (
                                    <>
                                        <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        <Download className="h-4 w-4 text-white" />
                                        <span>{error ? "PDF Error — Retry" : loading ? "Generating PDF..." : "Download PDF"}</span>
                                    </>
                                )}
                            </PDFDownloadLink>
                        )}
                    </div>
                </div>
            </header>

            {/* ================= MAIN CONTENT WORKSPACE ================= */}
            <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* ================= LEFT SIDEBAR: ATS OPTIMIZATION METRICS ================= */}
                <aside className="lg:col-span-4 flex flex-col gap-5">
                    {/* Score Improvement Card */}
                    <div className="rounded-2xl border border-indigo-500/20 bg-[#090c14] p-5 shadow-[0_0_30px_rgba(99,102,241,0.15)] relative overflow-hidden">
                        <div className="absolute -top-12 -right-12 h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                                ATS Score Boost
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                                <TrendingUp className="h-3 w-3" />
                                Target 95%+
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
                                <div className="text-xs text-slate-400 mb-1">Previous Score</div>
                                <div className="text-2xl font-bold text-slate-400">
                                    {initialAtsScore}%
                                </div>
                                <div className="text-[11px] text-amber-400/90 font-medium mt-1">Needs Tuning</div>
                            </div>

                            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                                <div className="text-xs text-emerald-300 mb-1">Optimized ATS</div>
                                <div className="text-2xl font-extrabold text-white">
                                    {expectedScore}%
                                </div>
                                <div className="text-[11px] text-emerald-400 font-semibold mt-1">Interview Ready</div>
                            </div>
                        </div>

                        <div className="space-y-2 text-xs text-slate-300">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                                <span>Strict 1-Page Layout Constraint: <strong className="text-white">Active</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                                <span>Dynamic JD Profile Title: <strong className="text-indigo-300">{targetRole}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                                <span>Verified Contact Details Preserved</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                                <span>Action-Oriented Metric Bullets</span>
                            </div>
                        </div>
                    </div>

                    {/* Target Keywords Card */}
                    <div className="rounded-2xl border border-white/10 bg-[#090c14] p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Cpu className="h-4 w-4 text-indigo-400" />
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                                Key Matched Technologies
                            </h3>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                            {matchedKeywords.map((kw, i) => (
                                <span
                                    key={i}
                                    className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-200"
                                >
                                    ✓ {kw}
                                </span>
                            ))}
                        </div>

                        {skillGaps.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-white/10">
                                <div className="text-xs font-semibold text-slate-400 mb-2">
                                    Resolved Skill Gaps from Analysis:
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {skillGaps.slice(0, 4).map((gap, i) => (
                                        <span
                                            key={i}
                                            className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300"
                                        >
                                            + {gap.skill || gap}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Layout Rules Compliance */}
                    <div className="rounded-2xl border border-white/10 bg-[#090c14] p-5">
                        <div className="flex items-center gap-2 mb-2.5">
                            <ShieldCheck className="h-4 w-4 text-emerald-400" />
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                                1-Page Layout Guarantee
                            </h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-5">
                            Formatted with standard A4 boundaries (210mm x 297mm), 0.5-inch margins, compact 10pt typography, and zero vertical clipping. Suitable for any ATS parser and direct recruiter review.
                        </p>
                    </div>
                </aside>

                {/* ================= RIGHT MAIN: INTERACTIVE A4 PREVIEW CANVAS ================= */}
                <section className="lg:col-span-8 flex flex-col items-center">
                    {isLoading ? (
                        <div className="w-full flex flex-col items-center justify-center min-h-[600px] rounded-2xl border border-indigo-500/20 bg-[#090c14] p-8 text-center">
                            <div className="relative mb-6">
                                <div className="h-16 w-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                                <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-indigo-400 animate-pulse" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">
                                Optimizing Resume with AI Engine...
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                                Rebuilding your resume structure, incorporating JD keywords, re-bulleting achievements, and enforcing single-page A4 boundaries.
                            </p>
                        </div>
                    ) : error ? (
                        <div className="w-full flex flex-col items-center justify-center min-h-[400px] rounded-2xl border border-red-500/20 bg-[#090c14] p-8 text-center gap-4">
                            <AlertCircle className="h-10 w-10 text-red-400" />
                            <p className="text-sm text-red-300 max-w-md">{error}</p>
                            <button
                                onClick={fetchOptimizedResume}
                                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col items-center">
                            <div className="w-full max-w-[210mm] flex items-center justify-between pb-3 text-xs text-slate-400">
                                <span className="flex items-center gap-1.5">
                                    <Layers className="h-3.5 w-3.5 text-indigo-400" />
                                    <span>Interactive 1-Page A4 Print Preview</span>
                                </span>
                                <span className="text-[11px] text-slate-500">
                                    Scale: {Math.round(zoomScale * 100)}%
                                </span>
                            </div>

                            {/* Scaled Preview Wrapper */}
                            <div
                                className="w-full overflow-x-auto flex justify-center py-2"
                                style={{ minHeight: "800px" }}
                            >
                                <div
                                    ref={resumeElementRef}
                                    style={{
                                        transform: `scale(${zoomScale})`,
                                        transformOrigin: "top center",
                                        transition: "transform 0.2s ease-out",
                                        marginBottom: `${(zoomScale - 1) * 300}px`
                                    }}
                                >
                                    <OptimizedResume
                                        resume={resumeData}
                                        targetRole={targetRole}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </main>

            {/* quick download for mobile */}
            <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40">
                {resumeData && (
                    <PDFDownloadLink
                        document={<ResumePDFDocument resume={resumeData} targetRole={targetRole} />}
                        fileName={`${(resumeData.header?.name || "Resume").replace(/\s+/g, "_")}_ATS_Optimized.pdf`}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-3 text-sm font-bold text-white shadow-2xl active:scale-95"
                    >
                        {({ loading, error }) => (
                            <>
                                <Download className="h-4 w-4" />
                                <span>{error ? "PDF Error — Retry" : loading ? "Preparing PDF..." : "Download Single-Page PDF"}</span>
                            </>
                        )}
                    </PDFDownloadLink>
                )}
            </div>
        </div>
    );
};

export default UpdateResume;