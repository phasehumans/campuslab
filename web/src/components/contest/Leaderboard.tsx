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
            <h2 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
                <Trophy className="h-5 w-5 text-slate-400" /> Leaderboard
            </h2>
            <div className="bg-white border border-slate-100 rounded-2xl p-2 shadow-[0_12px_40px_rgba(0,0,0,0.03)]">
                <div className="space-y-1">
                    {entries.map((entry) => (
                        <div
                            key={entry.userId}
                            className={cn(
                                'flex items-center justify-between p-3.5 rounded-xl transition-all border',
                                entry.isYou
                                    ? 'bg-[#EBF3FC] border-[#D5E6FA] shadow-[0_2px_12px_rgba(62,111,195,0.04)]'
                                    : 'hover:bg-slate-50 border-transparent'
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <span
                                    className={cn(
                                        'font-mono text-sm w-4 text-center',
                                        entry.rank === 1
                                            ? 'text-yellow-600 font-bold'
                                            : entry.rank === 2
                                              ? 'text-slate-400 font-bold'
                                              : entry.rank === 3
                                                ? 'text-amber-700 font-bold'
                                                : 'text-slate-500'
                                    )}
                                >
                                    {entry.rank}
                                </span>
                                <div className="flex flex-col">
                                    <span
                                        className={cn(
                                            'text-sm font-semibold',
                                            entry.isYou ? 'text-[#3E6FC3]' : 'text-slate-700'
                                        )}
                                    >
                                        {entry.isYou ? 'You' : entry.name}
                                    </span>
                                    <span className="text-[11px] text-slate-400 font-medium">{entry.prn}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                <span className="text-slate-400 text-xs font-medium">
                                    {entry.solved} solved
                                </span>
                                <span className="font-mono text-slate-800 w-8 text-right font-bold">
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
