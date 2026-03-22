import React from 'react'
import { Code2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { statsData } from '@/data/profile'

export function StatsGrid() {
    const totalSolved = statsData.reduce((acc, curr) => acc + curr.value, 0)

    return (
        <div className="rounded-2xl border border-white/10 bg-[#161616] p-6 shadow-xl">
            <h3 className="text-base font-medium text-white tracking-tight mb-6 flex items-center gap-2">
                <Code2 className="h-4 w-4 text-gray-400" /> Questions Solved
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="relative h-32 w-32 shrink-0 flex items-center justify-center rounded-full border-4 border-white/5">
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-white tracking-tight">
                            {totalSolved}
                        </span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                            Solved
                        </span>
                    </div>
                </div>

                <div className="flex-1 w-full space-y-5">
                    {statsData.map((stat) => (
                        <div key={stat.name} className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-400 font-medium">{stat.name}</span>
                                <span className="font-medium text-white">
                                    {stat.value}{' '}
                                    <span className="text-gray-600 font-normal">
                                        / {stat.total}
                                    </span>
                                </span>
                            </div>
                            <div className="h-1.5 w-full bg-[#1A1A1A] rounded-full overflow-hidden">
                                <div
                                    className={cn('h-full rounded-full', stat.bg)}
                                    style={{ width: `${(stat.value / stat.total) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
