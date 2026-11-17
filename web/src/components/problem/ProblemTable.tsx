import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { cn } from '@/lib/utils'
import { getProblem } from '@/lib/api'
import type { Potd, ProblemSummary } from '@/lib/types'

const STATUS_LABEL: Record<ProblemSummary['status'], string> = {
    Solved: 'Solved',
    Attempted: 'Attempted',
    Unsolved: 'Not started',
}

/** Solid green = solved, half-filled amber = attempted, faint ring = not started. */
function StatusDot({ status }: { status: ProblemSummary['status'] }) {
    return (
        <span
            title={STATUS_LABEL[status]}
            className={cn(
                'inline-block h-2 w-2 rounded-full align-middle',
                status === 'Solved' && 'bg-emerald-400',
                status === 'Attempted' &&
                    'border border-[#f59e0b] dark:border-[#fcd34d] bg-[linear-gradient(90deg,#f59e0b_50%,transparent_50%)] dark:bg-[linear-gradient(90deg,#fcd34d_50%,transparent_50%)]',
                status === 'Unsolved' && 'border border-[#cbd5e1] dark:border-[#3f3f46]'
            )}
        >
            <span className="sr-only">{STATUS_LABEL[status]}</span>
        </span>
    )
}

interface ProblemTableProps {
    problems: ProblemSummary[]
    onProblemClick: (id: string) => void
    startIndex?: number
    footer?: React.ReactNode
    /** Problem of the Day, pinned above question 1 */
    potd?: Potd | null
}

export function ProblemTable({
    problems,
    onProblemClick,
    startIndex = 1,
    footer,
    potd = null,
}: ProblemTableProps) {
    const queryClient = useQueryClient()

    const handlePrefetch = (id: string) => {
        queryClient.prefetchQuery({
            queryKey: ['problem', id],
            queryFn: () => getProblem(id),
            staleTime: 60_000,
        })
    }

    const renderRow = (
        problem: ProblemSummary,
        label: string,
        {
            isPotd = false,
            note,
            key = problem.id,
        }: { isPotd?: boolean; note?: string; key?: string } = {}
    ) => (
        <tr
            key={key}
            onClick={() => onProblemClick(problem.id)}
            onMouseEnter={() => handlePrefetch(problem.id)}
            className="h-11 sm:h-[48px] hover:bg-[#f9fafb] dark:hover:bg-[#252423] transition-colors group cursor-pointer"
        >
            <td
                className={cn(
                    'px-2 sm:px-4 py-2.5 text-center font-mono text-[11px] align-middle',
                    isPotd
                        ? 'text-[#3b6fc4] dark:text-[#87b2f4] font-semibold'
                        : 'text-[#94a3b8] dark:text-[#a09f9d]'
                )}
                title={isPotd ? 'Problem of the Day' : undefined}
            >
                {label}
            </td>
            <td className="px-1.5 sm:px-3 py-2.5 text-center align-middle">
                <StatusDot status={problem.status} />
            </td>
            <td className="px-2.5 sm:px-4 py-2.5 align-middle truncate max-w-0">
                <div className="flex items-baseline gap-2 min-w-0">
                    <Link
                        to={`/problem/${problem.id}`}
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={() => handlePrefetch(problem.id)}
                        className="font-medium text-xs sm:text-[13px] text-[#090a0f] dark:text-[#e8e8e6] group-hover:text-[#87b2f4] group-hover:underline transition-colors block truncate min-w-0"
                    >
                        {problem.title}
                    </Link>
                    {note && (
                        <span className="hidden sm:inline shrink-0 font-mono text-[10px] text-[#94a3b8] dark:text-[#777777]">
                            {note}
                        </span>
                    )}
                </div>
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
                        problem.difficulty === 'Easy' && 'text-emerald-400',
                        problem.difficulty === 'Medium' && 'text-[#fcd34d]',
                        problem.difficulty === 'Hard' && 'text-rose-300'
                    )}
                >
                    {problem.difficulty}
                </span>
            </td>
        </tr>
    )

    const potdRow =
        potd &&
        renderRow(
            {
                ...potd.problem,
                status: potd.solvedByMe ? 'Solved' : 'Unsolved',
                submissionCount: 0,
            },
            '★',
            {
                isPotd: true,
                key: `potd-${potd.problem.id}`,
                note:
                    potd.solvedCount === 0
                        ? 'problem of the day'
                        : `${potd.solvedCount} solved today`,
            }
        )

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
                        {potdRow}
                        {problems.length > 0 ? (
                            problems.map((problem, idx) =>
                                renderRow(problem, String(startIndex + idx).padStart(2, '0'))
                            )
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
