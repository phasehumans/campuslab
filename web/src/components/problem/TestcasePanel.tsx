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
            <div className="py-6 font-mono text-xs text-[#888888]">
                No testcases available for this problem.
            </div>
        )
    }

    return (
        <div className="space-y-3 font-mono text-xs">
            {/* Case selector tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5 select-none">
                {examples.map((_, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveTestCase(idx)}
                        className={cn(
                            'px-2.5 py-1 text-xs rounded-[3px] transition-colors cursor-pointer shrink-0',
                            activeTestCase === idx
                                ? 'bg-[#252423] text-[#e8e8e6] font-medium border border-[#333333]'
                                : 'text-[#888888] hover:text-[#e8e8e6] hover:bg-[#202020]'
                        )}
                    >
                        Case {idx + 1}
                    </button>
                ))}
            </div>

            {/* Testcase details */}
            <div className="space-y-3 pt-0.5">
                <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#888888] mb-1">
                        Input
                    </div>
                    <div className="bg-[#141414] rounded-[3px] px-3 py-2 text-[#e8e8e6] whitespace-pre-wrap select-text leading-relaxed">
                        {currentExample.input}
                    </div>
                </div>

                <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#888888] mb-1">
                        Expected Output
                    </div>
                    <div className="bg-[#141414] rounded-[3px] px-3 py-2 text-[#e8e8e6] whitespace-pre-wrap select-text leading-relaxed">
                        {currentExample.output}
                    </div>
                </div>
            </div>
        </div>
    )
}
