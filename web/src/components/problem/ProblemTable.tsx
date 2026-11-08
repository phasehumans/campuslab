import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { cn } from '@/lib/utils'
import { getProblem } from '@/lib/api'
import type { ProblemSummary } from '@/lib/types'

interface ProblemTableProps {
    problems: ProblemSummary[]
    onProblemClick: (id: string) => void
    startIndex?: number
    footer?: React.ReactNode
}

export function ProblemTable({
    problems,
    onProblemClick,
    startIndex = 1,
    footer,
}: ProblemTableProps) {
    const queryClient = useQueryClient()

    const handlePrefetch = (id: string) => {
        queryClient.prefetchQuery({
            queryKey: ['problem', id],
            queryFn: () => getProblem(id),
            staleTime: 60_000,
        })
    }

    return (
        <div className="border border-[#e2e8f0] dark:border-[#333333] bg-white dark:bg-[#1e1e1e] rounded-[3px] overflow-hidden transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] w-full">
            <div className="w-full overflow-x-hidden sm:overflow-x-auto">
                <table className="w-full text-left border-collapse table-fixed">
                    <thead className="sticky top-0 z-10 bg-[#f9fafb] dark:bg-[#191919] border-b border-[#e2e8f0] dark:border-[#333333] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                        <tr className="h-9 sm:h-10 text-[11px] font-mono uppercase tracking-wider text-[#64748b] dark:text-[#a09f9d]">
                            <th className="px-2 sm:px-4 py-2 w-9 sm:w-14 text-center">#</th>
                            <th className="px-1.5 sm:px-3 py-2 w-12 sm:w-20 text-center">Status</th>
                            <th className="px-2.5 sm:px-4 py-2">Problem Title</th>
                            <th className="px-4 py-2 hidden md:table-cell w-[30%]">Topics</th>
                            <th className="px-2 sm:px-4 py-2 w-18 sm:w-24 text-right sm:text-left">
                                Difficulty
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
                                        onMouseEnter={() => handlePrefetch(problem.id)}
                                        className="h-11 sm:h-[48px] hover:bg-[#f9fafb] dark:hover:bg-[#252423] transition-colors group cursor-pointer"
                                    >
                                        <td className="px-2 sm:px-4 py-2.5 text-center font-mono text-[11px] text-[#94a3b8] dark:text-[#a09f9d] align-middle">
                                            {problemNum}
                                        </td>
                                        <td className="px-1.5 sm:px-3 py-2.5 text-center font-mono text-[11px] align-middle">
                                            {problem.status === 'Solved' ? (
                                                <span className="text-[#34d399] font-medium">
                                                    [done]
                                                </span>
                                            ) : problem.status === 'Attempted' ? (
                                                <span className="text-[#fcd34d] font-medium">
                                                    [try]
                                                </span>
                                            ) : (
                                                <span className="text-[#cbd5e1] dark:text-[#333333]">
                                                    [-]
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-2.5 sm:px-4 py-2.5 align-middle truncate max-w-0">
                                            <Link
                                                to={`/problem/${problem.id}`}
                                                onClick={(e) => e.stopPropagation()}
                                                onMouseEnter={() => handlePrefetch(problem.id)}
                                                className="font-medium text-xs sm:text-[13px] text-[#090a0f] dark:text-[#e8e8e6] group-hover:text-[#87b2f4] group-hover:underline transition-colors block truncate"
                                            >
                                                {problem.title}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2.5 hidden md:table-cell align-middle">
                                            <div className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap">
                                                {problem.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="font-mono text-[10px] px-1.5 py-0.5 rounded-[2px] bg-[#f8fafc] dark:bg-[#252423] border border-[#e2e8f0] dark:border-[#333333] text-[#52525b] dark:text-[#a09f9d] truncate max-w-[120px]"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {problem.tags.length > 3 && (
                                                    <span className="font-mono text-[10px] text-[#94a3b8] dark:text-[#a09f9d] px-1 shrink-0">
                                                        +{problem.tags.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-2 sm:px-4 py-2.5 font-mono text-[11px] align-middle text-right sm:text-left">
                                            <span
                                                className={cn(
                                                    'font-medium',
                                                    problem.difficulty === 'Easy' &&
                                                        'text-[#34d399]',
                                                    problem.difficulty === 'Medium' &&
                                                        'text-[#fcd34d]',
                                                    problem.difficulty === 'Hard' && 'text-rose-300'
                                                )}
                                            >
                                                {problem.difficulty}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-12 text-center font-mono text-xs text-[#94a3b8] dark:text-[#a09f9d]"
                                >
                                    No problems found matching the criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {footer && (
                <div className="border-t border-[#e2e8f0] dark:border-[#333333] bg-[#fcfcfd] dark:bg-[#191919]">
                    {footer}
                </div>
            )}
        </div>
    )
}
