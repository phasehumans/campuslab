import { CheckCircle2 } from 'lucide-react'

export function DescriptionPanel() {
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-white">1. Two Sum</h1>
                <span className="text-emerald-500 text-sm font-medium flex items-center gap-1">
                    Solved <CheckCircle2 className="h-4 w-4" />
                </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <span className="text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full text-xs font-medium">
                    Easy
                </span>
            </div>

            <div className="prose prose-invert max-w-none text-sm text-gray-300 space-y-4 leading-relaxed">
                <p>
                    Given an array of integers{' '}
                    <code className="bg-white/10 px-1.5 py-0.5 rounded text-gray-200 font-mono text-xs">
                        nums
                    </code>{' '}
                    and an integer{' '}
                    <code className="bg-white/10 px-1.5 py-0.5 rounded text-gray-200 font-mono text-xs">
                        target
                    </code>
                    , return{' '}
                    <em>
                        indices of the two numbers such that they add up to{' '}
                        <code className="bg-white/10 px-1.5 py-0.5 rounded text-gray-200 font-mono text-xs">
                            target
                        </code>
                    </em>
                    .
                </p>
                <p>
                    You may assume that each input would have{' '}
                    <strong>
                        <em>exactly</em> one solution
                    </strong>
                    , and you may not use the <em>same</em> element twice.
                </p>
                <p>You can return the answer in any order.</p>

                <div className="mt-8">
                    <p className="font-bold text-white mb-2">Example 1:</p>
                    <pre className="bg-white/5 p-4 rounded-lg border border-white/5 text-gray-300 font-mono text-xs leading-relaxed">
                        <span className="font-semibold text-white">Input:</span> nums = [2,7,11,15],
                        target = 9{'\n'}
                        <span className="font-semibold text-white">Output:</span> [0,1]{'\n'}
                        <span className="font-semibold text-white">Explanation:</span> Because
                        nums[0] + nums[1] == 9, we return [0, 1].
                    </pre>
                </div>

                <div className="mt-4">
                    <p className="font-bold text-white mb-2">Example 2:</p>
                    <pre className="bg-white/5 p-4 rounded-lg border border-white/5 text-gray-300 font-mono text-xs leading-relaxed">
                        <span className="font-semibold text-white">Input:</span> nums = [3,2,4],
                        target = 6{'\n'}
                        <span className="font-semibold text-white">Output:</span> [1,2]
                    </pre>
                </div>

                <div className="mt-4">
                    <p className="font-bold text-white mb-2">Example 3:</p>
                    <pre className="bg-white/5 p-4 rounded-lg border border-white/5 text-gray-300 font-mono text-xs leading-relaxed">
                        <span className="font-semibold text-white">Input:</span> nums = [3,3],
                        target = 6{'\n'}
                        <span className="font-semibold text-white">Output:</span> [0,1]
                    </pre>
                </div>
            </div>
        </>
    )
}
