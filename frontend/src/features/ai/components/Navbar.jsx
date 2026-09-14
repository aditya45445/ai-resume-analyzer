import React, { useState, useEffect } from 'react'
import { Sparkles, ArrowRight, Code2, LogOut, User, Menu, X } from 'lucide-react'
import { useAuth } from '../../auth/hooks/useAuth.js'
import { Link } from 'react-router'

const Navbar = ({ onGetStartedClick }) => {
    const { user, handleLogout } = useAuth()
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-[#050608]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
                : 'bg-transparent border-b border-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
                {/* Brand Logo */}
                <a href="#hero" className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-400 p-[1px] shadow-[0_0_20px_rgba(99,102,241,0.35)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all duration-300">
                        <div className="w-full h-full bg-[#07090e] rounded-[11px] flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 group-hover:rotate-12 transition-all duration-300" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                            CareerSync<span className="text-indigo-400 font-extrabold"></span>
                        </span>
                        <span className="text-[10px] tracking-widest uppercase font-mono text-slate-400 -mt-1">
                            ATS & JD Intelligence
                        </span>
                    </div>
                </a>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-1.5 backdrop-blur-md">
                    <a
                        href="#workspace"
                        className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all duration-200"
                    >
                        Workspace
                    </a>
                    <a
                        href="#how-it-works"
                        className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all duration-200"
                    >
                        How It Works
                    </a>
                    <a
                        href="#features"
                        className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all duration-200"
                    >
                        Features
                    </a>

                </nav>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08]">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-semibold text-white">
                                    {user.username ? user.username.charAt(0).toUpperCase() : <User className="w-3 h-3" />}
                                </div>
                                <span className="text-xs font-medium text-slate-300">{user.username || user.email}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                title="Sign Out"
                                className="p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-white/[0.05] transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/login"
                                className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                            >
                                Sign In
                            </Link>
                            <button
                                onClick={onGetStartedClick}
                                className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_25px_rgba(99,102,241,0.55)] transition-all duration-200 active:scale-95"
                            >
                                <span>Get Started</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center gap-2">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 text-slate-300 hover:text-white rounded-lg bg-white/[0.05] border border-white/[0.08]"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Drawer */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[#07090e]/95 backdrop-blur-2xl border-b border-white/[0.1] px-4 pt-3 pb-6 space-y-3">
                    <a
                        href="#workspace"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-white/[0.05]"
                    >
                        Workspace
                    </a>
                    <a
                        href="#how-it-works"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-white/[0.05]"
                    >
                        How It Works
                    </a>
                    <a
                        href="#features"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-white/[0.05]"
                    >
                        Features
                    </a>
                    <div className="pt-2 border-t border-white/[0.08] flex flex-col gap-2">
                        {user ? (
                            <div className="flex items-center justify-between px-3 py-2">
                                <span className="text-sm text-slate-300">{user.username || user.email}</span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1.5 text-sm text-rose-400"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Log out</span>
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-center px-4 py-2 rounded-lg text-sm font-medium text-slate-300 bg-white/[0.05]"
                                >
                                    Sign In
                                </Link>
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false)
                                        if (onGetStartedClick) onGetStartedClick()
                                    }}
                                    className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md"
                                >
                                    Get Started
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar
