import React, { useState, useRef } from 'react'
import {
    UploadCloud, FileText, CheckCircle2, X, User, Sparkles, AlertCircle, FileCheck
} from 'lucide-react'

const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

const ProfileCard = ({
    file,
    onFileSelect,
    onFileRemove,
    selfDescription,
    onSelfDescriptionChange,
}) => {
    const [isDragging, setIsDragging] = useState(false)
    const [uploadError, setUploadError] = useState(null)
    const [isSelfFocused, setIsSelfFocused] = useState(false)
    const fileInputRef = useRef(null)

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const validateAndSetFile = (selectedFile) => {
        setUploadError(null)
        if (!selectedFile) return

        // 10MB limit
        const MAX_SIZE = 10 * 1024 * 1024
        if (selectedFile.size > MAX_SIZE) {
            setUploadError('File exceeds maximum size of 10MB.')
            return
        }

        // Allow PDF, DOCX, DOC, TXT
        const validExtensions = ['.pdf', '.docx', '.doc', '.txt']
        const fileName = selectedFile.name.toLowerCase()
        const isValid = validExtensions.some((ext) => fileName.endsWith(ext))

        if (!isValid) {
            setUploadError('Please upload a PDF or DOCX file.')
            return
        }

        onFileSelect(selectedFile)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            validateAndSetFile(e.dataTransfer.files[0])
        }
    }

    const handleInputChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            validateAndSetFile(e.target.files[0])
        }
    }

    return (
        <div className="group relative flex flex-col h-full rounded-2xl bg-[#090c13]/80 backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-0.5">
            {/* Top Accent Line */}
            <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

            {/* Card Header */}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                    <User className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        Your Profile
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400">
                        Upload your resume and customize your background details.
                    </p>
                </div>
            </div>

            {/* SECTION 1: Resume Upload Area */}
            <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-purple-400" />
                        Resume File
                        <span className="text-[10px] lowercase font-normal px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
                            Required
                        </span>
                    </label>
                    {file && (
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
                        </span>
                    )}
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.doc,.txt"
                    onChange={handleInputChange}
                    className="hidden"
                    id="resume-file-input"
                />

                {!file ? (
                    /* Dropzone when no file is uploaded */
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 p-6 flex flex-col items-center justify-center text-center group/drop ${isDragging
                                ? 'border-purple-500 bg-purple-500/10 scale-[1.01] shadow-[0_0_25px_rgba(168,85,247,0.25)]'
                                : 'border-white/10 hover:border-purple-500/50 bg-white/[0.02] hover:bg-white/[0.04]'
                            }`}
                    >
                        <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 ${isDragging
                                    ? 'bg-purple-500 text-white scale-110'
                                    : 'bg-white/[0.05] text-purple-400 group-hover/drop:scale-110 group-hover/drop:bg-purple-500/20'
                                }`}
                        >
                            <UploadCloud className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-semibold text-white mb-1">
                            {isDragging ? 'Drop your resume right here' : 'Drop your resume here'}
                        </p>
                        <p className="text-xs text-slate-400 mb-3">
                            PDF or DOCX • Max 10MB
                        </p>
                        <button
                            type="button"
                            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.07] hover:bg-purple-600 hover:text-white text-slate-200 border border-white/10 transition-all duration-200"
                        >
                            Browse Files
                        </button>
                    </div>
                ) : (
                    /* File Preview State */
                    <div className="relative rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-4 flex items-center justify-between transition-all duration-200 hover:border-emerald-500/50">
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                                <FileCheck className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-sm font-semibold text-white truncate max-w-[200px] sm:max-w-[260px]">
                                        ✓ {file.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5 font-mono">
                                    <span>{formatFileSize(file.size)}</span>
                                    <span>•</span>
                                    <span className="text-emerald-400">Ready for scan</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] rounded-lg border border-white/[0.08] transition-colors"
                            >
                                Replace
                            </button>
                            <button
                                type="button"
                                onClick={onFileRemove}
                                title="Remove file"
                                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg bg-white/[0.05] hover:bg-rose-500/10 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {uploadError && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-2 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{uploadError}</span>
                    </div>
                )}
            </div>

            {/* SECTION 2: Self Description (About You) */}
            <div className="flex-1 flex flex-col min-h-[160px]">
                <div className="flex items-center justify-between mb-1.5">
                    <label
                        htmlFor="self-description-input"
                        className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        About You
                        <span className="text-[10px] font-mono text-slate-500 lowercase">
                            (Optional context)
                        </span>
                    </label>
                    <span className="text-[11px] font-mono text-slate-400">
                        {selfDescription.length} chars
                    </span>
                </div>
                <p className="text-xs text-slate-400 mb-2 leading-tight">
                    Tell the AI anything important about your experience, strengths, or career goals.
                </p>

                <textarea
                    id="self-description-input"
                    value={selfDescription}
                    onChange={(e) => onSelfDescriptionChange(e.target.value)}
                    onFocus={() => setIsSelfFocused(true)}
                    onBlur={() => setIsSelfFocused(false)}
                    placeholder="Example: I'm a full-stack developer with 4 years of experience building React/Node.js products. I'm focusing on cloud architecture and high-impact fintech applications..."
                    className="w-full flex-1 p-3.5 rounded-xl glass-input text-slate-200 placeholder-slate-500 text-xs sm:text-sm leading-relaxed resize-none focus:outline-none scrollbar-thin min-h-[100px]"
                    rows={4}
                />
            </div>
        </div>
    )
}

export default ProfileCard
