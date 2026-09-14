import React, { useState } from 'react'
import { Briefcase, Trash2, Clipboard, Sparkles, Check } from 'lucide-react'

const SAMPLE_JOB_DESCRIPTIONS = [
    {
        label: 'Full Stack Dev',
        text: `Role: Senior Full Stack Developer (React / Node.js)
Location: Remote / Hybrid
Responsibilities:
- Build scalable, responsive web applications using React, TypeScript, and Node.js.
- Design and optimize RESTful & GraphQL APIs with Express and MongoDB/PostgreSQL.
- Collaborate with product designers and engineers to implement state-of-the-art UI/UX.
- Implement CI/CD pipelines, automated testing (Jest, Cypress), and cloud deployments (AWS/Docker).
Requirements:
- 3+ years of professional full-stack development experience.
- Strong proficiency in modern JavaScript/TypeScript, React hooks, Redux/Zustand, Tailwind CSS.
- Solid experience with backend architectures, database modeling, and authentication (JWT/OAuth).`
    },
    {
        label: 'Frontend Engineer',
        text: `Role: Frontend Engineer (React / UI/UX)
Responsibilities:
- Develop modern, responsive, high-performance web applications with React 18+ and Next.js.
- Translate Figma designs into pixel-perfect, accessible, and responsive components.
- Optimize frontend web vitals, bundle size, caching, and state management.
Requirements:
- Proven experience with React, TypeScript, Tailwind CSS, and CSS animations.
- Familiarity with REST APIs, WebSocket integration, and responsive web design best practices.`
    },
    {
        label: 'AI / Backend Engineer',
        text: `Role: AI Solutions & Backend Engineer
Responsibilities:
- Build and maintain scalable backend services and microservices in Python or Node.js.
- Integrate LLM APIs (Gemini, OpenAI, Claude), prompt engineering pipelines, and vector databases (Pinecone, Chroma).
- Ensure robust API security, rate limiting, logging, and error handling.
Requirements:
- Deep experience in API design, GenAI integrations, async job queues, and cloud services.`
    }
]

const JobDescriptionCard = ({ value, onChange, onClear }) => {
    const [copiedSample, setCopiedSample] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const charCount = value ? value.length : 0
    const wordCount = value ? value.trim().split(/\s+/).filter(Boolean).length : 0

    const handlePasteFromClipboard = async () => {
        try {
            const text = await navigator.clipboard.readText()
            if (text) {
                onChange(text)
            }
        } catch (err) {
            console.error('Failed to read clipboard', err)
        }
    }

    const handleApplySample = (sampleText) => {
        onChange(sampleText)
        setCopiedSample(true)
        setTimeout(() => setCopiedSample(false), 2000)
    }

    return (
        <div
            className={`group relative flex flex-col h-full rounded-2xl  bg-[#090c13]/80 backdrop-blur-xl border transition-all duration-300 p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${isFocused
                ? 'border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/30'
                : 'border-white/[0.08] hover:border-white/[0.15] hover:-translate-y-0.5'
                }`}
        >
            {/* Top Accent Line */}
            <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

            {/* Card Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                        <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                            Job Description
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                                Required
                            </span>
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-400">
                            Paste the job description you're applying for.
                        </p>
                    </div>
                </div>

                {/* Quick actions */}
                <div className="flex items-center gap-1.5">
                    <button
                        type="button"
                        onClick={handlePasteFromClipboard}
                        title="Paste from clipboard"
                        className="p-2 text-slate-400 hover:text-white rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-colors text-xs flex items-center gap-1"
                    >
                        <Clipboard className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline text-xs">Paste</span>
                    </button>
                    {value && (
                        <button
                            type="button"
                            onClick={onClear}
                            title="Clear text"
                            className="p-2 text-slate-400 hover:text-rose-400 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-colors"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Quick Sample Presets Bar */}
            <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1 text-xs scrollbar-none">
                <span className="text-slate-500 flex items-center gap-1 shrink-0">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    Try sample:
                </span>
                {SAMPLE_JOB_DESCRIPTIONS.map((sample) => (
                    <button
                        key={sample.label}
                        type="button"
                        onClick={() => handleApplySample(sample.text)}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-200 border border-white/[0.06] hover:border-indigo-500/30 transition-all shrink-0 text-[11px] font-medium"
                    >
                        {sample.label}
                    </button>
                ))}
            </div>

            {/* Main Textarea Container */}
            <div className="relative flex-1 flex flex-col min-h-[260px] sm:min-h-[300px]">
                <textarea
                    id="job-description-input"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Paste the complete job description here (responsibilities, required skills, tech stack, experience requirements)..."
                    className="w-full flex-1 p-4 rounded-xl glass-input text-slate-200 placeholder-slate-500 text-sm leading-relaxed resize-none focus:outline-none scrollbar-thin"
                    rows={11}
                />
            </div>

            {/* Card Footer / Stats */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06] text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-3">
                    <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
                    <span className="text-slate-600">•</span>
                    <span>{charCount.toLocaleString()} chars</span>
                </div>
                {charCount > 0 ? (
                    <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                        <Check className="w-3 h-3" /> Ready
                    </span>
                ) : (
                    <span className="text-slate-500 text-[11px]">Awaiting input</span>
                )}
            </div>
        </div>
    )
}

export default JobDescriptionCard
