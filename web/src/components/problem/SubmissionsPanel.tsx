import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import confetti from 'canvas-confetti'
import {
    CheckCircle2,
    XCircle,
    Clock,
    AlertTriangle,
    AlertOctagon,
    Lock,
    Loader2,
    Code2,
    Copy,
    Check,
    ChevronDown,
    ChevronRight,
    RotateCw,
} from 'lucide-react'
import { cn, formatDuration, formatRelativeTime } from '@/lib/utils'
import { getProblemSubmissions, getSubmissionById } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import type { ExecutionResponse, SubmissionDetail, SubmissionItem } from '@/lib/types'

interface SubmissionsPanelProps {
    problemId: string
    sampleCount: number
    totalTestcases: number
    isLoading: boolean
    latestExecution: ExecutionResponse | null
    latestSubmission?: SubmissionItem | null
    submissionMessage?: string | null
    onSubmitAgain?: () => void
}

export function SubmissionsPanel({
    problemId,
    sampleCount,
    totalTestcases = 30,
    isLoading,
    latestExecution,
    latestSubmission,
    submissionMessage,
}: SubmissionsPanelProps) {
    const { isLoggedIn, openModal } = useAuth()
    const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null)
    const [expandedCodeId, setExpandedCodeId] = useState<string | null>(null)
    const [copiedCode, setCopiedCode] = useState(false)

    // Submissions history query
    const {
        data: history = [],
        isLoading: historyLoading,
        refetch: refetchHistory,
    } = useQuery<SubmissionItem[]>({
        queryKey: ['problem-submissions', problemId],
        queryFn: () => getProblemSubmissions(problemId),
        enabled: Boolean(problemId && isLoggedIn),
    })

    // Selected submission detail query (for viewing code)
    const { data: expandedDetail, isLoading: detailLoading } = useQuery<SubmissionDetail | null>({
        queryKey: ['submission-detail', expandedCodeId],
        queryFn: () => (expandedCodeId ? getSubmissionById(expandedCodeId) : null),
        enabled: Boolean(expandedCodeId),
    })

    // Fire celebratory confetti from both bottom corners when latest submission is Accepted
    useEffect(() => {
        if (!latestExecution?.allPassed) return

        const colors = ['#34d399', '#87b2f4', '#fcd34d', '#fda4af', '#ffffff']

        const fireDualConfetti = () => {
            try {
                // Lower-left cannon (aimed inward at 60°)
                confetti({
                    particleCount: 55,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.95 },
                    colors,
                    zIndex: 1000,
                })

                // Lower-right cannon (aimed inward at 120°)
                confetti({
                    particleCount: 55,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.95 },
                    colors,
                    zIndex: 1000,
                })
            } catch {
                // Ignore if canvas-confetti fails in test environment
            }
        }

        fireDualConfetti()
        const timer = setTimeout(fireDualConfetti, 250)
        return () => clearTimeout(timer)
    }, [latestExecution])

    const handleCopyCode = (code: string) => {
        if (!code) return
        navigator.clipboard.writeText(code)
        setCopiedCode(true)
        setTimeout(() => setCopiedCode(false), 2000)
    }

    const toggleExpandCode = (subId: string) => {
        if (expandedCodeId === subId) {
            setExpandedCodeId(null)
        } else {
            setExpandedCodeId(subId)
            setSelectedHistoryId(subId)
        }
    }

    // Determine verdict details for latest execution
    const compileErrorItem = latestExecution?.results.find(
        (item) => item.status === 'Compilation Error' || Boolean(item.compileOutput)
    )
    const failedItem = latestExecution?.results.find((item) => !item.passed)
    const passedCount = latestExecution?.results.filter((item) => item.passed).length ?? 0

    let verdictStatus = 'Accepted'
    let verdictIcon = <CheckCircle2 className="h-5 w-5 text-emerald-400" />
    let verdictColor = 'text-emerald-400'
    let isCodeforcesHidden = false
    let failedTestNum = 1

    if (compileErrorItem || latestExecution?.results.some((r) => r.compileOutput)) {
        verdictStatus = 'Compilation Error'
        verdictIcon = <AlertOctagon className="h-5 w-5 text-amber-200" />
        verdictColor = 'text-amber-200'
    } else if (latestExecution?.allPassed) {
        verdictStatus = 'Accepted'
        verdictIcon = <CheckCircle2 className="h-5 w-5 text-emerald-400" />
        verdictColor = 'text-emerald-400'
    } else if (failedItem) {
        failedTestNum =
            failedItem.testcase < 1 ? failedItem.testcase + 1 : failedItem.testcase
        const rawStatus = failedItem.status || 'Wrong Answer'

        // Check if failed on a system (hidden) testcase beyond the public examples
        isCodeforcesHidden = failedTestNum > Math.max(sampleCount, 1)

        if (rawStatus === 'Time Limit Exceeded') {
            verdictStatus = `Time Limit Exceeded on test ${failedTestNum}`
            verdictIcon = <Clock className="h-5 w-5 text-amber-200" />
            verdictColor = 'text-amber-200'
        } else if (rawStatus === 'Runtime Error') {
            verdictStatus = `Runtime Error on test ${failedTestNum}`
            verdictIcon = <AlertTriangle className="h-5 w-5 text-rose-300" />
            verdictColor = 'text-rose-300'
        } else {
            verdictStatus = `Wrong Answer on test ${failedTestNum}`
            verdictIcon = <XCircle className="h-5 w-5 text-rose-300" />
            verdictColor = 'text-rose-300'
        }
    }

    const effectiveTotal = latestExecution?.allPassed
        ? Math.max(totalTestcases, latestExecution.results.length)
        : Math.max(totalTestcases, latestExecution?.results.length ?? 0, 30)
    const effectivePassed = latestExecution?.allPassed ? effectiveTotal : passedCount

    const maxTime = latestExecution?.results.reduce((max, r) => (r.time ? r.time : max), '') || ''
    const maxMemory =
        latestExecution?.results.reduce((max, r) => (r.memory ? r.memory : max), '') || ''

    return (
        <div className="space-y-6 font-sans text-xs text-[#a09f9d] pb-8">
            {/* ------------------------------------------------------------- */}
            {/* LATEST SUBMISSION EVALUATION CARD                             */}
            {/* ------------------------------------------------------------- */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-mono text-[#888888] font-semibold">
                        Latest Submission
                    </span>
                    {latestExecution && (
                        <span className="text-[10px] font-mono text-[#666666]">
                            Evaluated against system tests
                        </span>
                    )}
                </div>

                {isLoading ? (
                    <div className="rounded-[4px] border border-[#2a2a2a] bg-[#161616] p-5 font-mono text-xs flex flex-col items-center justify-center gap-3 text-center min-h-[140px]">
                        <Loader2 className="h-6 w-6 animate-spin text-[#87b2f4]" />
                        <div className="space-y-1">
                            <p className="text-[#e8e8e6] font-medium">
                                Running code against system testcases...
                            </p>
                            <p className="text-[11px] text-[#777777]">
                                Sandboxed isolate execution in progress
                            </p>
                        </div>
                    </div>
                ) : latestExecution ? (
                    <div className="rounded-[4px] border border-[#2e2e2e] bg-[#161616] p-4 font-mono space-y-4">
                        {/* Status Header */}
                        <div className="flex items-start justify-between gap-3 border-b border-[#262626] pb-3">
                            <div className="flex items-center gap-2.5">
                                {verdictIcon}
                                <div>
                                    <div className={cn('text-sm font-semibold tracking-tight', verdictColor)}>
                                        {verdictStatus}
                                    </div>
                                    <div className="text-[11px] text-[#888888] mt-0.5">
                                        Passed:{' '}
                                        <strong className={verdictColor}>
                                            {effectivePassed} / {effectiveTotal}
                                        </strong>{' '}
                                        testcases
                                    </div>
                                </div>
                            </div>

                            {submissionMessage && (
                                <div className="text-[10px] px-2 py-0.5 rounded-[2px] bg-[#222222] text-[#888888] border border-[#333333]">
                                    {submissionMessage}
                                </div>
                            )}
                        </div>

                        {/* Metric chips */}
                        <div
                            className={cn(
                                'grid gap-2',
                                latestSubmission?.userSolveTime != null
                                    ? 'grid-cols-2 sm:grid-cols-4'
                                    : 'grid-cols-3'
                            )}
                        >
                            <div className="bg-[#121212] border border-[#262626] rounded-[3px] p-2 text-center">
                                <div className="text-[10px] uppercase text-[#777777] mb-0.5">Runtime</div>
                                <div className="text-xs font-semibold text-[#e8e8e6]">
                                    {maxTime || '—'}
                                </div>
                            </div>
                            {latestSubmission?.userSolveTime != null && (
                                <div className="bg-[#121212] border border-[#262626] rounded-[3px] p-2 text-center">
                                    <div className="text-[10px] uppercase text-[#777777] mb-0.5">Solve Time</div>
                                    <div className="text-xs font-semibold text-[#87b2f4]">
                                        {formatDuration(latestSubmission.userSolveTime)}
                                    </div>
                                </div>
                            )}
                            <div className="bg-[#121212] border border-[#262626] rounded-[3px] p-2 text-center">
                                <div className="text-[10px] uppercase text-[#777777] mb-0.5">Memory</div>
                                <div className="text-xs font-semibold text-[#e8e8e6]">
                                    {maxMemory || '—'}
                                </div>
                            </div>
                            <div className="bg-[#121212] border border-[#262626] rounded-[3px] p-2 text-center">
                                <div className="text-[10px] uppercase text-[#777777] mb-0.5">Language</div>
                                <div className="text-xs font-semibold text-[#e8e8e6] truncate">
                                    {latestExecution.language || 'C++ (GCC 13)'}
                                </div>
                            </div>
                        </div>

                        {/* Compilation Error Output */}
                        {compileErrorItem?.compileOutput && (
                            <div className="space-y-1.5 pt-1">
                                <div className="text-[10px] uppercase tracking-wider text-amber-200 font-medium">
                                    Compilation Output
                                </div>
                                <pre className="whitespace-pre-wrap rounded-[3px] bg-[#0f0f0f] border border-[#2a2a2a] p-3 text-xs text-amber-100/90 overflow-x-auto max-h-56 select-text leading-relaxed">
                                    {compileErrorItem.compileOutput}
                                </pre>
                            </div>
                        )}

                        {/* Runtime Error Stderr */}
                        {failedItem?.stderr && !compileErrorItem && (
                            <div className="space-y-1.5 pt-1">
                                <div className="text-[10px] uppercase tracking-wider text-rose-300 font-medium">
                                    Runtime Error Diagnostics
                                </div>
                                <pre className="whitespace-pre-wrap rounded-[3px] bg-[#0f0f0f] border border-[#2a2a2a] p-3 text-xs text-rose-200/80 overflow-x-auto max-h-48 select-text leading-relaxed">
                                    {failedItem.stderr}
                                </pre>
                            </div>
                        )}

                        {/* Testcase Failure Details (Codeforces Style) */}
                        {failedItem && !compileErrorItem && (
                            <div className="space-y-3 pt-1">
                                {isCodeforcesHidden ? (
                                    /* Hidden System Testcase (Codeforces Style) */
                                    <div className="rounded-[3px] border border-[#2a2a2a] bg-[#121212] p-3.5 space-y-2">
                                        <div className="flex items-center gap-2 text-xs text-[#e8e8e6] font-medium">
                                            <Lock className="h-3.5 w-3.5 text-[#888888]" />
                                            <span>System Test #{failedTestNum} (Hidden)</span>
                                        </div>
                                        <p className="text-[11px] text-[#777777] leading-relaxed">
                                            Test data is hidden for system testcases to maintain competitive
                                            programming integrity. Check boundary conditions, integer overflow,
                                            or edge cases.
                                        </p>
                                    </div>
                                ) : (
                                    /* Sample Testcase (Inputs & Outputs visible) */
                                    <div className="space-y-2.5 pt-1">
                                        <div className="text-[10px] uppercase tracking-wider text-[#888888] font-semibold">
                                            Sample Test #{failedTestNum} Breakdown
                                        </div>

                                        {failedItem.input && (
                                            <div>
                                                <div className="text-[10px] uppercase text-[#777777] mb-1">
                                                    Input
                                                </div>
                                                <div className="bg-[#0f0f0f] border border-[#262626] rounded-[3px] px-3 py-2 text-[#e8e8e6] whitespace-pre-wrap select-text leading-relaxed">
                                                    {failedItem.input}
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <div className="text-[10px] uppercase text-[#777777] mb-1">
                                                Your Output
                                            </div>
                                            <div className="bg-[#0f0f0f] border border-[#262626] rounded-[3px] px-3 py-2 text-rose-300 whitespace-pre-wrap select-text leading-relaxed">
                                                {failedItem.stdout || '(no stdout output)'}
                                            </div>
                                        </div>

                                        {failedItem.expectedOutput && (
                                            <div>
                                                <div className="text-[10px] uppercase text-[#777777] mb-1">
                                                    Expected Output
                                                </div>
                                                <div className="bg-[#0f0f0f] border border-[#262626] rounded-[3px] px-3 py-2 text-emerald-300 whitespace-pre-wrap select-text leading-relaxed">
                                                    {failedItem.expectedOutput}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="rounded-[4px] border border-[#262626] bg-[#161616] p-4 font-mono text-xs text-[#777777] text-center">
                        Click <strong className="text-[#e8e8e6]">Submit</strong> in the top bar to run your code
                        against full hidden system testcases.
                    </div>
                )}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* SUBMISSIONS HISTORY TABLE                                     */}
            {/* ------------------------------------------------------------- */}
            <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between border-t border-[#262626] pt-4">
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase tracking-wider font-mono text-[#888888] font-semibold">
                            Past Submissions
                        </span>
                        {history.length > 0 && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#252423] text-[#a09f9d] border border-[#333333]">
                                {history.length}
                            </span>
                        )}
                    </div>

                    {isLoggedIn && (
                        <button
                            type="button"
                            onClick={() => refetchHistory()}
                            className="flex items-center gap-1 text-[11px] text-[#777777] hover:text-[#e8e8e6] transition-colors cursor-pointer"
                            title="Refresh history"
                        >
                            <RotateCw className={cn('h-3 w-3', historyLoading && 'animate-spin')} />
                            <span>Refresh</span>
                        </button>
                    )}
                </div>

                {!isLoggedIn ? (
                    <div className="rounded-[4px] border border-[#262626] bg-[#161616] p-4 text-center space-y-2">
                        <p className="text-xs text-[#888888]">
                            Log in to view and persist your submission history for this problem.
                        </p>
                        <button
                            type="button"
                            onClick={openModal}
                            className="border border-[#383838] bg-[#222222] hover:bg-[#2c2c2c] text-[#e8e8e6] text-xs px-3 py-1 rounded-[3px] transition-colors cursor-pointer"
                        >
                            Sign In
                        </button>
                    </div>
                ) : historyLoading ? (
                    <div className="flex items-center justify-center gap-2 py-6 text-[#777777] font-mono text-xs">
                        <Loader2 className="h-4 w-4 animate-spin text-[#87b2f4]" />
                        <span>Loading submission history...</span>
                    </div>
                ) : history.length === 0 ? (
                    <div className="rounded-[4px] border border-[#262626] bg-[#161616] p-4 text-center font-mono text-xs text-[#777777]">
                        No submissions recorded for this problem yet.
                    </div>
                ) : (
                    <div className="space-y-2">
                        <div className="rounded-[4px] border border-[#2a2a2a] bg-[#161616] overflow-hidden">
                            <table className="w-full text-left font-mono text-xs">
                                <thead>
                                    <tr className="border-b border-[#262626] text-[10px] uppercase text-[#777777] bg-[#131313]">
                                        <th className="py-2 px-3 font-medium">Status</th>
                                        <th className="py-2 px-3 font-medium hidden sm:table-cell">Language</th>
                                        <th className="py-2 px-3 font-medium">Runtime / Solve Time</th>
                                        <th className="py-2 px-3 font-medium hidden sm:table-cell">Memory</th>
                                        <th className="py-2 px-3 font-medium text-right">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#222222]">
                                    {history.map((item) => {
                                        const isAccepted = item.status === 'Accepted'
                                        const isExpanded = expandedCodeId === item.id
                                        const dateStr = formatRelativeTime(item.createdAt)

                                        return (
                                            <tr
                                                key={item.id}
                                                onClick={() => toggleExpandCode(item.id)}
                                                className={cn(
                                                    'hover:bg-[#1f1f1f] transition-colors cursor-pointer',
                                                    selectedHistoryId === item.id && 'bg-[#1b1b1b]'
                                                )}
                                            >
                                                <td className="py-2.5 px-3">
                                                    <div className="flex items-center gap-1.5">
                                                        {isExpanded ? (
                                                            <ChevronDown className="h-3 w-3 text-[#777777] shrink-0" />
                                                        ) : (
                                                            <ChevronRight className="h-3 w-3 text-[#777777] shrink-0" />
                                                        )}
                                                        <span
                                                            className={cn(
                                                                'font-semibold',
                                                                isAccepted ? 'text-emerald-400' : 'text-rose-300'
                                                            )}
                                                        >
                                                            {item.status}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-2.5 px-3 text-[#888888] hidden sm:table-cell">
                                                    {item.language || 'C++'}
                                                </td>
                                                <td className="py-2.5 px-3 text-[#e8e8e6]">
                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                        <span>{item.timeTaken || '—'}</span>
                                                        {item.userSolveTime != null && (
                                                            <span className="text-[11px] text-[#888888]">
                                                                ({formatDuration(item.userSolveTime)})
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-2.5 px-3 text-[#888888] hidden sm:table-cell">
                                                    {item.memoryUsage || '—'}
                                                </td>
                                                <td className="py-2.5 px-3 text-[#777777] text-right">
                                                    {dateStr}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Expanded Submission Code Viewer */}
                        {expandedCodeId && (
                            <div className="rounded-[4px] border border-[#333333] bg-[#141414] p-3 space-y-2 font-mono text-xs">
                                <div className="flex items-center justify-between text-[#888888] border-b border-[#262626] pb-2">
                                    <div className="flex items-center gap-2">
                                        <Code2 className="h-4 w-4 text-[#87b2f4]" />
                                        <span className="text-[#e8e8e6] font-medium">Submitted Code</span>
                                    </div>
                                    {expandedDetail?.sourceCode && (
                                        <button
                                            type="button"
                                            onClick={() => handleCopyCode(expandedDetail.sourceCode || '')}
                                            className="flex items-center gap-1 text-[11px] text-[#777777] hover:text-[#e8e8e6] transition-colors cursor-pointer"
                                        >
                                            {copiedCode ? (
                                                <>
                                                    <Check className="h-3 w-3 text-emerald-400" />
                                                    <span className="text-emerald-400">Copied</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="h-3 w-3" />
                                                    <span>Copy Code</span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>

                                {detailLoading ? (
                                    <div className="flex items-center gap-2 py-4 text-[#777777]">
                                        <Loader2 className="h-3.5 w-3.5 animate-spin text-[#87b2f4]" />
                                        <span>Loading submitted code...</span>
                                    </div>
                                ) : expandedDetail?.sourceCode ? (
                                    <pre className="whitespace-pre-wrap rounded-[3px] bg-[#0c0c0c] border border-[#222222] p-3 text-xs text-[#d6d5d4] overflow-x-auto max-h-72 select-text leading-relaxed">
                                        {expandedDetail.sourceCode}
                                    </pre>
                                ) : (
                                    <div className="py-3 text-[#666666] text-center">
                                        No source code available for this submission.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
