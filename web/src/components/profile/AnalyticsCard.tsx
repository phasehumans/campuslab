import React from 'react'
import { Award, Code2, Calendar, CheckCircle2 } from 'lucide-react'
import type { SubmissionRecord } from '@/lib/types'

interface AnalyticsCardProps {
    submissions: SubmissionRecord[]
}

const LANGUAGE_COLORS: Record<string, string> = {
    cpp: '#3572A5',
    c: '#555555',
    python: '#F1E05A',
    java: '#b07219',
    rust: '#dea584',
}

const LANGUAGE_DISPLAY_NAMES: Record<string, string> = {
    cpp: 'C++',
    c: 'C',
    python: 'Python',
    java: 'Java',
    rust: 'Rust',
}

const DEFAULT_COLOR = '#94a3b8'

export function AnalyticsCard({ submissions }: AnalyticsCardProps) {
    // 1. Calculate Accuracy
    const totalSubmissions = submissions.length
    const acceptedSubmissions = submissions.filter((s) => s.status === 'Accepted').length
    const accuracyRate = totalSubmissions > 0 ? Math.round((acceptedSubmissions / totalSubmissions) * 100) : 0

    // 2. Calculate Languages Used
    const languageCounts: Record<string, number> = {}
    submissions.forEach((sub) => {
        const lang = sub.language?.toLowerCase() || 'unknown'
        languageCounts[lang] = (languageCounts[lang] || 0) + 1
    })

    const languagesList = Object.entries(languageCounts)
        .map(([name, count]) => ({
            name,
            count,
            percentage: totalSubmissions > 0 ? Math.round((count / totalSubmissions) * 100) : 0,
        }))
        .sort((a, b) => b.count - a.count)

    const preferredLanguageKey = languagesList[0]?.name || 'none'
    const preferredLanguageName = LANGUAGE_DISPLAY_NAMES[preferredLanguageKey] || (preferredLanguageKey === 'none' ? 'None' : preferredLanguageKey)

    // 3. Unique Days Active
    const uniqueDays = new Set(
        submissions.map((s) => new Date(s.createdAt).toDateString())
    ).size

    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.03)] space-y-6">
            <h3 className="text-base font-bold text-slate-800 tracking-tight flex items-center gap-2 border-b border-slate-100 pb-4">
                <Award className="h-4 w-4 text-[#3E6FC3]" />
                Performance & Languages
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left side: Segmented Language Bar */}
                <div className="space-y-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Language Distribution</span>
                    
                    {languagesList.length > 0 ? (
                        <div>
                            {/* Horizontal Segmented Bar */}
                            <div className="h-2 w-full bg-slate-100 rounded-full flex overflow-hidden">
                                {languagesList.map((lang) => {
                                    const color = LANGUAGE_COLORS[lang.name] || DEFAULT_COLOR
                                    return (
                                        <div
                                            key={lang.name}
                                            className="h-full first:rounded-l-full last:rounded-r-full"
                                            style={{
                                                width: `${lang.percentage}%`,
                                                backgroundColor: color,
                                            }}
                                            title={`${LANGUAGE_DISPLAY_NAMES[lang.name] || lang.name}: ${lang.percentage}%`}
                                        />
                                    )
                                })}
                            </div>

                            {/* Legend */}
                            <div className="flex flex-wrap gap-x-4 gap-y-2.5 mt-4">
                                {languagesList.map((lang) => {
                                    const color = LANGUAGE_COLORS[lang.name] || DEFAULT_COLOR
                                    const displayName = LANGUAGE_DISPLAY_NAMES[lang.name] || lang.name
                                    return (
                                        <div key={lang.name} className="flex items-center gap-2 text-xs">
                                            <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                                            <span className="font-bold text-slate-700">{displayName}</span>
                                            <span className="text-slate-400 font-normal">
                                                ({lang.count} sub)
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="text-xs text-slate-400 font-medium py-2">
                            No language data available. Solve problems to populate this.
                        </div>
                    )}
                </div>

                {/* Right side: Performance Metrics (Minimal layout) */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                            <div>
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Accuracy</span>
                                <span className="text-[11px] text-slate-500 font-medium">{acceptedSubmissions} of {totalSubmissions} accepted</span>
                            </div>
                        </div>
                        <span className="text-2xl font-extrabold text-slate-800 tracking-tight">{accuracyRate}%</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 flex flex-col justify-between shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <Calendar className="h-4 w-4 text-orange-500 shrink-0" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Days</span>
                            </div>
                            <span className="text-2xl font-extrabold text-slate-800 tracking-tight leading-none">{uniqueDays} Days</span>
                        </div>

                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 flex flex-col justify-between shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <Code2 className="h-4 w-4 text-indigo-500 shrink-0" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Preferred</span>
                            </div>
                            <span className="text-base font-extrabold text-slate-800 tracking-tight leading-none truncate capitalize">{preferredLanguageName}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
