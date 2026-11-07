import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { ProblemSummary } from '@/lib/types'

interface ProblemTableProps {
    problems: ProblemSummary[]
    onProblemClick: (id: string) => void
    startIndex?: number
}

export function ProblemTable({ problems, onProblemClick, startIndex = 1 }: ProblemTableProps) {
    return (
        <div className="border border-[#e2e8f0] dark:border-[#333333] bg-white dark:bg-[#1e1e1e] rounded-[3px] overflow-hidden transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            {/* Scrollable container until all questions end with overscroll-contain */}
            <div className="max-h-[calc(100vh-190px)] min-h-[435px] overflow-y-auto overflow-x-auto overscroll-contain">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10 bg-[#f9fafb] dark:bg-[#191919] border-b border-[#e2e8f0] dark:border-[#333333] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                        <tr className="text-[11px] font-mono uppercase tracking-wider text-[#64748b] dark:text-[#a09f9d]">
                            <th className="px-2.5 sm:px-4 py-2.5 w-10 sm:w-14 text-center">#</th>
                            <th className="px-2 sm:px-4 py-2.5 w-16 sm:w-20 text-center">Status</th>
                            <th className="px-2.5 sm:px-4 py-2.5">Problem Title</th>
                            <th className="px-4 py-2.5 hidden md:table-cell w-[30%]">Topics</th>
                            <th className="px-2.5 sm:px-4 py-2.5 w-20 sm:w-24">Difficulty</th>
                            <th className="px-4 py-2.5 w-20 text-right hidden sm:table-cell">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f2f5] dark:divide-[#272727] text-xs font-sans">
                        {problems.length > 0 ? (
                            problems.map((problem, idx) => {
                                const problemNum = String(startIndex + idx).padStart(2, '0')
                                return (
                                    <tr
                                        key={problem.id}
                                        onClick={() => onProblemClick(problem.id)}
                                        className="hover:bg-[#f9fafb] dark:hover:bg-[#252423] transition-colors group cursor-pointer"
                                    >
                                        <td className="px-2.5 sm:px-4 py-3 text-center font-mono text-[11px] text-[#94a3b8] dark:text-[#a09f9d]">
                                            {problemNum}
                                        </td>
                                        <td className="px-2 sm:px-4 py-3 text-center font-mono text-[11px]">
                                            {problem.status === 'Solved' ? (
                                                <span className="text-[#10b981] font-medium">
                                                    [done]
                                                </span>
                                            ) : problem.status === 'Attempted' ? (
                                                <span className="text-[#f59e0b] font-medium">
                                                    [try]
                                                </span>
                                            ) : (
                                                <span className="text-[#cbd5e1] dark:text-[#333333]">
                                                    [-]
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-2.5 sm:px-4 py-3">
                                            <Link
                                                to={`/problem/${problem.id}`}
                                                onClick={(e) => e.stopPropagation()}
                                                className="font-medium text-[#090a0f] dark:text-[#e8e8e6] group-hover:text-[#87b2f4] group-hover:underline transition-colors"
                                            >
                                                {problem.title}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 hidden md:table-cell">
                                            <div className="flex flex-wrap gap-1">
                                                {problem.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="font-mono text-[10px] px-1.5 py-0.5 rounded-[2px] bg-[#f8fafc] dark:bg-[#252423] border border-[#e2e8f0] dark:border-[#333333] text-[#52525b] dark:text-[#a09f9d]"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {problem.tags.length > 3 && (
                                                    <span className="font-mono text-[10px] text-[#94a3b8] dark:text-[#a09f9d] px-1 py-0.5">
                                                        +{problem.tags.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-2.5 sm:px-4 py-3 font-mono text-[11px]">
                                            <span
                                                className={cn(
                                                    'font-medium',
                                                    problem.difficulty === 'Easy' &&
                                                        'text-[#10b981]',
                                                    problem.difficulty === 'Medium' &&
                                                        'text-[#f59e0b]',
                                                    problem.difficulty === 'Hard' &&
                                                        'text-[#ef4444]'
                                                )}
                                            >
                                                {problem.difficulty}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right hidden sm:table-cell">
                                            <Link
                                                to={`/problem/${problem.id}`}
                                                onClick={(e) => e.stopPropagation()}
                                                className="font-mono text-[11px] text-[#64748b] dark:text-[#a09f9d] group-hover:text-[#090a0f] dark:group-hover:text-white hover:underline"
                                            >
                                                solve &rarr;
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-12 text-center font-mono text-xs text-[#94a3b8] dark:text-[#a09f9d]"
                                >
                                    No problems found matching the criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
