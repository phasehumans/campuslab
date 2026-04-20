import React from 'react'
import { Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ContestLeaderboardEntry } from '@/lib/types'

interface LeaderboardProps {
    entries: ContestLeaderboardEntry[]
}

export function Leaderboard({ entries }: LeaderboardProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-lg font-medium text-white tracking-tight flex items-center gap-2">
                <Trophy className="h-5 w-5 text-gray-400" /> Leaderboard
            </h2>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-2">
                <div className="space-y-1">
                    {entries.map((entry) => (
                        <div
                            key={entry.userId}
                            className={cn(
                                'flex items-center justify-between p-3.5 rounded-xl transition-colors',
                                entry.isYou
                                    ? 'bg-white/5 border border-white/10'
                                    : 'hover:bg-white/[0.02] border border-transparent'
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <span
                                    className={cn(
                                        'font-mono text-sm w-4 text-center',
                                        entry.rank === 1
                                            ? 'text-yellow-500 font-bold'
                                            : entry.rank === 2
                                              ? 'text-gray-300 font-bold'
                                              : entry.rank === 3
                                                ? 'text-amber-600 font-bold'
                                                : 'text-gray-600'
                                    )}
                                >
                                    {entry.rank}
                                </span>
                                <div className="flex flex-col">
                                    <span
                                        className={cn(
                                            'text-sm font-medium',
                                            entry.isYou ? 'text-white' : 'text-gray-300'
                                        )}
                                    >
                                        {entry.isYou ? 'You' : entry.name}
                                    </span>
                                    <span className="text-[11px] text-gray-500">{entry.prn}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                <span className="text-gray-500 text-xs">
                                    {entry.solved} solved
                                </span>
                                <span className="font-mono text-white w-8 text-right">
                                    {entry.score}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
