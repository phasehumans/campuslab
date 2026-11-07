import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Loader2, Trophy } from 'lucide-react'
import { getApiErrorMessage, getContestRoom, joinContestRoom } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'

export function ContestRoom() {
    const { roomId } = useParams()
    const navigate = useNavigate()
    const { isLoggedIn, openModal } = useAuth()

    const roomQuery = useQuery({
        queryKey: ['contest-room', roomId],
        queryFn: () => getContestRoom(roomId as string),
        enabled: Boolean(roomId),
        refetchInterval: 3000,
    })

    const joinMutation = useMutation({
        mutationFn: () => joinContestRoom(roomId as string),
        onSuccess: (room) => {
            if (room.questions && room.questions.length > 0) {
                navigate(`/problem/${room.questions[0].id}?room=${room.code}`, { replace: true })
            }
        },
    })

    useEffect(() => {
        if (!roomQuery.data) return
        const room = roomQuery.data
        if (!room.questions || room.questions.length === 0) return

        if (room.meJoined) {
            navigate(`/problem/${room.questions[0].id}?room=${room.code}`, { replace: true })
        } else if (isLoggedIn && !joinMutation.isPending && !joinMutation.isSuccess && !joinMutation.isError) {
            joinMutation.mutate()
        }
    }, [roomQuery.data, isLoggedIn, joinMutation, navigate])

    if (roomQuery.isLoading || joinMutation.isPending) {
        return (
            <div className="flex h-[60vh] w-full items-center justify-center font-mono text-xs text-[#94a3b8] dark:text-[#a09f9d]">
                <div className="flex flex-col items-center gap-3 p-6 rounded-[3px] border border-[#e2e8f0] dark:border-[#333333] bg-white dark:bg-[#1e1e1e]">
                    <Loader2 className="h-5 w-5 animate-spin text-[#87b2f4]" />
                    <span>Connecting to contest arena [{roomId}]...</span>
                </div>
            </div>
        )
    }

    if (roomQuery.isError || !roomQuery.data) {
        return (
            <div className="w-full max-w-md mx-auto mt-12 space-y-4">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-1.5 font-mono text-xs text-[#52525b] dark:text-[#a09f9d] hover:text-[#090a0f] dark:hover:text-[#e8e8e6] transition-colors cursor-pointer"
                >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to Problem Set
                </button>
                <div className="rounded-[3px] border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 p-4 text-xs font-mono text-red-700 dark:text-red-400">
                    {getApiErrorMessage(roomQuery.error, 'Unable to locate contest room')}
                </div>
            </div>
        )
    }

    const room = roomQuery.data

    return (
        <div className="w-full max-w-md mx-auto mt-12 space-y-4 font-mono text-xs">
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-1.5 text-[#52525b] dark:text-[#a09f9d] hover:text-[#090a0f] dark:hover:text-[#e8e8e6] transition-colors cursor-pointer"
            >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Problem Set
            </button>

            <div className="p-6 rounded-[3px] border border-[#e2e8f0] dark:border-[#333333] bg-white dark:bg-[#1e1e1e] space-y-4 text-center">
                <div className="flex justify-center">
                    <div className="h-10 w-10 rounded-[3px] bg-[#87b2f4]/15 border border-[#87b2f4]/30 flex items-center justify-center text-[#87b2f4]">
                        <Trophy className="h-5 w-5" />
                    </div>
                </div>

                <div className="space-y-1">
                    <h2 className="text-base font-semibold text-[#090a0f] dark:text-[#e8e8e6]">
                        Contest Room [{room.code}]
                    </h2>
                    <p className="text-xs text-[#64748b] dark:text-[#a09f9d]">
                        {room.participantCount} coder(s) active in room • 45m speed duel
                    </p>
                </div>

                {!isLoggedIn ? (
                    <button
                        onClick={() => openModal('login')}
                        className="w-full py-2.5 px-4 bg-[#090a0f] dark:bg-white text-white dark:text-[#141414] rounded-[3px] font-semibold transition-colors cursor-pointer"
                    >
                        Sign in to Enter Contest
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            if (room.questions?.[0]) {
                                navigate(`/problem/${room.questions[0].id}?room=${room.code}`)
                            }
                        }}
                        className="w-full py-2.5 px-4 bg-[#87b2f4] hover:bg-[#72a3ed] text-[#141414] rounded-[3px] font-semibold transition-colors cursor-pointer"
                    >
                        Enter Contest IDE
                    </button>
                )}
            </div>
        </div>
    )
}
