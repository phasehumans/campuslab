import { useState, type ComponentPropsWithoutRef } from 'react'
import { Check, Copy } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import type { ProblemDetail } from '@/lib/types'
import { cn } from '@/lib/utils'

interface DescriptionPanelProps {
    problem: ProblemDetail
}

export function DescriptionPanel({ problem }: DescriptionPanelProps) {
    const [copiedKey, setCopiedKey] = useState<string | null>(null)

    const handleCopy = (text: string, key: string) => {
        if (!text) return
        navigator.clipboard.writeText(text)
        setCopiedKey(key)
        setTimeout(() => setCopiedKey(null), 1800)
    }

    return (
        <div className="space-y-6 text-xs text-[#a09f9d] leading-relaxed font-sans">
            {/* Header: Title & Clean Metadata Row (No badges, no box highlights) */}
            <div className="space-y-2 pb-4 border-b border-[#2e2e2e]">
                <h1 className="text-xl font-semibold tracking-tight text-[#e8e8e6]">
                    {problem.title}
                </h1>

                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#888888]">
                    <span
                        className={cn(
                            'font-medium',
                            problem.difficulty === 'Easy' && 'text-[#34d399]',
                            problem.difficulty === 'Medium' && 'text-[#fcd34d]',
                            problem.difficulty === 'Hard' && 'text-rose-300'
                        )}
                    >
                        {problem.difficulty}
                    </span>

                    {(problem.tags ?? []).length > 0 && (
                        <>
                            <span className="text-[#444444]">•</span>
                            <span className="text-[#888888]">{problem.tags.join(', ')}</span>
                        </>
                    )}

                    {problem.status === 'Solved' && (
                        <>
                            <span className="text-[#444444]">•</span>
                            <span className="text-[#888888]">Solved</span>
                        </>
                    )}
                </div>
            </div>

            {/* Description Body: Markdown with clean typography */}
            <div className="text-[13px] text-[#d6d5d4] leading-relaxed">
                <ReactMarkdown
                    components={{
                        p: ({ children }) => (
                            <p className="mb-3.5 leading-relaxed text-[#d6d5d4]">{children}</p>
                        ),
                        strong: ({ children }) => (
                            <strong className="font-semibold text-[#e8e8e6]">{children}</strong>
                        ),
                        ul: ({ children }) => (
                            <ul className="list-disc list-inside space-y-1.5 my-3 text-[#d6d5d4] pl-1">
                                {children}
                            </ul>
                        ),
                        ol: ({ children }) => (
                            <ol className="list-decimal list-inside space-y-1.5 my-3 text-[#d6d5d4] pl-1">
                                {children}
                            </ol>
                        ),
                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                        code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
                            return (
                                <code
                                    className="bg-[#222222] text-[#e8e8e6] font-mono text-[11px] px-1.5 py-0.5 rounded-[2px] border border-[#333333]"
                                    {...props}
                                >
                                    {children}
                                </code>
                            )
                        },
                        pre: ({ children }) => (
                            <pre className="bg-[#161616] border border-[#2a2a2a] rounded-[3px] p-3 font-mono text-xs overflow-x-auto my-3 text-[#e8e8e6]">
                                {children}
                            </pre>
                        ),
                        h1: ({ children }) => (
                            <h2 className="text-sm font-semibold text-[#e8e8e6] mt-4 mb-2">
                                {children}
                            </h2>
                        ),
                        h2: ({ children }) => (
                            <h3 className="text-xs font-mono uppercase tracking-wider text-[#a09f9d] mt-3.5 mb-1.5 font-medium">
                                {children}
                            </h3>
                        ),
                        h3: ({ children }) => (
                            <h4 className="text-xs font-mono uppercase tracking-wider text-[#a09f9d] mt-3 mb-1 font-medium">
                                {children}
                            </h4>
                        ),
                    }}
                >
                    {problem.description ?? ''}
                </ReactMarkdown>
            </div>

            {/* Examples (No outer card container, clean input/output boxes with copy buttons) */}
            {(problem.examples ?? []).length > 0 && (
                <div className="space-y-6 pt-2">
                    {problem.examples.map((example, index) => (
                        <div
                            key={`${problem.id}-example-${index}`}
                            className="space-y-3 font-mono text-xs"
                        >
                            <div className="text-xs font-semibold text-[#e8e8e6] tracking-tight">
                                {example.title ?? `Example ${index + 1}:`}
                            </div>

                            <div className="space-y-3">
                                {/* Input Box */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="text-[#888888] uppercase tracking-wider font-medium">
                                            Input:
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(example.input, `in-${index}`)}
                                            className="group flex items-center gap-1 text-[10px] text-[#777777] hover:text-[#e8e8e6] px-1.5 py-0.5 rounded-[2px] hover:bg-[#252423] transition-colors cursor-pointer select-none"
                                            title="Copy input"
                                        >
                                            {copiedKey === `in-${index}` ? (
                                                <>
                                                    <Check className="h-3 w-3 text-emerald-400" />
                                                    <span className="text-emerald-400">Copied</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="h-3 w-3" />
                                                    <span>Copy</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <pre className="whitespace-pre-wrap bg-[#161616] border border-[#2a2a2a] p-2.5 rounded-[3px] text-[#e8e8e6] overflow-x-auto leading-relaxed select-text font-mono text-xs">
                                        {example.input}
                                    </pre>
                                </div>

                                {/* Output Box */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="text-[#888888] uppercase tracking-wider font-medium">
                                            Output:
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(example.output, `out-${index}`)}
                                            className="group flex items-center gap-1 text-[10px] text-[#777777] hover:text-[#e8e8e6] px-1.5 py-0.5 rounded-[2px] hover:bg-[#252423] transition-colors cursor-pointer select-none"
                                            title="Copy output"
                                        >
                                            {copiedKey === `out-${index}` ? (
                                                <>
                                                    <Check className="h-3 w-3 text-emerald-400" />
                                                    <span className="text-emerald-400">Copied</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="h-3 w-3" />
                                                    <span>Copy</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <pre className="whitespace-pre-wrap bg-[#161616] border border-[#2a2a2a] p-2.5 rounded-[3px] text-[#e8e8e6] overflow-x-auto leading-relaxed select-text font-mono text-xs">
                                        {example.output}
                                    </pre>
                                </div>

                                {/* Explanation */}
                                {example.explanation && (
                                    <div className="space-y-1 pt-0.5 font-sans text-xs leading-relaxed">
                                        <span className="text-[#888888] font-mono text-[11px] uppercase tracking-wider font-medium block">
                                            Explanation:
                                        </span>
                                        <p className="text-[#a09f9d]">{example.explanation}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Constraints (No outer box, clean bulleted list) */}
            {problem.constraints && (
                <div className="space-y-2 pt-2 border-t border-[#262626]">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#e8e8e6] font-medium">
                        Constraints:
                    </div>
                    <ul className="list-disc list-inside space-y-1.5 text-xs font-mono text-[#d6d5d4] leading-relaxed pl-1">
                        {problem.constraints
                            .split('\n')
                            .map((line) => line.trim().replace(/^[-*•]\s*/, ''))
                            .filter(Boolean)
                            .map((constraintLine, idx) => (
                                <li key={idx} className="text-[#d6d5d4]">
                                    <code className="bg-[#202020] text-[#e8e8e6] font-mono text-[11px] px-1.5 py-0.5 rounded-[2px] border border-[#2e2e2e]">
                                        {constraintLine}
                                    </code>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
