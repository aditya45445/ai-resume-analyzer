import React from 'react'
import { FileText, Cpu, Sparkles } from 'lucide-react'

const STEPS = [
    {
        step: '01',
        icon: FileText,
        title: 'Paste Job Description',
        description: 'Provide the exact job requirements, duties, tech stack, and experience qualifications for your target position.'
    },
    {
        step: '02',
        icon: Cpu,
        title: 'Upload Profile & Resume',
        description: 'Upload your existing PDF/DOCX resume along with key career highlights or personal strengths.'
    },
    {
        step: '03',
        icon: Sparkles,
        title: 'Instant AI Intelligence',
        description: 'Receive deep keyword alignment metrics, ATS score assessment, and tailored interview prep strategies in seconds.'
    }
]

const HowItWorksSection = () => {
    return (
        <section id="how-it-works" className="relative py-20 border-t border-white/[0.06] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-3">
                    Workflow
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    How ResuMatch AI Works
                </h2>
                <p className="text-sm sm:text-base text-slate-400 mt-3">
                    A streamlined, three-step engine designed to optimize your resume and maximize interview call rates.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {STEPS.map((item, index) => {
                    const Icon = item.icon
                    return (
                        <div
                            key={item.step}
                            className="relative group p-8 rounded-2xl bg-[#090c13]/60 backdrop-blur-md border border-white/[0.06] hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="font-mono text-2xl font-bold text-slate-700 group-hover:text-indigo-400/40 transition-colors">
                                    {item.step}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default HowItWorksSection
