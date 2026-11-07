import { CheckCircle2, TerminalSquare, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip } from '@/components/ui/Tooltip'

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
        <div className="flex items-center px-3.5 py-1.5 bg-[#191919] border-t border-[#333333] gap-3 shrink-0 font-mono text-xs">
            <button
                onClick={() => toggleBottomPanel('testcase')}
                className={cn(
                    'flex items-center gap-1.5 transition-colors cursor-pointer',
                    activeBottomTab === 'testcase' && bottomPanelOpen
                        ? 'text-[#e8e8e6] font-medium'
                        : 'text-[#a09f9d] hover:text-[#e8e8e6]'
                )}
            >
                <CheckCircle2 className="h-3 w-3 text-[#10b981]" />
                <span>Testcases</span>
            </button>
            <div className="w-px h-3 bg-[#333333]" />
            <button
                onClick={() => toggleBottomPanel('testresult')}
                className={cn(
                    'flex items-center gap-1.5 transition-colors cursor-pointer',
                    activeBottomTab === 'testresult' && bottomPanelOpen
                        ? 'text-[#e8e8e6] font-medium'
                        : 'text-[#a09f9d] hover:text-[#e8e8e6]'
                )}
            >
                <TerminalSquare className="h-3 w-3 text-[#87b2f4]" />
                <span>Result</span>
            </button>
            <div className="flex-1" />
            <Tooltip content="Expand Panel" position="top" align="end">
                <button
                    onClick={() => setBottomPanelOpen(true)}
                    className="p-1 text-[#a09f9d] hover:text-[#e8e8e6] hover:bg-[#252423] rounded-[2px] transition-colors cursor-pointer"
                >
                    <ChevronUp className="h-3.5 w-3.5" />
                </button>
            </Tooltip>
        </div>
    )
}
