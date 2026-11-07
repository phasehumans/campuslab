import ReactMarkdown from 'react-markdown'
import type { ProblemDetail } from '@/lib/types'
import { cn } from '@/lib/utils'

interface DescriptionPanelProps {
    problem: ProblemDetail
}

export function DescriptionPanel({ problem }: DescriptionPanelProps) {
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
                            problem.difficulty === 'Easy' && 'text-[#10b981]',
                            problem.difficulty === 'Medium' && 'text-[#f59e0b]',
                            problem.difficulty === 'Hard' && 'text-[#ef4444]'
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
                        code: ({ children, ...props }: React.ComponentPropsWithoutRef<'code'>) => {
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

            {/* Examples (Clean neutral presentation without green highlights) */}
            {(problem.examples ?? []).length > 0 && (
                <div className="space-y-3 pt-1">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#a09f9d] font-medium">
                        Examples
                    </div>
                    <div className="space-y-3">
                        {problem.examples.map((example, index) => (
                            <div
                                key={`${problem.id}-example-${index}`}
                                className="border border-[#2a2a2a] bg-[#161616] p-3.5 rounded-[3px] space-y-3 font-mono text-xs"
                            >
                                <div className="text-[#888888] font-mono text-[11px] uppercase tracking-wider font-medium">
                                    {example.title ?? `Example ${index + 1}`}
                                </div>
                                <div className="space-y-2.5">
                                    <div className="space-y-1">
                                        <span className="text-[#666666] text-[10px] font-mono uppercase tracking-wider block">
                                            Input:
                                        </span>
                                        <pre className="whitespace-pre-wrap bg-[#1c1c1c] p-2.5 rounded-[2px] border border-[#2a2a2a] text-[#e8e8e6] overflow-x-auto leading-relaxed">
                                            {example.input}
                                        </pre>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[#666666] text-[10px] font-mono uppercase tracking-wider block">
                                            Output:
                                        </span>
                                        <pre className="whitespace-pre-wrap bg-[#1c1c1c] p-2.5 rounded-[2px] border border-[#2a2a2a] text-[#e8e8e6] overflow-x-auto leading-relaxed">
                                            {example.output}
                                        </pre>
                                    </div>
                                    {example.explanation && (
                                        <div className="space-y-1 pt-0.5 font-sans text-xs leading-relaxed">
                                            <span className="text-[#666666] font-mono text-[10px] uppercase tracking-wider block">
                                                Explanation:
                                            </span>
                                            <p className="text-[#a09f9d]">{example.explanation}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Constraints */}
            {problem.constraints && (
                <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#a09f9d] font-medium">
                        Constraints
                    </div>
                    <div className="border border-[#2a2a2a] bg-[#161616] p-3 rounded-[3px] font-mono text-xs text-[#d6d5d4] leading-relaxed whitespace-pre-wrap">
                        {problem.constraints}
                    </div>
                </div>
            )}
        </div>
    )
}
