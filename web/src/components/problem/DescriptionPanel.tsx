import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import type { ProblemDetail } from '@/lib/types'

interface DescriptionPanelProps {
    problem: ProblemDetail
}

export function DescriptionPanel({ problem }: DescriptionPanelProps) {
    return (
        <>
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
                    {problem.status === 'Solved' ? (
                        <span className="text-emerald-500 text-sm font-medium flex items-center gap-1">
                            Solved <CheckCircle2 className="h-4 w-4" />
                        </span>
                    ) : null}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            problem.difficulty === 'Easy'
                                ? 'text-emerald-500 bg-emerald-500/10'
                                : problem.difficulty === 'Medium'
                                  ? 'text-yellow-500 bg-yellow-500/10'
                                  : 'text-red-500 bg-red-500/10'
                        }`}
                    >
                        {problem.difficulty}
                    </span>

                    {problem.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-gray-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="space-y-8 text-sm text-gray-300 leading-relaxed">
                <section className="space-y-4">
                    {problem.description.split('\n\n').map((paragraph, index) => (
                        <p key={`${problem.id}-paragraph-${index}`}>{paragraph}</p>
                    ))}
                </section>

                <section className="space-y-4">
                    <h2 className="text-base font-semibold text-white">Examples</h2>
                    <div className="space-y-4">
                        {problem.examples.map((example, index) => (
                            <div key={`${problem.id}-example-${index}`} className="space-y-2">
                                <p className="font-bold text-white">
                                    {example.title ?? `Example ${index + 1}`}
                                </p>
                                <pre className="whitespace-pre-wrap bg-white/5 p-4 rounded-lg border border-white/5 text-gray-300 font-mono text-xs leading-relaxed">
                                    <span className="font-semibold text-white">Input:</span>{' '}
                                    {example.input}
                                    {'\n'}
                                    <span className="font-semibold text-white">Output:</span>{' '}
                                    {example.output}
                                    {example.explanation
                                        ? `\nExplanation: ${example.explanation}`
                                        : ''}
                                </pre>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-2">
                    <h2 className="text-base font-semibold text-white">Constraints</h2>
                    <pre className="whitespace-pre-wrap bg-white/5 p-4 rounded-lg border border-white/5 text-gray-300 font-mono text-xs leading-relaxed">
                        {problem.constraints}
                    </pre>
                </section>

                {problem.hints ? (
                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-white">Hint</h2>
                        <p>{problem.hints}</p>
                    </section>
                ) : null}

                {problem.editorial ? (
                    <section className="space-y-2">
                        <h2 className="text-base font-semibold text-white">Editorial</h2>
                        <p>{problem.editorial}</p>
                    </section>
                ) : null}
            </div>
        </>
    )
}
