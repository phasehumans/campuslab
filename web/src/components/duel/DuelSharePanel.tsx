import { useState } from 'react'
import { duelUrl } from '@/lib/duel'
import type { ContestRoom } from '@/lib/types'

interface DuelSharePanelProps {
    duel: ContestRoom
    onCancel: () => void
    isCancelling?: boolean
    /** Hide the "Waiting for your opponent" line when the surrounding modal already says it. */
    hideStatus?: boolean
}

/** Waiting view for a WAITING duel: the code, a copy-link button and cancel. */
export function DuelSharePanel({
    duel,
    onCancel,
    isCancelling = false,
    hideStatus = false,
}: DuelSharePanelProps) {
    const [copied, setCopied] = useState(false)
    const [copyError, setCopyError] = useState(false)

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(duelUrl(duel.code))
            setCopyError(false)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            setCopyError(true)
        }
    }

    return (
        <div className="space-y-4 font-mono text-xs">
            <div className="py-5 rounded-[4px] bg-[#f8fafc] dark:bg-[#252423] text-center space-y-2">
                {!hideStatus && (
                    <div className="text-[11px] text-[#64748b] dark:text-[#a09f9d]">
                        Waiting for your opponent...
                    </div>
                )}
                <div className="text-3xl font-bold tracking-[0.25em] text-[#090a0f] dark:text-[#e8e8e6] select-all py-1">
                    {duel.code}
                </div>
                <div className="text-[11px] text-[#64748b] dark:text-[#a09f9d]">
                    {copyError
                        ? 'Could not copy. Share the code instead.'
                        : 'Share the link or code'}
                </div>
            </div>

            <button
                type="button"
                onClick={copyLink}
                className="w-full py-2 px-3.5 bg-[#090a0f] dark:bg-white text-white dark:text-[#141414] hover:bg-[#27272a] dark:hover:bg-[#e8e8e6] rounded-[3px] font-medium transition-colors cursor-pointer"
            >
                {copied ? 'Link copied!' : 'Copy link'}
            </button>

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
