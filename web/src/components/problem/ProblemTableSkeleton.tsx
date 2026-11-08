const TITLE_WIDTHS = [52, 70, 44, 65, 38, 58, 48, 76, 42, 62, 50, 68]

interface ProblemTableSkeletonProps {
    rowCount?: number
}

export function ProblemTableSkeleton({ rowCount = 10 }: ProblemTableSkeletonProps) {
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
                        {Array.from({ length: rowCount }).map((_, idx) => {
                            const widthPercent = TITLE_WIDTHS[idx % TITLE_WIDTHS.length]
                            return (
                                <tr key={idx} className="h-11 sm:h-[48px] animate-pulse">
                                    {/* Number # */}
                                    <td className="px-2 sm:px-4 py-2.5 text-center font-mono align-middle">
                                        <div className="h-3 w-5 mx-auto bg-[#e2e8f0] dark:bg-[#282828] rounded-[2px]" />
                                    </td>
                                    {/* Status */}
                                    <td className="px-1.5 sm:px-3 py-2.5 text-center align-middle">
                                        <div className="h-3 w-6 mx-auto bg-[#e2e8f0] dark:bg-[#282828] rounded-[2px]" />
                                    </td>
                                    {/* Problem Title */}
                                    <td className="px-2.5 sm:px-4 py-2.5 align-middle truncate max-w-0">
                                        <div
                                            className="h-3.5 bg-[#e2e8f0] dark:bg-[#282828] rounded-[2px]"
                                            style={{ width: `${widthPercent}%` }}
                                        />
                                    </td>
                                    {/* Topics */}
                                    <td className="px-4 py-2.5 hidden md:table-cell align-middle">
                                        <div className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap">
                                            <div className="h-4 w-14 bg-[#f1f5f9] dark:bg-[#242424] rounded-[2px] border border-[#e2e8f0]/60 dark:border-[#333333]/60" />
                                            <div className="h-4 w-18 bg-[#f1f5f9] dark:bg-[#242424] rounded-[2px] border border-[#e2e8f0]/60 dark:border-[#333333]/60" />
                                            {idx % 2 === 0 && (
                                                <div className="h-4 w-12 bg-[#f1f5f9] dark:bg-[#242424] rounded-[2px] border border-[#e2e8f0]/60 dark:border-[#333333]/60" />
                                            )}
                                        </div>
                                    </td>
                                    {/* Difficulty */}
                                    <td className="px-2 sm:px-4 py-2.5 align-middle text-right sm:text-left">
                                        <div className="h-3 w-12 ml-auto sm:ml-0 bg-[#e2e8f0] dark:bg-[#282828] rounded-[2px]" />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer Skeleton */}
            <div className="border-t border-[#e2e8f0] dark:border-[#333333] bg-[#fcfcfd] dark:bg-[#191919] px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-3 animate-pulse">
                <div className="h-3 w-36 bg-[#e2e8f0] dark:bg-[#282828] rounded-[2px]" />
                <div className="flex items-center gap-1.5">
                    <div className="h-6 w-14 bg-[#f1f5f9] dark:bg-[#252423] border border-[#e2e8f0] dark:border-[#333333] rounded-[2px]" />
                    <div className="h-6 w-6 bg-[#f1f5f9] dark:bg-[#252423] border border-[#e2e8f0] dark:border-[#333333] rounded-[2px]" />
                    <div className="h-6 w-6 bg-[#f1f5f9] dark:bg-[#252423] border border-[#e2e8f0] dark:border-[#333333] rounded-[2px]" />
                    <div className="h-6 w-6 bg-[#f1f5f9] dark:bg-[#252423] border border-[#e2e8f0] dark:border-[#333333] rounded-[2px]" />
                    <div className="h-6 w-14 bg-[#f1f5f9] dark:bg-[#252423] border border-[#e2e8f0] dark:border-[#333333] rounded-[2px]" />
                </div>
            </div>
        </div>
    )
}
