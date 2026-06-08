import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Heart } from 'lucide-react'

export function LandingFooter() {
    return (
        <footer className="bg-[#152A4C] text-slate-300 pt-16 pb-12 font-sans border-t border-white/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Multi-column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
                    {/* Column 1: Branding */}
                    <div className="space-y-4">
                        <Link
                            to="/"
                            className="inline-block text-xl font-bold tracking-tight transition-colors"
                        >
                            <span className="text-white font-black text-xl tracking-tight">
                                Campus Lab
                            </span>
                        </Link>
                        <p className="text-sm text-slate-300 leading-relaxed font-medium">
                            An exclusive competitive programming and social learning platform for students to master DSA, create contest rooms, and track real-time coding progress.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4 pt-2">
                        </div>
                    </div>

                    {/* Column 2: Platform Links */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                            Platform
                        </h3>
                        <ul className="space-y-2.5 text-sm font-medium">
                            <li>
                                <Link to="/practice" className="hover:text-white transition-colors">
                                    Problem Sheets
                                </Link>
                            </li>
                            <li>
                                <Link to="/contest" className="hover:text-white transition-colors">
                                    Contest Rooms
                                </Link>
                            </li>
                            <li>
                                <Link to="/practice" className="hover:text-white transition-colors">
                                    Leaderboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Features */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                            Features
                        </h3>
                        <ul className="space-y-2.5 text-sm font-medium">
                            <li>
                                <span className="text-slate-400">
                                    Real-time Matchmaking
                                </span>
                            </li>
                            <li>
                                <span className="text-slate-400">
                                    AI Mentor Help
                                </span>
                            </li>
                            <li>
                                <span className="text-slate-400">
                                    Faculty Dashboard
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Academics & Project */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                            Academic Project
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed font-medium">
                            Semester Project built by <span className="text-white font-semibold">Sakshi, Jayesh, Sachin & Chaitanya</span>.
                        </p>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            R. C. Patel Institute of Technology
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <p className="text-xs text-slate-400 font-medium">
                        © {new Date().getFullYear()} Campus Lab. All rights reserved.
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                        Designed & developed for peer-to-peer programming.
                    </p>
                </div>
            </div>
        </footer>
    )
}
