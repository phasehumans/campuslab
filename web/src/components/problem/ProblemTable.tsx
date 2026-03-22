import React from 'react'
import { CheckCircle2, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Problem {
    id: number
    title: string
    difficulty: string
    status: string
    topics: string[]
}

interface ProblemTableProps {
    problems: Problem[]
    onProblemClick: (id: number) => void
}

export function ProblemTable({ problems, onProblemClick }: ProblemTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
                <thead>
                    <tr className="border-b border-white/10 text-gray-500">
                        <th className="px-4 py-3 font-medium w-16 text-center">Status</th>
                        <th className="px-4 py-3 font-medium">Title</th>
                        <th className="px-4 py-3 font-medium w-[40%]">Topics</th>
                        <th className="px-4 py-3 font-medium w-32">Difficulty</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {problems.length > 0 ? (
                        problems.map((problem) => (
                            <tr
                                key={problem.id}
                                onClick={() => onProblemClick(problem.id)}
                                className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                            >
                                <td className="px-4 py-4 text-center">
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
                                            className="h-[18px] w-[18px] text-white/10 mx-auto"
                                            strokeWidth={2}
                                        />
                                    )}
                                </td>
                                <td className="px-4 py-4">
                                    <span className="text-gray-500 mr-3">{problem.id}.</span>
                                    <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                                        {problem.title}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-wrap gap-1.5">
                                        {problem.topics.map((t) => (
                                            <span
                                                key={t}
                                                className="px-2 py-1 text-[11px] rounded-md bg-[#262626] text-gray-400 whitespace-nowrap"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <span
                                        className={cn(
                                            'font-medium text-xs',
                                            problem.difficulty === 'Easy' && 'text-emerald-500',
                                            problem.difficulty === 'Medium' && 'text-yellow-500',
                                            problem.difficulty === 'Hard' && 'text-red-500'
                                        )}
                                    >
                                        {problem.difficulty}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-4 py-12 text-center text-gray-500">
                                No problems found matching your criteria.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
