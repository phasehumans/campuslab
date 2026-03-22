import { ArrowLeft, Play, CloudUpload } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface SolveScreenNavbarProps {
    handleRun: () => void
    handleSubmit: () => void
}

export function SolveScreenNavbar({ handleRun, handleSubmit }: SolveScreenNavbarProps) {
    const navigate = useNavigate()

    return (
        <nav className="flex items-center justify-between h-12 px-4 border-b border-white/10 bg-[#121212]">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                    <ArrowLeft className="h-4 w-4" /> Back
                </button>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={handleRun}
                    className="flex items-center gap-1.5 bg-[#2C2C2C] hover:bg-[#3A3A3A] text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
                >
                    <Play className="h-4 w-4 text-emerald-500 fill-emerald-500" /> Run
                </button>
                <button
                    onClick={handleSubmit}
                    className="flex items-center gap-1.5 bg-[#1C3325] hover:bg-[#24422F] text-emerald-500 px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
                >
                    <CloudUpload className="h-4 w-4" /> Submit
                </button>
            </div>

            <div className="flex items-center gap-3 w-[100px]">
                {/* Empty div to balance flex layout */}
            </div>
        </nav>
    )
}
