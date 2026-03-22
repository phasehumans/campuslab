import React from 'react'
import { Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOCK_LEADERBOARD } from '@/data/contest'

export function Leaderboard() {
    return (
        <div className="space-y-6">
            <h2 className="text-lg font-medium text-white tracking-tight flex items-center gap-2">
                <Trophy className="h-5 w-5 text-gray-400" /> Leaderboard
            </h2>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-2">
                <div className="space-y-1">
                    {MOCK_LEADERBOARD.map((user) => (
                        <div
                            key={user.rank}
                            className={cn(
                                'flex items-center justify-between p-3.5 rounded-xl transition-colors',
                                user.name === 'You'
                                    ? 'bg-white/5 border border-white/10'
                                    : 'hover:bg-white/[0.02] border border-transparent'
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <span
                                    className={cn(
                                        'font-mono text-sm w-4 text-center',
                                        user.rank === 1
                                            ? 'text-yellow-500 font-bold'
                                            : user.rank === 2
                                              ? 'text-gray-300 font-bold'
                                              : user.rank === 3
                                                ? 'text-amber-600 font-bold'
                                                : 'text-gray-600'
                                    )}
                                >
                                    {user.rank}
                                </span>
                                <span
                                    className={cn(
                                        'text-sm font-medium',
                                        user.name === 'You' ? 'text-white' : 'text-gray-300'
                                    )}
                                >
                                    {user.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                <span className="text-gray-500 text-xs">{user.solved} solved</span>
                                <span className="font-mono text-white w-8 text-right">
                                    {user.score}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
