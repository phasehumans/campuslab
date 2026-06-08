import React from 'react'
import { CheckCircle2, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProblemSummary } from '@/lib/types'

interface ProblemTableProps {
    problems: ProblemSummary[]
    onProblemClick: (id: string) => void
}

export function ProblemTable({ problems, onProblemClick }: ProblemTableProps) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.03)]">
            <table className="w-full text-left text-sm border-collapse">
                <thead>
                    <tr className="border-b border-slate-100 text-slate-400 bg-slate-50/50">
                        <th className="px-5 py-3.5 font-bold w-16 text-center">Status</th>
                        <th className="px-5 py-3.5 font-bold">Title</th>
                        <th className="px-5 py-3.5 font-bold w-[40%]">Topics</th>
                        <th className="px-5 py-3.5 font-bold w-32">Difficulty</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {problems.length > 0 ? (
                        problems.map((problem) => (
                            <tr
                                key={problem.id}
                                onClick={() => onProblemClick(problem.id)}
                                className="hover:bg-slate-50/60 transition-all duration-200 group cursor-pointer"
                            >
                                <td className="px-5 py-4 text-center">
                                    {problem.status === 'Solved' ? (
                                        <CheckCircle2
                                            className="h-[18px] w-[18px] text-emerald-500 mx-auto"
                                            strokeWidth={2}
                                        />
                                    ) : problem.status === 'Attempted' ? (
                                        <Circle
                                            className="h-[18px] w-[18px] text-orange-500 mx-auto"
                                            strokeWidth={2}
                                        />
                                    ) : (
                                        <Circle
                                            className="h-[18px] w-[18px] text-slate-200 mx-auto"
                                            strokeWidth={2}
                                        />
                                    )}
                                </td>
                                <td className="px-5 py-4">
                                    <span className="font-semibold text-slate-700 group-hover:text-[#3E6FC3] transition-colors">
                                        {problem.title}
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex flex-wrap gap-1.5">
                                        {problem.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 text-[11px] rounded-md bg-slate-50 text-slate-600 border border-slate-100/80 whitespace-nowrap font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <span
                                        className={cn(
                                            'font-semibold text-xs px-2.5 py-0.5 rounded-full inline-block text-center w-18 border',
                                            problem.difficulty === 'Easy' &&
                                                'text-emerald-700 bg-emerald-50 border-emerald-100',
                                            problem.difficulty === 'Medium' &&
                                                'text-amber-700 bg-amber-50 border-amber-100',
                                            problem.difficulty === 'Hard' &&
                                                'text-rose-700 bg-rose-50 border-rose-100'
                                        )}
                                    >
                                        {problem.difficulty}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-5 py-12 text-center text-slate-400">
                                No problems found matching your criteria.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
