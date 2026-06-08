import React from 'react'
import { Code2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProfileResponse } from '@/lib/types'

interface StatsGridProps {
    stats: ProfileResponse['stats']
}

const colorMap = {
    Easy: 'bg-emerald-500',
    Medium: 'bg-amber-500',
    Hard: 'bg-rose-500',
} as const

const textColorMap = {
    Easy: 'text-emerald-600',
    Medium: 'text-amber-600',
    Hard: 'text-rose-600',
} as const

export function StatsGrid({ stats }: StatsGridProps) {
    const totalProblems = stats.byDifficulty.reduce((acc, curr) => acc + curr.total, 0)
    const totalPercent = totalProblems === 0 ? 0 : Math.round((stats.totalSolved / totalProblems) * 100)

    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.03)]">
            <h3 className="text-base font-bold text-slate-800 tracking-tight mb-6 flex items-center gap-2">
                <Code2 className="h-4 w-4 text-slate-400" /> Solved Problems
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-10">
                {/* High Fidelity LeetCode Style SVG Radial Ring */}
                <div className="relative h-28 w-28 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        {/* Background track */}
                        <circle
                            className="text-slate-100"
                            strokeWidth="3"
                            stroke="currentColor"
                            fill="none"
                            cx="18"
                            cy="18"
                            r="15.915"
                        />
                        {/* Solved progress ring */}
                        <circle
                            className="text-[#3E6FC3] transition-all duration-500"
                            strokeWidth="3"
                            strokeDasharray={`${totalPercent}, 100`}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            cx="18"
                            cy="18"
                            r="15.915"
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-extrabold text-slate-800 tracking-tight leading-none">
                            {stats.totalSolved}
                        </span>
                        <div className="h-px w-8 bg-slate-200 my-1" />
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            {totalProblems}
                        </span>
                    </div>
                </div>

                {/* Stacked LeetCode style bars */}
                <div className="flex-1 w-full space-y-4">
                    {stats.byDifficulty.map((stat) => {
                        const percent = stat.total === 0 ? 0 : Math.round((stat.value / stat.total) * 100)
                        return (
                            <div key={stat.name} className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className={cn('font-bold', textColorMap[stat.name])}>
                                        {stat.name}
                                    </span>
                                    <span className="font-bold text-slate-800">
                                        {stat.value}{' '}
                                        <span className="text-slate-400 font-normal">
                                            / {stat.total}
                                        </span>
                                        <span className="text-slate-400 font-normal text-[10px] ml-2">
                                            ({percent}%)
                                        </span>
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={cn('h-full rounded-full transition-all duration-500', colorMap[stat.name])}
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
