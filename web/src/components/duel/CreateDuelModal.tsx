import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createDuel, getApiErrorMessage, getDuel, leaveDuel } from '@/lib/api'
import { useRoomSocket } from '@/lib/useRoomSocket'
import { DuelSharePanel } from './DuelSharePanel'
import type { ContestRoom } from '@/lib/types'

interface CreateDuelModalProps {
    isOpen: boolean
    onClose: () => void
}

export function CreateDuelModal({ isOpen, onClose }: CreateDuelModalProps) {
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)
    const [createdDuel, setCreatedDuel] = useState<ContestRoom | null>(null)

    useEffect(() => {
        if (isOpen) {
            setError(null)
            setCreatedDuel(null)
        }
    }, [isOpen])

    const createMutation = useMutation({
        // Standard settings, decided by the server: Easy or Medium, 30 minutes
        mutationFn: () => createDuel(),
        onSuccess: (duel) => setCreatedDuel(duel),
        onError: (err) => setError(getApiErrorMessage(err, 'Could not create the duel')),
    })

    const cancelMutation = useMutation({
        mutationFn: (code: string) => leaveDuel(code),
    })

    // While waiting, watch the duel so we can move to the lobby the moment a friend joins
    const code = createdDuel?.code ?? null
    const duelQuery = useQuery({
        queryKey: ['duel', code, 'waiting-modal'],
        queryFn: () => getDuel(code as string),
        enabled: isOpen && Boolean(code),
        refetchInterval: 2000,
    })
    useRoomSocket(code, isOpen && Boolean(code), (msg) => {
        if (msg.type.startsWith('DUEL_')) duelQuery.refetch()
    })

    const liveDuel = duelQuery.data ?? createdDuel
    useEffect(() => {
        if (liveDuel && liveDuel.status !== 'WAITING' && liveDuel.status !== 'CANCELLED') {
            onClose()
            navigate(`/duel/${liveDuel.code}`)
        }
    }, [liveDuel, onClose, navigate])

    // Closing while waiting cancels the link, so no half-open duels are left behind
    const handleClose = useCallback(() => {
        if (createMutation.isPending) return
        if (liveDuel && liveDuel.status === 'WAITING') {
            cancelMutation.mutate(liveDuel.code)
        }
        onClose()
    }, [createMutation.isPending, liveDuel, cancelMutation, onClose])

    useEffect(() => {
        if (!isOpen) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose()
        }
        window.addEventListener('keydown', onKey)
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            window.removeEventListener('keydown', onKey)
            document.body.style.overflow = prevOverflow
        }
    }, [isOpen, handleClose])

    if (!isOpen) return null

    const specs = [
        { label: 'Duration', value: '30 Minutes' },
        { label: 'Challenge', value: '1 Random Problem' },
        { label: 'Players', value: '2 (1v1)' },
        { label: 'Win Rule', value: 'First AC Wins' },
    ]

    return createPortal(
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget) handleClose()
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 dark:bg-black/90 backdrop-blur-md p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Challenge a friend to a duel"
        >
            <div className="w-full max-w-[440px] bg-white dark:bg-[#1e1e1e] border border-[#e2e8f0] dark:border-[#333333] rounded-[4px] p-6 shadow-2xl space-y-5 text-[#090a0f] dark:text-[#e8e8e6]">
                <div className="flex items-center justify-between pb-3 border-b border-[#f0f2f5] dark:border-[#272727]">
                    <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[#87b2f4]">
                        [1v1 Duel]
                    </span>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="font-mono text-[11px] text-[#94a3b8] hover:text-[#090a0f] dark:hover:text-white transition-colors px-1 cursor-pointer"
                        aria-label={liveDuel ? 'Cancel duel and close' : 'Close'}
                    >
                        [x]
                    </button>
                </div>

                {liveDuel?.status === 'CANCELLED' ? (
                    <div className="space-y-4 font-mono text-xs text-center">
                        <p className="text-[#64748b] dark:text-[#a09f9d]">
                            {liveDuel.finishReason === 'EXPIRED'
                                ? 'This duel link expired before anyone joined.'
                                : 'This duel was cancelled.'}
                        </p>
                        <button
                            type="button"
                            onClick={() => setCreatedDuel(null)}
                            className="w-full bg-[#090a0f] dark:bg-white text-white dark:text-[#141414] hover:bg-[#27272a] dark:hover:bg-[#e8e8e6] py-2.5 px-4 rounded-[3px] transition-colors cursor-pointer font-medium"
                        >
                            Create a new duel
                        </button>
                    </div>
                ) : liveDuel ? (
                    <DuelSharePanel
                        duel={liveDuel}
                        isCancelling={cancelMutation.isPending}
                        onCancel={() =>
                            cancelMutation.mutate(liveDuel.code, { onSettled: () => onClose() })
                        }
                    />
                ) : (
                    <div className="space-y-4 font-mono text-xs">
                        <div>
                            <h3 className="text-sm font-semibold text-[#090a0f] dark:text-[#e8e8e6]">
                                Challenge a Friend
                            </h3>
                            <p className="text-[11px] text-[#64748b] dark:text-[#a09f9d] mt-0.5">
                                Instantly generate a duel link with standard settings.
                            </p>
                        </div>

                        {error && (
                            <div className="p-2.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400 font-mono text-xs rounded-[2px]">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-2 text-xs">
                            {specs.map((spec) => (
                                <div
                                    key={spec.label}
                                    className="p-3 rounded-[3px] border border-[#e2e8f0] dark:border-[#272727] bg-[#f8fafc] dark:bg-[#141414] space-y-1"
                                >
                                    <div className="text-[#64748b] dark:text-[#a09f9d] text-[10px] uppercase tracking-wider">
                                        {spec.label}
                                    </div>
                                    <div className="font-semibold text-[#090a0f] dark:text-[#e8e8e6]">
                                        {spec.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={() => createMutation.mutate()}
                                disabled={createMutation.isPending}
                                className="w-full flex items-center justify-center gap-2 bg-[#090a0f] dark:bg-white text-white dark:text-[#141414] hover:bg-[#27272a] dark:hover:bg-[#e8e8e6] font-mono text-xs py-2.5 px-4 rounded-[3px] transition-colors disabled:opacity-50 cursor-pointer font-medium"
                            >
                                {createMutation.isPending
                                    ? 'Generating Duel Link...'
                                    : 'Create Duel Link'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>,
        document.body
    )
}
