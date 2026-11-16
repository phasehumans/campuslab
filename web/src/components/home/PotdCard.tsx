import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, CalendarDays, Check } from 'lucide-react'
import { getPotd } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import { cn, parseUtcDate } from '@/lib/utils'

function formatTimeLeft(ms: number) {
    const totalMinutes = Math.max(0, Math.floor(ms / 60000))
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
}

function formatDate(isoDate: string) {
    const [y, m, d] = isoDate.split('-').map(Number)
    if (!y || !m || !d) return isoDate
    return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        timeZone: 'UTC',
    })
}

export function PotdCard() {
    const { isLoggedIn } = useAuth()
    const queryClient = useQueryClient()
    const [now, setNow] = useState(() => Date.now())

    const potdQuery = useQuery({
        queryKey: ['potd', isLoggedIn],
        queryFn: getPotd,
        staleTime: 60_000,
        refetchInterval: 60_000,
    })

    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 30_000)
        return () => clearInterval(timer)
    }, [])

    const potd = potdQuery.data
    const nextAtMs = parseUtcDate(potd?.nextAt)

    // Roll over to the new problem right after IST midnight
    useEffect(() => {
        if (nextAtMs && now >= nextAtMs) {
            queryClient.invalidateQueries({ queryKey: ['potd'] })
        }
    }, [now, nextAtMs, queryClient])

    if (potdQuery.isLoading) {
        return (
            <div className="border border-[#e2e8f0] dark:border-[#333333] bg-white dark:bg-[#1e1e1e] p-3.5 rounded-[3px] animate-pulse space-y-2.5">
                <div className="h-2.5 w-36 bg-[#e2e8f0] dark:bg-[#282828] rounded-[2px]" />
                <div className="h-4 w-64 max-w-full bg-[#f1f5f9] dark:bg-[#252423] rounded-[2px]" />
                <div className="h-2.5 w-44 bg-[#f1f5f9] dark:bg-[#252423] rounded-[2px]" />
            </div>
        )
    }

    if (!potd) return null

    const { problem } = potd
    const solvedLabel =
        potd.solvedCount === 0
            ? 'Nobody has solved it yet today. Be the first.'
            : `${potd.solvedCount} ${potd.solvedCount === 1 ? 'student has' : 'students have'} solved it today`

    return (
        <div className="relative border border-[#87b2f4]/40 dark:border-[#87b2f4]/30 bg-white dark:bg-[#1e1e1e] p-3.5 rounded-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-[3px] bg-[#87b2f4]" aria-hidden />

            <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wider text-[#64748b] dark:text-[#a09f9d]">
                <span className="flex items-center gap-1.5 font-semibold text-[#3b6fc4] dark:text-[#87b2f4]">
                    <CalendarDays className="h-3 w-3" />
                    Problem of the Day · {formatDate(potd.date)}
                </span>
                {nextAtMs && (
                    <span className="normal-case tracking-normal text-[#94a3b8] dark:text-[#777777]">
                        next in {formatTimeLeft(nextAtMs - now)}
                    </span>
                )}
            </div>

            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 min-w-0">
                        <Link
                            to={`/problem/${problem.id}`}
                            className="text-sm sm:text-[15px] font-semibold text-[#090a0f] dark:text-[#e8e8e6] hover:text-[#87b2f4] dark:hover:text-[#87b2f4] truncate transition-colors"
                        >
                            {problem.title}
                        </Link>
                        <span
                            className={cn(
                                'shrink-0 font-mono text-[11px] font-medium',
                                problem.difficulty === 'Easy' &&
                                    'text-[#10b981] dark:text-[#34d399]',
                                problem.difficulty === 'Medium' &&
                                    'text-[#d97706] dark:text-[#fcd34d]',
                                problem.difficulty === 'Hard' && 'text-rose-500 dark:text-rose-300'
                            )}
                        >
                            {problem.difficulty}
                        </span>
                    </div>
                    <p className="font-mono text-[11px] text-[#52525b] dark:text-[#a09f9d]">
                        {solvedLabel}
                    </p>
                </div>

                {potd.solvedByMe ? (
                    <span className="shrink-0 inline-flex items-center justify-center gap-1.5 font-mono text-xs px-3 py-2 rounded-[3px] border border-emerald-300/60 dark:border-emerald-800/70 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400">
                        <Check className="h-3.5 w-3.5" />
                        Solved today
                    </span>
                ) : (
                    <Link
                        to={`/problem/${problem.id}`}
                        className="shrink-0 inline-flex items-center justify-center gap-1.5 font-mono text-xs font-medium px-3.5 py-2 rounded-[3px] bg-[#87b2f4] hover:bg-[#72a3ed] text-[#141414] transition-colors"
                    >
                        Solve now
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                )}
            </div>
        </div>
    )
}
