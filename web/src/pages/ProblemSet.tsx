import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Search, BarChart2, Activity, Hash, BookOpen, Clock, Lightbulb, Award, Star, ArrowRight } from 'lucide-react'
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

    const problems = problemsQuery.data ?? []
    const solvedCount = problems.filter((p) => p.status === 'Solved').length
    const totalCount = problems.length
    const percentDone = totalCount === 0 ? 0 : Math.round((solvedCount / totalCount) * 100)
    const totalModules = allTopics.length

    const handleResume = () => {
        const firstUnsolved = problems.find((p) => p.status !== 'Solved')
        if (firstUnsolved) {
            navigate(`/problem/${firstUnsolved.id}`)
        } else if (problems.length > 0) {
            navigate(`/problem/${problems[0].id}`)
        }
    }

    const handleProblemClick = (id: string) => {
        navigate(`/problem/${id}`)
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* CodeChef Style Practice Banner */}
            <div className="w-full bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F2A5C] text-white p-8 rounded-3xl relative overflow-hidden shadow-xl mb-8 border border-white/5">
                {/* Banner grid overlay */}
                <div 
                    className="absolute inset-0 pointer-events-none opacity-[0.05]" 
                    style={{
                        backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                    }}
                />
                {/* Glowing decorative elements */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-[#3E6FC3]/20 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="max-w-2xl space-y-4">
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 text-[#93C5FD]">
                            <BookOpen className="h-3.5 w-3.5" />
                            Practice Data Structures and Algorithms
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
                            Practice Data Structures and Algorithms
                        </h1>
                        <p className="text-sm sm:text-base text-slate-300/95 leading-relaxed max-w-xl font-medium">
                            Enhance your algorithmic intuition and problem-solving speed by tackling curated exercises on Linked Lists, Stacks, Trees, Graphs, Two Pointers, Dynamic Programming, and more. Solve over {totalCount} structured problems in total.
                        </p>
                    </div>

                    {/* Floating Info & Progress Card */}
                    <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full lg:max-w-sm flex flex-col justify-between shadow-2xl relative overflow-hidden shrink-0">
                        <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-5 mb-5 text-center">
                            <div>
                                <div className="flex justify-center mb-1.5">
                                    <Clock className="h-5 w-5 text-blue-400" />
                                </div>
                                <span className="block text-lg font-bold text-white leading-none">Self-Paced</span>
                                <span className="text-[10px] text-blue-300 uppercase font-bold tracking-wider">Time</span>
                            </div>
                            <div>
                                <div className="flex justify-center mb-1.5">
                                    <Lightbulb className="h-5 w-5 text-blue-400" />
                                </div>
                                <span className="block text-lg font-bold text-white leading-none">{totalCount}</span>
                                <span className="text-[10px] text-blue-300 uppercase font-bold tracking-wider">Problems</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs font-semibold text-blue-200">
                                    <span>{solvedCount}/{totalCount} Problems</span>
                                    <span>{percentDone}% done</span>
                                </div>
                                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-[#10B981] rounded-full transition-all duration-500" 
                                        style={{ width: `${percentDone}%` }}
                                    />
                                </div>
                            </div>
                            
                            <button
                                onClick={handleResume}
                                className="w-full bg-[#3E6FC3] hover:bg-[#325a9e] text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 text-sm"
                            >
                                Resume Practicing <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] mb-8 relative z-30">
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
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#3E6FC3] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value)
                            setCurrentPage(1)
                        }}
                        className="w-full bg-slate-50 hover:bg-slate-100/60 border border-slate-200 focus:border-[#3E6FC3]/40 focus:bg-white rounded-full pl-11 pr-4 py-2.5 text-sm focus:outline-none transition-all text-slate-800 placeholder:text-slate-400 shadow-inner"
                    />
                </div>
            </div>

            {problemsQuery.isLoading ? (
                <div className="rounded-2xl border border-slate-100 bg-white p-8 text-sm text-slate-400 shadow-sm">
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
