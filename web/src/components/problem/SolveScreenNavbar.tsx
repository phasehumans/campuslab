import { ArrowLeft, Play, CloudUpload } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface SolveScreenNavbarProps {
    backPath: string
    handleRun: () => void
    handleSubmit: () => void
    isRunning: boolean
    isSubmitting: boolean
}

export function SolveScreenNavbar({
    backPath,
    handleRun,
    handleSubmit,
    isRunning,
    isSubmitting,
}: SolveScreenNavbarProps) {
    const navigate = useNavigate()

    return (
        <nav className="flex items-center justify-between h-12 px-4 border-b border-white/5 bg-[#0F0F0F] relative z-10">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate(backPath)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                    <ArrowLeft className="h-4 w-4" /> Back
                </button>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={handleRun}
                    disabled={isRunning || isSubmitting}
                    className="flex items-center gap-1.5 bg-[#2A2A2A] hover:bg-[#353535] disabled:opacity-60 disabled:cursor-not-allowed text-gray-200 px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
                >
                    <Play className="h-4 w-4 text-emerald-500 fill-emerald-500" />
                    {isRunning ? 'Running...' : 'Run'}
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isRunning || isSubmitting}
                    className="flex items-center gap-1.5 bg-[#3E6FC3] hover:bg-[#325a9e] disabled:opacity-60 disabled:cursor-not-allowed text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors shadow-md shadow-blue-500/10"
                >
                    <CloudUpload className="h-4 w-4" />
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>

            <div className="flex items-center gap-3 w-[100px]" />
        </nav>
    )
}
