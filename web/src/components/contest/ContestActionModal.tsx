import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { createContestRoom, getApiErrorMessage } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import { Modal, ModalButton } from '@/components/ui/Modal'
import type { ContestRoom } from '@/lib/types'

interface ContestActionModalProps {
    isOpen: boolean
    onClose: () => void
}

const CONTEST_RULES = [
    'Fullscreen is required for the whole contest.',
    "Leaving the window once is a warning. Twice and you're disqualified.",
    'Pasting into the editor is blocked.',
    'Submissions close when the 45 minutes are up.',
]

export function ContestActionModal({ isOpen, onClose }: ContestActionModalProps) {
    const navigate = useNavigate()
    const { isLoggedIn, openModal } = useAuth()
    const [createError, setCreateError] = useState<string | null>(null)
    const [createdRoom, setCreatedRoom] = useState<ContestRoom | null>(null)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setCreatedRoom(null)
            setCreateError(null)
            setCopied(false)
        }
    }, [isOpen])

    const createMutation = useMutation({
        mutationFn: () =>
            createContestRoom({
                maxParticipants: null,
                topics: [],
                questionCount: 1,
                timeLimitMinutes: 45,
            }),
        onSuccess: (room) => setCreatedRoom(room),
        onError: (err) => setCreateError(getApiErrorMessage(err, 'Failed to create contest room')),
    })

    const handleCreate = () => {
        if (!isLoggedIn) {
            onClose()
            openModal()
            return
        }
        setCreateError(null)
        createMutation.mutate()
    }

    const handleCopyCode = async () => {
        if (!createdRoom) return
        try {
            await navigator.clipboard.writeText(createdRoom.code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // the code is selectable as a fallback
        }
    }

    const handleEnterContest = () => {
        if (!createdRoom) return
        onClose()
        const firstQuestion = createdRoom.questions?.[0]
        navigate(
            firstQuestion
                ? `/problem/${firstQuestion.id}?room=${createdRoom.code}`
                : `/contest/${createdRoom.code}`
        )
    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            busy={createMutation.isPending}
            eyebrow="Contest Room"
            title={createdRoom ? 'Room created' : 'Create Quick Contest'}
            description={
                createdRoom
                    ? 'Share this code. Everyone solves the same random problem; first to pass all tests wins.'
                    : 'Everyone in the room gets the same random problem and 45 minutes. The first correct submission wins.'
            }
            footer={
                createdRoom ? (
                    <>
                        <ModalButton onClick={handleCopyCode}>
                            {copied ? 'Copied!' : 'Copy code'}
                        </ModalButton>
                        <ModalButton variant="primary" onClick={handleEnterContest}>
                            Join contest
                        </ModalButton>
                    </>
                ) : (
                    <ModalButton
                        variant="primary"
                        block
                        disabled={createMutation.isPending}
                        onClick={handleCreate}
                    >
                        {createMutation.isPending ? 'Creating room...' : 'Create Contest Room'}
                    </ModalButton>
                )
            }
        >
            {createError && (
                <div className="rounded-[3px] bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 font-mono text-xs p-2.5">
                    {createError}
                </div>
            )}

            {createdRoom ? (
                <div className="rounded-[4px] bg-[#f8fafc] dark:bg-[#252423] py-5 text-center">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748b] dark:text-[#a09f9d]">
                        Room code
                    </div>
                    <div className="mt-1 font-mono text-3xl font-bold tracking-[0.25em] select-all">
                        {createdRoom.code}
                    </div>
                </div>
            ) : (
                <div className="space-y-2">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748b] dark:text-[#a09f9d]">
                        Rules
                    </div>
                    <ol className="space-y-1.5 font-mono text-[11px] leading-relaxed text-[#52525b] dark:text-[#a09f9d] list-decimal pl-4 marker:text-[#94a3b8] dark:marker:text-[#666666]">
                        {CONTEST_RULES.map((rule) => (
                            <li key={rule}>{rule}</li>
                        ))}
                    </ol>
                    <p className="font-mono text-[11px] text-[#94a3b8] dark:text-[#777777]">
                        Anyone with the room code can join.
                    </p>
                </div>
            )}
        </Modal>
    )
}
