import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import InteractiveBackground from '../../ai/components/InteractiveBackground'

const register = () => {
    const navigate = useNavigate()
    const { handleRegister, loading } = useAuth()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        setUsername('')
        setEmail('')
        setPassword('')
        navigate('/')

    }

    if (loading) {
        return <div className='flex items-center justify-center h-screen bg-black text-white border border-gray-300 rounded-md'>
            <p>Loading...</p>
        </div>
    }

    return (
        <main className="relative min-h-screen overflow-hidden text-white">
            <InteractiveBackground />

            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
                <div className="w-full max-w-md rounded-2xl border border-indigo-500/20 bg-[#090c14]/90 p-8 shadow-[0_0_50px_rgba(99,102,241,0.12)] backdrop-blur-xl sm:p-10">


                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10">
                            <span className="text-xl font-bold text-indigo-400">
                                AI
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            Create Account
                        </h1>

                        <p className="mt-2 text-sm text-gray-400">
                            Start your AI-powered interview preparation
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                    >
                        {/* Username */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="username"
                                className="text-sm font-medium text-gray-300"
                            >
                                Username
                            </label>

                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-indigo-500/60 focus:bg-indigo-500/[0.04] focus:ring-2 focus:ring-indigo-500/10"
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your username"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-300"
                            >
                                Email
                            </label>

                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-indigo-500/60 focus:bg-indigo-500/[0.04] focus:ring-2 focus:ring-indigo-500/10"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-300"
                            >
                                Password
                            </label>

                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-indigo-500/60 focus:bg-indigo-500/[0.04] focus:ring-2 focus:ring-indigo-500/10"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Create a password"
                            />
                        </div>

                        {/* Register Button */}
                        <button
                            className="mt-2 flex w-full items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-600/90 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/20 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/20 active:scale-[0.98]"
                            type="submit"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Login */}
                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="cursor-pointer font-medium text-indigo-400 transition-colors hover:text-indigo-300 hover:underline"
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default register