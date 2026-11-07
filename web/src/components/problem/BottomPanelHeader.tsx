import { CheckCircle2, TerminalSquare, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip } from '@/components/ui/Tooltip'

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
        <div className="flex items-center gap-1 bg-[#191919] px-3 pt-1.5 border-b border-[#333333] font-mono text-xs">
            <button
                onClick={() => setActiveBottomTab('testcase')}
                className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-t-[2px] border-b-2 transition-colors cursor-pointer',
                    activeBottomTab === 'testcase'
                        ? 'border-[#87b2f4] text-[#e8e8e6] font-medium bg-[#252423]'
                        : 'border-transparent text-[#a09f9d] hover:text-[#e8e8e6]'
                )}
            >
                <CheckCircle2 className="h-3 w-3 text-[#10b981]" />
                <span>Testcases</span>
            </button>
            <button
                onClick={() => setActiveBottomTab('testresult')}
                className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-t-[2px] border-b-2 transition-colors cursor-pointer',
                    activeBottomTab === 'testresult'
                        ? 'border-[#87b2f4] text-[#e8e8e6] font-medium bg-[#252423]'
                        : 'border-transparent text-[#a09f9d] hover:text-[#e8e8e6]'
                )}
            >
                <TerminalSquare className="h-3 w-3 text-[#87b2f4]" />
                <span>Result</span>
            </button>
            <div className="flex-1" />
            <Tooltip content="Collapse Panel" position="top" align="end">
                <button
                    onClick={() => setBottomPanelOpen(false)}
                    className="p-1 text-[#a09f9d] hover:text-[#e8e8e6] hover:bg-[#252423] rounded-[2px] transition-colors cursor-pointer mb-1"
                >
                    <ChevronDown className="h-3.5 w-3.5" />
                </button>
            </Tooltip>
        </div>
    )
}
