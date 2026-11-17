import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createDuel, getApiErrorMessage, getDuel, leaveDuel } from '@/lib/api'
import { useRoomSocket } from '@/lib/useRoomSocket'
import { DUEL_RULES } from '@/lib/duel'
import { Modal, ModalButton } from '@/components/ui/Modal'
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
        if (liveDuel && liveDuel.status === 'WAITING') {
            cancelMutation.mutate(liveDuel.code)
        }
        onClose()
    }, [liveDuel, cancelMutation, onClose])

    const isWaiting = liveDuel?.status === 'WAITING'
    const isCancelled = liveDuel?.status === 'CANCELLED'

    let title = 'Challenge a Friend'
    let description: string | undefined =
        'You and one friend get the same Easy or Medium problem and 30 minutes. The first correct submission wins.'
    if (isWaiting) {
        title = 'Waiting for your opponent'
        description = undefined
    } else if (isCancelled) {
        title = 'Duel link closed'
        description =
            liveDuel?.finishReason === 'EXPIRED'
                ? 'The link expired before anyone joined.'
                : 'This duel was cancelled.'
    }

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            busy={createMutation.isPending}
            eyebrow="1v1 Duel"
            title={title}
            description={description}
            footer={
                isWaiting ? undefined : isCancelled ? (
                    <ModalButton variant="primary" block onClick={() => setCreatedDuel(null)}>
                        Create a new duel
                    </ModalButton>
                ) : (
                    <ModalButton
                        variant="primary"
                        block
                        disabled={createMutation.isPending}
                        onClick={() => createMutation.mutate()}
                    >
                        {createMutation.isPending ? 'Creating duel link...' : 'Create Duel Link'}
                    </ModalButton>
                )
            }
        >
            {error && !liveDuel && (
                <div className="rounded-[3px] bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 font-mono text-xs p-2.5">
                    {error}
                </div>
            )}

            {isWaiting && liveDuel ? (
                <DuelSharePanel
                    duel={liveDuel}
                    hideStatus
                    isCancelling={cancelMutation.isPending}
                    onCancel={() =>
                        cancelMutation.mutate(liveDuel.code, { onSettled: () => onClose() })
                    }
                />
            ) : !isCancelled ? (
                <div className="space-y-2">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748b] dark:text-[#a09f9d]">
                        Rules
                    </div>
                    <ol className="space-y-1.5 font-mono text-[11px] leading-relaxed text-[#52525b] dark:text-[#a09f9d] list-decimal pl-4 marker:text-[#94a3b8] dark:marker:text-[#666666]">
                        {DUEL_RULES.map((rule) => (
                            <li key={rule}>{rule}</li>
                        ))}
                    </ol>
                    <p className="font-mono text-[11px] text-[#94a3b8] dark:text-[#777777]">
                        You'll get a link and a code to send to your friend.
                    </p>
                </div>
            ) : null}
        </Modal>
    )
}
