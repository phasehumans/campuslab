import { CheckCircle2, TerminalSquare, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BottomPanelFooterProps {
    activeBottomTab: string
    bottomPanelOpen: boolean
    toggleBottomPanel: (tab: string) => void
    setBottomPanelOpen: (open: boolean) => void
}

export function BottomPanelFooter({
    activeBottomTab,
    bottomPanelOpen,
    toggleBottomPanel,
    setBottomPanelOpen,
}: BottomPanelFooterProps) {
    return (
        <div className="flex items-center px-4 py-2 bg-[#1E1E1E] border-t border-white/5 gap-3 shrink-0">
            <button
                onClick={() => toggleBottomPanel('testcase')}
                className={cn(
                    'flex items-center gap-1.5 text-xs font-medium transition-colors',
                    activeBottomTab === 'testcase' && bottomPanelOpen
                        ? 'text-white'
                        : 'text-gray-400 hover:text-gray-200'
                )}
            >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Testcase
            </button>
            <div className="w-px h-3 bg-white/10" />
            <button
                onClick={() => toggleBottomPanel('testresult')}
                className={cn(
                    'flex items-center gap-1.5 text-xs font-medium transition-colors',
                    activeBottomTab === 'testresult' && bottomPanelOpen
                        ? 'text-white'
                        : 'text-gray-400 hover:text-gray-200'
                )}
            >
                <TerminalSquare className="h-3.5 w-3.5 text-blue-400" /> Test Result
            </button>
            <div className="flex-1" />
            <button
                onClick={() => setBottomPanelOpen(true)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            >
                <ChevronUp className="h-4 w-4" />
            </button>
        </div>
    )
}
