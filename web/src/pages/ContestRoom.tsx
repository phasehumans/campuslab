import React, { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { Clock, Users, BookOpen, ArrowLeft } from 'lucide-react'
import { QuestionsList } from '@/components/contest/QuestionsList'
import { Leaderboard } from '@/components/contest/Leaderboard'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'
import { getApiErrorMessage, getContestRoom, joinContestRoom } from '@/lib/api'

export function ContestRoom() {
    const { roomId } = useParams()
    const navigate = useNavigate()
    const { isLoggedIn, openModal } = useAuth()
    const [now, setNow] = useState(() => Date.now())

    const roomQuery = useQuery({
        queryKey: ['contest-room', roomId],
        queryFn: () => getContestRoom(roomId as string),
        enabled: Boolean(roomId),
        refetchInterval: 5000,
    })

    const joinMutation = useMutation({
        mutationFn: () => joinContestRoom(roomId as string),
        onSuccess: () => {
            roomQuery.refetch()
        },
    })

    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(timer)
    }, [])

    const timeLeft = useMemo(() => {
        if (!roomQuery.data) {
            return 0
        }

        return Math.max(0, Math.floor((new Date(roomQuery.data.endsAt).getTime() - now) / 1000))
    }, [now, roomQuery.data])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleJoin = () => {
        if (!isLoggedIn) {
            openModal('login')
            return
        }

        joinMutation.mutate()
    }

    if (roomQuery.isLoading) {
        return (
            <div className="w-full max-w-5xl mx-auto">
                <div className="rounded-2xl border border-slate-100 bg-white p-8 text-sm text-slate-400 shadow-sm">
                    Loading contest room...
                </div>
            </div>
        )
    }

    if (roomQuery.isError || !roomQuery.data) {
        return (
            <div className="w-full max-w-5xl mx-auto space-y-4">
                <button
                    onClick={() => navigate('/contest')}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-semibold"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Contests
                </button>
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-200">
                    {getApiErrorMessage(roomQuery.error, 'Unable to load contest room')}
                </div>
            </div>
        )
    }

    const room = roomQuery.data

    return (
        <div className="w-full max-w-5xl mx-auto font-sans selection:bg-[#3E6FC3]/20">
            <button
                onClick={() => navigate('/contest')}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-8 text-sm font-semibold"
            >
                <ArrowLeft className="h-4 w-4" /> Back to Contests
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.02)]">
                <div>
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 border shadow-sm",
                            timeLeft > 0 
                                ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                                : "bg-slate-100 border-slate-200 text-slate-600"
                        )}>
                            {timeLeft > 0 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                            {timeLeft > 0 ? 'Live' : 'Ended'}
                        </div>
                        <span className="text-sm font-mono text-slate-400 tracking-wider">
                            ROOM {room.code}
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5 font-medium">
                            <Users className="h-4 w-4 text-slate-400" />
                            {room.participantCount}
                            {room.maxParticipants ? `/${room.maxParticipants}` : ''} Participants
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1.5 font-medium">
                            <BookOpen className="h-4 w-4 text-slate-400" /> {room.topics.join(', ')}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-4 md:items-end">
                    <div>
                        <div className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">
                            Time Remaining
                        </div>
                        <div className="text-4xl font-mono font-medium text-slate-800 tracking-tight flex items-center gap-3">
                            <Clock className="h-6 w-6 text-slate-400" />
                            {formatTime(timeLeft)}
                        </div>
                    </div>

                    {!room.meJoined ? (
                        <button
                            onClick={handleJoin}
                            disabled={joinMutation.isPending || timeLeft === 0}
                            className="rounded-xl bg-[#3E6FC3] hover:bg-[#325a9e] text-white font-semibold py-2.5 px-6 text-sm transition-all shadow-md shadow-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {joinMutation.isPending ? 'Joining...' : 'Join Room'}
                        </button>
                    ) : null}
                </div>
            </div>

            {joinMutation.isError ? (
                <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                    {getApiErrorMessage(joinMutation.error, 'Unable to join room')}
                </div>
            ) : null}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <QuestionsList roomCode={room.code} questions={room.questions} />
                <Leaderboard entries={room.leaderboard} />
            </div>
        </div>
    )
}
