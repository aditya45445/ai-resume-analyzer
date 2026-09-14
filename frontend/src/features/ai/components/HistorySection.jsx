import React, { useEffect, useState } from 'react'
import { FileText, Clock, Loader2, ChevronRight, Section } from 'lucide-react'
import { getHistory, getHistoryById } from '../services/ai.api.js';


const HistorySection = ({ onSelectReport }) => {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getHistory()
                setHistory(data.history || [])
            } catch (error) {
                console.log("Error fetching History", error)
            } finally {
                setLoading(false)
            }
        }
        fetchHistory();
    }, []);

    const handleViewReport = async (id) => {
        console.log('1, view clicked, id', id);

        try {
            const data = await getHistoryById(id)

            console.log('2. appi response', data)
            if (data.success && data.history) {

                console.log("3. Sending history to parent:", data.history);
                onSelectReport(data.history)
            } else {
                console.error("4. Invalid API response:", data);
            }
        } catch (error) {
            console.error("Error fetching Report", error)
        }
    }

    if (loading) {
        return (
            <Section className='flex justify-center py-12 '>
                <Loader2 className='h-6 w-6 animate-spin text-indigo-400 ' />
            </Section>
        )
    }

    if (history.length === 0) {
        return (
            <Section className='py-12 text-center text-gray-400'>
                <FileText className='mx-auto mb-3 h-10 w-10 opacity-50' />
                <p className='text-sm'>No History Found</p>
            </Section>
        )
    }

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-16">

            {/* Section Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10">
                        <Clock className="h-5 w-5 text-indigo-400" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Analysis History
                        </h2>

                        <p className="mt-1 text-sm text-gray-400">
                            Revisit your previous interview preparation reports
                        </p>
                    </div>
                </div>
            </div>

            {/* History Cards - Scrollable Area */}
            <div className="max-h-[360px] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-indigo-500/40 scrollbar-track-white/5">

                {history.map((item) => (
                    <div
                        key={item._id}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#090c14]/90 p-5 shadow-lg transition-all duration-300 hover:border-indigo-500/30 hover:bg-[#0b0f1a]"
                    >

                        {/* Glow */}
                        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/20" />

                        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                            {/* Left */}
                            <div className="min-w-0 flex-1">

                                {/* JD */}
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/10">
                                        <FileText className="h-5 w-5 text-indigo-400" />
                                    </div>

                                    <div className="min-w-0">
                                        <h3
                                            className="truncate text-base font-semibold text-white"
                                            title={item.jobDescription}
                                        >
                                            {item.jobDescription
                                                ?.replace(/\s+/g, " ")
                                                .trim()
                                                .slice(0, 100)}
                                            {item.jobDescription?.length > 100 && "..."}
                                        </h3>

                                        <p className="mt-1 text-xs text-gray-500">
                                            Job Description
                                        </p>
                                    </div>
                                </div>

                                {/* Metadata */}
                                <div className="mt-4 flex flex-wrap gap-2">

                                    {/* Resume */}
                                    <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-400">
                                        <FileText className="h-3.5 w-3.5 text-indigo-400" />
                                        Resume analyzed
                                    </span>

                                    {/* Self Description */}
                                    <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-400">
                                        <FileText className="h-3.5 w-3.5 text-purple-400" />
                                        Self description
                                    </span>

                                    {/* Date */}
                                    <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-400">
                                        <Clock className="h-3.5 w-3.5 text-gray-500" />

                                        {new Date(
                                            item.createdAt
                                        ).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </span>

                                </div>
                            </div>

                            {/* Right */}
                            <div className="flex items-center justify-between gap-4 lg:justify-end">

                                {/* Score */}
                                <div className="flex flex-col items-center rounded-xl border border-indigo-500/20 bg-indigo-500/5 px-5 py-3">
                                    <span className="text-2xl font-bold text-indigo-400">
                                        {item.matchScore ?? 0}%
                                    </span>

                                    <span className="mt-0.5 text-[10px] uppercase tracking-wider text-gray-500">
                                        Match Score
                                    </span>
                                </div>

                                {/* View */}
                                <button
                                    type="button"
                                    onClick={() => handleViewReport(item._id)}
                                    className="group/btn flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-600/90 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/20 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/20 active:scale-95"
                                >
                                    View Report

                                    <ChevronRight
                                        size={17}
                                        className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                                    />
                                </button>

                            </div>
                        </div>
                    </div>
                ))}

            </div>

        </section>
    );
}

export default HistorySection 