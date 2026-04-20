import React, { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { Clock, Users, BookOpen, ArrowLeft } from 'lucide-react'
import { QuestionsList } from '@/components/contest/QuestionsList'
import { Leaderboard } from '@/components/contest/Leaderboard'
import { useAuth } from '@/contexts/AuthContext'
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
            <div className="min-h-screen bg-[#1A1A1A] text-white p-6 md:p-12">
                <div className="max-w-5xl mx-auto text-sm text-gray-400">Loading contest room...</div>
            </div>
        )
    }

    if (roomQuery.isError || !roomQuery.data) {
        return (
            <div className="min-h-screen bg-[#1A1A1A] text-white p-6 md:p-12">
                <div className="max-w-5xl mx-auto space-y-4">
                    <button
                        onClick={() => navigate('/contest')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to Contests
                    </button>
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-200">
                        {getApiErrorMessage(roomQuery.error, 'Unable to load contest room')}
                    </div>
                </div>
            </div>
        )
    }

    const room = roomQuery.data

    return (
        <div className="min-h-screen bg-[#1A1A1A] text-white p-6 md:p-12 font-sans selection:bg-white/20">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate('/contest')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm font-medium"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Contests
                </button>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                {timeLeft > 0 ? 'Live' : 'Ended'}
                            </div>
                            <span className="text-sm font-mono text-gray-400 tracking-wider">
                                ROOM {room.code}
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1.5">
                                <Users className="h-4 w-4" />
                                {room.participantCount}
                                {room.maxParticipants ? `/${room.maxParticipants}` : ''} Participants
                            </span>
                            <span className="text-gray-600">•</span>
                            <span className="flex items-center gap-1.5">
                                <BookOpen className="h-4 w-4" /> {room.topics.join(', ')}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 md:items-end">
                        <div>
                            <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">
                                Time Remaining
                            </div>
                            <div className="text-4xl font-mono font-light text-white tracking-tight flex items-center gap-3">
                                <Clock className="h-6 w-6 text-gray-500" />
                                {formatTime(timeLeft)}
                            </div>
                        </div>

                        {!room.meJoined ? (
                            <button
                                onClick={handleJoin}
                                disabled={joinMutation.isPending || timeLeft === 0}
                                className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 disabled:bg-white/60 disabled:cursor-not-allowed"
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
        </div>
    )
}
