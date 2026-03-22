import { cn } from '@/lib/utils'
import { TEST_CASES } from '@/data/code'

interface TestcasePanelProps {
    activeTestCase: number
    setActiveTestCase: (idx: number) => void
}

export function TestcasePanel({ activeTestCase, setActiveTestCase }: TestcasePanelProps) {
    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                {TEST_CASES.map((_, idx) => (
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
                    <p className="text-xs text-gray-400 mb-1">nums =</p>
                    <div className="bg-white/5 border border-white/5 rounded-md px-3 py-2 text-sm font-mono text-gray-300">
                        {TEST_CASES[activeTestCase].nums}
                    </div>
                </div>
                <div>
                    <p className="text-xs text-gray-400 mb-1">target =</p>
                    <div className="bg-white/5 border border-white/5 rounded-md px-3 py-2 text-sm font-mono text-gray-300">
                        {TEST_CASES[activeTestCase].target}
                    </div>
                </div>
            </div>
        </div>
    )
}
