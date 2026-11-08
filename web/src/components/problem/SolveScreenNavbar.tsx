import { useState, useEffect, useRef, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import {
    ArrowLeft,
    Play,
    CloudUpload,
    Loader2,
    RotateCcw,
    Maximize,
    Minimize,
    X,
    Users,
    ChevronDown,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@/components/ui/Tooltip'
import { cn, parseUtcDate } from '@/lib/utils'

interface ContestParticipantInfo {
    userId: string
    name: string
    avatar?: string | null
    isHost?: boolean
}

interface ContestInfo {
    roomCode: string
    participantCount: number
    endsAt?: string
    isEnded?: boolean
    hasWinner?: boolean
    winnerName?: string
    isWinner?: boolean
    participants?: ContestParticipantInfo[]
}

interface SolveScreenNavbarProps {
    backPath: string
    handleRun: () => void
    handleSubmit: (solveTimeSeconds?: number) => void
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
        const targetMs = parseUtcDate(contestInfo?.endsAt)
        if (!targetMs) return 45 * 60
        return Math.max(0, Math.floor((targetMs - Date.now()) / 1000))
    })

    useEffect(() => {
        const targetMs = parseUtcDate(contestInfo?.endsAt)
        if (!targetMs) return
        const updateTimer = () => {
            const left = Math.max(0, Math.floor((targetMs - Date.now()) / 1000))
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

    // Exit Confirmation Modal State (Contest & Normal Questions)
    const [showExitModal, setShowExitModal] = useState(false)

    // Coders Dropdown State
    const [showCodersDropdown, setShowCodersDropdown] = useState(false)
    const codersDropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!showCodersDropdown) return
        const handleClickOutside = (e: MouseEvent) => {
            if (
                codersDropdownRef.current &&
                !codersDropdownRef.current.contains(e.target as Node)
            ) {
                setShowCodersDropdown(false)
            }
        }
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowCodersDropdown(false)
                setShowExitModal(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [showCodersDropdown])

    useEffect(() => {
        if (!showExitModal) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowExitModal(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [showExitModal])

    // Wall-clock stopwatch ticker with zero drift across background tabs
    useEffect(() => {
        if (!isTimerRunning) return

        startTimeRef.current = Date.now() - accumulatedRef.current * 1000

        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
            accumulatedRef.current = elapsed
            setSeconds(elapsed)
        }, 500)

        return () => clearInterval(interval)
    }, [isTimerRunning])

    const handleResetTimer = () => {
        accumulatedRef.current = 0
        startTimeRef.current = Date.now()
        setSeconds(0)
        setIsTimerRunning(true)
    }

    const getElapsedSeconds = () => {
        if (contestInfo) {
            return Math.max(1, 45 * 60 - contestSecondsLeft)
        }
        return Math.max(1, accumulatedRef.current || seconds)
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
        <>
            <nav className="flex items-center justify-between h-12 px-2.5 sm:px-3 bg-[#141414] text-[#e8e8e6] font-mono text-xs relative z-30 shrink-0">
                {/* Left: Home Button + (Desktop Problem Title / Mobile Timer) */}
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <Tooltip
                        content={contestInfo ? 'Exit Contest Arena' : 'Return to Problem Sheet'}
                        position="bottom"
                        align="start"
                    >
                        <button
                            type="button"
                            onClick={() => setShowExitModal(true)}
                            className="p-1.5 text-[#a09f9d] hover:text-[#e8e8e6] border border-[#333333] bg-[#252423] hover:bg-[#2f2e2d] rounded-[3px] transition-colors cursor-pointer flex items-center justify-center shrink-0"
                            aria-label={contestInfo ? 'Exit Contest' : 'Exit Problem'}
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                        </button>
                    </Tooltip>

                    {contestInfo ? (
                        <div className="flex items-center gap-1.5 shrink-0">
                            <div className="flex items-center px-2 py-1 rounded-[3px] border border-[#333333] bg-[#222120] font-mono text-[11px] shrink-0 select-none">
                                <span className="text-[#a09f9d] mr-1 text-[10px] uppercase tracking-wider">
                                    ROOM
                                </span>
                                <span className="font-semibold tracking-wider text-[#e8e8e6]">
                                    [{contestInfo.roomCode}]
                                </span>
                            </div>
                            <div className="relative" ref={codersDropdownRef}>
                                <Tooltip content="Click to view joined coders" position="bottom">
                                    <button
                                        type="button"
                                        onClick={() => setShowCodersDropdown((prev) => !prev)}
                                        className="flex items-center gap-1 px-2 py-1 rounded-[3px] border border-[#333333] bg-[#222120] hover:bg-[#2a2928] text-[#e8e8e6] font-mono text-[11px] shrink-0 transition-colors cursor-pointer"
                                        aria-expanded={showCodersDropdown}
                                        aria-haspopup="true"
                                    >
                                        <Users className="h-3 w-3 text-[#94a3b8] shrink-0" />
                                        <span>
                                            {contestInfo.participantCount}{' '}
                                            {contestInfo.participantCount === 1
                                                ? 'coder'
                                                : 'coders'}
                                        </span>
                                        <ChevronDown
                                            className={cn(
                                                'h-3 w-3 text-[#94a3b8] transition-transform duration-150',
                                                showCodersDropdown && 'rotate-180'
                                            )}
                                        />
                                    </button>
                                </Tooltip>

                                {/* Joined Coders Dropdown Menu */}
                                {showCodersDropdown && (
                                    <div className="absolute left-0 top-full mt-1.5 w-56 bg-[#181818] border border-[#333333] rounded-[3px] shadow-xl z-50 text-[11px] font-mono p-2 space-y-1.5">
                                        <div className="flex items-center justify-between text-[#888888] pb-1.5 border-b border-[#282828] px-1">
                                            <span className="uppercase tracking-wider text-[10px] font-medium">
                                                Coders (
                                                {contestInfo.participants &&
                                                contestInfo.participants.length > 0
                                                    ? contestInfo.participants.length
                                                    : contestInfo.participantCount}
                                                )
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setShowCodersDropdown(false)}
                                                className="text-[#666666] hover:text-[#e8e8e6] p-0.5 cursor-pointer transition-colors"
                                                aria-label="Close coders dropdown"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>

                                        <div className="max-h-48 overflow-y-auto py-0.5 space-y-0.5 overscroll-contain">
                                            {contestInfo.participants &&
                                            contestInfo.participants.length > 0 ? (
                                                contestInfo.participants.map((p, idx) => (
                                                    <div
                                                        key={p.userId || idx}
                                                        className="flex items-center justify-between px-1.5 py-1 text-[#e8e8e6] hover:bg-[#222222] rounded-[2px] transition-colors"
                                                    >
                                                        <span className="truncate max-w-[145px]">
                                                            {p.name || 'Anonymous Coder'}
                                                        </span>
                                                        {p.isHost && (
                                                            <span className="text-[10px] text-[#87b2f4] lowercase font-normal ml-2 shrink-0">
                                                                host
                                                            </span>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-1.5 py-1 text-[#888888] text-[10px]">
                                                    {contestInfo.participantCount} active coder(s)
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
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
                        <div
                            className={cn(
                                'flex md:hidden items-center px-2 py-1 rounded-[3px] border border-[#333333] bg-[#222120] text-[11px] font-mono font-medium tracking-wider select-none shadow-xs shrink-0',
                                contestSecondsLeft < 300 || contestInfo.isEnded ? 'text-rose-300' : 'text-[#e8e8e6]'
                            )}
                        >
                            <span>{contestSecondsLeft === 0 || contestInfo.isEnded ? '00:00' : formatTimer(contestSecondsLeft)}</span>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setIsTimerRunning((r) => !r)}
                            onDoubleClick={handleResetTimer}
                            className={cn(
                                'flex md:hidden items-center px-2 py-1 rounded-[3px] border border-[#333333] bg-[#222120] text-[11px] font-mono font-medium tracking-wider select-none shadow-xs shrink-0 transition-colors cursor-pointer',
                                isTimerRunning ? 'text-[#e8e8e6]' : 'text-[#a09f9d]'
                            )}
                            title={
                                isTimerRunning
                                    ? 'Click to pause • Double-click to reset'
                                    : 'Click to resume • Double-click to reset'
                            }
                        >
                            <span>{formatTimer(seconds)}</span>
                        </button>
                    )}
                </div>

                {/* Run & Submit Actions:
                - Mobile (< md): Flex item on the right
                - Desktop (md:): Positioned over the draggable split line
            */}
                <div
                    style={{ '--split-pos': `${splitWidth ?? 45}%` } as CSSProperties}
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
                            onClick={() => handleSubmit(getElapsedSeconds())}
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
                                <div
                                    className={cn(
                                        'flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] text-[11px] font-mono border',
                                        contestInfo.isWinner
                                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 font-semibold'
                                            : 'bg-[#251e20] border-rose-500/25 text-rose-300 font-medium'
                                    )}
                                >
                                    {contestInfo.isWinner
                                        ? 'Won Match'
                                        : `Won by ${contestInfo.winnerName || 'Peer'}`}
                                </div>
                            )}
                            <div
                                className={cn(
                                    'px-2.5 py-1 rounded-[3px] border border-[#333333] bg-[#222120] font-mono text-[11px] font-medium tracking-wider select-none shadow-xs',
                                    contestSecondsLeft < 300 || contestInfo.isEnded ? 'text-rose-300' : 'text-[#e8e8e6]'
                                )}
                                title={contestSecondsLeft === 0 || contestInfo.isEnded ? 'Contest has concluded' : `Contest time remaining: ${formatTimer(contestSecondsLeft)}`}
                            >
                                <span>{contestSecondsLeft === 0 || contestInfo.isEnded ? '00:00' : formatTimer(contestSecondsLeft)}</span>
                            </div>
                        </div>
                    ) : (
                        /* Desktop Solve Timer */
                        <Tooltip
                            content={
                                isTimerRunning
                                    ? 'Click to pause • Double-click to reset'
                                    : 'Click to resume • Double-click to reset'
                            }
                            position="bottom"
                        >
                            <button
                                type="button"
                                onClick={() => setIsTimerRunning((r) => !r)}
                                onDoubleClick={handleResetTimer}
                                className={cn(
                                    'px-2.5 py-1 rounded-[3px] border border-[#333333] bg-[#222120] hover:bg-[#2a2928] font-mono text-[11px] font-medium tracking-wider select-none shadow-xs transition-colors cursor-pointer',
                                    isTimerRunning ? 'text-[#e8e8e6]' : 'text-[#a09f9d]'
                                )}
                            >
                                <span>{formatTimer(seconds)}</span>
                            </button>
                        </Tooltip>
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

            {showExitModal &&
                createPortal(
                    <div
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setShowExitModal(false)
                            }
                        }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 transition-all"
                        role="dialog"
                        aria-modal="true"
                        aria-label={
                            contestInfo ? 'Exit Contest Confirmation' : 'Exit Problem Confirmation'
                        }
                    >
                        <div className="w-full max-w-[420px] bg-[#1e1e1e] border border-[#333333] rounded-[4px] p-6 shadow-2xl space-y-4 text-[#e8e8e6] font-mono text-xs relative">
                            <div className="flex items-center justify-between pb-3 border-b border-[#2e2e2e]">
                                <span className="uppercase tracking-wider font-semibold text-rose-300">
                                    {contestInfo
                                        ? '[Exit Contest Arena]'
                                        : '[Exit Problem Workspace]'}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setShowExitModal(false)}
                                    className="text-[#94a3b8] hover:text-[#e8e8e6] transition-colors p-1 cursor-pointer"
                                    aria-label="Cancel"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <p className="text-[#a09f9d] leading-relaxed">
                                {contestInfo ? (
                                    <>
                                        Are you sure you want to exit contest room{' '}
                                        <span className="text-[#e8e8e6] font-semibold">
                                            [{contestInfo.roomCode}]
                                        </span>
                                        ? Your ongoing contest session will be abandoned, and you
                                        will return to the problem set.
                                    </>
                                ) : (
                                    <>
                                        Are you sure you want to exit{' '}
                                        {problemTitle ? (
                                            <span className="text-[#e8e8e6] font-semibold">
                                                [{problemTitle}]
                                            </span>
                                        ) : (
                                            'this problem'
                                        )}{' '}
                                        and return to the problem sheet? Any unsaved changes in your
                                        editor may be lost.
                                    </>
                                )}
                            </p>

                            <div className="flex items-center justify-end gap-2.5 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowExitModal(false)}
                                    className="px-3.5 py-2 border border-[#333333] bg-[#252423] hover:bg-[#2f2e2d] text-[#e8e8e6] rounded-[3px] transition-colors cursor-pointer"
                                >
                                    {contestInfo ? 'Stay in Contest' : 'Keep Solving'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowExitModal(false)
                                        navigate(backPath || '/')
                                    }}
                                    className="px-3.5 py-2 bg-rose-500/80 hover:bg-rose-500 text-white font-medium rounded-[3px] transition-colors cursor-pointer"
                                >
                                    {contestInfo ? 'Exit Contest' : 'Exit Problem'}
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    )
}
