import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOCK_QUESTIONS } from '@/data/contest'

export function QuestionsList() {
    const navigate = useNavigate()

    return (
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-medium text-white tracking-tight">Questions</h2>
            <div className="space-y-3">
                {MOCK_QUESTIONS.map((q, i) => (
                    <div
                        key={q.id}
                        onClick={() => navigate(`/problem/${q.id}`)}
                        className="group flex items-center justify-between p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-5">
                            <span className="text-gray-600 font-mono text-sm w-4 text-right">
                                {i + 1}
                            </span>
                            <div>
                                <h3 className="text-base font-medium text-gray-200 group-hover:text-white transition-colors">
                                    {q.title}
                                </h3>
                                <div className="flex items-center gap-3 mt-1.5 text-xs">
                                    <span
                                        className={cn(
                                            'font-medium',
                                            q.difficulty === 'Easy'
                                                ? 'text-emerald-400'
                                                : q.difficulty === 'Medium'
                                                  ? 'text-amber-400'
                                                  : 'text-rose-400'
                                        )}
                                    >
                                        {q.difficulty}
                                    </span>
                                    <span className="text-gray-600">•</span>
                                    <span className="text-gray-400">{q.points} Points</span>
                                </div>
                            </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                ))}
            </div>
        </div>
    )
}
