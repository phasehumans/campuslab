import { CheckCircle2, XCircle, Loader2, TerminalSquare, Clock, Cpu, Code2, ShieldAlert } from 'lucide-react'
import type { ExecutionResponse } from '@/lib/types'

interface TestResultPanelProps {
    isLoading: boolean
    title: string
    result: ExecutionResponse | null
    message?: string | null
    totalTestcases?: number
}

export function TestResultPanel({
    isLoading,
    title,
    result,
    message,
    totalTestcases = 10,
}: TestResultPanelProps) {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-[#a09f9d] space-y-3 font-mono text-xs">
                <Loader2 className="h-5 w-5 animate-spin text-[#87b2f4]" />
                <p>Executing testcases in sandbox...</p>
            </div>
        )
    }

    if (!result) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-[#a09f9d] space-y-2 font-mono text-xs text-center">
                <TerminalSquare className="h-5 w-5 text-[#555555]" />
                <p>{message ?? 'Click Run or Submit to verify your code against testcases.'}</p>
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

    // Codeforces-style verdict computation
    let verdict = 'Accepted'
    let verdictColor = 'text-emerald-500'
    let verdictBg = 'bg-emerald-500/10 border-emerald-500/30'
    let verdictIcon = <CheckCircle2 className="h-4 w-4 text-emerald-500" />

    if (compileErrorItem || result.results.some((r) => r.compileOutput)) {
        verdict = 'Compilation Error'
        verdictColor = 'text-amber-500'
        verdictBg = 'bg-amber-500/10 border-amber-500/30'
        verdictIcon = <XCircle className="h-4 w-4 text-amber-500" />
    } else if (result.allPassed) {
        verdict = 'Accepted'
        verdictColor = 'text-emerald-500'
        verdictBg = 'bg-emerald-500/10 border-emerald-500/30'
        verdictIcon = <CheckCircle2 className="h-4 w-4 text-emerald-500" />
    } else if (failedItem) {
        // 1-based testcase number
        const testNum =
            failedItem.testcase === 0 || failedItem.testcase < 1
                ? failedItem.testcase + 1
                : failedItem.testcase
        const rawStatus = failedItem.status || 'Wrong Answer'

        if (rawStatus === 'Time Limit Exceeded') {
            verdict = `Time Limit Exceeded on test ${testNum}`
            verdictColor = 'text-amber-400'
            verdictBg = 'bg-amber-400/10 border-amber-400/30'
            verdictIcon = <Clock className="h-4 w-4 text-amber-400" />
        } else if (rawStatus === 'Runtime Error') {
            verdict = `Runtime Error on test ${testNum}`
            verdictColor = 'text-rose-400'
            verdictBg = 'bg-rose-400/10 border-rose-400/30'
            verdictIcon = <XCircle className="h-4 w-4 text-rose-400" />
        } else {
            verdict = `Wrong Answer on test ${testNum}`
            verdictColor = 'text-rose-500'
            verdictBg = 'bg-rose-500/10 border-rose-500/30'
            verdictIcon = <XCircle className="h-4 w-4 text-rose-500" />
        }
    } else {
        verdict = 'Failed'
        verdictColor = 'text-rose-500'
        verdictBg = 'bg-rose-500/10 border-rose-500/30'
        verdictIcon = <XCircle className="h-4 w-4 text-rose-500" />
    }

    // Determine total tests count for submission
    const effectiveTotal = result.allPassed
        ? Math.max(totalTestcases, result.results.length)
        : Math.max(totalTestcases, result.results.length, 10)
    const effectivePassed = result.allPassed ? effectiveTotal : passedCount
    const progressPercent = Math.min(100, Math.round((effectivePassed / effectiveTotal) * 100))

    // Max runtime and memory
    const maxTime = result.results.reduce((max, r) => {
        if (!r.time) return max
        return r.time
    }, '0.00s')
    const maxMemory = result.results.reduce((max, r) => {
        if (!r.memory) return max
        return r.memory
    }, '0.0 MB')

    // -------------------------------------------------------------
    // SUBMISSION VIEW: Codeforces-Style Verdict & Hidden Testcases
    // -------------------------------------------------------------
    if (isSubmission) {
        return (
            <div className="space-y-4 font-mono text-xs">
                {/* Header Banner */}
                <div className="flex items-center justify-between border-b border-[#333333] pb-3">
                    <span className="uppercase tracking-wider text-[10px] text-[#a09f9d]">
                        [{title}]
                    </span>
                    <span className="text-[11px] text-[#a09f9d]">
                        Evaluated with GCC 13 (Isolate Sandbox)
                    </span>
                </div>

                {/* Verdict Card */}
                <div className="rounded-[3px] border border-[#333333] bg-[#1e1e1e] p-4 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                            {verdictIcon}
                            <span className={`text-base font-bold tracking-tight ${verdictColor}`}>
                                {verdict}
                            </span>
                        </div>
                        <div
                            className={`px-2.5 py-1 rounded-[2px] text-xs font-semibold border ${verdictBg} ${verdictColor}`}
                        >
                            {result.allPassed ? 'Accepted' : 'Failed'}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-[11px] text-[#a09f9d]">
                            <span>Testcases Passed</span>
                            <span className="font-semibold text-[#e8e8e6]">
                                <span className={result.allPassed ? 'text-[#10b981]' : 'text-[#ef4444]'}>
                                    {effectivePassed}
                                </span>{' '}
                                / {effectiveTotal} Passed
                            </span>
                        </div>
                        <div className="w-full bg-[#141414] rounded-full h-2 overflow-hidden border border-[#272727]">
                            <div
                                className={`h-full transition-all duration-500 rounded-full ${
                                    result.allPassed ? 'bg-[#10b981]' : 'bg-[#ef4444]'
                                }`}
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Execution Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                        <div className="rounded-[2px] bg-[#141414] border border-[#272727] p-2.5 space-y-1">
                            <div className="flex items-center gap-1.5 text-[10px] text-[#888888] uppercase tracking-wider">
                                <Clock className="h-3 w-3 text-[#87b2f4]" />
                                <span>Time</span>
                            </div>
                            <div className="text-xs font-semibold text-[#e8e8e6]">
                                {maxTime}
                            </div>
                        </div>

                        <div className="rounded-[2px] bg-[#141414] border border-[#272727] p-2.5 space-y-1">
                            <div className="flex items-center gap-1.5 text-[10px] text-[#888888] uppercase tracking-wider">
                                <Cpu className="h-3 w-3 text-purple-400" />
                                <span>Memory</span>
                            </div>
                            <div className="text-xs font-semibold text-[#e8e8e6]">
                                {maxMemory}
                            </div>
                        </div>

                        <div className="rounded-[2px] bg-[#141414] border border-[#272727] p-2.5 space-y-1">
                            <div className="flex items-center gap-1.5 text-[10px] text-[#888888] uppercase tracking-wider">
                                <Code2 className="h-3 w-3 text-emerald-400" />
                                <span>Language</span>
                            </div>
                            <div className="text-xs font-semibold text-[#e8e8e6]">
                                {result.language || 'C++ (GCC 13)'}
                            </div>
                        </div>

                        <div className="rounded-[2px] bg-[#141414] border border-[#272727] p-2.5 space-y-1">
                            <div className="flex items-center gap-1.5 text-[10px] text-[#888888] uppercase tracking-wider">
                                <ShieldAlert className="h-3 w-3 text-amber-400" />
                                <span>Judge Strategy</span>
                            </div>
                            <div className="text-xs font-semibold text-[#e8e8e6]">
                                Short-Circuit
                            </div>
                        </div>
                    </div>

                    {/* Compilation Output if present */}
                    {compileErrorItem?.compileOutput && (
                        <div className="space-y-1.5 pt-2">
                            <span className="text-[10px] text-amber-400 uppercase tracking-wider block">
                                Compilation Output
                            </span>
                            <pre className="whitespace-pre-wrap rounded-[2px] bg-amber-950/20 border border-amber-900/50 p-3 text-xs text-amber-200 overflow-x-auto max-h-56">
                                {compileErrorItem.compileOutput}
                            </pre>
                        </div>
                    )}

                    {/* Stderr Output if present and not compile error */}
                    {failedItem?.stderr && !compileErrorItem && (
                        <div className="space-y-1.5 pt-2">
                            <span className="text-[10px] text-red-400 uppercase tracking-wider block">
                                Runtime Diagnostics
                            </span>
                            <pre className="whitespace-pre-wrap rounded-[2px] bg-red-950/20 border border-red-900/50 p-3 text-xs text-red-300 overflow-x-auto max-h-48">
                                {failedItem.stderr}
                            </pre>
                        </div>
                    )}

                    {/* Hidden Testcases Integrity Notice */}
                    <div className="pt-2 border-t border-[#272727] flex items-center gap-2 text-[11px] text-[#888888]">
                        <ShieldAlert className="h-3.5 w-3.5 text-[#555555] shrink-0" />
                        <span>
                            Hidden test cases and expected outputs are confidential to prevent hardcoded solutions and maintain competitive integrity.
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    // -------------------------------------------------------------
    // RUN VIEW: Sample Testcase Debugging (2 Public Testcases)
    // -------------------------------------------------------------
    const sampleTotal = result.results.length

    return (
        <div className="space-y-4 font-mono text-xs">
            {/* Top Summary Banner */}
            <div className="flex items-center justify-between border-b border-[#333333] pb-3">
                <div className="flex items-center gap-2">
                    <span className="uppercase tracking-wider text-[10px] text-[#a09f9d]">
                        [{title}]
                    </span>
                    <span
                        className={`px-2 py-0.5 rounded-[2px] text-[11px] font-semibold border ${
                            result.allPassed
                                ? 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/40'
                                : 'bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/40'
                        }`}
                    >
                        {result.allPassed ? 'Accepted' : 'Failed'}
                    </span>
                </div>
                <div className="text-[11px] text-[#a09f9d]">
                    Sample Cases Passed:{' '}
                    <span
                        className={
                            result.allPassed
                                ? 'text-[#10b981] font-semibold'
                                : 'text-[#ef4444] font-semibold'
                        }
                    >
                        {passedCount}/{sampleTotal}
                    </span>
                </div>
            </div>

            {/* Sample Testcase Results with full I/O grid */}
            <div className="space-y-3">
                {result.results.map((item, idx) => {
                    const testNum = item.testcase < 1 ? idx + 1 : item.testcase
                    return (
                        <div
                            key={`result-${idx}`}
                            className="rounded-[3px] border border-[#333333] bg-[#1e1e1e] p-3 space-y-2.5 transition-colors"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs font-medium text-[#e8e8e6]">
                                    {item.passed ? (
                                        <CheckCircle2 className="h-3.5 w-3.5 text-[#10b981]" />
                                    ) : (
                                        <XCircle className="h-3.5 w-3.5 text-[#ef4444]" />
                                    )}
                                    <span>Case {testNum}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-[#a09f9d]">
                                    {item.time && <span>{item.time}</span>}
                                    {item.memory && <span>{item.memory}</span>}
                                    <span
                                        className={`px-1.5 py-0.5 rounded-[2px] font-medium border ${
                                            item.passed
                                                ? 'text-[#10b981] bg-[#10b981]/10 border-[#10b981]/30'
                                                : 'text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/30'
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                </div>
                            </div>

                            {/* IO Grid */}
                            <div className="grid gap-2.5 sm:grid-cols-3">
                                <div className="space-y-1">
                                    <span className="text-[10px] text-[#888888] uppercase tracking-wider block">
                                        Input
                                    </span>
                                    <pre className="whitespace-pre-wrap rounded-[2px] bg-[#141414] border border-[#272727] p-2 text-xs text-[#e8e8e6] overflow-x-auto">
                                        {item.input || '(empty)'}
                                    </pre>
                                </div>

                                <div className="space-y-1">
                                    <span className="text-[10px] text-[#888888] uppercase tracking-wider block">
                                        Your Output
                                    </span>
                                    <pre
                                        className={`whitespace-pre-wrap rounded-[2px] bg-[#141414] border border-[#272727] p-2 text-xs overflow-x-auto ${
                                            item.passed ? 'text-[#10b981]' : 'text-[#ef4444]'
                                        }`}
                                    >
                                        {item.stdout || '(empty output)'}
                                    </pre>
                                </div>

                                <div className="space-y-1">
                                    <span className="text-[10px] text-[#888888] uppercase tracking-wider block">
                                        Expected
                                    </span>
                                    <pre className="whitespace-pre-wrap rounded-[2px] bg-[#141414] border border-[#272727] p-2 text-xs text-[#10b981] overflow-x-auto">
                                        {item.expectedOutput ?? '(not compared)'}
                                    </pre>
                                </div>
                            </div>

                            {item.stderr ? (
                                <div className="space-y-1 pt-1">
                                    <span className="text-[10px] text-red-400 uppercase tracking-wider block">
                                        Runtime Error / Stderr
                                    </span>
                                    <pre className="whitespace-pre-wrap rounded-[2px] bg-red-950/20 border border-red-900/50 p-2 text-xs text-red-300 overflow-x-auto">
                                        {item.stderr}
                                    </pre>
                                </div>
                            ) : null}

                            {item.compileOutput ? (
                                <div className="space-y-1 pt-1">
                                    <span className="text-[10px] text-amber-400 uppercase tracking-wider block">
                                        Compiler Output
                                    </span>
                                    <pre className="whitespace-pre-wrap rounded-[2px] bg-amber-950/20 border border-amber-900/50 p-2 text-xs text-amber-200 overflow-x-auto">
                                        {item.compileOutput}
                                    </pre>
                                </div>
                            ) : null}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
