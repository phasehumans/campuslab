import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Check, Copy, Loader2, Share2, Swords } from 'lucide-react'
import {
    ApiError,
    getApiErrorMessage,
    getDuel,
    joinDuel,
    leaveDuel,
    requestRematch,
    setDuelReady,
} from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import { useRoomSocket } from '@/lib/useRoomSocket'
import {
    duelDifficultyLabel,
    duelShareMessage,
    duelUrl,
    serverClockOffset,
    whatsappShareUrl,
} from '@/lib/duel'
import { cn, parseUtcDate } from '@/lib/utils'
import { CreateDuelModal } from '@/components/duel/CreateDuelModal'
import { DuelResultPanel } from '@/components/duel/DuelResultPanel'
import type { ContestRoom } from '@/lib/types'

type Participant = ContestRoom['participants'][number]

function Avatar({ person, size = 'md' }: { person?: Participant; size?: 'md' | 'lg' }) {
    const dims = size === 'lg' ? 'h-12 w-12 text-base' : 'h-9 w-9 text-xs'
    return (
        <div
            className={cn(
                'rounded-full bg-[#f1f5f9] dark:bg-[#252423] border border-[#e2e8f0] dark:border-[#333333] flex items-center justify-center font-medium text-[#090a0f] dark:text-[#e8e8e6] overflow-hidden shrink-0',
                dims
            )}
        >
            {person?.avatar ? (
                <img src={person.avatar} alt="" className="h-full w-full object-cover" />
            ) : person ? (
                (person.name || '?')[0].toUpperCase()
            ) : (
                <span className="text-[#94a3b8]">?</span>
            )}
        </div>
    )
}

function PlayerCard({
    person,
    ready,
    isYou = false,
}: {
    person?: Participant
    ready: boolean
    isYou?: boolean
}) {
    return (
        <div
            className={cn(
                'flex flex-col items-center gap-2 p-3 rounded-[3px] border text-center min-w-0',
                ready
                    ? 'border-emerald-300 dark:border-emerald-800/70 bg-emerald-50/60 dark:bg-emerald-950/20'
                    : 'border-[#e2e8f0] dark:border-[#333333]'
            )}
        >
            <Avatar person={person} />
            <div className="w-full truncate font-medium">
                {person?.name}
                {isYou && <span className="text-[#94a3b8] dark:text-[#777777]"> (you)</span>}
            </div>
            <div
                className={cn(
                    'text-[10px] uppercase tracking-wider',
                    ready
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-[#94a3b8] dark:text-[#777777]'
                )}
            >
                {ready ? 'ready' : 'not ready'}
            </div>
        </div>
    )
}

function Chips({ duel }: { duel: ContestRoom }) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded-[2px] border border-[#e2e8f0] dark:border-[#333333] bg-[#f8fafc] dark:bg-[#252423]">
                {duelDifficultyLabel(duel.difficulty)}
            </span>
            <span className="px-2 py-0.5 rounded-[2px] border border-[#e2e8f0] dark:border-[#333333] bg-[#f8fafc] dark:bg-[#252423]">
                {duel.timeLimitMinutes} min
            </span>
            <span className="px-2 py-0.5 rounded-[2px] border border-[#e2e8f0] dark:border-[#333333] bg-[#f8fafc] dark:bg-[#252423]">
                first to solve wins
            </span>
        </div>
    )
}

