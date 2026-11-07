import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {
    X,
    Loader2,
    Trophy,
    Copy,
    Check,
    Users,
    Clock,
    Zap,
    ArrowRight,
    ShieldCheck,
} from 'lucide-react'
import { createContestRoom, getApiErrorMessage } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import type { ContestRoom } from '@/lib/types'

interface ContestActionModalProps {
    isOpen: boolean
    onClose: () => void
}

export function ContestActionModal({ isOpen, onClose }: ContestActionModalProps) {
    const navigate = useNavigate()
    const { isLoggedIn, openModal } = useAuth()

    const [createError, setCreateError] = useState<string | null>(null)
    const [createdRoom, setCreatedRoom] = useState<ContestRoom | null>(null)
    const [copied, setCopied] = useState(false)

    // Reset state whenever modal opens or closes
    useEffect(() => {
        if (isOpen) {
            setCreatedRoom(null)
            setCreateError(null)
            setCopied(false)
        }
    }, [isOpen])

    // Lock page background scrolling when modal is open
    useEffect(() => {
        if (!isOpen) return
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = prevOverflow
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
        onSuccess: (room) => {
            setCreatedRoom(room)
        },
        onError: (err) => {
            setCreateError(getApiErrorMessage(err, 'Failed to create contest room'))
        },
    })

    // Keyboard dismiss on Escape
    useEffect(() => {
        if (!isOpen) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !createMutation.isPending) {
                handleClose()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, createMutation.isPending])

    if (!isOpen) return null

    const handleCreate = () => {
        if (!isLoggedIn) {
            onClose()
            openModal()
            return
        }
        setCreateError(null)
        createMutation.mutate()
    }

    const handleCopyCode = () => {
        if (!createdRoom) return
        navigator.clipboard.writeText(createdRoom.code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleEnterContest = () => {
        if (!createdRoom) return
        onClose()
        const firstQuestion = createdRoom.questions?.[0]
        if (firstQuestion) {
            navigate(`/problem/${firstQuestion.id}?room=${createdRoom.code}`)
        } else {
            navigate(`/contest/${createdRoom.code}`)
        }
    }

    const handleClose = () => {
        setCreatedRoom(null)
        setCreateError(null)
        onClose()
    }

    return createPortal(
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget && !createMutation.isPending) {
                    handleClose()
                }
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 dark:bg-black/90 backdrop-blur-md p-4 transition-all"
            role="dialog"
            aria-modal="true"
            aria-label="Contest Room Creation Dialog"
        >
            <div className="w-full max-w-[460px] bg-white dark:bg-[#1e1e1e] border border-[#e2e8f0] dark:border-[#333333] rounded-[4px] p-6 shadow-2xl space-y-5 text-[#090a0f] dark:text-[#e8e8e6] relative transition-colors">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#f0f2f5] dark:border-[#272727]">
                    <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-[#87b2f4]" />
                        <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[#87b2f4]">
                            [Contest Room Creation]
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="text-[#94a3b8] hover:text-[#090a0f] dark:hover:text-white transition-colors p-1 cursor-pointer"
                        aria-label="Close modal"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {createError && (
                    <div className="p-2.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400 font-mono text-xs rounded-[2px]">
                        {createError}
                    </div>
                )}

                {createdRoom ? (
                    /* Created State: Show Room Code & Join Contest Button */
                    <div className="space-y-4 font-mono text-xs">
                        <div className="p-5 rounded-[3px] border border-[#e2e8f0] dark:border-[#333333] bg-[#f8fafc] dark:bg-[#18181b] text-center space-y-3">
                            <div className="flex items-center justify-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                                <Check className="h-4 w-4" />
                                <span>Contest Room Created</span>
                            </div>

                            <div className="text-[11px] uppercase tracking-wider text-[#64748b] dark:text-[#a09f9d]">
                                Room Code
                            </div>

                            <div className="text-3xl font-bold tracking-[0.25em] text-[#090a0f] dark:text-[#e8e8e6] select-all py-1 font-mono">
                                {createdRoom.code}
                            </div>

                            <p className="text-[11px] text-[#64748b] dark:text-[#a09f9d] leading-relaxed max-w-[320px] mx-auto">
                                Share this code with competitors. Everyone solves the same random
                                problem in real-time. First to pass all testcases wins!
                            </p>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                            <button
                                type="button"
                                onClick={handleCopyCode}
                                className="flex-1 flex items-center justify-center gap-1.5 border border-[#e2e8f0] dark:border-[#333333] hover:bg-[#f1f5f9] dark:hover:bg-[#252423] text-[#090a0f] dark:text-[#e8e8e6] font-mono text-xs py-2.5 px-3 rounded-[3px] transition-colors cursor-pointer"
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                            Copied!
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-3.5 w-3.5" />
                                        <span>Copy Code</span>
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={handleEnterContest}
                                className="flex-1 flex items-center justify-center gap-1.5 bg-[#87b2f4] hover:bg-[#729ee0] text-[#090a0f] font-mono text-xs font-medium py-2.5 px-3 rounded-[3px] transition-colors cursor-pointer"
                            >
                                <span>Join Contest</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Initial State: Contest Match Specifications & Create Button */
                    <div className="space-y-4 font-mono text-xs">
                        <div>
                            <h3 className="text-sm font-semibold text-[#090a0f] dark:text-[#e8e8e6]">
                                Create Quick Contest
                            </h3>
                            <p className="text-[11px] text-[#64748b] dark:text-[#a09f9d] mt-0.5">
                                Instantly generate a room with standard competitive settings.
                            </p>
                        </div>

                        {/* Match Specifications Grid */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-3 rounded-[3px] border border-[#e2e8f0] dark:border-[#272727] bg-[#f8fafc] dark:bg-[#141414] space-y-1">
                                <div className="flex items-center gap-1.5 text-[#64748b] dark:text-[#a09f9d] text-[10px] uppercase tracking-wider">
                                    <Clock className="h-3 w-3 text-[#87b2f4]" />
                                    <span>Duration</span>
                                </div>
                                <div className="font-semibold text-[#090a0f] dark:text-[#e8e8e6]">
                                    45 Minutes
                                </div>
                            </div>

                            <div className="p-3 rounded-[3px] border border-[#e2e8f0] dark:border-[#272727] bg-[#f8fafc] dark:bg-[#141414] space-y-1">
                                <div className="flex items-center gap-1.5 text-[#64748b] dark:text-[#a09f9d] text-[10px] uppercase tracking-wider">
                                    <Zap className="h-3 w-3 text-amber-500" />
                                    <span>Challenge</span>
                                </div>
                                <div className="font-semibold text-[#090a0f] dark:text-[#e8e8e6]">
                                    1 Random Problem
                                </div>
                            </div>

                            <div className="p-3 rounded-[3px] border border-[#e2e8f0] dark:border-[#272727] bg-[#f8fafc] dark:bg-[#141414] space-y-1">
                                <div className="flex items-center gap-1.5 text-[#64748b] dark:text-[#a09f9d] text-[10px] uppercase tracking-wider">
                                    <Users className="h-3 w-3 text-[#87b2f4]" />
                                    <span>Competitors</span>
                                </div>
                                <div className="font-semibold text-[#090a0f] dark:text-[#e8e8e6]">
                                    Unlimited
                                </div>
                            </div>

                            <div className="p-3 rounded-[3px] border border-[#e2e8f0] dark:border-[#272727] bg-[#f8fafc] dark:bg-[#141414] space-y-1">
                                <div className="flex items-center gap-1.5 text-[#64748b] dark:text-[#a09f9d] text-[10px] uppercase tracking-wider">
                                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                                    <span>Win Rule</span>
                                </div>
                                <div className="font-semibold text-[#090a0f] dark:text-[#e8e8e6]">
                                    First AC Wins
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={handleCreate}
                                disabled={createMutation.isPending}
                                className="w-full flex items-center justify-center gap-2 bg-[#090a0f] dark:bg-white text-white dark:text-[#141414] hover:bg-[#27272a] dark:hover:bg-[#e8e8e6] font-mono text-xs py-2.5 px-4 rounded-[3px] transition-colors disabled:opacity-50 cursor-pointer font-medium"
                            >
                                {createMutation.isPending ? (
                                    <>
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        <span>Generating Contest Room...</span>
                                    </>
                                ) : (
                                    <>
                                        <Trophy className="h-3.5 w-3.5 text-[#87b2f4]" />
                                        <span>Create Contest Room</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>,
        document.body
    )
}
