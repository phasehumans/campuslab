import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProblemPaginationProps {
    currentPage: number
    totalPages: number
    totalCount: number
    pageSize?: number
    onPageChange: (page: number) => void
    className?: string
}

export const getPageNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 4) {
        return [1, 2, 3, 4, 5, '...', totalPages]
    }

    if (currentPage >= totalPages - 3) {
        return [
            1,
            '...',
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ]
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
}

export function ProblemPagination({
    currentPage,
    totalPages,
    totalCount,
    pageSize = 25,
    onPageChange,
    className,
}: ProblemPaginationProps) {
    if (totalCount === 0) return null

    const startItem = (currentPage - 1) * pageSize + 1
    const endItem = Math.min(currentPage * pageSize, totalCount)

    const pages = getPageNumbers(currentPage, totalPages)

    return (
        <div
            className={cn(
                'flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-2.5 sm:py-3 text-xs font-mono transition-colors',
                className
            )}
        >
            {/* Left: Summary (no per-page select, fixed at 25) */}
            <div className="text-[#64748b] dark:text-[#a09f9d]">
                Showing{' '}
                <span className="font-semibold text-[#090a0f] dark:text-[#e8e8e6]">
                    {startItem}
                </span>
                –<span className="font-semibold text-[#090a0f] dark:text-[#e8e8e6]">{endItem}</span>{' '}
                of{' '}
                <span className="font-semibold text-[#090a0f] dark:text-[#e8e8e6]">
                    {totalCount}
                </span>{' '}
                problems
            </div>

            {/* Right: Page Navigation Controls */}
            <div className="flex items-center gap-1.5 shrink-0">
                {/* Prev Button */}
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className={cn(
                        'flex items-center gap-1 h-7 px-2 rounded-[2px] border text-xs font-mono transition-colors select-none',
                        currentPage <= 1
                            ? 'opacity-30 cursor-not-allowed border-[#e2e8f0] dark:border-[#333333] text-[#94a3b8] dark:text-[#666666]'
                            : 'border-[#e2e8f0] dark:border-[#333333] text-[#52525b] dark:text-[#a09f9d] hover:bg-[#f1f5f9] dark:hover:bg-[#252423] hover:text-[#090a0f] dark:hover:text-white cursor-pointer'
                    )}
                    aria-label="Previous page"
                >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Prev</span>
                </button>

                {/* Mobile compact page indicator */}
                <span className="sm:hidden text-xs text-[#52525b] dark:text-[#a09f9d] px-2 select-none">
                    Page <strong className="text-[#090a0f] dark:text-[#e8e8e6]">{currentPage}</strong> of{' '}
                    {totalPages}
                </span>

                {/* Page Number Pills (Desktop & Tablet) */}
                <div className="hidden sm:flex items-center gap-1.5">
                    {pages.map((p, idx) => {
                        if (typeof p === 'string') {
                            return (
                                <span
                                    key={`ellipsis-${idx}`}
                                    className="px-1 text-[#94a3b8] dark:text-[#666666] select-none font-mono text-xs"
                                >
                                    ...
                                </span>
                            )
                        }

                        const isCurrent = p === currentPage
                        return (
                            <button
                                key={p}
                                type="button"
                                onClick={() => onPageChange(p)}
                                className={cn(
                                    'h-7 min-w-7 px-2 flex items-center justify-center rounded-[2px] border text-xs font-mono transition-colors select-none cursor-pointer',
                                    isCurrent
                                        ? 'bg-[#090a0f] text-white dark:bg-[#e8e8e6] dark:text-[#121212] font-semibold border-[#090a0f] dark:border-[#e8e8e6] shadow-xs'
                                        : 'border-[#e2e8f0] dark:border-[#333333] text-[#52525b] dark:text-[#a09f9d] hover:bg-[#f1f5f9] dark:hover:bg-[#252423] hover:text-[#090a0f] dark:hover:text-white'
                                )}
                                aria-current={isCurrent ? 'page' : undefined}
                            >
                                {p}
                            </button>
                        )
                    })}
                </div>

                {/* Next Button */}
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className={cn(
                        'flex items-center gap-1 h-7 px-2 rounded-[2px] border text-xs font-mono transition-colors select-none font-medium',
                        currentPage >= totalPages
                            ? 'opacity-30 cursor-not-allowed border-[#e2e8f0] dark:border-[#333333] text-[#94a3b8] dark:text-[#666666]'
                            : 'border-[#e2e8f0] dark:border-[#333333] bg-[#090a0f]/5 dark:bg-white/5 text-[#090a0f] dark:text-[#e8e8e6] hover:bg-[#090a0f]/10 dark:hover:bg-white/10 cursor-pointer'
                    )}
                    aria-label="Next page"
                >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    )
}
