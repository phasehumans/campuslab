import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Loader2, ArrowRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { getApiErrorMessage, getProfile, joinContestRoom } from '@/lib/api'
import { ContestActionModal } from '@/components/contest/ContestActionModal'
import { Tooltip } from '@/components/ui/Tooltip'
import { cn, formatRelativeTime } from '@/lib/utils'

interface SidelinePanelProps {
    totalProblemsCount?: number
}

export function SidelinePanel({ totalProblemsCount = 0 }: SidelinePanelProps) {
    const navigate = useNavigate()
    const { isLoggedIn, user, openModal, openSignoutModal } = useAuth()
    const [roomCode, setRoomCode] = useState('')
    const [joinError, setJoinError] = useState<string | null>(null)
    const [isContestModalOpen, setIsContestModalOpen] = useState(false)

    const profileQuery = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        enabled: isLoggedIn,
    })

    const joinMutation = useMutation({
        mutationFn: (code: string) => joinContestRoom(code.trim().toUpperCase()),
        onSuccess: (room) => {
            setJoinError(null)
            if (room.questions && room.questions.length > 0) {
                navigate(`/problem/${room.questions[0].id}?room=${room.code}`)
            } else {
                navigate(`/contest/${room.code}`)
            }
        },
        onError: (err) => {
            setJoinError(getApiErrorMessage(err, 'Unable to join contest room'))
        },
    })

    const handleJoin = (e: React.FormEvent) => {
        e.preventDefault()
        if (!roomCode.trim()) return

        if (!isLoggedIn) {
            openModal()
            return
        }

        setJoinError(null)
        joinMutation.mutate(roomCode)
    }

    const profile = profileQuery.data
    const totalSolved = profile?.stats.totalSolved ?? 0
    const targetCount = totalProblemsCount || 250
    const percentDone =
        targetCount > 0 ? Math.min(100, Math.round((totalSolved / targetCount) * 100)) : 0

    return (
        <aside className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 lg:block lg:space-y-4">
            {/* 1. Profile / Auth Box */}
            <div className="border border-[#e2e8f0] dark:border-[#333333] bg-white dark:bg-[#1e1e1e] p-4 rounded-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-3 transition-colors">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#64748b] dark:text-[#a09f9d] border-b border-[#f0f2f5] dark:border-[#272727] pb-2">
                    <span className="uppercase tracking-wider font-medium">[Profile]</span>
                    {isLoggedIn && (
                        <Tooltip content="Sign out of account" position="bottom" align="end">
                            <button
                                type="button"
                                onClick={openSignoutModal}
                                className="text-[#94a3b8] dark:text-[#a09f9d] hover:text-[#ef4444] transition-colors cursor-pointer"
                            >
                                logout
                            </button>
                        </Tooltip>
                    )}
                </div>

                {isLoggedIn ? (
                    <div className="space-y-3">
                        <div className="space-y-0.5">
                            <div className="text-xs font-medium text-[#090a0f] dark:text-[#e8e8e6] truncate">
                                {user?.name || 'Developer'}
                            </div>
                            <div className="font-mono text-[10px] text-[#94a3b8] dark:text-[#a09f9d] truncate">
                                {user?.email || 'signed in'}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1 pt-1 font-mono text-[11px]">
                            <div className="flex justify-between text-[#52525b] dark:text-[#a09f9d]">
                                <span>Solved</span>
                                <span className="font-medium text-[#090a0f] dark:text-[#e8e8e6]">
                                    {totalSolved} / {targetCount} ({percentDone}%)
                                </span>
                            </div>
                            <div className="h-1.5 w-full bg-[#f1f5f9] dark:bg-[#252423] rounded-full overflow-hidden border border-[#e2e8f0] dark:border-[#333333]">
                                <div
                                    className="h-full bg-[#10b981] transition-all duration-500"
                                    style={{ width: `${percentDone}%` }}
                                />
                            </div>
                        </div>

                        {/* By Difficulty stats */}
                        {profile?.stats.byDifficulty && (
                            <div className="grid grid-cols-3 gap-1 pt-1 font-mono text-[10px] text-center">
                                {profile.stats.byDifficulty.map((diff) => (
                                    <div
                                        key={diff.name}
                                        className="p-1.5 bg-[#f9fafb] dark:bg-[#252423] border border-[#e2e8f0] dark:border-[#333333] rounded-[2px]"
                                    >
                                        <div
                                            className={cn(
                                                'font-medium',
                                                diff.name === 'Easy' && 'text-[#34d399]',
                                                diff.name === 'Medium' && 'text-[#fcd34d]',
                                                diff.name === 'Hard' && 'text-rose-300'
                                            )}
                                        >
                                            {diff.name}
                                        </div>
                                        <div className="text-[#090a0f] dark:text-[#e8e8e6] font-semibold mt-0.5">
                                            {diff.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Recent Submissions (Max 3, Minimalist List) */}
                        {profile?.recentSubmissions && profile.recentSubmissions.length > 0 && (
                            <div className="space-y-1.5 pt-2.5 border-t border-[#f0f2f5] dark:border-[#272727] font-mono">
                                <div className="flex items-center justify-between text-[10px] text-[#64748b] dark:text-[#777777] uppercase tracking-wider">
                                    <span>Recent Submissions</span>
                                </div>
                                <div className="space-y-1">
                                    {profile.recentSubmissions.slice(0, 3).map((sub) => {
                                        const isAccepted = sub.status === 'Accepted'
                                        return (
                                            <div
                                                key={sub.id}
                                                onClick={() => navigate(`/problem/${sub.problemId}`)}
                                                className="flex items-center justify-between gap-2 py-0.5 text-[11px] cursor-pointer group hover:bg-[#f8fafc] dark:hover:bg-[#252423] px-1 rounded-[2px] transition-colors"
                                                title={`Open ${sub.title || 'problem'} (${sub.status})`}
                                            >
                                                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                                                    <span
                                                        className={cn(
                                                            'h-1.5 w-1.5 rounded-full shrink-0',
                                                            isAccepted ? 'bg-emerald-400' : 'bg-rose-400'
                                                        )}
                                                    />
                                                    <span className="text-[#334155] dark:text-[#cccccc] group-hover:text-[#090a0f] dark:group-hover:text-white truncate">
                                                        {sub.title || 'Problem'}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] text-[#94a3b8] dark:text-[#777777] shrink-0">
                                                    {formatRelativeTime(sub.createdAt)}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-3 py-1">
                        <p className="text-xs text-[#52525b] dark:text-[#a09f9d] leading-relaxed">
                            Sign in with your GitHub or Google account to track your solves and
                            compete in live contests.
                        </p>
                        <button
                            type="button"
                            onClick={openModal}
                            className="w-full flex items-center justify-center gap-1.5 bg-[#090a0f] dark:bg-white text-white dark:text-[#141414] hover:bg-[#27272a] dark:hover:bg-[#e8e8e6] font-mono text-xs py-2 px-3 rounded-[3px] transition-colors cursor-pointer"
                        >
                            <span>Sign in</span>
                            <ArrowRight className="h-3 w-3" />
                        </button>
                    </div>
                )}
            </div>

            {/* Contest Center */}
            <div className="border border-[#e2e8f0] dark:border-[#333333] bg-white dark:bg-[#1e1e1e] p-4 rounded-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-3 transition-colors">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#64748b] dark:text-[#a09f9d] border-b border-[#f0f2f5] dark:border-[#272727] pb-2">
                    <span className="uppercase tracking-wider font-medium">[Contests]</span>
                    <span className="text-[#94a3b8] dark:text-[#a09f9d] text-[10px]">live</span>
                </div>

                {joinError && (
                    <div className="p-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400 font-mono text-[11px] rounded-[2px]">
                        {joinError}
                    </div>
                )}

                {/* Join with room code */}
                <form onSubmit={handleJoin} className="space-y-2">
                    <input
                        type="text"
                        placeholder="ENTER ROOM CODE (E.G. A1B2)"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                        maxLength={8}
                        className="w-full px-3 py-2 border border-[#e2e8f0] dark:border-[#333333] bg-white dark:bg-[#252423] rounded-[3px] font-mono text-xs text-[#090a0f] dark:text-[#e8e8e6] placeholder:text-[#94a3b8] dark:placeholder:text-[#a09f9d]/60 focus:outline-none focus:border-[#87b2f4] uppercase tracking-wider"
                    />
                    <button
                        type="submit"
                        disabled={joinMutation.isPending || !roomCode.trim()}
                        className="w-full flex items-center justify-center gap-1.5 bg-[#090a0f] dark:bg-white hover:bg-[#27272a] dark:hover:bg-[#e8e8e6] text-white dark:text-[#141414] font-mono text-xs py-2 px-3 rounded-[3px] transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {joinMutation.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                        <span>Join Contest</span>
                    </button>
                </form>

                <div className="flex items-center gap-2 font-mono text-[10px] text-[#cbd5e1] dark:text-[#333333] my-1">
                    <div className="flex-1 h-px bg-[#f0f2f5] dark:bg-[#272727]" />
                    <span>or</span>
                    <div className="flex-1 h-px bg-[#f0f2f5] dark:bg-[#272727]" />
                </div>

                {/* Create Room Button */}
                <button
                    type="button"
                    onClick={() => {
                        if (!isLoggedIn) {
                            openModal()
                            return
                        }
                        setIsContestModalOpen(true)
                    }}
                    className="w-full flex items-center justify-center gap-1.5 border border-[#e2e8f0] dark:border-[#333333] hover:bg-[#f9fafb] dark:hover:bg-[#252423] text-[#090a0f] dark:text-[#e8e8e6] font-mono text-xs py-2 px-3 rounded-[3px] transition-colors cursor-pointer"
                >
                    <span>+ Create Contest</span>
                </button>
            </div>

            {/* Contest Room Creation Modal */}
            <ContestActionModal
                isOpen={isContestModalOpen}
                onClose={() => setIsContestModalOpen(false)}
            />
        </aside>
    )
}
