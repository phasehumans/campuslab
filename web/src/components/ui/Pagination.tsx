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
        <div className="flex items-center justify-between text-sm text-gray-500 mt-6 px-4">
            <span>
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of{' '}
                {totalItems} questions
            </span>
            <div className="flex gap-2">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg hover:bg-white/5 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                    Previous
                </button>
                <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={cn(
                                'h-8 w-8 rounded-lg flex items-center justify-center transition-colors',
                                currentPage === i + 1
                                    ? 'bg-white/10 text-white'
                                    : 'hover:bg-white/5'
                            )}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg hover:bg-white/5 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    )
}
