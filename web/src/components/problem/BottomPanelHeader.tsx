import { CheckCircle2, TerminalSquare, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BottomPanelHeaderProps {
    activeBottomTab: string
    setActiveBottomTab: (tab: string) => void
    setBottomPanelOpen: (open: boolean) => void
}

export function BottomPanelHeader({
    activeBottomTab,
    setActiveBottomTab,
    setBottomPanelOpen,
}: BottomPanelHeaderProps) {
    return (
        <div className="flex items-center gap-1 bg-[#181818] px-2 pt-2 border-b border-white/5">
            <button
                onClick={() => setActiveBottomTab('testcase')}
                className={cn(
                    'flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-t-lg transition-colors',
                    activeBottomTab === 'testcase'
                        ? 'bg-[#1E1E1E] text-white'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-[#1E1E1E]/50'
                )}
            >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Testcase
            </button>
            <button
                onClick={() => setActiveBottomTab('testresult')}
                className={cn(
                    'flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-t-lg transition-colors',
                    activeBottomTab === 'testresult'
                        ? 'bg-[#1E1E1E] text-white'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-[#1E1E1E]/50'
                )}
            >
                <TerminalSquare className="h-3.5 w-3.5 text-blue-400" /> Test Result
            </button>
            <div className="flex-1" />
            <button
                onClick={() => setBottomPanelOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors mr-2"
            >
                <ChevronDown className="h-4 w-4" />
            </button>
        </div>
    )
}
