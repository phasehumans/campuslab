import { Beaker, CheckCircle2, XCircle } from 'lucide-react'
import type { ExecutionResponse } from '@/lib/types'

interface TestResultPanelProps {
    isLoading: boolean
    title: string
    result: ExecutionResponse | null
    message?: string | null
}

export function TestResultPanel({ isLoading, title, result, message }: TestResultPanelProps) {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3">
                <Beaker className="h-8 w-8 text-gray-500 animate-pulse" />
                <p className="text-sm">Executing your code...</p>
            </div>
        )
    }

    if (!result) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3">
                <Beaker className="h-8 w-8 text-gray-500" />
                <p className="text-sm">{message ?? 'Run your code to see results'}</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">{title}</p>
                    <h3 className="mt-1 text-base font-semibold text-white">
                        {result.allPassed ? 'All testcases passed' : 'Some testcases failed'}
                    </h3>
                </div>
                <div
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                        result.allPassed
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-orange-500/10 text-orange-300'
                    }`}
                >
                    {result.results.filter((item) => item.passed).length}/{result.results.length}{' '}
                    passed
                </div>
            </div>

            <div className="space-y-3">
                {result.results.map((item) => (
                    <div
                        key={`result-${item.testcase}`}
                        className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-medium text-white">
                                {item.passed ? (
                                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                ) : (
                                    <XCircle className="h-4 w-4 text-red-400" />
                                )}
                                Testcase {item.testcase}
                            </div>
                            <span className="text-xs text-gray-500">{item.status}</span>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500">Input</p>
                                <pre className="whitespace-pre-wrap rounded-lg bg-black/20 px-3 py-2 text-xs text-gray-300">
                                    {item.input}
                                </pre>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500">Output</p>
                                <pre className="whitespace-pre-wrap rounded-lg bg-black/20 px-3 py-2 text-xs text-gray-300">
                                    {item.stdout || '(empty)'}
                                </pre>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500">Expected</p>
                                <pre className="whitespace-pre-wrap rounded-lg bg-black/20 px-3 py-2 text-xs text-gray-300">
                                    {item.expectedOutput ?? '(not compared)'}
                                </pre>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500">Runtime</p>
                                <div className="rounded-lg bg-black/20 px-3 py-2 text-xs text-gray-300">
                                    {item.time ?? '--'} | {item.memory ?? '--'}
                                </div>
                            </div>
                        </div>

                        {item.stderr ? (
                            <div className="space-y-1">
                                <p className="text-xs text-red-300">stderr</p>
                                <pre className="whitespace-pre-wrap rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-100">
                                    {item.stderr}
                                </pre>
                            </div>
                        ) : null}

                        {item.compileOutput ? (
                            <div className="space-y-1">
                                <p className="text-xs text-orange-300">compile output</p>
                                <pre className="whitespace-pre-wrap rounded-lg bg-orange-500/10 px-3 py-2 text-xs text-orange-100">
                                    {item.compileOutput}
                                </pre>
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    )
}
