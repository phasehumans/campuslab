import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Loader2, Swords, X } from 'lucide-react'
import { createDuel, getApiErrorMessage } from '@/lib/api'
import { DUEL_DIFFICULTIES, DUEL_TIME_LIMITS } from '@/lib/duel'
import { cn } from '@/lib/utils'
import type { DuelDifficulty } from '@/lib/types'

interface CreateDuelModalProps {
    isOpen: boolean
    onClose: () => void
}

export function CreateDuelModal({ isOpen, onClose }: CreateDuelModalProps) {
    const navigate = useNavigate()
    const [difficulty, setDifficulty] = useState<DuelDifficulty>('MEDIUM')
    const [timeLimit, setTimeLimit] = useState<(typeof DUEL_TIME_LIMITS)[number]>(30)
    const [error, setError] = useState<string | null>(null)

    const createMutation = useMutation({
        mutationFn: () => createDuel({ difficulty, timeLimitMinutes: timeLimit }),
        onSuccess: (duel) => {
            onClose()
            navigate(`/duel/${duel.code}`)
        },
        onError: (err) => setError(getApiErrorMessage(err, 'Could not create the duel')),
    })

    useEffect(() => {
        if (isOpen) setError(null)
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !createMutation.isPending) onClose()
        }
        window.addEventListener('keydown', onKey)
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            window.removeEventListener('keydown', onKey)
            document.body.style.overflow = prevOverflow
        }
    }, [isOpen, onClose, createMutation.isPending])

    if (!isOpen) return null

    const optionClass = (active: boolean) =>
        cn(
            'flex-1 py-2 px-2 rounded-[3px] border font-mono text-xs transition-colors cursor-pointer',
            active
                ? 'border-[#87b2f4] bg-[#87b2f4]/15 text-[#090a0f] dark:text-[#e8e8e6] font-semibold'
                : 'border-[#e2e8f0] dark:border-[#333333] text-[#52525b] dark:text-[#a09f9d] hover:bg-[#f8fafc] dark:hover:bg-[#252423]'
        )

    return createPortal(
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget && !createMutation.isPending) onClose()
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 dark:bg-black/90 backdrop-blur-md p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Challenge a friend to a duel"
        >
            <div className="w-full max-w-[440px] bg-white dark:bg-[#1e1e1e] border border-[#e2e8f0] dark:border-[#333333] rounded-[4px] p-6 shadow-2xl space-y-5 text-[#090a0f] dark:text-[#e8e8e6]">
                <div className="flex items-center justify-between pb-3 border-b border-[#f0f2f5] dark:border-[#272727]">
                    <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold text-[#87b2f4]">
                        <Swords className="h-3.5 w-3.5" />
                        [1v1 Duel]
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[#94a3b8] hover:text-[#090a0f] dark:hover:text-white transition-colors p-1 cursor-pointer"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div>
                    <h3 className="text-sm font-semibold">Challenge a friend</h3>
                    <p className="text-[11px] font-mono text-[#64748b] dark:text-[#a09f9d] mt-0.5">
                        One problem, two players. First correct answer wins.
                    </p>
                </div>

                {error && (
                    <div className="p-2.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400 font-mono text-xs rounded-[2px]">
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748b] dark:text-[#a09f9d]">
                        Difficulty
                    </div>
                    <div className="flex gap-2" role="radiogroup" aria-label="Difficulty">
                        {DUEL_DIFFICULTIES.map((d) => (
                            <button
                                key={d.value}
                                type="button"
                                role="radio"
                                aria-checked={difficulty === d.value}
                                onClick={() => setDifficulty(d.value)}
                                className={optionClass(difficulty === d.value)}
                            >
                                {d.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748b] dark:text-[#a09f9d]">
                        Time limit
                    </div>
                    <div className="flex gap-2" role="radiogroup" aria-label="Time limit">
                        {DUEL_TIME_LIMITS.map((t) => (
                            <button
                                key={t}
                                type="button"
                                role="radio"
                                aria-checked={timeLimit === t}
                                onClick={() => setTimeLimit(t)}
                                className={optionClass(timeLimit === t)}
                            >
                                {t} min
                            </button>
                        ))}
                    </div>
                </div>

                <ul className="font-mono text-[11px] text-[#64748b] dark:text-[#a09f9d] space-y-1 border-l border-[#e2e8f0] dark:border-[#333333] pl-3">
                    <li>The problem is one neither of you has solved.</li>
                    <li>Fullscreen is required and pasting is blocked.</li>
                    <li>Leave the window once: warning. Twice: you lose.</li>
                    <li>If time runs out with no solve, it's a draw.</li>
                </ul>

                <button
                    type="button"
                    onClick={() => createMutation.mutate()}
                    disabled={createMutation.isPending}
                    className="w-full flex items-center justify-center gap-2 bg-[#090a0f] dark:bg-white text-white dark:text-[#141414] hover:bg-[#27272a] dark:hover:bg-[#e8e8e6] font-mono text-xs py-2.5 px-4 rounded-[3px] transition-colors disabled:opacity-50 cursor-pointer font-medium"
                >
                    {createMutation.isPending ? (
                        <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Creating duel...
                        </>
                    ) : (
                        'Create duel link'
                    )}
                </button>
            </div>
        </div>,
        document.body
    )
}
