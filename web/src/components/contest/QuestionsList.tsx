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
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Questions</h2>
            <div className="space-y-3">
                {questions.map((question, index) => (
                    <div
                        key={question.id}
                        onClick={() => navigate(`/problem/${question.id}?room=${roomCode}`)}
                        className="group flex items-center justify-between p-5 rounded-xl border border-slate-100 bg-white hover:bg-slate-50/50 hover:border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-200 cursor-pointer"
                    >
                        <div className="flex items-center gap-5">
                            <span className="text-slate-400 font-mono text-sm w-4 text-right">
                                {index + 1}
                            </span>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-base font-bold text-slate-700 group-hover:text-[#3E6FC3] transition-colors">
                                        {question.title}
                                    </h3>
                                    {question.solved ? (
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    ) : null}
                                </div>
                                <div className="flex items-center gap-3 mt-1.5 text-xs">
                                    <span
                                        className={cn(
                                            'font-semibold px-2 py-0.5 rounded-full border text-[11px]',
                                            question.difficulty === 'Easy'
                                                ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
                                                : question.difficulty === 'Medium'
                                                  ? 'text-amber-700 bg-amber-50 border-amber-100'
                                                  : 'text-rose-700 bg-rose-50 border-rose-100'
                                        )}
                                    >
                                        {question.difficulty}
                                    </span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-slate-500 font-medium">
                                        {question.points} Points
                                    </span>
                                </div>
                            </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-[#3E6FC3] transition-colors" />
                    </div>
                ))}
            </div>
        </div>
    )
}
