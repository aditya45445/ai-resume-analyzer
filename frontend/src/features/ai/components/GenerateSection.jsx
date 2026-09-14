import React, { useState, useEffect } from 'react'
import { Sparkles, Lock, Zap, Loader2, AlertCircle } from 'lucide-react'

const LOADING_STAGES = [
    'Parsing & extracting resume structure...',
    'Matching skills with job requirements...',
    'Evaluating ATS keyword alignment & density...',
    'Generating tailored improvement roadmap...'
]

const GenerateSection = ({
    onGenerate,
    isLoading,
    hasJobDescription,
    hasResume,
    error,
}) => {
    const [loadingStageIndex, setLoadingStageIndex] = useState(0)

    const isReady = hasJobDescription && hasResume

    // Cycle through informative AI stages while loading
    useEffect(() => {
        if (!isLoading) {
            setLoadingStageIndex(0)
            return
        }

        const interval = setInterval(() => {
            setLoadingStageIndex((prev) => (prev + 1) % LOADING_STAGES.length)
        }, 1800)

        return () => clearInterval(interval)
    }, [isLoading])

    // Helpful validation message
    const getMissingMessage = () => {
        if (!hasJobDescription && !hasResume) {
            return 'Add a Job Description and upload your Resume to continue.'
        }
        if (!hasJobDescription) {
            return 'Please paste the Job Description to continue.'
        }
        if (!hasResume) {
            return 'Please upload your Resume (PDF/DOCX) to continue.'
        }
        return null
    }

    const missingMessage = getMissingMessage()

    return (
        <div className="flex flex-col items-center justify-center pt-8 pb-4 text-center">
            {/* Status / Requirement Indicator when disabled */}
            {!isReady && !isLoading && (
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 mb-4 animate-fade-in">
                    <AlertCircle className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{missingMessage}</span>
                </div>
            )}

            {/* Error Message if API fails */}
            {error && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/25 text-xs sm:text-sm text-rose-300 mb-4 max-w-md">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Primary Generate CTA Button */}
            <div className="relative group/btn">
                {/* Ambient Glow behind button */}
                <div
                    className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 blur-lg transition-all duration-500 ${isReady
                            ? 'opacity-70 group-hover/btn:opacity-100 group-hover/btn:blur-xl animate-pulse-glow'
                            : 'opacity-0'
                        }`}
                />

                <button
                    type="button"
                    id="generate-analysis-btn"
                    onClick={onGenerate}
                    disabled={!isReady || isLoading}
                    className={`relative overflow-hidden flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg tracking-wide transition-all duration-300 select-none ${isLoading
                            ? 'bg-indigo-950 text-indigo-200 border border-indigo-500/40 cursor-wait shadow-[0_0_30px_rgba(99,102,241,0.3)]'
                            : isReady
                                ? 'bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 text-white shadow-[0_10px_30px_rgba(99,102,241,0.4)] hover:shadow-[0_15px_40px_rgba(99,102,241,0.6)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer border border-white/20'
                                : 'bg-white/[0.05] text-slate-500 border border-white/[0.05] cursor-not-allowed opacity-60'
                        }`}
                >
                    {/* Shimmer light streak passing across the button */}
                    {isReady && !isLoading && (
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 animate-shimmer pointer-events-none" />
                    )}

                    {isLoading ? (
                        <>
                            <div className="relative flex items-center justify-center">
                                <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="font-semibold text-sm sm:text-base">
                                    Analyzing Your Profile...
                                </span>
                                <span className="text-[11px] font-normal text-indigo-300 font-mono">
                                    {LOADING_STAGES[loadingStageIndex]}
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5 text-indigo-200 group-hover/btn:rotate-12 transition-transform duration-300" />
                            <span>✦ Generate Analysis</span>
                        </>
                    )}
                </button>
            </div>

            {/* Privacy & Security Trust Indicator */}
            <div className="mt-5 flex flex-col items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Your resume stays private and is only used for analysis.</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1 text-indigo-300">
                        <Zap className="w-3 h-3 text-indigo-400" /> AI-Powered
                    </span>
                    <span>•</span>
                    <span>Resume Analysis</span>
                    <span>•</span>
                    <span>Instant Feedback</span>
                </div>
            </div>
        </div>
    )
}

export default GenerateSection
