import { cn, formatDuration } from '@/lib/utils'
import { duelElapsedSeconds, duelOutcome, duelResultText } from '@/lib/duel'
import { ModalButton } from '@/components/ui/Modal'
import type { ContestRoom } from '@/lib/types'

/** Heading copy for a finished duel, shared by the result modal and the duel page. */
export function duelResultCopy(duel: ContestRoom, myId: string | undefined) {
    const outcome = duelOutcome(duel, myId)
    const base = {
        won: { eyebrow: 'Duel won', title: 'Victory!', tone: 'success' as const },
        lost: { eyebrow: 'Duel lost', title: 'Defeat', tone: 'danger' as const },
        draw: { eyebrow: 'Duel drawn', title: "Time's up: draw", tone: 'warning' as const },
    }[outcome]
    return { ...base, description: duelResultText(duel, myId) }
}

const EYEBROW_TONE = {
    success: 'text-emerald-600 dark:text-emerald-400',
    danger: 'text-rose-600 dark:text-rose-300',
    warning: 'text-amber-600 dark:text-amber-300',
}

interface DuelResultPanelProps {
    duel: ContestRoom
    myId: string | undefined
    problemTitle?: string
    onRematch: () => void
    isRematchPending?: boolean
    rematchError?: string | null
    onExit: () => void
    onStay?: () => void
    /** Render the eyebrow/title/description (off when a Modal already shows them). */
    showHeading?: boolean
}

export function DuelResultPanel({
    duel,
    myId,
    problemTitle,
    onRematch,
    isRematchPending = false,
    rematchError = null,
    onExit,
    onStay,
    showHeading = true,
}: DuelResultPanelProps) {
    const copy = duelResultCopy(duel, myId)
    const elapsed = duelElapsedSeconds(duel)
    const title = problemTitle ?? duel.questions?.[0]?.title

    return (
        <div className="space-y-4">
            {showHeading && (
                <div className="space-y-1">
                    <div
                        className={cn(
                            'font-mono text-[10px] uppercase tracking-wider font-semibold',
                            EYEBROW_TONE[copy.tone]
                        )}
                    >
                        {copy.eyebrow}
                    </div>
                    <h2 className="text-[15px] font-semibold tracking-tight">{copy.title}</h2>
                    <p className="text-xs text-[#64748b] dark:text-[#a09f9d]">{copy.description}</p>
                </div>
            )}

            <div className="grid grid-cols-2 gap-2 font-mono">
                {duel.participants.map((p) => {
                    const isWinner = duel.winnerId === p.userId
                    return (
                        <div
                            key={p.userId}
                            className={cn(
                                'flex items-center gap-2 p-2.5 rounded-[4px]',
                                isWinner
                                    ? 'bg-emerald-50 dark:bg-emerald-950/30'
                                    : 'bg-[#f8fafc] dark:bg-[#252423]'
                            )}
                        >
                            <div className="h-7 w-7 rounded-full bg-[#e2e8f0] dark:bg-[#333333] flex items-center justify-center text-[11px] font-medium overflow-hidden shrink-0">
                                {p.avatar ? (
                                    <img
                                        src={p.avatar}
                                        alt=""
                                        className="h-full w-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    (p.name || '?')[0].toUpperCase()
                                )}
                            </div>
                            <div className="min-w-0">
                                <div className="text-[11px] truncate">
                                    {p.name}
                                    {p.userId === myId && (
                                        <span className="text-[#94a3b8] dark:text-[#777777]">
                                            {' '}
                                            (you)
                                        </span>
                                    )}
                                </div>
                                <div
                                    className={cn(
                                        'text-[10px]',
                                        isWinner
                                            ? 'text-emerald-600 dark:text-emerald-400'
                                            : 'text-[#94a3b8] dark:text-[#777777]'
                                    )}
                                >
                                    {isWinner ? 'winner' : duel.winnerId ? '-' : 'draw'}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <dl className="space-y-1.5 font-mono text-xs">
                {title && (
                    <div className="flex items-center justify-between gap-3">
                        <dt className="text-[#64748b] dark:text-[#888888]">Problem</dt>
                        <dd className="truncate max-w-[220px]">{title}</dd>
                    </div>
                )}
                {duel.finishReason === 'SOLVED' && elapsed !== null && (
                    <div className="flex items-center justify-between gap-3">
                        <dt className="text-[#64748b] dark:text-[#888888]">Winning time</dt>
                        <dd>{formatDuration(elapsed)}</dd>
                    </div>
                )}
                <div className="flex items-center justify-between gap-3">
                    <dt className="text-[#64748b] dark:text-[#888888]">Time limit</dt>
                    <dd>{duel.timeLimitMinutes} min</dd>
                </div>
            </dl>

            {rematchError && (
                <div className="rounded-[3px] bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 font-mono text-[11px] p-2">
                    {rematchError}
                </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-1">
                <ModalButton onClick={onExit}>Back to problems</ModalButton>
                {onStay && <ModalButton onClick={onStay}>Keep coding</ModalButton>}
                <ModalButton variant="accent" disabled={isRematchPending} onClick={onRematch}>
                    {isRematchPending
                        ? 'Starting rematch...'
                        : duel.rematchCode
                          ? 'Join rematch'
                          : 'Rematch'}
                </ModalButton>
            </div>
        </div>
    )
}
