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
        <nav className="flex items-center justify-between h-12 px-4 border-b border-white/10 bg-[#121212]">
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
                    className="flex items-center gap-1.5 bg-[#2C2C2C] hover:bg-[#3A3A3A] disabled:opacity-60 disabled:cursor-not-allowed text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
                >
                    <Play className="h-4 w-4 text-emerald-500 fill-emerald-500" />
                    {isRunning ? 'Running...' : 'Run'}
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isRunning || isSubmitting}
                    className="flex items-center gap-1.5 bg-[#1C3325] hover:bg-[#24422F] disabled:opacity-60 disabled:cursor-not-allowed text-emerald-500 px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
                >
                    <CloudUpload className="h-4 w-4" />
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>

            <div className="flex items-center gap-3 w-[100px]" />
        </nav>
    )
}
