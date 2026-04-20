import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Search, BarChart2, Activity, Hash } from 'lucide-react'
import { getApiErrorMessage, getProblems } from '@/lib/api'
import { FilterDropdown } from '@/components/ui/FilterDropdown'
import { Pagination } from '@/components/ui/Pagination'
import { ProblemTable } from '@/components/problem/ProblemTable'

export function ProblemSet() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [difficulty, setDifficulty] = useState('All')
    const [status, setStatus] = useState('All')
    const [topic, setTopic] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 30

    const problemsQuery = useQuery({
        queryKey: ['problems'],
        queryFn: getProblems,
    })

    const allTopics = useMemo(
        () =>
            Array.from(new Set((problemsQuery.data ?? []).flatMap((problem) => problem.tags))).sort(),
        [problemsQuery.data]
    )

    const filteredProblems = useMemo(
        () =>
            (problemsQuery.data ?? []).filter((problem) => {
                const matchesSearch =
                    problem.title.toLowerCase().includes(search.toLowerCase()) ||
                    problem.id.toLowerCase() === search.toLowerCase()
                const matchesDiff = difficulty === 'All' || problem.difficulty === difficulty
                const matchesStatus = status === 'All' || problem.status === status
                const matchesTopic = topic === 'All' || problem.tags.includes(topic)
                return matchesSearch && matchesDiff && matchesStatus && matchesTopic
            }),
        [difficulty, problemsQuery.data, search, status, topic]
    )

    const totalPages = Math.max(1, Math.ceil(filteredProblems.length / itemsPerPage))
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentProblems = filteredProblems.slice(indexOfFirstItem, indexOfLastItem)

    const handleProblemClick = (id: string) => {
        navigate(`/problem/${id}`)
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#1A1A1A] p-3 rounded-2xl border border-white/5 mb-8">
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <FilterDropdown
                        value={difficulty}
                        onChange={(value) => {
                            setDifficulty(value)
                            setCurrentPage(1)
                        }}
                        options={['Easy', 'Medium', 'Hard']}
                        placeholder="Difficulty"
                        icon={BarChart2}
                    />
                    <FilterDropdown
                        value={status}
                        onChange={(value) => {
                            setStatus(value)
                            setCurrentPage(1)
                        }}
                        options={['Solved', 'Attempted', 'Unsolved']}
                        placeholder="Status"
                        icon={Activity}
                    />
                    <FilterDropdown
                        value={topic}
                        onChange={(value) => {
                            setTopic(value)
                            setCurrentPage(1)
                        }}
                        options={allTopics}
                        placeholder="Topic"
                        icon={Hash}
                    />
                </div>

                <div className="relative w-full md:w-72 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-white transition-colors" />
                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value)
                            setCurrentPage(1)
                        }}
                        className="w-full bg-transparent hover:bg-white/5 border border-white/10 focus:border-white/20 rounded-full pl-11 pr-4 py-2 text-sm focus:outline-none transition-all text-white placeholder:text-gray-500 shadow-sm"
                    />
                </div>
            </div>

            {problemsQuery.isLoading ? (
                <div className="rounded-2xl border border-white/10 bg-[#161616] p-8 text-sm text-gray-400">
                    Loading problems...
                </div>
            ) : problemsQuery.isError ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-sm text-red-200">
                    {getApiErrorMessage(problemsQuery.error, 'Unable to load problems')}
                </div>
            ) : (
                <>
                    <ProblemTable problems={currentProblems} onProblemClick={handleProblemClick} />

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        indexOfFirstItem={indexOfFirstItem}
                        indexOfLastItem={indexOfLastItem}
                        totalItems={filteredProblems.length}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            )}
        </div>
    )
}
