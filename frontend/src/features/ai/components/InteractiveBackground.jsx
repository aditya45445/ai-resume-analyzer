import React, { useEffect, useState } from 'react'

const InteractiveBackground = () => {
    const [mousePos, setMousePos] = useState({ x: 50, y: 30 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Get percentage of screen
            const x = (e.clientX / window.innerWidth) * 100
            const y = (e.clientY / window.innerHeight) * 100
            setMousePos({ x, y })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#040507]">
            {/* Fine Dot / Grid Pattern with Radial Vignette */}
            <div className="absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,#000_60%,transparent_100%)]" />

            {/* Dynamic Mouse Spotlight Glow */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 transition-transform duration-500 ease-out will-change-transform"
                style={{
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(168, 85, 247, 0.25) 50%, transparent 80%)',
                    left: `${mousePos.x}%`,
                    top: `${mousePos.y}%`,
                    transform: 'translate(-50%, -50%)',
                }}
            />

            {/* Static Ambient Blurred Mesh Blobs */}
            {/* Hero Top Center Glow */}
            <div className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-b from-indigo-600/18 via-purple-600/12 to-transparent rounded-full blur-[120px] animate-pulse-glow" />

            {/* Left Accent Glow */}
            <div className="absolute top-[35%] -left-[200px] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] animate-float-slow" />

            {/* Right Accent Glow */}
            <div className="absolute top-[45%] -right-[200px] w-[550px] h-[550px] bg-purple-600/12 rounded-full blur-[150px] animate-pulse-glow" />

            {/* Bottom Glow */}
            <div className="absolute -bottom-[200px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-700/10 rounded-full blur-[140px]" />

            {/* Subtle Horizon Light Line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent" />
        </div>
    )
}

export default InteractiveBackground
