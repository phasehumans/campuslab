import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { getApiErrorMessage, getProblems } from '@/lib/api'
import { ProblemTable } from '@/components/problem/ProblemTable'
import { ProblemPagination } from '@/components/problem/ProblemPagination'
import { SidelinePanel } from '@/components/home/SidelinePanel'

export function ProblemSet() {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const pageSize = 25
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [difficulty, setDifficulty] = useState('All')
    const [status, setStatus] = useState('All')
    const [topic, setTopic] = useState('All')
    const [availableTopics, setAvailableTopics] = useState<string[]>([])

    // Debounce search input to avoid hitting backend on every keystroke
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
            setPage(1)
        }, 300)
        return () => clearTimeout(timer)
    }, [search])

    const problemsQuery = useQuery({
        queryKey: [
            'problems',
            { page, pageSize, search: debouncedSearch, difficulty, status, topic },
        ],
        queryFn: () =>
            getProblems({
                page,
                limit: pageSize,
                search: debouncedSearch,
                difficulty,
                status,
                topic,
            }),
        placeholderData: keepPreviousData,
    })

    const problemsData = problemsQuery.data
    const rawList = useMemo(() => {
        if (!problemsData) return []
        if (Array.isArray(problemsData)) return problemsData
        if (Array.isArray(problemsData.problems)) return problemsData.problems
        return []
    }, [problemsData])

    // Detect if backend already filtered & paginated (returning <= pageSize items with total metadata)
    const isServerPaginated = useMemo(() => {
        return (
            typeof problemsData?.total === 'number' &&
            typeof problemsData?.totalPages === 'number' &&
            rawList.length <= pageSize
        )
    }, [problemsData, rawList.length, pageSize])

    // Client-side filtering fallback if backend returns full unpaginated catalog (e.g. remote API)
    const filteredList = useMemo(() => {
        if (isServerPaginated) return rawList

        return rawList.filter((problem) => {
            const matchesSearch =
                !debouncedSearch ||
                problem.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                problem.id.toLowerCase() === debouncedSearch.toLowerCase() ||
                (Array.isArray(problem.tags) &&
                    problem.tags.some((t) =>
                        t.toLowerCase().includes(debouncedSearch.toLowerCase())
                    ))
            const matchesDiff = difficulty === 'All' || problem.difficulty === difficulty
            const matchesStatus = status === 'All' || problem.status === status
            const matchesTopic =
                topic === 'All' || (Array.isArray(problem.tags) && problem.tags.includes(topic))
            return matchesSearch && matchesDiff && matchesStatus && matchesTopic
        })
    }, [isServerPaginated, rawList, debouncedSearch, difficulty, status, topic])

    const totalProblems = useMemo(() => {
        if (isServerPaginated && typeof problemsData?.total === 'number') {
            return problemsData.total
        }
        return filteredList.length
    }, [isServerPaginated, problemsData?.total, filteredList.length])

    const totalPages = useMemo(() => {
        if (isServerPaginated && typeof problemsData?.totalPages === 'number') {
            return problemsData.totalPages
        }
        return Math.max(1, Math.ceil(totalProblems / pageSize))
    }, [isServerPaginated, problemsData?.totalPages, totalProblems, pageSize])

    // Exactly 25 items batch to display on screen (replacing questions in-place per page)
    const displayedProblems = useMemo(() => {
        if (isServerPaginated) {
            return rawList
        }
        const start = (page - 1) * pageSize
        return filteredList.slice(start, start + pageSize)
    }, [isServerPaginated, rawList, filteredList, page, pageSize])

    // Retain all available topics once loaded so filter options don't disappear when selecting one
    useEffect(() => {
        if (
            problemsData?.allTags &&
            Array.isArray(problemsData.allTags) &&
            problemsData.allTags.length > 0
        ) {
            setAvailableTopics(problemsData.allTags)
        } else if (rawList.length > 0 && availableTopics.length === 0) {
            const derived = Array.from(
                new Set(rawList.flatMap((p) => (Array.isArray(p.tags) ? p.tags : [])))
            ).sort()
            if (derived.length > 0) {
                setAvailableTopics(derived)
            }
        }
    }, [problemsData, rawList, availableTopics.length])

    const handleTopicChange = (newTopic: string) => {
        setTopic(newTopic)
        setPage(1)
    }

    const handleDifficultyChange = (newDiff: string) => {
        setDifficulty(newDiff)
        setPage(1)
    }

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus)
        setPage(1)
    }

    const handleProblemClick = (id: string) => {
        navigate(`/problem/${id}`)
    }

    return (
        <div className="w-full space-y-3 pb-6">
            {/* Page Header: Title */}
            <div className="flex items-center gap-2.5">
                <h1 className="text-base sm:text-lg font-semibold tracking-tight text-[#090a0f] dark:text-[#e8e8e6]">
                    Problem Sheet
                </h1>
            </div>

            {/* Two-Column Layout: Left Filter/Problem List & Right Profile/Contests */}
            <div className="flex flex-col lg:flex-row gap-4 xl:gap-5 items-start">
                {/* Sideline: Profile & Contests (Mobile: Above Table, Desktop: Right Column) */}
                <div className="w-full lg:w-[280px] xl:w-[300px] lg:shrink-0 order-1 lg:order-2">
                    <SidelinePanel totalProblemsCount={totalProblems} />
                </div>

                {/* Left Area: Filter Bar, Problem Table & Attached Pagination Footer (Mobile: Below Sideline, Desktop: Left Column) */}
                <div className="flex-1 min-w-0 w-full space-y-2.5 order-2 lg:order-1">
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
                                onChange={(e) => handleTopicChange(e.target.value)}
                                className="flex-1 sm:flex-none px-2.5 py-1.5 border border-[#e2e8f0] dark:border-[#333333] rounded-[2px] bg-white dark:bg-[#252423] text-[#52525b] dark:text-[#e8e8e6] focus:outline-none focus:border-[#87b2f4]"
                            >
                                <option value="All">All Topics</option>
                                {availableTopics.map((t) => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>

                            {/* Difficulty select */}
                            <select
                                value={difficulty}
                                onChange={(e) => handleDifficultyChange(e.target.value)}
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
                                onChange={(e) => handleStatusChange(e.target.value)}
                                className="flex-1 sm:flex-none px-2.5 py-1.5 border border-[#e2e8f0] dark:border-[#333333] rounded-[2px] bg-white dark:bg-[#252423] text-[#52525b] dark:text-[#e8e8e6] focus:outline-none focus:border-[#87b2f4]"
                            >
                                <option value="All">All Statuses</option>
                                <option value="Solved">Solved</option>
                                <option value="Attempted">Attempted</option>
                                <option value="Unsolved">Unsolved</option>
                            </select>
                        </div>
                    </div>

                    {/* Problem Table with Integrated Pagination Footer */}
                    {problemsQuery.isLoading ? (
                        <div className="border border-[#e2e8f0] dark:border-[#333333] bg-white dark:bg-[#1e1e1e] p-8 text-center font-mono text-xs text-[#94a3b8] dark:text-[#a09f9d] rounded-[3px]">
                            Loading problem database...
                        </div>
                    ) : problemsQuery.isError ? (
                        <div className="border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 p-4 text-xs font-mono text-red-700 dark:text-red-400 rounded-[3px]">
                            {getApiErrorMessage(problemsQuery.error, 'Unable to load problems')}
                        </div>
                    ) : (
                        <div
                            className={
                                problemsQuery.isFetching
                                    ? 'opacity-75 transition-opacity'
                                    : 'transition-opacity'
                            }
                        >
                            <ProblemTable
                                problems={displayedProblems}
                                onProblemClick={handleProblemClick}
                                startIndex={(page - 1) * pageSize + 1}
                                footer={
                                    <ProblemPagination
                                        currentPage={page}
                                        totalPages={totalPages}
                                        totalCount={totalProblems}
                                        pageSize={pageSize}
                                        onPageChange={(newPage) => setPage(newPage)}
                                    />
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
