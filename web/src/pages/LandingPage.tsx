import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LandingNavbar } from '@/components/LandingNavbar'
import { LandingFooter } from '@/components/LandingFooter'
import { motion } from 'motion/react'
import { useAuth } from '@/contexts/AuthContext'
import {
    Sparkles,
    Briefcase,
    Trophy,
    Presentation,
    Award,
    ChevronRight,
    ClipboardList,
    Users,
} from 'lucide-react'

export function LandingPage() {
    const { isLoggedIn, openModal } = useAuth()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (isLoggedIn) {
            navigate('/practice', { replace: true })
        }
    }, [isLoggedIn, navigate])

    if (isLoggedIn) {
        return null
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#3E6FC3]/20 overflow-x-hidden">
            <LandingNavbar />

            {/* Highly visible background grid like CodeChef */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage:
                        'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                }}
            />

            <main className="relative z-10 w-full pt-16">
                {/* 1. Hero Section */}
                <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center pt-16 pb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 text-orange-400 font-semibold mb-6 tracking-wide"
                    >
                        {`{ R. C. Patel Institute of Technology }`}
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-2xl md:text-3xl font-bold tracking-tight text-slate-700 mb-4"
                    >
                        Master Programming with Campus Lab
                    </motion.h2>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#3E6FC3] mb-8 w-full mx-auto"
                    >
                        Master DSA. Stand Out on Campus.
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-base md:text-lg text-gray-500 mb-10 max-w-3xl mx-auto font-medium leading-relaxed"
                    >
                        Join an exclusive competitive programming ecosystem for RCPIT students.
                        Master algorithms through curated problem sets, battle in real-time contest
                        rooms with peers, and track your progress on the campus leaderboard to
                        become placement-ready.
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button
                            onClick={() =>
                                isLoggedIn ? navigate('/practice') : openModal('signup')
                            }
                            className="bg-[#3E6FC3] hover:bg-[#325a9e] text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2"
                        >
                            Start Practicing Now <ChevronRight size={18} />
                        </button>
                    </motion.div>
                </section>

                {/* 2. Multiplayer / Rooms Section (Matched to Screenshot 2) */}
                <section className="py-24 mx-auto max-w-6xl px-4 relative z-20">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 flex justify-center">
                            {/* Contest Card exactly like Screenshot 2 */}
                            <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_16px_48px_rgba(0,0,0,0.04)] p-8 w-full max-w-[440px] relative overflow-hidden">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-[20px] bg-[#F0F4FA] flex items-center justify-center text-[#3E6FC3]">
                                            <Users size={28} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h4 className="font-extrabold text-gray-900 text-lg tracking-tight mb-0.5">
                                                Room: Weekly Sprint
                                            </h4>
                                            <p className="text-sm text-gray-400 font-medium">
                                                ID: RCPIT-2026
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-[#E8F8F0] text-[#00A86B] border border-[#C5F2DC] px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                                        <span className="w-2 h-2 rounded-full bg-[#00A86B] animate-pulse"></span>
                                        Live
                                    </div>
                                </div>

                                {/* Participants List */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-[20px] border border-[#F0F2F6] bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-slate-200 transition-all duration-300">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src="https://api.dicebear.com/10.x/glyphs/svg?seed=Sakshi"
                                                className="w-12 h-12 rounded-full object-cover border border-[#E5E9F0] bg-white"
                                                alt="Sakshi"
                                            />
                                            <div>
                                                <span className="font-extrabold text-gray-900 block text-base tracking-tight mb-0.5">
                                                    Sakshi
                                                </span>
                                                <span className="text-sm text-gray-400 font-medium">
                                                    Solving Problem B...
                                                </span>
                                            </div>
                                        </div>
                                        <span className="font-mono font-bold text-[#3E6FC3] bg-[#EBF2FC] px-3 py-1 rounded-[8px] text-sm">
                                            850 pts
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-[20px] border border-[#F0F2F6] bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-slate-200 transition-all duration-300">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src="https://api.dicebear.com/10.x/glyphs/svg?seed=Jayesh"
                                                className="w-12 h-12 rounded-full object-cover border border-[#E5E9F0] bg-white"
                                                alt="Jayesh"
                                            />
                                            <div>
                                                <span className="font-extrabold text-gray-900 block text-base tracking-tight mb-0.5">
                                                    Jayesh
                                                </span>
                                                <span className="text-sm text-gray-400 font-medium">
                                                    Completed Problem A
                                                </span>
                                            </div>
                                        </div>
                                        <span className="font-mono font-bold text-[#475569] text-sm pr-1">
                                            720 pts
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-[20px] border border-[#F0F2F6] bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-slate-200 transition-all duration-300">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src="https://api.dicebear.com/10.x/glyphs/svg?seed=Sachin"
                                                className="w-12 h-12 rounded-full object-cover border border-[#E5E9F0] bg-white"
                                                alt="Sachin"
                                            />
                                            <div>
                                                <span className="font-extrabold text-gray-900 block text-base tracking-tight mb-0.5">
                                                    Sachin
                                                </span>
                                                <span className="text-sm text-gray-400 font-medium">
                                                    Completed Problem A
                                                </span>
                                            </div>
                                        </div>
                                        <span className="font-mono font-bold text-[#475569] text-sm pr-1">
                                            650 pts
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-[20px] border border-[#F0F2F6] bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-slate-200 transition-all duration-300">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src="https://api.dicebear.com/10.x/glyphs/svg?seed=Chetan"
                                                className="w-12 h-12 rounded-full object-cover border border-[#E5E9F0] bg-white"
                                                alt="Chetan"
                                            />
                                            <div>
                                                <span className="font-extrabold text-gray-900 block text-base tracking-tight mb-0.5">
                                                    Chetan
                                                </span>
                                                <span className="text-sm text-gray-400 font-medium">
                                                    Reading Problem A...
                                                </span>
                                            </div>
                                        </div>
                                        <span className="font-mono font-bold text-[#475569] text-sm pr-1">
                                            590 pts
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                                Create Rooms.
                                <br />
                                <span className="whitespace-nowrap">Compete with Friends.</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
                                Learning is better together. Instantly generate private contest
                                rooms, invite your peers, and battle it out in real-time coding
                                challenges. Perfect for late-night college study sessions.
                            </p>
                            <button
                                onClick={() =>
                                    isLoggedIn ? navigate('/contest') : openModal('signup')
                                }
                                className="text-white bg-[#3E6FC3] hover:bg-[#325a9e] px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2"
                            >
                                Start a Match <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* 3. Key features & Benefits Section */}
                <section className="bg-[#fafcff] py-24 border-y border-gray-100 relative z-20">
                    <div className="mx-auto max-w-6xl px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                Why Choose Campus Lab?
                            </h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                                In this project, we've focused on what truly matters: problem
                                solving, real-time contest rooms, and AI mentor assistance to
                                transform you into an elite developer.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all group">
                                <div className="w-12 h-12 bg-blue-50 text-[#3E6FC3] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Sparkles size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    AI Mentor Assistance
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Built right into this project, our AI mentor helps debug your
                                    code and explain complex logic without spoon-feeding the
                                    answers.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all group">
                                <div className="w-12 h-12 bg-blue-50 text-[#3E6FC3] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Trophy size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    Contest Rooms
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    A core feature of this platform. Create rooms and compete with
                                    your friends on custom problem sets in real time.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all group">
                                <div className="w-12 h-12 bg-blue-50 text-[#3E6FC3] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <ClipboardList size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    Focused Problem Solving
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Extensive practice sheets designed specifically to improve
                                    algorithmic problem solving and ace coding interviews.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all group">
                                <div className="w-12 h-12 bg-blue-50 text-[#3E6FC3] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Briefcase size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    Placement Ready
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Master the exact algorithmic patterns frequently asked in
                                    interviews at top product-based companies.
                                </p>
                            </div>

                            {/* Feature 5 */}
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all group">
                                <div className="w-12 h-12 bg-blue-50 text-[#3E6FC3] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Presentation size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    Faculty Dashboard
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Educators can easily track student progress, review submissions,
                                    and manage internal assessments seamlessly.
                                </p>
                            </div>

                            {/* Feature 6 */}
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all group">
                                <div className="w-12 h-12 bg-blue-50 text-[#3E6FC3] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Award size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    Structured Learning
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Follow guided, step-by-step learning paths tailored for
                                    beginners up to advanced competitive programmers.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Testimonials Section */}
                <section className="bg-white py-24">
                    <div className="mx-auto max-w-6xl px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                Testimonials
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-[#fafcff] p-8 rounded-2xl border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-[#3E6FC3] mb-6">
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M14.017 21L16.439 14.823C16.592 14.482 16.711 14.157 16.797 13.847C16.884 13.537 16.927 13.23 16.927 12.925C16.927 12.396 16.79 11.975 16.516 11.663C16.241 11.35 15.86 11.194 15.372 11.194C15.006 11.194 14.654 11.272 14.316 11.428C13.978 11.585 13.682 11.832 13.43 12.169L11.815 9.771C12.392 9.074 13.09 8.528 13.911 8.132C14.733 7.737 15.65 7.539 16.662 7.539C17.925 7.539 18.97 7.893 19.799 8.601C20.627 9.31 21.042 10.28 21.042 11.512C21.042 12.35 20.893 13.149 20.596 13.91C20.298 14.671 19.92 15.422 19.462 16.162L16.471 21H14.017ZM4.708 21L7.13 14.823C7.283 14.482 7.402 14.157 7.488 13.847C7.575 13.537 7.618 13.23 7.618 12.925C7.618 12.396 7.481 11.975 7.207 11.663C6.932 11.35 6.551 11.194 6.063 11.194C5.697 11.194 5.345 11.272 5.007 11.428C4.669 11.585 4.373 11.832 4.121 12.169L2.506 9.771C3.083 9.074 3.781 8.528 4.602 8.132C5.424 7.737 6.341 7.539 7.353 7.539C8.616 7.539 9.661 7.893 10.49 8.601C11.318 9.31 11.733 10.28 11.733 11.512C11.733 12.35 11.584 13.149 11.287 13.91C10.989 14.671 10.611 15.422 10.153 16.162L7.162 21H4.708Z" />
                                    </svg>
                                </div>
                                <p className="text-gray-700 mb-8 leading-relaxed flex-grow font-medium">
                                    This project has completely changed how we prepare for
                                    placements at RCPIT. The curated DSA tracks are exactly what
                                    product companies look for.
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                    <img
                                        src="https://api.dicebear.com/10.x/glyphs/svg?seed=Student1"
                                        alt="Student"
                                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                    />
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">
                                            Digvijay Rajput
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            RCPIT (AIML) Batch of 2027
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#fafcff] p-8 rounded-2xl border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-[#3E6FC3] mb-6">
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M14.017 21L16.439 14.823C16.592 14.482 16.711 14.157 16.797 13.847C16.884 13.537 16.927 13.23 16.927 12.925C16.927 12.396 16.79 11.975 16.516 11.663C16.241 11.35 15.86 11.194 15.372 11.194C15.006 11.194 14.654 11.272 14.316 11.428C13.978 11.585 13.682 11.832 13.43 12.169L11.815 9.771C12.392 9.074 13.09 8.528 13.911 8.132C14.733 7.737 15.65 7.539 16.662 7.539C17.925 7.539 18.97 7.893 19.799 8.601C20.627 9.31 21.042 10.28 21.042 11.512C21.042 12.35 20.893 13.149 20.596 13.91C20.298 14.671 19.92 15.422 19.462 16.162L16.471 21H14.017ZM4.708 21L7.13 14.823C7.283 14.482 7.402 14.157 7.488 13.847C7.575 13.537 7.618 13.23 7.618 12.925C7.618 12.396 7.481 11.975 7.207 11.663C6.932 11.35 6.551 11.194 6.063 11.194C5.697 11.194 5.345 11.272 5.007 11.428C4.669 11.585 4.373 11.832 4.121 12.169L2.506 9.771C3.083 9.074 3.781 8.528 4.602 8.132C5.424 7.737 6.341 7.539 7.353 7.539C8.616 7.539 9.661 7.893 10.49 8.601C11.318 9.31 11.733 10.28 11.733 11.512C11.733 12.35 11.584 13.149 11.287 13.91C10.989 14.671 10.611 15.422 10.153 16.162L7.162 21H4.708Z" />
                                    </svg>
                                </div>
                                <p className="text-gray-700 mb-8 leading-relaxed flex-grow font-medium">
                                    The contest rooms are brilliant. My friends and I hop on a call,
                                    create a private room on Campus Lab, and race to solve the
                                    problem set. It makes coding social.
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                    <img
                                        src="https://api.dicebear.com/10.x/glyphs/svg?seed=Student2"
                                        alt="Student"
                                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                    />
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">
                                            Darshan Desale
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            RCPIT (AIML) Batch of 2027
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#fafcff] p-8 rounded-2xl border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-[#3E6FC3] mb-6">
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M14.017 21L16.439 14.823C16.592 14.482 16.711 14.157 16.797 13.847C16.884 13.537 16.927 13.23 16.927 12.925C16.927 12.396 16.79 11.975 16.516 11.663C16.241 11.35 15.86 11.194 15.372 11.194C15.006 11.194 14.654 11.272 14.316 11.428C13.978 11.585 13.682 11.832 13.43 12.169L11.815 9.771C12.392 9.074 13.09 8.528 13.911 8.132C14.733 7.737 15.65 7.539 16.662 7.539C17.925 7.539 18.97 7.893 19.799 8.601C20.627 9.31 21.042 10.28 21.042 11.512C21.042 12.35 20.893 13.149 20.596 13.91C20.298 14.671 19.92 15.422 19.462 16.162L16.471 21H14.017ZM4.708 21L7.13 14.823C7.283 14.482 7.402 14.157 7.488 13.847C7.575 13.537 7.618 13.23 7.618 12.925C7.618 12.396 7.481 11.975 7.207 11.663C6.932 11.35 6.551 11.194 6.063 11.194C5.697 11.194 5.345 11.272 5.007 11.428C4.669 11.585 4.373 11.832 4.121 12.169L2.506 9.771C3.083 9.074 3.781 8.528 4.602 8.132C5.424 7.737 6.341 7.539 7.353 7.539C8.616 7.539 9.661 7.893 10.49 8.601C11.318 9.31 11.733 10.28 11.733 11.512C11.733 12.35 11.584 13.149 11.287 13.91C10.989 14.671 10.611 15.422 10.153 16.162L7.162 21H4.708Z" />
                                    </svg>
                                </div>
                                <p className="text-gray-700 mb-8 leading-relaxed flex-grow font-medium">
                                    Having our own campus leaderboard drives healthy competition.
                                    You can actually see who the top coders in our batch are. It's
                                    incredibly motivating and rewarding.
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                    <img
                                        src="https://api.dicebear.com/10.x/glyphs/svg?seed=Student3"
                                        alt="Student"
                                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                    />
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">
                                            Gaurav Patil
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            RCPIT (AIML) Batch of 2027
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#fafcff] p-8 rounded-2xl border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-[#3E6FC3] mb-6">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 21L16.439 14.823C16.592 14.482 16.711 14.157 16.797 13.847C16.884 13.537 16.927 13.23 16.927 12.925C16.927 12.396 16.79 11.975 16.516 11.663C16.241 11.35 15.86 11.194 15.372 11.194C15.006 11.194 14.654 11.272 14.316 11.428C13.978 11.585 13.682 11.832 13.43 12.169L11.815 9.771C12.392 9.074 13.09 8.528 13.911 8.132C14.733 7.737 15.65 7.539 16.662 7.539C17.925 7.539 18.97 7.893 19.799 8.601C20.627 9.31 21.042 10.28 21.042 11.512C21.042 12.35 20.893 13.149 20.596 13.91C20.298 14.671 19.92 15.422 19.462 16.162L16.471 21H14.017ZM4.708 21L7.13 14.823C7.283 14.482 7.402 14.157 7.488 13.847C7.575 13.537 7.618 13.23 7.618 12.925C7.618 12.396 7.481 11.975 7.207 11.663C6.932 11.35 6.551 11.194 6.063 11.194C5.697 11.194 5.345 11.272 5.007 11.428C4.669 11.585 4.373 11.832 4.121 12.169L2.506 9.771C3.083 9.074 3.781 8.528 4.602 8.132C5.424 7.737 6.341 7.539 7.353 7.539C8.616 7.539 9.661 7.893 10.49 8.601C11.318 9.31 11.733 10.28 11.733 11.512C11.733 12.35 11.584 13.149 11.287 13.91C10.989 14.671 10.611 15.422 10.153 16.162L7.162 21H4.708Z" /></svg>
                                </div>
                                <p className="text-gray-700 mb-8 leading-relaxed flex-grow font-medium">
                                    I love the user interface. It feels so premium and the problem sets are perfectly aligned with what is required for campus placements.
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                    <img src="https://api.dicebear.com/10.x/glyphs/svg?seed=Kuldip" alt="Student" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">Kuldip Mahale</p>
                                        <p className="text-gray-500 text-xs">RCPIT (AIML) Batch of 2027</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#fafcff] p-8 rounded-2xl border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-[#3E6FC3] mb-6">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 21L16.439 14.823C16.592 14.482 16.711 14.157 16.797 13.847C16.884 13.537 16.927 13.23 16.927 12.925C16.927 12.396 16.79 11.975 16.516 11.663C16.241 11.35 15.86 11.194 15.372 11.194C15.006 11.194 14.654 11.272 14.316 11.428C13.978 11.585 13.682 11.832 13.43 12.169L11.815 9.771C12.392 9.074 13.09 8.528 13.911 8.132C14.733 7.737 15.65 7.539 16.662 7.539C17.925 7.539 18.97 7.893 19.799 8.601C20.627 9.31 21.042 10.28 21.042 11.512C21.042 12.35 20.893 13.149 20.596 13.91C20.298 14.671 19.92 15.422 19.462 16.162L16.471 21H14.017ZM4.708 21L7.13 14.823C7.283 14.482 7.402 14.157 7.488 13.847C7.575 13.537 7.618 13.23 7.618 12.925C7.618 12.396 7.481 11.975 7.207 11.663C6.932 11.35 6.551 11.194 6.063 11.194C5.697 11.194 5.345 11.272 5.007 11.428C4.669 11.585 4.373 11.832 4.121 12.169L2.506 9.771C3.083 9.074 3.781 8.528 4.602 8.132C5.424 7.737 6.341 7.539 7.353 7.539C8.616 7.539 9.661 7.893 10.49 8.601C11.318 9.31 11.733 10.28 11.733 11.512C11.733 12.35 11.584 13.149 11.287 13.91C10.989 14.671 10.611 15.422 10.153 16.162L7.162 21H4.708Z" /></svg>
                                </div>
                                <p className="text-gray-700 mb-8 leading-relaxed flex-grow font-medium">
                                    The AI mentor is a game-changer. It explains the core logic when I'm stuck without giving me the code directly. Very helpful!
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                    <img src="https://api.dicebear.com/10.x/glyphs/svg?seed=Nilesh" alt="Student" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">Nilesh Patil</p>
                                        <p className="text-gray-500 text-xs">RCPIT (AIML) Batch of 2027</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#fafcff] p-8 rounded-2xl border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-[#3E6FC3] mb-6">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 21L16.439 14.823C16.592 14.482 16.711 14.157 16.797 13.847C16.884 13.537 16.927 13.23 16.927 12.925C16.927 12.396 16.79 11.975 16.516 11.663C16.241 11.35 15.86 11.194 15.372 11.194C15.006 11.194 14.654 11.272 14.316 11.428C13.978 11.585 13.682 11.832 13.43 12.169L11.815 9.771C12.392 9.074 13.09 8.528 13.911 8.132C14.733 7.737 15.65 7.539 16.662 7.539C17.925 7.539 18.97 7.893 19.799 8.601C20.627 9.31 21.042 10.28 21.042 11.512C21.042 12.35 20.893 13.149 20.596 13.91C20.298 14.671 19.92 15.422 19.462 16.162L16.471 21H14.017ZM4.708 21L7.13 14.823C7.283 14.482 7.402 14.157 7.488 13.847C7.575 13.537 7.618 13.23 7.618 12.925C7.618 12.396 7.481 11.975 7.207 11.663C6.932 11.35 6.551 11.194 6.063 11.194C5.697 11.194 5.345 11.272 5.007 11.428C4.669 11.585 4.373 11.832 4.121 12.169L2.506 9.771C3.083 9.074 3.781 8.528 4.602 8.132C5.424 7.737 6.341 7.539 7.353 7.539C8.616 7.539 9.661 7.893 10.49 8.601C11.318 9.31 11.733 10.28 11.733 11.512C11.733 12.35 11.584 13.149 11.287 13.91C10.989 14.671 10.611 15.422 10.153 16.162L7.162 21H4.708Z" /></svg>
                                </div>
                                <p className="text-gray-700 mb-8 leading-relaxed flex-grow font-medium">
                                    Finally a platform built just for us. It helps track my real-time progress and keep me accountable. Highly recommend to everyone.
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                    <img src="https://api.dicebear.com/10.x/glyphs/svg?seed=Harshal" alt="Student" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">Harshal Patil</p>
                                        <p className="text-gray-500 text-xs">RCPIT (AIML) Batch of 2027</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* 6. Footer Section */}
            <LandingFooter />
        </div>
    )
}
