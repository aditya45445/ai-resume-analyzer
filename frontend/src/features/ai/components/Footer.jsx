import React from 'react'
import { Sparkles } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="relative border-t border-white/[0.08] bg-[#030406] text-slate-400 text-xs sm:text-sm py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Brand Info */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                        <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                        <span className="font-bold text-white tracking-tight">
                            Career<span className="text-indigo-400">Sync</span>
                        </span>
                        <p className="text-xs text-slate-500">
                            Precision AI Resume & Job Description Matching Platform
                        </p>
                    </div>
                </div>

                {/* Navigation / Links */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
                    <a href="#hero" className="hover:text-white transition-colors">Home</a>
                    <a href="#workspace" className="hover:text-white transition-colors">Workspace</a>
                    <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
                </div>

                {/* Copyright / Attribution */}
                <div className="text-xs text-slate-500 flex items-center gap-1">
                    <span>© {new Date().getFullYear()} CareerSync. All rights reserved.</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
