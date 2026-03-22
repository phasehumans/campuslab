import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Clock, Users, BookOpen, ArrowLeft } from 'lucide-react'
import { QuestionsList } from '@/components/contest/QuestionsList'
import { Leaderboard } from '@/components/contest/Leaderboard'

export function ContestRoom() {
    const { roomId } = useParams()
    const navigate = useNavigate()
    const [timeLeft, setTimeLeft] = useState(45 * 60) // 45 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    return (
        <div className="min-h-screen bg-[#1A1A1A] text-white p-6 md:p-12 font-sans selection:bg-white/20">
            <div className="max-w-5xl mx-auto">
                {/* Back Navigation */}
                <button
                    onClick={() => navigate('/contest')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm font-medium"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Contests
                </button>

                {/* Minimal Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{' '}
                                Live
                            </div>
                            <span className="text-sm font-mono text-gray-400 tracking-wider">
                                ROOM {roomId}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1.5">
                                <Users className="h-4 w-4" /> 4/4 Participants
                            </span>
                            <span className="text-gray-600">•</span>
                            <span className="flex items-center gap-1.5">
                                <BookOpen className="h-4 w-4" /> Array, String
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col md:items-end">
                        <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">
                            Time Remaining
                        </div>
                        <div className="text-4xl font-mono font-light text-white tracking-tight flex items-center gap-3">
                            <Clock className="h-6 w-6 text-gray-500" />
                            {formatTime(timeLeft)}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Questions List */}
                    <QuestionsList />

                    {/* Leaderboard */}
                    <Leaderboard />
                </div>
            </div>
        </div>
    )
}
