import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, BarChart2, Activity, Hash } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { problemsData } from '@/data/problems'
import { FilterDropdown } from '@/components/ui/FilterDropdown'
import { Pagination } from '@/components/ui/Pagination'
import { ProblemTable } from '@/components/problem/ProblemTable'

export function ProblemSet() {
    const navigate = useNavigate()
    const { isLoggedIn, openModal } = useAuth()
    const [search, setSearch] = useState('')
    const [difficulty, setDifficulty] = useState('All')
    const [status, setStatus] = useState('All')
    const [topic, setTopic] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 30

    const allTopics = Array.from(new Set(problemsData.flatMap((p) => p.topics))).sort()

    const filteredProblems = problemsData.filter((p) => {
        const matchesSearch =
            p.title.toLowerCase().includes(search.toLowerCase()) || p.id.toString() === search
        const matchesDiff = difficulty === 'All' || p.difficulty === difficulty
        const matchesStatus = status === 'All' || p.status === status
        const matchesTopic = topic === 'All' || p.topics.includes(topic)
        return matchesSearch && matchesDiff && matchesStatus && matchesTopic
    })

    const totalPages = Math.ceil(filteredProblems.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentProblems = filteredProblems.slice(indexOfFirstItem, indexOfLastItem)

    const handleProblemClick = (id: number) => {
        if (isLoggedIn) {
            navigate(`/problem/${id}`)
        } else {
            openModal()
        }
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Filters & Search Card */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#1A1A1A] p-3 rounded-2xl border border-white/5 mb-8">
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <FilterDropdown
                        value={difficulty}
                        onChange={(v) => {
                            setDifficulty(v)
                            setCurrentPage(1)
                        }}
                        options={['Easy', 'Medium', 'Hard']}
                        placeholder="Difficulty"
                        icon={BarChart2}
                    />
                    <FilterDropdown
                        value={status}
                        onChange={(v) => {
                            setStatus(v)
                            setCurrentPage(1)
                        }}
                        options={['Solved', 'Attempted', 'Unsolved']}
                        placeholder="Status"
                        icon={Activity}
                    />
                    <FilterDropdown
                        value={topic}
                        onChange={(v) => {
                            setTopic(v)
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
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setCurrentPage(1)
                        }}
                        className="w-full bg-transparent hover:bg-white/5 border border-white/10 focus:border-white/20 rounded-full pl-11 pr-4 py-2 text-sm focus:outline-none transition-all text-white placeholder:text-gray-500 shadow-sm"
                    />
                </div>
            </div>

            {/* Table */}
            <ProblemTable problems={currentProblems} onProblemClick={handleProblemClick} />

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                indexOfFirstItem={indexOfFirstItem}
                indexOfLastItem={indexOfLastItem}
                totalItems={filteredProblems.length}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}
