import { useEffect, useState } from 'react'
import {
    duelDifficultyLabel,
    duelShareMessage,
    duelUrl,
    serverClockOffset,
    whatsappShareUrl,
} from '@/lib/duel'
import { parseUtcDate } from '@/lib/utils'
import type { ContestRoom } from '@/lib/types'

interface DuelSharePanelProps {
    duel: ContestRoom
    onCancel: () => void
    isCancelling?: boolean
}

const secondaryBtn =
    'flex-1 py-2 px-3 border border-[#e2e8f0] dark:border-[#333333] hover:bg-[#f8fafc] dark:hover:bg-[#252423] text-[#090a0f] dark:text-[#e8e8e6] font-mono text-xs rounded-[3px] transition-colors cursor-pointer'

/** "Waiting for your opponent" view: share link, code and expiry for a WAITING duel. */
export function DuelSharePanel({ duel, onCancel, isCancelling = false }: DuelSharePanelProps) {
    const [copied, setCopied] = useState<'link' | 'code' | null>(null)
    const [copyError, setCopyError] = useState<string | null>(null)
    const [now, setNow] = useState(() => Date.now())

    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 15_000)
        return () => clearInterval(timer)
    }, [])

    const link = duelUrl(duel.code)
    const message = duelShareMessage(duel)
    const expiresMs = (parseUtcDate(duel.endsAt) ?? 0) - (now + serverClockOffset(duel))
    const canNativeShare = typeof navigator !== 'undefined' && 'share' in navigator

    const copy = async (text: string, which: 'link' | 'code') => {
        try {
            await navigator.clipboard.writeText(text)
            setCopyError(null)
            setCopied(which)
            setTimeout(() => setCopied(null), 2000)
        } catch {
            setCopyError('Could not copy. Long-press the link to copy it instead.')
        }
    }

    return (
        <div className="space-y-4 font-mono text-xs">
            <div className="text-center space-y-1">
                <h3 className="text-sm font-semibold font-sans text-[#090a0f] dark:text-[#e8e8e6]">
                    Waiting for your opponent...
                </h3>
                <p className="text-[11px] text-[#64748b] dark:text-[#a09f9d]">
                    Send this link to a friend. The duel starts when you're both ready.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
                {[
                    duelDifficultyLabel(duel.difficulty),
                    `${duel.timeLimitMinutes} min`,
                    'first to solve wins',
                ].map((item) => (
                    <div
                        key={item}
                        className="p-2 rounded-[3px] border border-[#e2e8f0] dark:border-[#272727] bg-[#f8fafc] dark:bg-[#141414] text-[11px] text-[#090a0f] dark:text-[#e8e8e6]"
                    >
                        {item}
                    </div>
                ))}
            </div>

            {copyError && (
                <div className="p-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400 text-[11px] rounded-[2px]">
                    {copyError}
                </div>
            )}

            <div className="space-y-2">
                <a
                    href={whatsappShareUrl(message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2.5 px-4 bg-[#25D366] hover:bg-[#1fb857] text-[#0b2e17] rounded-[3px] font-semibold transition-colors"
                >
                    Share on WhatsApp
                </a>
                <div className="flex gap-2">
                    <button
                        type="button"
                        className={secondaryBtn}
                        onClick={() => copy(link, 'link')}
                    >
                        {copied === 'link' ? 'Copied!' : 'Copy link'}
                    </button>
                    {canNativeShare && (
                        <button
                            type="button"
                            className={secondaryBtn}
                            onClick={() =>
                                navigator
                                    .share({ title: 'CampusLab duel', text: message, url: link })
                                    .catch(() => undefined)
                            }
                        >
                            Share
                        </button>
                    )}
                </div>
            </div>

            <div className="p-4 rounded-[3px] border border-[#e2e8f0] dark:border-[#333333] bg-[#f8fafc] dark:bg-[#18181b] text-center space-y-1">
                <div className="text-[10px] uppercase tracking-wider text-[#64748b] dark:text-[#a09f9d]">
                    or type the code
                </div>
                <button
                    type="button"
                    onClick={() => copy(duel.code, 'code')}
                    className="text-3xl font-bold tracking-[0.25em] text-[#090a0f] dark:text-[#e8e8e6] select-all cursor-pointer hover:text-[#87b2f4] transition-colors"
                    title="Copy code"
                >
                    {duel.code}
                </button>
                <div className="text-[11px] text-[#94a3b8] dark:text-[#777777]">
                    {copied === 'code'
                        ? 'Code copied'
                        : expiresMs > 0
                          ? `Link expires in ${Math.max(1, Math.ceil(expiresMs / 60000))} min`
                          : 'Link expired'}
                </div>
            </div>

            <button
                type="button"
                onClick={onCancel}
                disabled={isCancelling}
                className="w-full text-center text-[11px] text-[#94a3b8] dark:text-[#777777] hover:text-rose-500 dark:hover:text-rose-300 transition-colors cursor-pointer disabled:opacity-60"
            >
                {isCancelling ? 'Cancelling...' : 'Cancel duel'}
            </button>
        </div>
    )
}