function Shell({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate()
    return (
        <div className="w-full max-w-md mx-auto mt-8 sm:mt-12 space-y-4 font-mono text-xs">
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-1.5 text-[#52525b] dark:text-[#a09f9d] hover:text-[#090a0f] dark:hover:text-[#e8e8e6] transition-colors cursor-pointer"
            >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Problem Set
            </button>
            <div className="p-5 sm:p-6 rounded-[3px] border border-[#e2e8f0] dark:border-[#333333] bg-white dark:bg-[#1e1e1e] space-y-5 text-[#090a0f] dark:text-[#e8e8e6]">
                {children}
            </div>
        </div>
    )
}

function Header({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
        <div className="text-center space-y-1.5">
            <div className="flex justify-center">
                <div className="h-10 w-10 rounded-[3px] bg-[#87b2f4]/15 border border-[#87b2f4]/30 flex items-center justify-center text-[#87b2f4]">
                    <Swords className="h-5 w-5" />
                </div>
            </div>
            <h2 className="text-base font-semibold font-sans">{title}</h2>
            {subtitle && <p className="text-[#64748b] dark:text-[#a09f9d]">{subtitle}</p>}
        </div>
    )
}

const primaryBtn =
    'w-full flex items-center justify-center gap-1.5 py-2.5 px-4 bg-[#87b2f4] hover:bg-[#72a3ed] text-[#141414] rounded-[3px] font-semibold transition-colors cursor-pointer disabled:opacity-60'
const secondaryBtn =
    'w-full flex items-center justify-center gap-1.5 py-2 px-3 border border-[#e2e8f0] dark:border-[#333333] hover:bg-[#f8fafc] dark:hover:bg-[#252423] rounded-[3px] transition-colors cursor-pointer disabled:opacity-60'
const linkBtn =
    'w-full text-center text-[11px] text-[#94a3b8] dark:text-[#777777] hover:text-rose-500 dark:hover:text-rose-300 transition-colors cursor-pointer disabled:opacity-60'

export function DuelPage() {
    const { code: rawCode } = useParams()
    const code = (rawCode || '').toUpperCase()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { isLoggedIn, user, openModal } = useAuth()
    const [copied, setCopied] = useState<'link' | 'code' | null>(null)
    const [actionError, setActionError] = useState<string | null>(null)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [now, setNow] = useState(() => Date.now())

    const duelQuery = useQuery({
        queryKey: ['duel', code, isLoggedIn],
        queryFn: () => getDuel(code),
        enabled: Boolean(code),
        retry: (count, err) => !(err instanceof ApiError && err.status === 404) && count < 2,
        refetchInterval: (query) => {
            const status = query.state.data?.status
            return status === 'FINISHED' || status === 'CANCELLED' ? false : 2000
        },
    })
    const duel = duelQuery.data

    const refresh = useCallback(
        () => queryClient.invalidateQueries({ queryKey: ['duel', code] }),
        [queryClient, code]
    )

    useRoomSocket(code, isLoggedIn, (msg) => {
        if (msg.type.startsWith('DUEL_') || msg.type === 'REMATCH_OFFER') refresh()
    })

    const onError = (err: unknown) =>
        setActionError(getApiErrorMessage(err, 'Something went wrong'))
    const onDuel = (d: ContestRoom) => {
        setActionError(null)
        queryClient.setQueryData(['duel', code, isLoggedIn], d)
    }

    const joinMutation = useMutation({
        mutationFn: () => joinDuel(code),
        onSuccess: onDuel,
        onError,
    })
    const readyMutation = useMutation({
        mutationFn: (ready: boolean) => setDuelReady(code, ready),
        onSuccess: onDuel,
        onError,
    })
    const leaveMutation = useMutation({
        mutationFn: () => leaveDuel(code),
        onSuccess: (d) => {
            if (d) onDuel(d)
            else refresh()
        },
        onError,
    })
    const rematchMutation = useMutation({
        mutationFn: () => requestRematch(code),
        onSuccess: (d) => navigate(`/duel/${d.code}`),
        onError,
    })

    const myId = user?.id
    const isParticipant = Boolean(duel?.participants.some((p) => p.userId === myId))
    const me = duel?.participants.find((p) => p.userId === myId)
    const opponent = duel?.participants.find((p) => p.userId !== myId)
    const host =
        duel?.participants.find((p) => p.userId === duel.hostUserId) ?? duel?.participants[0]

    // Tick for countdown / expiry labels
    const isCountingDown = duel?.status === 'LIVE' && !duel.hasStarted
    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), isCountingDown ? 200 : 15_000)
        return () => clearInterval(timer)
    }, [isCountingDown])

    const clockOffset = serverClockOffset(duel)
    const startsAtMs = parseUtcDate(duel?.startsAt)
    const countdownMs = startsAtMs ? startsAtMs - (now + clockOffset) : 0

    useEffect(() => {
        if (isCountingDown && countdownMs <= 0) refresh()
    }, [isCountingDown, countdownMs, refresh])

    // Countdown done and problem revealed: enter the arena
    const problemId = duel?.questions?.[0]?.id
    useEffect(() => {
        if (duel?.status === 'LIVE' && duel.hasStarted && isParticipant && problemId) {
            navigate(`/problem/${problemId}?room=${duel.code}`, { replace: true })
        }
    }, [duel?.status, duel?.hasStarted, duel?.code, isParticipant, problemId, navigate])

    const copy = async (text: string, which: 'link' | 'code') => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(which)
            setTimeout(() => setCopied(null), 2000)
        } catch {
            setActionError('Could not copy. Long-press the link to copy it instead.')
        }
    }

    // ---------------------------------------------------------
    // Loading / errors
    // ---------------------------------------------------------
    if (duelQuery.isLoading) {
        return (
            <div className="flex h-[60vh] w-full items-center justify-center font-mono text-xs text-[#94a3b8] dark:text-[#a09f9d]">
                <Loader2 className="h-4 w-4 animate-spin text-[#87b2f4] mr-2" />
                Loading duel [{code}]...
            </div>
        )
    }

    if (duelQuery.isError || !duel) {
        const notFound = duelQuery.error instanceof ApiError && duelQuery.error.status === 404
        return (
            <Shell>
                <Header
                    title={notFound ? 'Duel not found' : 'Could not load this duel'}
                    subtitle={
                        notFound
                            ? 'Check the link or ask your friend to send it again.'
                            : getApiErrorMessage(duelQuery.error)
                    }
                />
            </Shell>
        )
    }

    const errorBox = actionError && (
        <div className="p-2.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400 rounded-[2px]">
            {actionError}
        </div>
    )

    // ---------------------------------------------------------
    // Ended states
    // ---------------------------------------------------------
    if (duel.status === 'CANCELLED') {
        return (
            <Shell>
                <Header
                    title={
                        duel.finishReason === 'EXPIRED'
                            ? 'This duel link has expired'
                            : 'This duel was cancelled'
                    }
                    subtitle="Links stay open for 30 minutes. Start a fresh one to play."
                />
                <button
                    type="button"
                    className={primaryBtn}
                    onClick={() => (isLoggedIn ? setIsCreateOpen(true) : openModal())}
                >
                    Create a new duel
                </button>
                <CreateDuelModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
            </Shell>
        )
    }

    if (duel.status === 'FINISHED') {
        if (isParticipant) {
            return (
                <div className="w-full max-w-md mx-auto mt-8 sm:mt-12">
                    <div className="dark rounded-[4px] border border-[#333333] bg-[#1e1e1e] p-6 shadow-xl">
                        <DuelResultPanel
                            duel={duel}
                            myId={myId}
                            onExit={() => navigate('/')}
                            onRematch={() => rematchMutation.mutate()}
                            isRematchPending={rematchMutation.isPending}
                            rematchError={actionError}
                        />
                    </div>
                </div>
            )
        }
        const winner = duel.participants.find((p) => p.userId === duel.winnerId)
        return (
            <Shell>
                <Header
                    title="This duel has ended"
                    subtitle={winner ? `${winner.name} won.` : 'It ended in a draw.'}
                />
            </Shell>
        )
    }

    // Someone else's duel that is already full
    if (!isParticipant && (duel.status === 'LOBBY' || duel.status === 'LIVE')) {
        return (
            <Shell>
                <Header
                    title="This duel is already taken"
                    subtitle={`${duel.participants.map((p) => p.name).join(' vs ')} are playing.`}
                />
                <button
                    type="button"
                    className={primaryBtn}
                    onClick={() => (isLoggedIn ? setIsCreateOpen(true) : openModal())}
                >
                    Start your own duel
                </button>
                <CreateDuelModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
            </Shell>
        )
    }

    // ---------------------------------------------------------
    // Countdown
    // ---------------------------------------------------------
    if (duel.status === 'LIVE') {
        const secondsLeft = Math.ceil(countdownMs / 1000)
        return (
            <Shell>
                <div className="text-center space-y-3 py-6">
                    <div className="text-[11px] uppercase tracking-widest text-[#64748b] dark:text-[#a09f9d]">
                        {me?.name} vs {opponent?.name}
                    </div>
                    <div
                        className="text-6xl font-bold tabular-nums text-[#87b2f4]"
                        aria-live="polite"
                    >
                        {secondsLeft > 0 ? secondsLeft : 'GO'}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-[#64748b] dark:text-[#a09f9d]">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        {secondsLeft > 0
                            ? 'Problem reveals in a moment...'
                            : 'Entering the arena...'}
                    </div>
                </div>
            </Shell>
        )
    }

    // ---------------------------------------------------------
    // Waiting for an opponent
    // ---------------------------------------------------------
    if (duel.status === 'WAITING') {
        if (isParticipant) {
            const link = duelUrl(duel.code)
            const message = duelShareMessage(duel)
            const expiresMs = (parseUtcDate(duel.endsAt) ?? 0) - (now + clockOffset)
            const canNativeShare = typeof navigator !== 'undefined' && 'share' in navigator
            return (
                <Shell>
                    <Header
                        title="Waiting for your opponent..."
                        subtitle="Send this link to a friend. The duel starts when you're both ready."
                    />
                    <Chips duel={duel} />
                    {errorBox}

                    <div className="space-y-2">
                        <a
                            href={whatsappShareUrl(message)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 bg-[#25D366] hover:bg-[#1fb857] text-[#0b2e17] rounded-[3px] font-semibold transition-colors"
                        >
                            Share on WhatsApp
                        </a>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                className={secondaryBtn}
                                onClick={() => copy(link, 'link')}
                            >
                                {copied === 'link' ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                                ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                )}
                                {copied === 'link' ? 'Copied!' : 'Copy link'}
                            </button>
                            {canNativeShare && (
                                <button
                                    type="button"
                                    className={secondaryBtn}
                                    onClick={() =>
                                        navigator
                                            .share({
                                                title: 'CampusLab duel',
                                                text: message,
                                                url: link,
                                            })
                                            .catch(() => undefined)
                                    }
                                >
                                    <Share2 className="h-3.5 w-3.5" />
                                    Share
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="text-center space-y-1 pt-1">
                        <div className="text-[10px] uppercase tracking-wider text-[#64748b] dark:text-[#a09f9d]">
                            or type the code
                        </div>
                        <button
                            type="button"
                            onClick={() => copy(duel.code, 'code')}
                            className="text-2xl font-bold tracking-[0.25em] select-all cursor-pointer hover:text-[#87b2f4] transition-colors"
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
                        className={linkBtn}
                        disabled={leaveMutation.isPending}
                        onClick={() => leaveMutation.mutate()}
                    >
                        Cancel duel
                    </button>
                </Shell>
            )
        }

        // Invitee view: the challenge card
        return (
            <Shell>
                <div className="flex flex-col items-center gap-3 text-center">
                    <Avatar person={host} size="lg" />
                    <div className="space-y-1">
                        <h2 className="text-base font-semibold font-sans">
                            {host?.name || 'Someone'} challenged you to a duel
                        </h2>
                        <p className="text-[#64748b] dark:text-[#a09f9d]">
                            Same problem, same clock. First correct answer wins.
                        </p>
                    </div>
                    <Chips duel={duel} />
                </div>
                {errorBox}
                <ul className="text-[11px] text-[#64748b] dark:text-[#a09f9d] space-y-1 border-l border-[#e2e8f0] dark:border-[#333333] pl-3">
                    <li>Fullscreen is required and pasting is blocked.</li>
                    <li>Leave the window once: warning. Twice: you lose.</li>
                    <li>If time runs out with no solve, it's a draw.</li>
                </ul>
                {isLoggedIn ? (
                    <button
                        type="button"
                        className={primaryBtn}
                        disabled={joinMutation.isPending}
                        onClick={() => joinMutation.mutate()}
                    >
                        {joinMutation.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                        Accept challenge
                    </button>
                ) : (
                    <button type="button" className={primaryBtn} onClick={openModal}>
                        Sign in to accept
                    </button>
                )}
            </Shell>
        )
    }

    // ---------------------------------------------------------
    // Lobby: both players present, ready up
    // ---------------------------------------------------------
    const iAmReady = Boolean(myId && duel.readyUserIds.includes(myId))
    return (
        <Shell>
            <Header
                title="Duel lobby"
                subtitle="The problem is revealed to both of you at the same moment."
            />
            <Chips duel={duel} />
            {errorBox}

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                <PlayerCard person={me} isYou ready={iAmReady} />
                <div className="text-[11px] font-bold text-[#94a3b8] dark:text-[#777777]">VS</div>
                <PlayerCard
                    person={opponent}
                    ready={Boolean(opponent && duel.readyUserIds.includes(opponent.userId))}
                />
            </div>

            <button
                type="button"
                className={iAmReady ? secondaryBtn : primaryBtn}
                disabled={readyMutation.isPending}
                onClick={() => readyMutation.mutate(!iAmReady)}
            >
                {readyMutation.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {iAmReady ? "I'm not ready" : "I'm ready"}
            </button>
            <p className="text-center text-[11px] text-[#94a3b8] dark:text-[#777777]">
                {iAmReady
                    ? `Waiting for ${opponent?.name || 'your opponent'} to get ready...`
                    : 'A 3-second countdown starts when you are both ready.'}
            </p>
            <button
                type="button"
                className={linkBtn}
                disabled={leaveMutation.isPending}
                onClick={() => leaveMutation.mutate(undefined, { onSuccess: () => navigate('/') })}
            >
                Leave lobby
            </button>
        </Shell>
    )
}
