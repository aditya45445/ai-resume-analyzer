import React from 'react'
import { Sparkles, ShieldCheck, Zap, Target } from 'lucide-react'

const HeroSection = () => {
    return (
        <section id="hero" className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 text-center max-w-4xl mx-auto px-4 sm:px-6">
            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-500/25 shadow-[0_0_20px_rgba(99,102,241,0.2)] mb-6 animate-pulse-glow">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide bg-gradient-to-r from-indigo-200 via-white to-purple-200 bg-clip-text text-transparent">
                    AI-Powered Resume Analysis
                </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
                Build a Resume That{' '}
                <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                        Gets Noticed.
                    </span>
                    {/* Subtle underline flare */}
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400/80 to-transparent" />
                </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
                Analyze your resume against any job description and discover exactly what you need to improve to beat the ATS and impress hiring managers.
            </p>

            {/* Quick Micro Value Props */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400 font-medium">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Instant Feedback</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <Target className="w-3.5 h-3.5 text-indigo-400" />
                    <span>ATS Match Scoring</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>100% Private & Secure</span>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
