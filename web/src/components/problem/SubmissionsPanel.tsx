import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import confetti from 'canvas-confetti'
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

        const colors = ['#5cbf92', '#87b2f4', '#fcd34d', '#eda0a5', '#ffffff']

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
    let verdictTone: Tone = 'ok'
    let isCodeforcesHidden = false
    let failedTestNum = 1

    if (compileErrorItem || latestExecution?.results.some((r) => r.compileOutput)) {
        verdictStatus = 'Compilation Error'
        verdictTone = 'warn'
    } else if (latestExecution?.allPassed) {
        verdictStatus = 'Accepted'
        verdictTone = 'ok'
    } else if (failedItem) {
        // The judge numbers test cases from 0; show them from 1.
        failedTestNum = failedItem.testcase + 1
        const rawStatus = failedItem.status || 'Wrong Answer'

        // Check if failed on a system (hidden) testcase beyond the public examples
        isCodeforcesHidden = failedTestNum > Math.max(sampleCount, 1)

        if (rawStatus === 'Time Limit Exceeded') {
            verdictStatus = `Time Limit Exceeded on test ${failedTestNum}`
            verdictTone = 'warn'
        } else if (rawStatus === 'Runtime Error') {
            verdictStatus = `Runtime Error on test ${failedTestNum}`
            verdictTone = 'bad'
        } else {
            verdictStatus = `Wrong Answer on test ${failedTestNum}`
            verdictTone = 'bad'
        }
    }

    const effectiveTotal = latestExecution?.allPassed
        ? Math.max(totalTestcases, latestExecution.results.length)
        : Math.max(totalTestcases, latestExecution?.results.length ?? 0, 30)
    const effectivePassed = latestExecution?.allPassed ? effectiveTotal : passedCount

    const maxTime = latestExecution?.results.reduce((max, r) => (r.time ? r.time : max), '') || ''
    const maxMemory =
        latestExecution?.results.reduce((max, r) => (r.memory ? r.memory : max), '') || ''

    const metrics = [
        { label: 'Runtime', value: maxTime || '—' },
        { label: 'Memory', value: maxMemory || '—' },
        ...(latestSubmission?.userSolveTime != null
            ? [{ label: 'Solve time', value: formatDuration(latestSubmission.userSolveTime) }]
            : []),
    ]

    return (
        <div className="space-y-7 font-mono text-xs text-[#a09f9d] pb-8">
            {/* Latest submission */}
            <section className="space-y-3">
                <SectionLabel>Latest submission</SectionLabel>

                {isLoading ? (
                    <p className="py-2 text-[#888888]">Judging against all test cases...</p>
                ) : latestExecution ? (
                    <div className="space-y-4">
                        {/* Verdict */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <ToneDot tone={verdictTone} />
                                <span
                                    className={cn(
                                        'text-sm font-semibold tracking-tight',
                                        TONE_TEXT[verdictTone]
                                    )}
                                >
                                    {verdictStatus}
                                </span>
                            </div>
                            <div className="pl-4 text-[11px] text-[#777777]">
                                {effectivePassed} / {effectiveTotal} test cases passed
                            </div>
                        </div>

                        {/* Metrics: one quiet row */}
                        <div className="flex flex-wrap gap-x-6 gap-y-2 pl-4">
                            {metrics.map((m) => (
                                <div key={m.label}>
                                    <div className="text-[10px] uppercase tracking-wider text-[#666666]">
                                        {m.label}
                                    </div>
                                    <div className="text-[#e8e8e6]">{m.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Compilation error output */}
                        {compileErrorItem?.compileOutput && (
                            <Block label="Compiler output">
                                <pre className="whitespace-pre-wrap rounded-[3px] bg-[#121212] p-3 text-[#d6d5d4] overflow-x-auto max-h-56 select-text leading-relaxed">
                                    {compileErrorItem.compileOutput}
                                </pre>
                            </Block>
                        )}

                        {/* Runtime error stderr */}
                        {failedItem?.stderr && !compileErrorItem && (
                            <Block label="Error output">
                                <pre className="whitespace-pre-wrap rounded-[3px] bg-[#121212] p-3 text-[#d6d5d4] overflow-x-auto max-h-48 select-text leading-relaxed">
                                    {failedItem.stderr}
                                </pre>
                            </Block>
                        )}

                        {/* Failing test */}
                        {failedItem &&
                            !compileErrorItem &&
                            (isCodeforcesHidden ? (
                                <p className="pl-4 text-[11px] text-[#777777] leading-relaxed">
                                    Test {failedTestNum} is hidden.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {failedItem.input && (
                                        <Block label={`Test ${failedTestNum} input`}>
                                            <Mono>{failedItem.input}</Mono>
                                        </Block>
                                    )}
                                    <Block label="Your output">
                                        <Mono className="text-rose-300">
                                            {failedItem.stdout || '(no output)'}
                                        </Mono>
                                    </Block>
                                    {failedItem.expectedOutput && (
                                        <Block label="Expected output">
                                            <Mono className="text-emerald-300">
                                                {failedItem.expectedOutput}
                                            </Mono>
                                        </Block>
                                    )}
                                </div>
                            ))}
                    </div>
                ) : (
                    <p className="py-2 text-[#777777]">
                        Press <span className="text-[#e8e8e6]">Submit</span> to run your code
                        against all test cases.
                    </p>
                )}
            </section>

            {/* Past submissions */}
            <section className="space-y-3">
                <div className="flex items-center justify-between">
                    <SectionLabel>
                        Past submissions
                        {history.length > 0 && (
                            <span className="ml-1.5 normal-case tracking-normal text-[#666666]">
                                {history.length}
                            </span>
                        )}
                    </SectionLabel>
                    {isLoggedIn && (
                        <button
                            type="button"
                            onClick={() => refetchHistory()}
                            className="text-[11px] text-[#666666] hover:text-[#e8e8e6] transition-colors cursor-pointer"
                        >
                            {historyLoading ? 'refreshing...' : 'refresh'}
                        </button>
                    )}
                </div>

                {!isLoggedIn ? (
                    <p className="py-2 text-[#777777]">
                        <button
                            type="button"
                            onClick={openModal}
                            className="text-[#e8e8e6] underline-offset-2 hover:underline cursor-pointer"
                        >
                            Sign in
                        </button>{' '}
                        to keep your submission history.
                    </p>
                ) : historyLoading ? (
                    <p className="py-2 text-[#777777]">Loading submissions...</p>
                ) : history.length === 0 ? (
                    <p className="py-2 text-[#777777]">No submissions yet.</p>
                ) : (
                    <div className="space-y-2">
                        <ul className="-mx-2">
                            {history.map((item) => {
                                const isAccepted = item.status === 'Accepted'
                                const isExpanded = expandedCodeId === item.id
                                return (
                                    <li key={item.id}>
                                        <button
                                            type="button"
                                            onClick={() => toggleExpandCode(item.id)}
                                            aria-expanded={isExpanded}
                                            className={cn(
                                                'w-full grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_5rem_5rem_auto] items-center gap-3 px-2 py-2 rounded-[3px] text-left transition-colors cursor-pointer hover:bg-[#1f1f1f]',
                                                (isExpanded || selectedHistoryId === item.id) &&
                                                    'bg-[#1c1c1c]'
                                            )}
                                        >
                                            <span className="flex items-center gap-2 min-w-0">
                                                <ToneDot tone={isAccepted ? 'ok' : 'bad'} />
                                                <span
                                                    className={cn(
                                                        'truncate',
                                                        isAccepted
                                                            ? 'text-[#e8e8e6]'
                                                            : 'text-[#a09f9d]'
                                                    )}
                                                >
                                                    {item.status}
                                                </span>
                                            </span>
                                            <span className="text-[#888888] text-right">
                                                {item.timeTaken || '—'}
                                            </span>
                                            <span className="hidden sm:block text-[#666666] text-right">
                                                {item.userSolveTime != null
                                                    ? formatDuration(item.userSolveTime)
                                                    : '—'}
                                            </span>
                                            <span className="text-[#666666] text-right whitespace-nowrap">
                                                {formatRelativeTime(item.createdAt)}
                                            </span>
                                        </button>

                                        {isExpanded && (
                                            <div className="px-2 pt-1 pb-3 space-y-2">
                                                <div className="flex items-center justify-between text-[11px]">
                                                    <span className="text-[#666666]">
                                                        Submitted code
                                                    </span>
                                                    {expandedDetail?.sourceCode && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleCopyCode(
                                                                    expandedDetail.sourceCode || ''
                                                                )
                                                            }
                                                            className="text-[#666666] hover:text-[#e8e8e6] transition-colors cursor-pointer"
                                                        >
                                                            {copiedCode ? 'copied' : 'copy'}
                                                        </button>
                                                    )}
                                                </div>
                                                {detailLoading ? (
                                                    <p className="py-2 text-[#777777]">
                                                        Loading code...
                                                    </p>
                                                ) : expandedDetail?.sourceCode ? (
                                                    <pre className="whitespace-pre-wrap rounded-[3px] bg-[#121212] p-3 text-[#d6d5d4] overflow-x-auto max-h-72 select-text leading-relaxed">
                                                        {expandedDetail.sourceCode}
                                                    </pre>
                                                ) : (
                                                    <p className="py-2 text-[#777777]">
                                                        No code saved for this submission.
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )}
            </section>
        </div>
    )
}

type Tone = 'ok' | 'bad' | 'warn'

const TONE_TEXT: Record<Tone, string> = {
    ok: 'text-emerald-400',
    bad: 'text-rose-300',
    warn: 'text-amber-200',
}

const TONE_DOT: Record<Tone, string> = {
    ok: 'bg-emerald-400',
    bad: 'bg-rose-300',
    warn: 'bg-amber-200',
}

function ToneDot({ tone }: { tone: Tone }) {
    return <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full shrink-0', TONE_DOT[tone])} />
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-[10px] uppercase tracking-wider text-[#777777] font-semibold">
            {children}
        </h3>
    )
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="space-y-1.5">
            <div className="text-[10px] uppercase tracking-wider text-[#666666]">{label}</div>
            {children}
        </div>
    )
}

function Mono({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={cn(
                'rounded-[3px] bg-[#121212] px-3 py-2 text-[#e8e8e6] whitespace-pre-wrap select-text leading-relaxed',
                className
            )}
        >
            {children}
        </div>
    )
}
