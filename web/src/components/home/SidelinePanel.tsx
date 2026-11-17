import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Loader2, ArrowRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { getApiErrorMessage, getContestRoom, getProfile, joinContestRoom } from '@/lib/api'
import { ContestActionModal } from '@/components/contest/ContestActionModal'
import { CreateDuelModal } from '@/components/duel/CreateDuelModal'
import { Tooltip } from '@/components/ui/Tooltip'
import { ActivityGrid } from '@/components/home/ActivityGrid'
import { SolvedRing } from '@/components/home/SolvedRing'
import { DuelRecord } from '@/components/home/DuelRecord'
import { cn, formatRelativeTime } from '@/lib/utils'

interface SidelinePanelProps {
    totalProblemsCount?: number
}

function ProfileSkeleton({ userName, userEmail }: { userName?: string; userEmail?: string }) {
    return (
        <div className="space-y-3 animate-pulse">
            <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-[#e2e8f0] dark:bg-[#282828] shrink-0" />
                <div className="min-w-0 flex-1 h-8 flex flex-col justify-between">
                    {userName ? (
                        <div className="text-xs leading-4 font-medium text-[#090a0f] dark:text-[#e8e8e6] truncate">
                            {userName}
                        </div>
                    ) : (
                        <div className="h-3 w-24 mt-0.5 bg-[#e2e8f0] dark:bg-[#282828] rounded-[2px]" />
                    )}
                    {userEmail ? (
                        <div className="font-mono text-[10px] leading-4 text-[#94a3b8] dark:text-[#a09f9d] truncate">
                            {userEmail}
                        </div>
                    ) : (
                        <div className="h-2.5 w-32 mb-0.5 bg-[#f1f5f9] dark:bg-[#242424] rounded-[2px]" />
                    )}
                </div>
            </div>

            {/* Solved ring skeleton */}
            <div className="flex items-center gap-4 pt-1 font-mono text-[11px]">
                <div className="h-[76px] w-[76px] rounded-full border-[7px] border-[#f1f5f9] dark:border-[#252423] shrink-0" />
                <div className="flex-1 space-y-1.5">
                    {[
                        { label: 'Easy', color: 'text-emerald-500 dark:text-emerald-400' },
                        { label: 'Medium', color: 'text-[#d97706] dark:text-[#fcd34d]' },
                        { label: 'Hard', color: 'text-rose-500 dark:text-rose-300' },
                    ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between">
                            <span className={cn('font-medium', item.color)}>{item.label}</span>
                            <div className="h-2.5 w-8 bg-[#e2e8f0] dark:bg-[#333333] rounded-[2px]" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Submissions Skeleton */}
            <div className="space-y-1.5 pt-2.5 font-mono">
                <div className="flex items-center justify-between text-[10px] text-[#64748b] dark:text-[#777777] uppercase tracking-wider">
                    <span>Recent Submissions</span>
                </div>
                <div className="space-y-1.5 pt-0.5">
                    {[65, 48, 80].map((width, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between gap-2 py-0.5 px-1"
                        >
                            <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#cbd5e1] dark:bg-[#333333] shrink-0" />
                                <div
                                    className="h-2.5 bg-[#f1f5f9] dark:bg-[#252423] rounded-[2px]"
                                    style={{ width: `${width}%` }}
                                />
                            </div>
                            <div className="h-2 w-7 bg-[#f1f5f9] dark:bg-[#252423] rounded-[2px] shrink-0" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function SidelinePanel({ totalProblemsCount = 0 }: SidelinePanelProps) {
    const navigate = useNavigate()
    const { isLoggedIn, user, openModal, openSignoutModal } = useAuth()
    const [roomCode, setRoomCode] = useState('')
    const [joinError, setJoinError] = useState<string | null>(null)
    const [isContestModalOpen, setIsContestModalOpen] = useState(false)
    const [isDuelModalOpen, setIsDuelModalOpen] = useState(false)

    const profileQuery = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        enabled: isLoggedIn,
    })

    const joinMutation = useMutation({
        // One box joins both contest rooms and duels: duel codes go to the duel page
        mutationFn: async (raw: string) => {
            const code = raw.trim().toUpperCase()
            const existing = await getContestRoom(code)
            if (existing.mode === 'DUEL') return existing
            return joinContestRoom(code)
        },
        onSuccess: (room) => {
            setJoinError(null)
            if (room.mode === 'DUEL') {
                navigate(`/duel/${room.code}`)
            } else if (room.questions && room.questions.length > 0) {
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
    const avatarUrl = profile?.user.avatar || user?.avatar || null
    const targetCount =
        profile?.stats.byDifficulty.reduce((sum, d) => sum + d.total, 0) ||
        totalProblemsCount ||
        250

    return (
        <aside className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 lg:block lg:space-y-4">
            {/* 1. Profile / Auth Box */}
            <div className="border border-[#e2e8f0] dark:border-[#333333] bg-white dark:bg-[#1e1e1e] p-4 rounded-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-3 transition-colors">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#64748b] dark:text-[#a09f9d] pb-2">
                    <span className="uppercase tracking-wider font-medium">Profile</span>
                    {isLoggedIn && (
                        <Tooltip content="Sign out of account" position="bottom" align="end">
                            <button
                                type="button"
                                onClick={openSignoutModal}
                                className="text-[#94a3b8] dark:text-[#a09f9d] hover:text-red-500 transition-colors cursor-pointer"
                            >
                                logout
                            </button>
                        </Tooltip>
                    )}
                </div>

                {isLoggedIn ? (
                    profileQuery.isLoading ? (
                        <ProfileSkeleton
                            userName={user?.name ?? undefined}
                            userEmail={user?.email ?? undefined}
                        />
                    ) : (
                        <div className="space-y-3">
                            {/* Identity: name on top, email below, together exactly the avatar's height */}
                            <div className="flex items-center gap-2.5">
                                <div className="h-8 w-8 rounded-full bg-[#f1f5f9] dark:bg-[#252423] border border-[#e2e8f0] dark:border-[#333333] flex items-center justify-center text-xs font-medium text-[#090a0f] dark:text-[#e8e8e6] overflow-hidden shrink-0">
                                    {avatarUrl ? (
                                        <img
                                            src={avatarUrl}
                                            alt=""
                                            className="h-full w-full object-cover"
                                            referrerPolicy="no-referrer"
                                        />
                                    ) : (
                                        (user?.name || 'D')[0].toUpperCase()
                                    )}
                                </div>
                                <div className="min-w-0 h-8 flex flex-col justify-between">
                                    <div className="text-xs leading-4 font-medium text-[#090a0f] dark:text-[#e8e8e6] truncate">
                                        {user?.name || 'Developer'}
                                    </div>
                                    {(profile?.user.email || user?.email) && (
                                        <div className="font-mono text-[10px] leading-4 text-[#94a3b8] dark:text-[#a09f9d] truncate">
                                            {profile?.user.email || user?.email}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Solved: ring split by difficulty + legend */}
                            {profile?.stats.byDifficulty && (
                                <SolvedRing
                                    stats={profile.stats.byDifficulty}
                                    total={targetCount}
                                />
                            )}

                            {/* Last 30 days of activity */}
                            {profile?.activity && (
                                <div className="pt-1">
                                    <ActivityGrid
                                        today={profile.activity.today}
                                        days={profile.activity.days}
                                    />
                                </div>
                            )}

                            {/* 1v1 duel record (only after the first finished duel) */}
                            {profile?.duels && <DuelRecord record={profile.duels} />}

                            {/* Recent Submissions (Max 3, Minimalist List) */}
                            {profile?.recentSubmissions && profile.recentSubmissions.length > 0 && (
                                <div className="space-y-1.5 pt-2.5 font-mono">
                                    <div className="flex items-center justify-between text-[10px] text-[#64748b] dark:text-[#777777] uppercase tracking-wider">
                                        <span>Recent Submissions</span>
                                    </div>
                                    <div className="space-y-1">
                                        {profile.recentSubmissions.slice(0, 3).map((sub) => {
                                            const isAccepted = sub.status === 'Accepted'
                                            return (
                                                <div
                                                    key={sub.id}
                                                    onClick={() =>
                                                        navigate(`/problem/${sub.problemId}`)
                                                    }
                                                    className="flex items-center justify-between gap-2 py-0.5 text-[11px] cursor-pointer group hover:bg-[#f8fafc] dark:hover:bg-[#252423] px-1 rounded-[2px] transition-colors"
                                                    title={`Open ${sub.title || 'problem'} (${sub.status})`}
                                                >
                                                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                                                        <span
                                                            className={cn(
                                                                'h-1.5 w-1.5 rounded-full shrink-0',
                                                                isAccepted
                                                                    ? 'bg-emerald-400'
                                                                    : 'bg-rose-400'
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
                    )
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
                <div className="flex items-center justify-between font-mono text-[11px] text-[#64748b] dark:text-[#a09f9d] pb-2">
                    <span className="uppercase tracking-wider font-medium">Contests</span>
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
                        placeholder="ROOM OR DUEL CODE"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                        maxLength={8}
                        className="w-full px-3 py-2 border border-[#e2e8f0] dark:border-[#333333] bg-white dark:bg-[#252423] rounded-[3px] font-mono text-base sm:text-xs text-[#090a0f] dark:text-[#e8e8e6] placeholder:text-[#94a3b8] dark:placeholder:text-[#a09f9d]/60 focus:outline-none focus:border-[#87b2f4] uppercase tracking-wider"
                    />
                    <button
                        type="submit"
                        disabled={joinMutation.isPending || !roomCode.trim()}
                        className="w-full flex items-center justify-center gap-1.5 bg-[#090a0f] dark:bg-white hover:bg-[#27272a] dark:hover:bg-[#e8e8e6] text-white dark:text-[#141414] font-mono text-xs py-2 px-3 rounded-[3px] transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {joinMutation.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                        <span>Join with Code</span>
                    </button>
                </form>

                <div className="flex items-center justify-center font-mono text-[10px] text-[#94a3b8] dark:text-[#777777]">
                    <span>or</span>
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

                {/* 1v1 Duel */}
                <button
                    type="button"
                    onClick={() => {
                        if (!isLoggedIn) {
                            openModal()
                            return
                        }
                        setIsDuelModalOpen(true)
                    }}
                    className="w-full flex items-center justify-center gap-1.5 border border-[#e2e8f0] dark:border-[#333333] hover:bg-[#f9fafb] dark:hover:bg-[#252423] text-[#090a0f] dark:text-[#e8e8e6] font-mono text-xs py-2 px-3 rounded-[3px] transition-colors cursor-pointer"
                >
                    <span>+ Challenge a Friend (1v1)</span>
                </button>
            </div>

            <CreateDuelModal isOpen={isDuelModalOpen} onClose={() => setIsDuelModalOpen(false)} />

            {/* Contest Room Creation Modal */}
            <ContestActionModal
                isOpen={isContestModalOpen}
                onClose={() => setIsContestModalOpen(false)}
            />
        </aside>
    )
}
