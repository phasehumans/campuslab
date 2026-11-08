import { ChevronUp } from 'lucide-react'
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
        <div className="flex items-center px-3 bg-[#191919] border-t border-[#333333] gap-2 shrink-0 font-mono text-xs h-9 select-none">
            <button
                type="button"
                onClick={() => toggleBottomPanel('testcase')}
                className={cn(
                    'px-2.5 py-1 rounded-[3px] transition-colors cursor-pointer',
                    activeBottomTab === 'testcase' && bottomPanelOpen
                        ? 'text-[#e8e8e6] font-medium bg-[#252423]'
                        : 'text-[#888888] hover:text-[#e8e8e6]'
                )}
            >
                Testcases
            </button>
            <button
                type="button"
                onClick={() => toggleBottomPanel('testresult')}
                className={cn(
                    'px-2.5 py-1 rounded-[3px] transition-colors cursor-pointer',
                    activeBottomTab === 'testresult' && bottomPanelOpen
                        ? 'text-[#e8e8e6] font-medium bg-[#252423]'
                        : 'text-[#888888] hover:text-[#e8e8e6]'
                )}
            >
                Result
            </button>
            <div className="flex-1" />
            <Tooltip content="Expand Panel" position="top" align="end">
                <button
                    type="button"
                    onClick={() => setBottomPanelOpen(true)}
                    className="p-1 text-[#888888] hover:text-[#e8e8e6] hover:bg-[#252423] rounded-[2px] transition-colors cursor-pointer"
                    aria-label="Expand Panel"
                >
                    <ChevronUp className="h-3.5 w-3.5" />
                </button>
            </Tooltip>
        </div>
    )
}
