import React from 'react'
import { Clock, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SubmissionRecord } from '@/lib/types'

interface RecentSubmissionsProps {
    submissions: SubmissionRecord[]
}

const formatRelativeTime = (value: string) => {
    const createdAt = new Date(value).getTime()
    const diffInMs = Date.now() - createdAt
    const diffInMinutes = Math.max(1, Math.floor(diffInMs / (1000 * 60)))

    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`
}

export function RecentSubmissions({ submissions }: RecentSubmissionsProps) {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#161616] overflow-hidden shadow-xl">
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-base font-medium text-white tracking-tight flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    Recent Submissions
                </h3>
            </div>
            <div className="divide-y divide-white/5">
                {submissions.length ? (
                    submissions.map((submission) => (
                        <div
                            key={submission.id}
                            className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                        >
                            <div>
                                <div className="text-sm font-medium text-gray-200 mb-1">
                                    {submission.title ?? submission.problemId}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {formatRelativeTime(submission.createdAt)}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-medium text-gray-400 bg-[#1A1A1A] border border-white/5 px-2 py-1 rounded">
                                    {submission.language}
                                </span>
                                <div className="flex items-center gap-1.5">
                                    {submission.status === 'Accepted' ? (
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-rose-500" />
                                    )}
                                    <span
                                        className={cn(
                                            'text-xs font-medium hidden sm:inline-block',
                                            submission.status === 'Accepted'
                                                ? 'text-emerald-500'
                                                : 'text-rose-500'
                                        )}
                                    >
                                        {submission.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-6 text-sm text-gray-500">No submissions yet.</div>
                )}
            </div>
        </div>
    )
}
