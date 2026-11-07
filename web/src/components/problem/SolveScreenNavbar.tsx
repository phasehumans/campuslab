import { useState, useEffect, useRef } from 'react'
import {
    ArrowLeft,
    Play,
    CloudUpload,
    Loader2,
    Pause,
    RotateCcw,
    Maximize,
    Minimize,
    Keyboard,
    X,
    Users,
    Trophy,
    Clock,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@/components/ui/Tooltip'
import { cn } from '@/lib/utils'

export interface ContestInfo {
    roomCode: string
    participantCount: number
    endsAt?: string
    hasWinner?: boolean
    winnerName?: string
    isWinner?: boolean
}

interface SolveScreenNavbarProps {
    backPath: string
    handleRun: () => void
    handleSubmit: () => void
    handleResetCode?: () => void
    isRunning: boolean
    isSubmitting: boolean
    problemTitle?: string
    splitWidth?: number
    contestInfo?: ContestInfo
}

export function SolveScreenNavbar({
    backPath,
    handleRun,
    handleSubmit,
    handleResetCode,
    isRunning,
    isSubmitting,
    problemTitle,
    splitWidth,
    contestInfo,
}: SolveScreenNavbarProps) {
    const navigate = useNavigate()

    // Contest Countdown Timer State
    const [contestSecondsLeft, setContestSecondsLeft] = useState(() => {
        if (!contestInfo?.endsAt) return 45 * 60
        return Math.max(0, Math.floor((new Date(contestInfo.endsAt).getTime() - Date.now()) / 1000))
    })

    useEffect(() => {
        if (!contestInfo?.endsAt) return
        const updateTimer = () => {
            const left = Math.max(0, Math.floor((new Date(contestInfo.endsAt!).getTime() - Date.now()) / 1000))
            setContestSecondsLeft(left)
        }
        updateTimer()
        const interval = setInterval(updateTimer, 1000)
        return () => clearInterval(interval)
    }, [contestInfo?.endsAt])

    // Drift-free Wall-Clock Timer State (for non-contest practice)
    const [seconds, setSeconds] = useState(0)
    const [isTimerRunning, setIsTimerRunning] = useState(true)
    const startTimeRef = useRef<number>(Date.now())
    const accumulatedRef = useRef<number>(0)

    // Fullscreen State
    const [isFullscreen, setIsFullscreen] = useState(false)

    // Shortcuts Popover
    const [showShortcuts, setShowShortcuts] = useState(false)

    // Wall-clock stopwatch ticker with zero drift across background tabs
    useEffect(() => {
        if (!isTimerRunning) {
            accumulatedRef.current = seconds
            return
        }

        startTimeRef.current = Date.now() - accumulatedRef.current * 1000

        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
            setSeconds(elapsed)
        }, 500)

        return () => clearInterval(interval)
    }, [isTimerRunning, seconds])

    const handleResetTimer = () => {
        accumulatedRef.current = 0
        startTimeRef.current = Date.now()
        setSeconds(0)
        setIsTimerRunning(true)
    }

    const formatTimer = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600)
        const mins = Math.floor((totalSeconds % 3600) / 60)
        const secs = totalSeconds % 60
        if (hours > 0) {
            return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
        }
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => setIsFullscreen(true))
        } else {
            document.exitFullscreen().then(() => setIsFullscreen(false))
        }
    }

    return (
        <nav className="flex items-center justify-between h-12 px-2.5 sm:px-3 bg-[#141414] text-[#e8e8e6] font-mono text-xs relative z-30 shrink-0">
            {/* Left: Home Button + (Desktop Problem Title / Mobile Timer) */}
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <Tooltip content="Return to Problem Sheet" position="bottom" align="start">
                    <button
                        onClick={() => navigate(backPath)}
                        className="p-1.5 text-[#a09f9d] hover:text-[#e8e8e6] border border-[#333333] bg-[#252423] hover:bg-[#2f2e2d] rounded-[3px] transition-colors cursor-pointer flex items-center justify-center shrink-0"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                    </button>
                </Tooltip>

                {contestInfo ? (
                    <div className="flex items-center gap-1.5 shrink-0">
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-[3px] border border-amber-500/30 bg-amber-500/10 text-amber-400 font-mono text-[11px] shrink-0">
                            <Trophy className="h-3 w-3 shrink-0" />
                            <span className="font-semibold tracking-wider">ROOM [{contestInfo.roomCode}]</span>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-[3px] border border-[#333333] bg-[#252423] text-[#e8e8e6] font-mono text-[11px] shrink-0">
                            <Users className="h-3 w-3 text-[#87b2f4] shrink-0" />
                            <span>{contestInfo.participantCount} {contestInfo.participantCount === 1 ? 'coder' : 'coders'}</span>
                        </div>
                    </div>
                ) : (
                    problemTitle && (
                        <span className="text-[#a09f9d] text-xs font-normal truncate hidden lg:inline max-w-[190px]">
                            {problemTitle}
                        </span>
                    )
                )}

                {/* Mobile Timer: Displays neatly on the left beside Home on < md screens */}
                {contestInfo ? (
                    <div className="flex md:hidden items-center gap-1.5 px-2 py-1 rounded-[3px] border border-[#333333] bg-[#252423] text-[#e8e8e6] text-[11px] select-none shadow-xs shrink-0">
                        <Clock className={cn("h-3 w-3 shrink-0", contestSecondsLeft < 300 ? "text-red-400 animate-pulse" : "text-[#87b2f4]")} />
                        <span className={cn("font-mono font-medium tracking-wider text-[#e8e8e6]", contestSecondsLeft < 300 && "text-red-400 font-bold")}>
                            {formatTimer(contestSecondsLeft)}
                        </span>
                    </div>
                ) : (
                    <div className="flex md:hidden items-center gap-1.5 px-2 py-1 rounded-[3px] border border-[#333333] bg-[#252423] text-[#e8e8e6] text-[11px] select-none shadow-xs">
                        <button
                            type="button"
                            onClick={() => setIsTimerRunning((r) => !r)}
                            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                            title={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
                        >
                            <span
                                className={cn(
                                    'h-1.5 w-1.5 rounded-full shrink-0 transition-colors',
                                    isTimerRunning ? 'bg-emerald-400 animate-pulse' : 'bg-[#a09f9d]'
                                )}
                            />
                            <span className="font-mono font-medium tracking-wider text-[#e8e8e6]">
                                {formatTimer(seconds)}
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={handleResetTimer}
                            aria-label="Reset Timer"
                            className="p-0.5 text-[#a09f9d] hover:text-[#e8e8e6] transition-colors cursor-pointer ml-0.5 border-l border-[#333333] pl-1"
                            title="Reset Timer"
                        >
                            <RotateCcw className="h-2.5 w-2.5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Run & Submit Actions:
                - Mobile (< md): Flex item on the right
                - Desktop (md:): Positioned over the draggable split line
            */}
            <div
                style={{ '--split-pos': `${splitWidth ?? 45}%` } as React.CSSProperties}
                className="flex items-center gap-1.5 sm:gap-2 md:absolute md:left-[var(--split-pos)] md:-translate-x-1/2 pointer-events-auto z-10"
            >
                <Tooltip content="Run Testcases" shortcut="Ctrl + '" position="bottom">
                    <button
                        onClick={handleRun}
                        disabled={isRunning || isSubmitting}
                        className="flex items-center gap-1 sm:gap-1.5 bg-[#252423] hover:bg-[#2f2e2d] disabled:opacity-50 disabled:cursor-not-allowed text-[#e8e8e6] border border-[#333333] px-2.5 sm:px-3.5 py-1.5 rounded-[2px] font-mono text-xs font-medium transition-colors cursor-pointer shadow-xs"
                    >
                        {isRunning ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-[#87b2f4]" />
                        ) : (
                            <Play className="h-3.5 w-3.5 text-[#10b981] fill-[#10b981]" />
                        )}
                        <span>{isRunning ? 'Running...' : 'Run'}</span>
                    </button>
                </Tooltip>

                <Tooltip content="Submit Solution" shortcut="Ctrl + ↵" position="bottom">
                    <button
                        onClick={handleSubmit}
                        disabled={isRunning || isSubmitting}
                        className="flex items-center gap-1 sm:gap-1.5 bg-[#87b2f4] hover:bg-[#72a3ed] disabled:opacity-50 disabled:cursor-not-allowed text-[#141414] px-3 sm:px-4 py-1.5 rounded-[2px] font-mono text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                    >
                        {isSubmitting ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-[#141414]" />
                        ) : (
                            <CloudUpload className="h-3.5 w-3.5" />
                        )}
                        <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                    </button>
                </Tooltip>
            </div>

            {/* Right: Desktop Timer, Code Reset, Shortcuts, Fullscreen (Hidden on mobile < md) */}
            <div className="hidden md:flex items-center gap-2 font-mono text-xs">
                {contestInfo ? (
                    <div className="flex items-center gap-2">
                        {contestInfo.hasWinner && (
                            <div className={cn(
                                "flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] text-[11px] font-mono border",
                                contestInfo.isWinner
                                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 font-semibold"
                                    : "bg-red-500/15 border-red-500/30 text-red-400 font-semibold"
                            )}>
                                {contestInfo.isWinner ? '🏆 Won Match' : `⚔️ Won by ${contestInfo.winnerName || 'Peer'}`}
                            </div>
                        )}
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] border border-[#333333] bg-[#252423] text-[#e8e8e6] text-[11px] select-none shadow-xs">
                            <Clock className={cn("h-3.5 w-3.5", contestSecondsLeft < 300 ? "text-red-400 animate-pulse" : "text-[#87b2f4]")} />
                            <span className={cn("font-mono font-medium tracking-wider", contestSecondsLeft < 300 && "text-red-400 font-bold")}>
                                {formatTimer(contestSecondsLeft)}
                            </span>
                            <span className="text-[10px] text-[#94a3b8] uppercase">rem</span>
                        </div>
                    </div>
                ) : (
                    /* Desktop Solve Timer */
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] border border-[#333333] bg-[#252423] text-[#e8e8e6] text-[11px] select-none shadow-xs">
                        <Tooltip
                            content={isTimerRunning ? 'Timer running (click to pause)' : 'Timer paused (click to resume)'}
                            position="bottom"
                        >
                            <button
                                type="button"
                                onClick={() => setIsTimerRunning((r) => !r)}
                                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                            >
                                <span
                                    className={cn(
                                        'h-1.5 w-1.5 rounded-full shrink-0 transition-colors',
                                        isTimerRunning ? 'bg-emerald-400 animate-pulse' : 'bg-[#a09f9d]'
                                    )}
                                />
                                <span className="font-mono font-medium tracking-wider text-[#e8e8e6]">
                                    {formatTimer(seconds)}
                                </span>
                            </button>
                        </Tooltip>

                        <div className="flex items-center gap-0.5 ml-1 border-l border-[#333333] pl-1.5">
                            <Tooltip content={isTimerRunning ? 'Pause Timer' : 'Resume Timer'} position="bottom">
                                <button
                                    type="button"
                                    onClick={() => setIsTimerRunning((r) => !r)}
                                    aria-label={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
                                    className="p-0.5 text-[#a09f9d] hover:text-[#e8e8e6] transition-colors cursor-pointer"
                                >
                                    {isTimerRunning ? (
                                        <Pause className="h-2.5 w-2.5" />
                                    ) : (
                                        <Play className="h-2.5 w-2.5" />
                                    )}
                                </button>
                            </Tooltip>
                            <Tooltip content="Reset Timer" position="bottom">
                                <button
                                    type="button"
                                    onClick={handleResetTimer}
                                    aria-label="Reset Timer"
                                    className="p-0.5 text-[#a09f9d] hover:text-[#e8e8e6] transition-colors cursor-pointer"
                                >
                                    <RotateCcw className="h-2.5 w-2.5" />
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                )}

                {/* Reset Code Button */}
                {handleResetCode && (
                    <Tooltip content="Reset code to starter template" position="bottom">
                        <button
                            type="button"
                            onClick={handleResetCode}
                            className="p-1.5 text-[#a09f9d] hover:text-[#e8e8e6] border border-[#333333] bg-[#252423] hover:bg-[#2f2e2d] rounded-[3px] transition-colors cursor-pointer hidden sm:flex items-center justify-center"
                        >
                            <RotateCcw className="h-3.5 w-3.5" />
                        </button>
                    </Tooltip>
                )}

                {/* Keyboard Shortcuts Helper */}
                <div className="relative hidden sm:block">
                    <Tooltip content="Keyboard Shortcuts" position="bottom">
                        <button
                            type="button"
                            onClick={() => setShowShortcuts((s) => !s)}
                            className="p-1.5 text-[#a09f9d] hover:text-[#e8e8e6] border border-[#333333] bg-[#252423] hover:bg-[#2f2e2d] rounded-[3px] transition-colors cursor-pointer flex items-center justify-center"
                        >
                            <Keyboard className="h-3.5 w-3.5" />
                        </button>
                    </Tooltip>

                    {showShortcuts && (
                        <div className="absolute right-0 top-10 w-52 p-3 bg-[#1e1e1e] border border-[#333333] rounded-[4px] shadow-2xl z-50 text-[11px] font-mono space-y-2">
                            <div className="flex items-center justify-between text-[#e8e8e6] font-medium border-b border-[#2e2e2e] pb-1.5">
                                <span>Shortcuts</span>
                                <button
                                    onClick={() => setShowShortcuts(false)}
                                    className="text-[#a09f9d] hover:text-white"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                            <div className="flex justify-between items-center text-[#a09f9d]">
                                <span>Run Code</span>
                                <kbd className="bg-[#252423] px-1.5 py-0.5 rounded border border-[#333333] text-[#e8e8e6]">
                                    Ctrl + '
                                </kbd>
                            </div>
                            <div className="flex justify-between items-center text-[#a09f9d]">
                                <span>Submit</span>
                                <kbd className="bg-[#252423] px-1.5 py-0.5 rounded border border-[#333333] text-[#e8e8e6]">
                                    Ctrl + ↵
                                </kbd>
                            </div>
                        </div>
                    )}
                </div>

                {/* Fullscreen Toggle */}
                <Tooltip
                    content={isFullscreen ? 'Exit Fullscreen' : 'Zen Fullscreen Mode'}
                    position="bottom"
                    align="end"
                >
                    <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="p-1.5 text-[#a09f9d] hover:text-[#e8e8e6] border border-[#333333] bg-[#252423] hover:bg-[#2f2e2d] rounded-[3px] transition-colors cursor-pointer hidden sm:flex items-center justify-center"
                    >
                        {isFullscreen ? (
                            <Minimize className="h-3.5 w-3.5" />
                        ) : (
                            <Maximize className="h-3.5 w-3.5" />
                        )}
                    </button>
                </Tooltip>
            </div>
        </nav>
    )
}
