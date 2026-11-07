import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { getApiErrorMessage, getProblems } from '@/lib/api'
import { ProblemTable } from '@/components/problem/ProblemTable'
import { SidelinePanel } from '@/components/home/SidelinePanel'

export function ProblemSet() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [difficulty, setDifficulty] = useState('All')
    const [status, setStatus] = useState('All')
    const [topic, setTopic] = useState('All')

    const problemsQuery = useQuery({
        queryKey: ['problems'],
        queryFn: getProblems,
    })

    const allTopics = useMemo(
        () =>
            Array.from(
                new Set((problemsQuery.data ?? []).flatMap((problem) => problem.tags))
            ).sort(),
        [problemsQuery.data]
    )

    const filteredProblems = useMemo(
        () =>
            (problemsQuery.data ?? []).filter((problem) => {
                const matchesSearch =
                    problem.title.toLowerCase().includes(search.toLowerCase()) ||
                    problem.id.toLowerCase() === search.toLowerCase() ||
                    problem.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
                const matchesDiff = difficulty === 'All' || problem.difficulty === difficulty
                const matchesStatus = status === 'All' || problem.status === status
                const matchesTopic = topic === 'All' || problem.tags.includes(topic)
                return matchesSearch && matchesDiff && matchesStatus && matchesTopic
            }),
        [difficulty, problemsQuery.data, search, status, topic]
    )

    const handleProblemClick = (id: string) => {
        navigate(`/problem/${id}`)
    }

    return (
        <div className="w-full space-y-3.5">
            {/* Page Header: Title with count tag */}
            <div className="flex items-center gap-2.5">
                <h1 className="text-base sm:text-lg font-semibold tracking-tight text-[#090a0f] dark:text-[#e8e8e6]">
                    Problem Sheet
                </h1>
                <span className="font-mono text-[11px] text-[#64748b] dark:text-[#a09f9d] bg-[#f1f5f9] dark:bg-[#252423] border border-[#e2e8f0] dark:border-[#333333] px-2 py-0.5 rounded-[3px]">
                    {filteredProblems.length} available problems
                </span>
            </div>

            {/* Two-Column Layout: Left Filter/Problem List & Right Profile/Contests */}
            <div className="flex flex-col lg:flex-row gap-5 items-start">
                {/* Sideline: Profile & Contests (Above on mobile, right on desktop) */}
                <div className="w-full lg:w-[310px] lg:shrink-0 lg:sticky lg:top-18 order-1 lg:order-2">
                    <SidelinePanel totalProblemsCount={problemsQuery.data?.length ?? 0} />
                </div>

                {/* Left Area: Filter Bar & Infinitely Scrollable Table */}
                <div className="flex-1 min-w-0 w-full space-y-3 order-2 lg:order-1">
                    {/* Compact Filter Bar */}
                    <div className="flex flex-col sm:flex-row gap-2.5 items-center justify-between border border-[#e2e8f0] dark:border-[#333333] bg-white dark:bg-[#1e1e1e] p-2.5 rounded-[3px] transition-colors">
                        <div className="relative w-full sm:flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#94a3b8] dark:text-[#a09f9d]" />
                            <input
                                type="text"
                                placeholder="Filter by title, tag, or ID..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-3 py-1.5 border border-[#e2e8f0] dark:border-[#333333] bg-white dark:bg-[#252423] rounded-[2px] font-mono text-xs text-[#090a0f] dark:text-[#e8e8e6] placeholder:text-[#94a3b8] dark:placeholder:text-[#a09f9d]/60 focus:outline-none focus:border-[#87b2f4]"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto font-mono text-xs">
                            {/* Topic select */}
                            <select
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="flex-1 sm:flex-none px-2.5 py-1.5 border border-[#e2e8f0] dark:border-[#333333] rounded-[2px] bg-white dark:bg-[#252423] text-[#52525b] dark:text-[#e8e8e6] focus:outline-none focus:border-[#87b2f4]"
                            >
                                <option value="All">All Topics</option>
                                {allTopics.map((t) => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>

                            {/* Difficulty select */}
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="flex-1 sm:flex-none px-2.5 py-1.5 border border-[#e2e8f0] dark:border-[#333333] rounded-[2px] bg-white dark:bg-[#252423] text-[#52525b] dark:text-[#e8e8e6] focus:outline-none focus:border-[#87b2f4]"
                            >
                                <option value="All">All Difficulties</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>

                            {/* Status select */}
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="flex-1 sm:flex-none px-2.5 py-1.5 border border-[#e2e8f0] dark:border-[#333333] rounded-[2px] bg-white dark:bg-[#252423] text-[#52525b] dark:text-[#e8e8e6] focus:outline-none focus:border-[#87b2f4]"
                            >
                                <option value="All">All Statuses</option>
                                <option value="Solved">Solved</option>
                                <option value="Attempted">Attempted</option>
                                <option value="Unsolved">Unsolved</option>
                            </select>
                        </div>
                    </div>

                    {/* Problem Table: All filtered problems scrollable until end (No Next/Prev buttons) */}
                    {problemsQuery.isLoading ? (
                        <div className="border border-[#e2e8f0] dark:border-[#333333] bg-white dark:bg-[#1e1e1e] p-8 text-center font-mono text-xs text-[#94a3b8] dark:text-[#a09f9d] rounded-[3px]">
                            Loading problem database...
                        </div>
                    ) : problemsQuery.isError ? (
                        <div className="border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 p-4 text-xs font-mono text-red-700 dark:text-red-400 rounded-[3px]">
                            {getApiErrorMessage(problemsQuery.error, 'Unable to load problems')}
                        </div>
                    ) : (
                        <ProblemTable
                            problems={filteredProblems}
                            onProblemClick={handleProblemClick}
                            startIndex={1}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
