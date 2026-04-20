import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ContestQuestion } from '@/lib/types'

interface QuestionsListProps {
    roomCode: string
    questions: ContestQuestion[]
}

export function QuestionsList({ roomCode, questions }: QuestionsListProps) {
    const navigate = useNavigate()

    return (
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-medium text-white tracking-tight">Questions</h2>
            <div className="space-y-3">
                {questions.map((question, index) => (
                    <div
                        key={question.id}
                        onClick={() => navigate(`/problem/${question.id}?room=${roomCode}`)}
                        className="group flex items-center justify-between p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-5">
                            <span className="text-gray-600 font-mono text-sm w-4 text-right">
                                {index + 1}
                            </span>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-base font-medium text-gray-200 group-hover:text-white transition-colors">
                                        {question.title}
                                    </h3>
                                    {question.solved ? (
                                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                    ) : null}
                                </div>
                                <div className="flex items-center gap-3 mt-1.5 text-xs">
                                    <span
                                        className={cn(
                                            'font-medium',
                                            question.difficulty === 'Easy'
                                                ? 'text-emerald-400'
                                                : question.difficulty === 'Medium'
                                                  ? 'text-amber-400'
                                                  : 'text-rose-400'
                                        )}
                                    >
                                        {question.difficulty}
                                    </span>
                                    <span className="text-gray-600">•</span>
                                    <span className="text-gray-400">{question.points} Points</span>
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
