import { ArrowLeft, Play, CloudUpload, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface SolveScreenSkeletonProps {
    backPath?: string
}

export function SolveScreenSkeleton({ backPath = '/' }: SolveScreenSkeletonProps) {
    const navigate = useNavigate()

    return (
        <div className="solve-screen dark flex flex-col h-screen bg-[#141414] text-[#e8e8e6] font-sans overflow-hidden select-none">
            {/* Top Navbar Skeleton (Exact match with SolveScreenNavbar) */}
            <header className="flex items-center justify-between h-12 px-2.5 sm:px-3 bg-[#141414] text-[#e8e8e6] font-mono text-xs border-b border-[#2e2e2e] relative z-30 shrink-0">
                {/* Left: Back button & Title placeholder */}
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <button
                        type="button"
                        onClick={() => navigate(backPath)}
                        className="p-1.5 text-[#a09f9d] hover:text-[#e8e8e6] border border-[#333333] bg-[#252423] hover:bg-[#2f2e2d] rounded-[3px] transition-colors cursor-pointer flex items-center justify-center shrink-0"
                        aria-label="Back to Problem Sheet"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                    </button>
                    <div className="h-3.5 w-36 sm:w-48 bg-[#282828] rounded-[2px] animate-pulse" />
                </div>

                {/* Right: Actions Skeleton (Run & Submit) */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="flex items-center gap-1 sm:gap-1.5 bg-[#252423] text-[#a09f9d] border border-[#333333] px-2.5 sm:px-3.5 py-1.5 rounded-[2px] font-mono text-xs font-medium opacity-80">
                        <Play className="h-3.5 w-3.5 text-[#10b981] fill-[#10b981]" />
                        <span>Run</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-1.5 bg-[#87b2f4] text-[#141414] px-3 sm:px-4 py-1.5 rounded-[2px] font-mono text-xs font-semibold opacity-80">
                        <CloudUpload className="h-3.5 w-3.5" />
                        <span>Submit</span>
                    </div>
                </div>
            </header>

            {/* Mobile View Switcher Tab Bar (Visible only on < 768px, matching SolveScreen.tsx) */}
            <div className="flex md:hidden items-center justify-between px-2.5 py-1.5 bg-[#191919] border-b border-[#333333] font-mono text-xs shrink-0">
                <div className="flex items-center gap-1 bg-[#141414] p-0.5 rounded-[3px] border border-[#333333] w-full">
                    <div className="flex-1 py-1 px-2.5 rounded-[2px] flex items-center justify-center gap-1.5 bg-[#252423] text-white font-medium border border-[#3f3f46]">
                        <FileText className="h-3 w-3 text-[#87b2f4]" />
                        <span>Problem</span>
                    </div>
                    <div className="flex-1 py-1 px-2.5 rounded-[2px] flex items-center justify-center gap-1.5 text-[#a09f9d]">
                        <span className="font-semibold text-emerald-400">&lt;/&gt;</span>
                        <span>Code & Tests</span>
                    </div>
                </div>
            </div>

            {/* Main IDE Workspace: Match padding p-1.5 sm:p-2 and gap-1.5 of SolveScreen */}
            <div className="flex flex-1 min-h-0 overflow-hidden p-1.5 sm:p-2 gap-1.5 bg-[#141414]">
                {/* Left Split Panel: Problem Description Card (100% on mobile, 45% on desktop) */}
                <div className="flex flex-col h-full bg-[#191919] rounded-[3px] border border-[#333333] overflow-hidden w-full md:w-[45%] md:min-w-[280px]">
                    {/* Header Tab Bar */}
                    <div className="flex items-center justify-between bg-[#191919] px-2.5 py-1.5 border-b border-[#333333] font-mono text-xs shrink-0 select-none">
                        <div className="flex items-center gap-1">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] bg-[#252423] text-[#e8e8e6] font-medium border border-[#333333]">
                                <FileText className="h-3.5 w-3.5 text-[#87b2f4]" />
                                <span>Description</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] text-[#888888]">
                                <span>Submissions</span>
                            </div>
                        </div>
                    </div>

                    {/* Description Content Skeleton */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-[#191919] space-y-5 animate-pulse">
                        {/* Title & Metadata row */}
                        <div className="space-y-2 pb-4 border-b border-[#2e2e2e]">
                            <div className="h-6 w-48 sm:w-64 bg-[#282828] rounded-[2px]" />
                            <div className="flex items-center gap-2 pt-1 font-mono text-xs">
                                <div className="h-3.5 w-12 bg-[#282828] rounded-[2px]" />
                                <span className="text-[#444444]">•</span>
                                <div className="h-3.5 w-20 bg-[#242424] rounded-[2px]" />
                                <span className="text-[#444444]">•</span>
                                <div className="h-3.5 w-16 bg-[#242424] rounded-[2px]" />
                            </div>
                        </div>

                        {/* Description Text Lines */}
                        <div className="space-y-2.5">
                            <div className="h-3.5 w-full bg-[#242424] rounded-[2px]" />
                            <div className="h-3.5 w-[92%] bg-[#242424] rounded-[2px]" />
                            <div className="h-3.5 w-[84%] bg-[#242424] rounded-[2px]" />
                            <div className="h-3.5 w-[65%] bg-[#242424] rounded-[2px]" />
                        </div>

                        {/* Example 1 Card Skeleton */}
                        <div className="space-y-2 pt-2">
                            <div className="h-3.5 w-24 bg-[#282828] rounded-[2px]" />
                            <div className="p-3 bg-[#1e1e1e] border border-[#2e2e2e] rounded-[3px] space-y-2 font-mono text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-12 bg-[#282828] rounded-[2px]" />
                                    <div className="h-3 w-28 bg-[#242424] rounded-[2px]" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-14 bg-[#282828] rounded-[2px]" />
                                    <div className="h-3 w-20 bg-[#242424] rounded-[2px]" />
                                </div>
                            </div>
                        </div>

                        {/* Constraints Card Skeleton */}
                        <div className="space-y-2 pt-2">
                            <div className="h-3.5 w-24 bg-[#282828] rounded-[2px]" />
                            <div className="space-y-1.5 pl-2">
                                <div className="h-3 w-40 bg-[#242424] rounded-[2px]" />
                                <div className="h-3 w-32 bg-[#242424] rounded-[2px]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Horizontal Divider (Desktop only, matching SolveScreen) */}
                <div className="hidden md:flex w-1.5 items-center justify-center select-none shrink-0">
                    <div className="h-6 w-0.5 bg-[#333333] rounded-full" />
                </div>

                {/* Right Split Panel: Code Editor (Hidden on mobile when mobileTab is problem, matching SolveScreen) */}
                <div className="hidden md:flex flex-col h-full bg-[#191919] rounded-[3px] border border-[#333333] overflow-hidden flex-1 md:min-w-[320px]">
                    {/* Editor Header Bar */}
                    <div className="h-9 border-b border-[#2e2e2e] bg-[#191919] px-3 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-20 bg-[#222120] border border-[#333333] rounded-[2px] animate-pulse" />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="h-5 w-5 bg-[#222120] border border-[#333333] rounded-[2px] animate-pulse" />
                            <div className="h-5 w-5 bg-[#222120] border border-[#333333] rounded-[2px] animate-pulse" />
                        </div>
                    </div>

                    {/* Editor Body: Monospace code lines with line numbers */}
                    <div className="flex-1 p-4 font-mono text-xs flex gap-4 overflow-hidden bg-[#141414] animate-pulse">
                        {/* Gutter Line Numbers */}
                        <div className="flex flex-col gap-2 select-none text-[#444444] text-right w-6 shrink-0">
                            {Array.from({ length: 14 }).map((_, i) => (
                                <span key={i}>{i + 1}</span>
                            ))}
                        </div>

                        {/* Simulated Code Lines */}
                        <div className="flex-1 flex flex-col gap-2 pt-0.5">
                            <div className="h-3 w-40 bg-[#242424] rounded-[2px]" />
                            <div className="h-3 w-48 bg-[#242424] rounded-[2px]" />
                            <div className="h-3 w-0" />
                            <div className="h-3 w-32 bg-[#282828] rounded-[2px]" />
                            <div className="h-3 w-20 pl-4 bg-[#242424] rounded-[2px]" />
                            <div className="h-3 w-56 pl-8 bg-[#282828] rounded-[2px]" />
                            <div className="h-3 w-44 pl-12 bg-[#242424] rounded-[2px]" />
                            <div className="h-3 w-64 pl-12 bg-[#242424] rounded-[2px]" />
                            <div className="h-3 w-36 pl-12 bg-[#282828] rounded-[2px]" />
                            <div className="h-3 w-24 pl-8 bg-[#242424] rounded-[2px]" />
                            <div className="h-3 w-12 pl-4 bg-[#242424] rounded-[2px]" />
                            <div className="h-3 w-8 bg-[#242424] rounded-[2px]" />
                        </div>
                    </div>

                    {/* Bottom Console / Footer Action Bar Skeleton */}
                    <div className="h-10 border-t border-[#2e2e2e] bg-[#191919] px-3 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-20 bg-[#222120] border border-[#333333] rounded-[2px] animate-pulse" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-16 bg-[#222120] border border-[#333333] rounded-[2px] animate-pulse" />
                            <div className="h-6 w-16 bg-[#87b2f4]/60 rounded-[2px] animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
