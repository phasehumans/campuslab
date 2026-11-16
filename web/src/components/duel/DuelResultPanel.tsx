import { cn, formatDuration } from '@/lib/utils'
import { duelElapsedSeconds, duelOutcome, duelResultText } from '@/lib/duel'
import type { ContestRoom } from '@/lib/types'

interface DuelResultPanelProps {
    duel: ContestRoom
    myId: string | undefined
    problemTitle?: string
    onRematch: () => void
    isRematchPending?: boolean
    rematchError?: string | null
    onExit: () => void
    onStay?: () => void
}

const OUTCOME_COPY = {
    won: { eyebrow: 'Duel won', title: 'Victory!', color: 'text-emerald-400' },
    lost: { eyebrow: 'Duel lost', title: 'Defeat', color: 'text-rose-300' },
    draw: { eyebrow: 'Duel drawn', title: "Time's up: draw", color: 'text-[#fcd34d]' },
} as const

export function DuelResultPanel({
    duel,
    myId,
    problemTitle,
    onRematch,
    isRematchPending = false,
    rematchError = null,
    onExit,
    onStay,
}: DuelResultPanelProps) {
    const outcome = duelOutcome(duel, myId)
    const copy = OUTCOME_COPY[outcome]
    const elapsed = duelElapsedSeconds(duel)
    const title = problemTitle ?? duel.questions?.[0]?.title

    return (
        <div className="space-y-4 font-mono">
            <div className="space-y-1">
                <div
                    className={cn(
                        'text-[10px] uppercase tracking-widest font-semibold',
                        copy.color
                    )}
                >
                    {copy.eyebrow}
                </div>
                <h2 className="text-base font-bold text-[#e8e8e6] tracking-tight">{copy.title}</h2>
                <p className="text-xs text-[#a09f9d]">{duelResultText(duel, myId)}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {duel.participants.map((p) => {
                    const isWinner = duel.winnerId === p.userId
                    return (
                        <div
                            key={p.userId}
                            className={cn(
                                'flex items-center gap-2 p-2 rounded-[3px] border',
                                isWinner
                                    ? 'border-emerald-700/70 bg-emerald-950/20'
                                    : 'border-[#333333] bg-[#18181b]'
                            )}
                        >
                            <div className="h-7 w-7 rounded-full bg-[#252423] border border-[#333333] flex items-center justify-center text-[11px] font-medium text-[#e8e8e6] overflow-hidden shrink-0">
                                {p.avatar ? (
                                    <img
                                        src={p.avatar}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    (p.name || '?')[0].toUpperCase()
                                )}
                            </div>
                            <div className="min-w-0">
                                <div className="text-[11px] text-[#e8e8e6] truncate">
                                    {p.name}
                                    {p.userId === myId && (
                                        <span className="text-[#777777]"> (you)</span>
                                    )}
                                </div>
                                <div
                                    className={cn(
                                        'text-[10px]',
                                        isWinner ? 'text-emerald-400' : 'text-[#777777]'
                                    )}
                                >
                                    {isWinner ? 'winner' : duel.winnerId ? '-' : 'draw'}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="space-y-1.5 text-xs">
                {title && (
                    <div className="flex items-center justify-between text-[#888888]">
                        <span>Problem</span>
                        <span className="text-[#e8e8e6] truncate max-w-[220px]">{title}</span>
                    </div>
                )}
                {duel.finishReason === 'SOLVED' && elapsed !== null && (
                    <div className="flex items-center justify-between text-[#888888]">
                        <span>Winning time</span>
                        <span className="text-[#e8e8e6]">{formatDuration(elapsed)}</span>
                    </div>
                )}
                <div className="flex items-center justify-between text-[#888888]">
                    <span>Time limit</span>
                    <span className="text-[#e8e8e6]">{duel.timeLimitMinutes} min</span>
                </div>
            </div>

            {rematchError && (
                <div className="p-2 bg-red-950/30 border border-red-900/60 text-red-400 text-[11px] rounded-[2px]">
                    {rematchError}
                </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch gap-2 pt-1">
                <button
                    type="button"
                    onClick={onExit}
                    className="flex-1 border border-[#333333] hover:bg-[#252423] text-[#888888] hover:text-white text-xs py-2 px-3 rounded-[3px] transition-colors cursor-pointer"
                >
                    Back to problems
                </button>
                {onStay && (
                    <button
                        type="button"
                        onClick={onStay}
                        className="flex-1 border border-[#333333] hover:bg-[#252423] text-[#888888] hover:text-white text-xs py-2 px-3 rounded-[3px] transition-colors cursor-pointer"
                    >
                        Keep coding
                    </button>
                )}
                <button
                    type="button"
                    onClick={onRematch}
                    disabled={isRematchPending}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#87b2f4] hover:bg-[#72a3ed] text-[#141414] text-xs font-semibold py-2 px-3 rounded-[3px] transition-colors cursor-pointer disabled:opacity-60"
                >
                    {isRematchPending
                        ? 'Starting rematch...'
                        : duel.rematchCode
                          ? 'Join rematch'
                          : 'Rematch'}
                </button>
            </div>
        </div>
    )
}
