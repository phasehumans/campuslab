import { ChevronDown } from 'lucide-react'
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
        <div className="flex items-center gap-1 bg-[#191919] px-3 border-b border-[#333333] font-mono text-xs h-9 select-none shrink-0">
            <button
                type="button"
                onClick={() => setActiveBottomTab('testcase')}
                className={cn(
                    'px-2.5 py-1 rounded-[3px] transition-colors cursor-pointer',
                    activeBottomTab === 'testcase'
                        ? 'text-[#e8e8e6] font-medium bg-[#252423]'
                        : 'text-[#888888] hover:text-[#e8e8e6]'
                )}
            >
                Testcases
            </button>
            <button
                type="button"
                onClick={() => setActiveBottomTab('testresult')}
                className={cn(
                    'px-2.5 py-1 rounded-[3px] transition-colors cursor-pointer',
                    activeBottomTab === 'testresult'
                        ? 'text-[#e8e8e6] font-medium bg-[#252423]'
                        : 'text-[#888888] hover:text-[#e8e8e6]'
                )}
            >
                Result
            </button>
            <div className="flex-1" />
            <Tooltip content="Collapse Panel" position="top" align="end">
                <button
                    type="button"
                    onClick={() => setBottomPanelOpen(false)}
                    className="p-1 text-[#888888] hover:text-[#e8e8e6] hover:bg-[#252423] rounded-[2px] transition-colors cursor-pointer"
                    aria-label="Collapse Panel"
                >
                    <ChevronDown className="h-3.5 w-3.5" />
                </button>
            </Tooltip>
        </div>
    )
}
