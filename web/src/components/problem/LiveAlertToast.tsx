import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { playAlertSound } from '@/lib/sound'

export type LiveAlert = {
    id: string
    message: string
    type: 'disqualified' | 'paste' | 'info'
}

interface LiveAlertToastProps {
    alert: LiveAlert | null
    /** "Duel" or "Contest", shown as the toast label */
    context: string
    onDismiss?: () => void
    /** Must match the auto-dismiss timer in SolveScreen */
    durationMs?: number
}

/**
 * Live room update for every player in a contest or duel. Styled like the rest of the
 * solve screen (flat dark panel, #333 border, mono uppercase label). Only two looks:
 * blue for normal updates, rose for a disqualification. Every alert plays the same chime.
 */
export function LiveAlertToast({
    alert,
    context,
    onDismiss,
    durationMs = 5000,
}: LiveAlertToastProps) {
    // One chime per new alert (not on re-renders of the same alert)
    useEffect(() => {
        if (alert) playAlertSound()
    }, [alert?.id])

    if (!alert) return null
    const isDanger = alert.type === 'disqualified'

    return (
        <div
            key={alert.id}
            role="status"
            aria-live="polite"
            className="fixed top-14 left-4 z-[100] w-[min(21rem,calc(100vw-2rem))] overflow-hidden rounded-[4px] border border-[#333333] bg-[#1e1e1e] shadow-[0_8px_24px_rgba(0,0,0,0.45)] font-mono text-xs text-[#e8e8e6] animate-[toast-in_180ms_ease-out]"
        >
            <div className="flex items-start gap-2.5 px-3 py-2.5">
                <div className="min-w-0 flex-1 space-y-1">
                    <div
                        className={cn(
                            'flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold',
                            isDanger ? 'text-rose-300' : 'text-[#87b2f4]'
                        )}
                    >
                        <span
                            className={cn(
                                'h-1.5 w-1.5 rounded-full',
                                isDanger ? 'bg-rose-300' : 'bg-[#87b2f4]'
                            )}
                            aria-hidden
                        />
                        {isDanger ? 'Disqualified' : context}
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#cccccc] break-words">
                        {alert.message}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onDismiss}
                    className="p-0.5 -mr-0.5 text-[#777777] hover:text-white transition-colors cursor-pointer shrink-0"
                    aria-label="Dismiss alert"
                >
                    <X className="h-3.5 w-3.5" />
                </button>
            </div>
            {/* Time left before it closes on its own */}
            <div className="h-px w-full bg-[#2a2a2a]">
                <div
                    className={cn(
                        'h-full origin-left',
                        isDanger ? 'bg-rose-300/70' : 'bg-[#87b2f4]/70'
                    )}
                    style={{ animation: `toast-progress ${durationMs}ms linear forwards` }}
                />
            </div>
        </div>
    )
}
