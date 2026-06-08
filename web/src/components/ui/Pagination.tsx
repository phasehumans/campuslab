import { cn } from '@/lib/utils'

interface PaginationProps {
    currentPage: number
    totalPages: number
    indexOfFirstItem: number
    indexOfLastItem: number
    totalItems: number
    setCurrentPage: (page: number | ((p: number) => number)) => void
}

export function Pagination({
    currentPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    totalItems,
    setCurrentPage,
}: PaginationProps) {
    if (totalItems === 0) return null

    return (
        <div className="flex items-center justify-between text-sm text-slate-500 mt-6 px-4">
            <span>
                Showing <span className="font-semibold text-slate-700">{indexOfFirstItem + 1}</span>{' '}
                to{' '}
                <span className="font-semibold text-slate-700">
                    {Math.min(indexOfLastItem, totalItems)}
                </span>{' '}
                of <span className="font-semibold text-slate-700">{totalItems}</span> questions
            </span>
            <div className="flex gap-2">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg border border-slate-200/60 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-30 disabled:hover:bg-white disabled:cursor-not-allowed transition-all text-xs font-semibold"
                >
                    Previous
                </button>
                <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={cn(
                                'h-8 w-8 rounded-lg flex items-center justify-center transition-all text-xs border border-transparent',
                                currentPage === i + 1
                                    ? 'bg-[#EBF3FC] text-[#3E6FC3] border-[#D5E6FA] font-bold'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            )}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-slate-200/60 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-30 disabled:hover:bg-white disabled:cursor-not-allowed transition-all text-xs font-semibold"
                >
                    Next
                </button>
            </div>
        </div>
    )
}
