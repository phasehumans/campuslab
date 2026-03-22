import React from 'react'
import { Clock, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { RECENT_SUBMISSIONS as recentSubmissions } from '@/data/profile'

export function RecentSubmissions() {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#161616] overflow-hidden shadow-xl">
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-base font-medium text-white tracking-tight flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    Recent Submissions
                </h3>
            </div>
            <div className="divide-y divide-white/5">
                {recentSubmissions.map((sub) => (
                    <div
                        key={sub.id}
                        className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                    >
                        <div>
                            <div className="text-sm font-medium text-gray-200 hover:text-white cursor-pointer transition-colors mb-1">
                                {sub.title}
                            </div>
                            <div className="text-xs text-gray-500">{sub.time}</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-medium text-gray-400 bg-[#1A1A1A] border border-white/5 px-2 py-1 rounded">
                                {sub.language}
                            </span>
                            <div className="flex items-center gap-1.5">
                                {sub.status === 'Accepted' ? (
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                ) : (
                                    <XCircle className="h-4 w-4 text-rose-500" />
                                )}
                                <span
                                    className={cn(
                                        'text-xs font-medium hidden sm:inline-block',
                                        sub.status === 'Accepted'
                                            ? 'text-emerald-500'
                                            : 'text-rose-500'
                                    )}
                                >
                                    {sub.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
