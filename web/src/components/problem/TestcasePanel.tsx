import { cn } from '@/lib/utils'
import type { ProblemExample } from '@/lib/types'

interface TestcasePanelProps {
    examples: ProblemExample[]
    activeTestCase: number
    setActiveTestCase: (idx: number) => void
}

export function TestcasePanel({ examples, activeTestCase, setActiveTestCase }: TestcasePanelProps) {
    const currentExample = examples[activeTestCase]

    if (!currentExample) {
        return (
            <div className="flex h-full items-center justify-center font-mono text-xs text-[#a09f9d]">
                No testcases available for this problem.
            </div>
        )
    }

    return (
        <div className="space-y-3.5 font-mono text-xs">
            {/* Case selector tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {examples.map((_, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveTestCase(idx)}
                        className={cn(
                            'px-2.5 py-1 text-xs rounded-[2px] border transition-colors cursor-pointer shrink-0',
                            activeTestCase === idx
                                ? 'bg-[#252423] text-[#e8e8e6] border-[#333333] font-medium shadow-xs'
                                : 'bg-transparent text-[#a09f9d] border-transparent hover:text-[#e8e8e6] hover:bg-[#252423]/50'
                        )}
                    >
                        Case {idx + 1}
                    </button>
                ))}
            </div>

            {/* Testcase details */}
            <div className="space-y-3">
                <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#a09f9d] block">
                        Input
                    </span>
                    <pre className="whitespace-pre-wrap bg-[#141414] border border-[#333333] rounded-[3px] p-2.5 text-xs font-mono text-[#e8e8e6] leading-relaxed overflow-x-auto">
                        {currentExample.input}
                    </pre>
                </div>

                <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#a09f9d] block">
                        Expected Output
                    </span>
                    <pre className="whitespace-pre-wrap bg-[#141414] border border-[#333333] rounded-[3px] p-2.5 text-xs font-mono text-[#10b981] leading-relaxed overflow-x-auto">
                        {currentExample.output}
                    </pre>
                </div>
            </div>
        </div>
    )
}
