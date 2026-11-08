import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { cn, formatDuration } from '@/lib/utils'
import type { ExecutionResponse } from '@/lib/types'

interface TestResultPanelProps {
    isLoading: boolean
    title: string
    result: ExecutionResponse | null
    message?: string | null
    totalTestcases?: number
    sampleCount?: number
    userSolveTime?: number | null
    onViewSubmissions?: () => void
}

export function TestResultPanel({
    isLoading,
    title,
    result,
    message,
    totalTestcases = 30,
    sampleCount = 0,
    userSolveTime,
    onViewSubmissions,
}: TestResultPanelProps) {
    const [activeRunCase, setActiveRunCase] = useState(0)

    useEffect(() => {
        if (!result) return
        const firstFail = result.results.findIndex((r) => !r.passed)
        setActiveRunCase(firstFail !== -1 ? firstFail : 0)
    }, [result])

    if (isLoading) {
        return (
            <div className="flex items-center gap-2 py-6 text-[#888888] font-mono text-xs">
                <Loader2 className="h-4 w-4 animate-spin text-[#87b2f4]" />
                <span>Executing testcases in sandbox...</span>
            </div>
        )
    }

    if (!result) {
        return (
            <div className="py-6 text-[#888888] font-mono text-xs">
                {message ?? 'Click Run or Submit to verify your code against testcases.'}
            </div>
        )
    }

    const isSubmission = title.toLowerCase().includes('submission')
    const passedCount = result.results.filter((item) => item.passed).length

    // Find first failing item or compilation error
    const compileErrorItem = result.results.find(
        (item) => item.status === 'Compilation Error' || Boolean(item.compileOutput)
    )
    const failedItem = result.results.find((item) => !item.passed)

    // Compute verdict
    let verdict = 'Accepted'
    if (compileErrorItem || result.results.some((r) => r.compileOutput)) {
        verdict = 'Compilation Error'
    } else if (result.allPassed) {
        verdict = 'Accepted'
    } else if (failedItem) {
        const failedIndex = result.results.findIndex((item) => !item.passed)
        const testNum = failedIndex !== -1 ? failedIndex + 1 : failedItem.testcase + 1
        const rawStatus = failedItem.status || 'Wrong Answer'

        if (rawStatus === 'Time Limit Exceeded') {
            verdict = `Time Limit Exceeded on test ${testNum}`
        } else if (rawStatus === 'Runtime Error') {
            verdict = `Runtime Error on test ${testNum}`
        } else {
            verdict = `Wrong Answer on test ${testNum}`
        }
    } else {
        verdict = 'Failed'
    }

    const effectiveTotal = result.allPassed
        ? Math.max(totalTestcases, result.results.length)
        : Math.max(totalTestcases, result.results.length, 30)
    const effectivePassed = result.allPassed ? effectiveTotal : passedCount

    const maxTime = result.results.reduce((max, r) => (r.time ? r.time : max), '')
    const maxMemory = result.results.reduce((max, r) => (r.memory ? r.memory : max), '')

    // -------------------------------------------------------------
    // SUBMISSION VIEW: Clean Verdict & Codeforces-Style Details
    // -------------------------------------------------------------
    if (isSubmission) {
        const failedIndex = result.results.findIndex((item) => !item.passed)
        const failedTestNum = failedIndex !== -1 ? failedIndex + 1 : (failedItem?.testcase ?? 0) + 1
        const isCodeforcesHidden = failedTestNum > Math.max(sampleCount, 1)

        return (
            <div className="space-y-3.5 font-mono text-xs">
                {/* Header Verdict & Stats Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#282828] pb-2.5">
                    <span
                        className={cn(
                            'text-sm font-semibold',
                            result.allPassed ? 'text-emerald-400' : 'text-rose-300'
                        )}
                    >
                        {verdict}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-[#888888]">
                        <span>
                            Passed:{' '}
                            <strong
                                className={
                                    result.allPassed
                                        ? 'text-emerald-400 font-semibold'
                                        : 'text-rose-300 font-semibold'
                                }
                            >
                                {effectivePassed}/{effectiveTotal}
                            </strong>
                        </span>
                        {maxTime && (
                            <span>
                                Time: <span className="text-[#e8e8e6]">{maxTime}</span>
                            </span>
                        )}
                        {maxMemory && (
                            <span>
                                Memory: <span className="text-[#e8e8e6]">{maxMemory}</span>
                            </span>
                        )}
                        {userSolveTime != null && (
                            <span>
                                Solve Time:{' '}
                                <span className="text-[#e8e8e6]">
                                    {formatDuration(userSolveTime)}
                                </span>
                            </span>
                        )}
                        {onViewSubmissions && (
                            <button
                                type="button"
                                onClick={onViewSubmissions}
                                className="text-[11px] text-[#87b2f4] hover:underline cursor-pointer"
                            >
                                View in Submissions tab &rarr;
                            </button>
                        )}
                    </div>
                </div>

                {/* Compilation Output if present */}
                {compileErrorItem?.compileOutput && (
                    <div className="space-y-1">
                        <div className="text-[10px] text-amber-200 uppercase tracking-wider">
                            Compilation Output
                        </div>
                        <pre className="whitespace-pre-wrap rounded-[3px] bg-[#141414] p-3 text-xs text-amber-100/90 overflow-x-auto max-h-56 select-text leading-relaxed">
                            {compileErrorItem.compileOutput}
                        </pre>
                    </div>
                )}

                {/* Stderr Output if present and not compile error */}
                {failedItem?.stderr && !compileErrorItem && (
                    <div className="space-y-1">
                        <div className="text-[10px] text-rose-300 uppercase tracking-wider">
                            Runtime Error / Diagnostics
                        </div>
                        <pre className="whitespace-pre-wrap rounded-[3px] bg-[#141414] p-3 text-xs text-rose-200/90 overflow-x-auto max-h-48 select-text leading-relaxed">
                            {failedItem.stderr}
                        </pre>
                    </div>
                )}

                {/* Testcase Failure Details */}
                {failedItem && !compileErrorItem && (
                    <div>
                        {isCodeforcesHidden ? (
                            <div className="rounded-[3px] border border-[#2a2a2a] bg-[#141414] p-3 text-xs text-[#888888]">
                                <span className="text-[#e8e8e6] font-medium">
                                    System Test #{failedTestNum} (Hidden):
                                </span>{' '}
                                Test data is hidden for system testcases to maintain competitive
                                programming integrity.
                            </div>
                        ) : (
                            <div className="space-y-2 pt-1">
                                <div className="text-[10px] uppercase text-[#888888]">
                                    Sample Test #{failedTestNum} Failure
                                </div>
                                {failedItem.input && (
                                    <div>
                                        <div className="text-[10px] uppercase text-[#777777] mb-0.5">
                                            Input
                                        </div>
                                        <div className="bg-[#141414] rounded-[3px] px-3 py-1.5 text-[#e8e8e6] whitespace-pre-wrap select-text">
                                            {failedItem.input}
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <div className="text-[10px] uppercase text-[#777777] mb-0.5">
                                        Your Output
                                    </div>
                                    <div className="bg-[#141414] rounded-[3px] px-3 py-1.5 text-rose-300 whitespace-pre-wrap select-text">
                                        {failedItem.stdout || '(empty output)'}
                                    </div>
                                </div>
                                {failedItem.expectedOutput && (
                                    <div>
                                        <div className="text-[10px] uppercase text-[#777777] mb-0.5">
                                            Expected Output
                                        </div>
                                        <div className="bg-[#141414] rounded-[3px] px-3 py-1.5 text-emerald-300 whitespace-pre-wrap select-text">
                                            {failedItem.expectedOutput}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }

    // -------------------------------------------------------------
    // RUN VIEW: Tabbed Sample Cases with Flat IO
    // -------------------------------------------------------------
    const currentCase = result.results[activeRunCase] || result.results[0]
    const sampleTotal = result.results.length

    return (
        <div className="space-y-3 font-mono text-xs">
            {/* Top Summary Header */}
            <div className="flex items-center justify-between border-b border-[#282828] pb-2.5">
                <span
                    className={cn(
                        'text-sm font-semibold',
                        result.allPassed ? 'text-emerald-400' : 'text-rose-300'
                    )}
                >
                    {result.allPassed ? 'Accepted' : 'Wrong Answer'}
                </span>
                <div className="flex items-center gap-3 text-xs text-[#888888]">
                    <span>
                        Passed:{' '}
                        <strong
                            className={
                                result.allPassed
                                    ? 'text-emerald-400 font-semibold'
                                    : 'text-rose-300 font-semibold'
                            }
                        >
                            {passedCount}/{sampleTotal}
                        </strong>
                    </span>
                    {maxTime && (
                        <span>
                            Time: <span className="text-[#e8e8e6]">{maxTime}</span>
                        </span>
                    )}
                </div>
            </div>

            {/* Case selector tabs with status dots */}
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5 select-none">
                {result.results.map((item, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveRunCase(idx)}
                        className={cn(
                            'flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-[3px] transition-colors cursor-pointer shrink-0 font-mono',
                            activeRunCase === idx
                                ? 'bg-[#252423] text-[#e8e8e6] font-medium border border-[#333333]'
                                : 'text-[#888888] hover:text-[#e8e8e6] hover:bg-[#202020]'
                        )}
                    >
                        <span
                            className={cn(
                                'h-1.5 w-1.5 rounded-full shrink-0',
                                item.passed ? 'bg-emerald-400' : 'bg-rose-300'
                            )}
                        />
                        <span>Case {idx + 1}</span>
                    </button>
                ))}
            </div>

            {/* Selected Case Flat Details */}
            {currentCase && (
                <div className="space-y-3 pt-0.5">
                    <div>
                        <div className="text-[10px] uppercase tracking-wider text-[#888888] mb-1">
                            Input
                        </div>
                        <div className="bg-[#141414] rounded-[3px] px-3 py-2 text-[#e8e8e6] whitespace-pre-wrap select-text leading-relaxed">
                            {currentCase.input || '(empty)'}
                        </div>
                    </div>

                    <div>
                        <div className="text-[10px] uppercase tracking-wider text-[#888888] mb-1">
                            Output
                        </div>
                        <div
                            className={cn(
                                'bg-[#141414] rounded-[3px] px-3 py-2 whitespace-pre-wrap select-text leading-relaxed',
                                currentCase.passed ? 'text-[#e8e8e6]' : 'text-rose-300'
                            )}
                        >
                            {currentCase.stdout || '(empty output)'}
                        </div>
                    </div>

                    <div>
                        <div className="text-[10px] uppercase tracking-wider text-[#888888] mb-1">
                            Expected Output
                        </div>
                        <div className="bg-[#141414] rounded-[3px] px-3 py-2 text-[#e8e8e6] whitespace-pre-wrap select-text leading-relaxed">
                            {currentCase.expectedOutput ?? '(not compared)'}
                        </div>
                    </div>

                    {currentCase.stderr && (
                        <div>
                            <div className="text-[10px] uppercase tracking-wider text-rose-300 mb-1">
                                Runtime Error / Stderr
                            </div>
                            <pre className="bg-[#141414] rounded-[3px] px-3 py-2 text-xs text-rose-200/90 whitespace-pre-wrap select-text leading-relaxed overflow-x-auto">
                                {currentCase.stderr}
                            </pre>
                        </div>
                    )}

                    {currentCase.compileOutput && (
                        <div>
                            <div className="text-[10px] uppercase tracking-wider text-amber-200 mb-1">
                                Compilation Output
                            </div>
                            <pre className="bg-[#141414] rounded-[3px] px-3 py-2 text-xs text-amber-100/90 whitespace-pre-wrap select-text leading-relaxed overflow-x-auto">
                                {currentCase.compileOutput}
                            </pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
