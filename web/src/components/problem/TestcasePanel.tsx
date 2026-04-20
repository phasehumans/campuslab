import { cn } from '@/lib/utils'
import type { ProblemExample } from '@/lib/types'

interface TestcasePanelProps {
    examples: ProblemExample[]
    activeTestCase: number
    setActiveTestCase: (idx: number) => void
}

export function TestcasePanel({
    examples,
    activeTestCase,
    setActiveTestCase,
}: TestcasePanelProps) {
    const currentExample = examples[activeTestCase]

    if (!currentExample) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
                No examples available for this problem.
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                {examples.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveTestCase(idx)}
                        className={cn(
                            'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                            activeTestCase === idx
                                ? 'bg-white/10 text-white'
                                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                        )}
                    >
                        Case {idx + 1}
                    </button>
                ))}
            </div>
            <div className="space-y-3">
                <div>
                    <p className="text-xs text-gray-400 mb-1">Input</p>
                    <pre className="whitespace-pre-wrap bg-white/5 border border-white/5 rounded-md px-3 py-2 text-sm font-mono text-gray-300">
                        {currentExample.input}
                    </pre>
                </div>
                <div>
                    <p className="text-xs text-gray-400 mb-1">Expected Output</p>
                    <pre className="whitespace-pre-wrap bg-white/5 border border-white/5 rounded-md px-3 py-2 text-sm font-mono text-gray-300">
                        {currentExample.output}
                    </pre>
                </div>
                {currentExample.explanation ? (
                    <div>
                        <p className="text-xs text-gray-400 mb-1">Explanation</p>
                        <div className="bg-white/5 border border-white/5 rounded-md px-3 py-2 text-sm text-gray-300">
                            {currentExample.explanation}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}
