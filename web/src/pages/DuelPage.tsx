import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
import { DUEL_RULES, duelDifficultyLabel, serverClockOffset } from '@/lib/duel'
import { cn, parseUtcDate } from '@/lib/utils'
import { CreateDuelModal } from '@/components/duel/CreateDuelModal'
import { DuelResultPanel, duelResultCopy } from '@/components/duel/DuelResultPanel'
import { DuelSharePanel } from '@/components/duel/DuelSharePanel'
import { Modal, ModalButton } from '@/components/ui/Modal'
import { ProblemSet } from '@/pages/ProblemSet'
import type { ContestRoom } from '@/lib/types'

type Participant = ContestRoom['participants'][number]

/** How long "GO" stays on screen before entering the arena */
const GO_HOLD_MS = 800

/** Must match DuelService::COUNTDOWN_SECONDS on the server */
const COUNTDOWN_SECONDS = 5

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

/** Remount per duel code so a rematch starts with a fresh countdown state. */
export function DuelPage() {
    const { code: rawCode } = useParams()
    const code = (rawCode || '').toUpperCase()
    return <DuelView key={code} code={code} />
}

function DuelView({ code }: { code: string }) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { isLoggedIn, user, openModal } = useAuth()
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

    // Tick fast through the countdown and the "GO" moment, slowly otherwise
    const isCountingDown = duel?.status === 'LIVE' && !duel.hasStarted
    const isLivePhase = duel?.status === 'LIVE'
    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), isLivePhase ? 100 : 15_000)
        return () => clearInterval(timer)
    }, [isLivePhase])

    // Server clock offset, measured when the response arrived (not on every render)
    const clockOffset = serverClockOffset(duel, duelQuery.dataUpdatedAt)
    const startsAtMs = parseUtcDate(duel?.startsAt)
    const countdownMs = startsAtMs ? startsAtMs - (now + clockOffset) : 0

    // Remember that we showed a countdown, and when "GO" appeared
    const sawCountdownRef = useRef(false)
    const goAtRef = useRef<number | null>(null)
    if (isCountingDown) sawCountdownRef.current = true
    if (isLivePhase && sawCountdownRef.current && countdownMs <= 0 && goAtRef.current === null) {
        goAtRef.current = now
    }

    // Countdown reached zero: ask the server to reveal the problem (at most every 600ms)
    const lastRevealFetchRef = useRef(0)
    useEffect(() => {
        if (!isCountingDown || countdownMs > 0) return
        if (now - lastRevealFetchRef.current < 600) return
        lastRevealFetchRef.current = now
        refresh()
    }, [isCountingDown, countdownMs, now, refresh])

    // Problem revealed: hold "GO" briefly, then enter the arena
    const problemId = duel?.questions?.[0]?.id
    const goHeldLongEnough =
        !sawCountdownRef.current ||
        (goAtRef.current !== null && now - goAtRef.current >= GO_HOLD_MS)
    useEffect(() => {
        if (
            duel?.status === 'LIVE' &&
            duel.hasStarted &&
            isParticipant &&
            problemId &&
            goHeldLongEnough
        ) {
            navigate(`/problem/${problemId}?room=${duel.code}`, { replace: true })
        }
    }, [
        duel?.status,
        duel?.hasStarted,
        duel?.code,
        isParticipant,
        problemId,
        goHeldLongEnough,
        navigate,
    ])

    // ---------------------------------------------------------
    // Each duel state is one view of a single modal shown over the Problem Sheet
    // ---------------------------------------------------------
    const goHome = () => navigate('/')
    const openCreate = () => (isLoggedIn ? setIsCreateOpen(true) : openModal())
    const errorBox = actionError && (
        <div className="rounded-[3px] bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 font-mono text-xs p-2.5">
            {actionError}
        </div>
    )

    type View = {
        title: ReactNode
        description?: ReactNode
        eyebrow?: ReactNode
        tone?: 'default' | 'danger' | 'warning' | 'success'
        body?: ReactNode
        footer?: ReactNode
        onClose?: () => void
        busy?: boolean
    }
    let view: View

    if (duelQuery.isLoading) {
        view = { title: 'Loading duel...', description: `Code ${code}`, onClose: goHome }
    } else if (duelQuery.isError || !duel) {
        const notFound = duelQuery.error instanceof ApiError && duelQuery.error.status === 404
        view = {
            title: notFound ? 'Duel not found' : 'Could not load this duel',
            description: notFound
                ? 'Check the link or ask your friend to send it again.'
                : getApiErrorMessage(duelQuery.error),
            onClose: goHome,
            footer: (
                <ModalButton variant="primary" block onClick={goHome}>
                    Back to problems
                </ModalButton>
            ),
        }
    } else if (duel.status === 'CANCELLED') {
        view = {
            title:
                duel.finishReason === 'EXPIRED'
                    ? 'This duel link has expired'
                    : 'This duel was cancelled',
            description: 'Links stay open for 30 minutes. Start a fresh one to play.',
            onClose: goHome,
            footer: (
                <ModalButton variant="primary" block onClick={openCreate}>
                    Create a new duel
                </ModalButton>
            ),
        }
    } else if (duel.status === 'FINISHED' && isParticipant) {
        const copy = duelResultCopy(duel, myId)
        view = {
            eyebrow: copy.eyebrow,
            tone: copy.tone,
            title: copy.title,
            description: copy.description,
            onClose: goHome,
            body: (
                <DuelResultPanel
                    duel={duel}
                    myId={myId}
                    showHeading={false}
                    onExit={goHome}
                    onRematch={() => rematchMutation.mutate()}
                    isRematchPending={rematchMutation.isPending}
                    rematchError={actionError}
                />
            ),
        }
    } else if (duel.status === 'FINISHED') {
        const winner = duel.participants.find((p) => p.userId === duel.winnerId)
        view = {
            title: 'This duel has ended',
            description: winner ? `${winner.name} won.` : 'It ended in a draw.',
            onClose: goHome,
            footer: (
                <ModalButton variant="primary" block onClick={openCreate}>
                    Start your own duel
                </ModalButton>
            ),
        }
    } else if (!isParticipant && (duel.status === 'LOBBY' || duel.status === 'LIVE')) {
        view = {
            title: 'This duel is already taken',
            description: `${duel.participants.map((p) => p.name).join(' vs ')} are playing.`,
            onClose: goHome,
            footer: (
                <ModalButton variant="primary" block onClick={openCreate}>
                    Start your own duel
                </ModalButton>
            ),
        }
    } else if (duel.status === 'LIVE') {
        // 5 4 3 2 1 GO (clamped so a little clock skew never shows 6). Not dismissible.
        const secondsLeft = Math.min(COUNTDOWN_SECONDS, Math.ceil(countdownMs / 1000))
        view = {
            title: `${me?.name ?? 'You'} vs ${opponent?.name ?? 'Opponent'}`,
            body: (
                <div className="py-4 text-center space-y-2">
                    <div
                        className="font-mono text-6xl font-bold tabular-nums text-[#87b2f4]"
                        aria-live="polite"
                    >
                        {secondsLeft > 0 ? secondsLeft : 'GO'}
                    </div>
                    <div className="font-mono text-xs text-[#64748b] dark:text-[#a09f9d]">
                        {secondsLeft > 0
                            ? 'The problem appears for both of you at zero.'
                            : 'Entering the arena...'}
                    </div>
                </div>
            ),
        }
    } else if (duel.status === 'WAITING' && isParticipant) {
        view = {
            title: 'Waiting for your opponent',
            // Closing the host's waiting screen cancels the link, like the create modal
            onClose: () => leaveMutation.mutate(undefined, { onSettled: goHome }),
            busy: leaveMutation.isPending,
            body: (
                <>
                    {errorBox}
                    <DuelSharePanel
                        duel={duel}
                        hideStatus
                        isCancelling={leaveMutation.isPending}
                        onCancel={() => leaveMutation.mutate(undefined, { onSettled: goHome })}
                    />
                </>
            ),
        }
    } else if (duel.status === 'WAITING') {
        // A friend opened the challenge link
        view = {
            title: `${host?.name || 'Someone'} challenged you to a duel`,
            description: `Same ${duelDifficultyLabel(duel.difficulty)} problem, ${duel.timeLimitMinutes} minutes each. The first correct submission wins.`,
            onClose: goHome,
            body: (
                <>
                    {errorBox}
                    <RulesList />
                </>
            ),
            footer: isLoggedIn ? (
                <ModalButton
                    variant="primary"
                    block
                    disabled={joinMutation.isPending}
                    onClick={() => joinMutation.mutate()}
                >
                    {joinMutation.isPending ? 'Joining...' : 'Accept challenge'}
                </ModalButton>
            ) : (
                <ModalButton variant="primary" block onClick={openModal}>
                    Sign in to accept
                </ModalButton>
            ),
        }
    } else {
        // Lobby: both players present, ready up. Closing leaves the lobby.
        const iAmReady = Boolean(myId && duel.readyUserIds.includes(myId))
        const opponentReady = Boolean(opponent && duel.readyUserIds.includes(opponent.userId))
        view = {
            title: 'Duel lobby',
            description: iAmReady
                ? `Waiting for ${opponent?.name || 'your opponent'} to get ready...`
                : 'A 5-second countdown starts when you are both ready.',
            onClose: () => leaveMutation.mutate(undefined, { onSettled: goHome }),
            busy: leaveMutation.isPending,
            body: (
                <>
                    {errorBox}
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 font-mono text-xs">
                        <PlayerCard person={me} isYou ready={iAmReady} />
                        <div className="text-[11px] font-bold text-[#94a3b8] dark:text-[#777777]">
                            VS
                        </div>
                        <PlayerCard person={opponent} ready={opponentReady} />
                    </div>
                </>
            ),
            footer: (
                <>
                    <ModalButton
                        disabled={leaveMutation.isPending}
                        onClick={() => leaveMutation.mutate(undefined, { onSettled: goHome })}
                    >
                        Leave lobby
                    </ModalButton>
                    <ModalButton
                        variant={iAmReady ? 'secondary' : 'accent'}
                        disabled={readyMutation.isPending}
                        onClick={() => readyMutation.mutate(!iAmReady)}
                    >
                        {iAmReady ? "I'm not ready" : "I'm ready"}
                    </ModalButton>
                </>
            ),
        }
    }

    return (
        <>
            <ProblemSet />
            <Modal
                open={!isCreateOpen}
                eyebrow={view.eyebrow ?? '1v1 Duel'}
                tone={view.tone}
                title={view.title}
                description={view.description}
                onClose={view.onClose}
                busy={view.busy}
                footer={view.footer}
            >
                {view.body}
            </Modal>
            <CreateDuelModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
        </>
    )
}

function RulesList() {
    return (
        <div className="space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748b] dark:text-[#a09f9d]">
                Rules
            </div>
            <ol className="space-y-1.5 font-mono text-[11px] leading-relaxed text-[#52525b] dark:text-[#a09f9d] list-decimal pl-4 marker:text-[#94a3b8] dark:marker:text-[#666666]">
                {DUEL_RULES.map((rule) => (
                    <li key={rule}>{rule}</li>
                ))}
            </ol>
        </div>
    )
}
