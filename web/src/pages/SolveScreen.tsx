import {
    useEffect,
    useState,
    useRef,
    useCallback,
    type MouseEvent as ReactMouseEvent,
    type PointerEvent as ReactPointerEvent,
} from 'react'
import confetti from 'canvas-confetti'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { FileText, History } from 'lucide-react'
import { cn, parseUtcDate } from '@/lib/utils'
import { EMPTY_CODE, getRememberedLanguage, rememberLanguage } from '@/data/code'
import { useAuth } from '@/contexts/AuthContext'
import { LoginModal } from '@/components/auth/LoginModal'
import { SignoutModal } from '@/components/auth/SignoutModal'
import { DescriptionPanel } from '@/components/problem/DescriptionPanel'
import { SubmissionsPanel } from '@/components/problem/SubmissionsPanel'
import { TestcasePanel } from '@/components/problem/TestcasePanel'
import { TestResultPanel } from '@/components/problem/TestResultPanel'
import { EditorHeader } from '@/components/problem/EditorHeader'
import { BottomPanelHeader } from '@/components/problem/BottomPanelHeader'
import { BottomPanelFooter } from '@/components/problem/BottomPanelFooter'
import { SolveScreenNavbar } from '@/components/problem/SolveScreenNavbar'
import { SolveScreenSkeleton } from '@/components/problem/SolveScreenSkeleton'
import { CodeEditor } from '@/components/problem/CodeEditor'
import {
    getApiErrorMessage,
    getProblem,
    getContestRoom,
    leaveContestRoom,
    runCode,
    submitCode,
    getAuthToken,
    reportContestIntegrityEvent,
    leaveDuel,
    reportDuelViolation,
    requestRematch,
} from '@/lib/api'
import { DuelResultPanel, duelResultCopy } from '@/components/duel/DuelResultPanel'
import { DarkSurface, Modal, ModalButton } from '@/components/ui/Modal'
import { duelOpponent, duelOutcome } from '@/lib/duel'
import type { EditorLanguage, ExecutionResponse, SubmissionItem } from '@/lib/types'

export function SolveScreen() {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const roomCode = searchParams.get('room')
    const { isLoggedIn, user, openModal } = useAuth()
    const [dismissedContestResult, setDismissedContestResult] = useState(false)

    // Live Contest Room Polling when solving inside a contest
    const contestRoomQuery = useQuery({
        queryKey: ['contest-room', roomCode],
        queryFn: () => getContestRoom(roomCode as string),
        enabled: Boolean(roomCode),
        refetchInterval: 2500,
    })

    const contestRoom = contestRoomQuery.data
    const isDuel = contestRoom?.mode === 'DUEL'
    const duelFinished = Boolean(isDuel && contestRoom?.status === 'FINISHED')
    const duelOpponentInfo = isDuel && contestRoom ? duelOpponent(contestRoom, user?.id) : undefined
    const duelWinner =
        isDuel && contestRoom?.winnerId
            ? contestRoom.participants.find((p) => p.userId === contestRoom.winnerId)
            : undefined
    // Duels are decided by the server (earliest-received Accepted); rooms by the leaderboard
    const winner = isDuel
        ? duelWinner && {
              userId: duelWinner.userId,
              name: duelWinner.name,
              avatar: duelWinner.avatar,
              isYou: duelWinner.userId === user?.id,
          }
        : contestRoom?.leaderboard?.find((entry) => entry.solved >= 1)
    const hasWinner = Boolean(winner)
    const isWinner = Boolean(winner && (winner.isYou || (user && winner.userId === user.id)))
    const isContestTimeout = isDuel
        ? duelFinished && !contestRoom?.winnerId
        : Boolean(
              contestRoom &&
              (contestRoom.isEnded ||
                  (contestRoom.endsAt &&
                      (parseUtcDate(contestRoom.endsAt) ?? Infinity) <= Date.now())) &&
              !hasWinner
          )

    const meParticipant = contestRoom?.participants?.find((p) => p.userId === user?.id)
    const isServerDisqualified = Boolean(meParticipant?.isDisqualified)

    const [isDisqualified, setIsDisqualified] = useState(false)
    const [disqualifiedReason, setDisqualifiedReason] = useState('')
    const [hasEnteredFullscreen, setHasEnteredFullscreen] = useState(false)
    const [userRemarks, setUserRemarks] = useState<Record<string, string>>({})
    const [liveAlert, setLiveAlert] = useState<{
        id: string
        message: string
        type: 'disqualified' | 'paste' | 'info'
    } | null>(null)
    // Anti-cheat: the reason for the (single) warning a player can receive
    const [integrityWarning, setIntegrityWarning] = useState<string | null>(null)
    const violationInFlightRef = useRef(false)
    const lastViolationAtRef = useRef(0)
    const [rematchError, setRematchError] = useState<string | null>(null)

    useEffect(() => {
        if (isServerDisqualified) {
            setIsDisqualified(true)
            setDisqualifiedReason(
                meParticipant?.disqualifiedReason || 'Contest integrity violation'
            )
        }
    }, [isServerDisqualified, meParticipant?.disqualifiedReason])

    const userIdRef = useRef<string | undefined>(user?.id)
    useEffect(() => {
        userIdRef.current = user?.id
    }, [user?.id])

    // WebSocket subscription for live contest peer updates
    useEffect(() => {
        if (!roomCode || !isLoggedIn) return

        const token = getAuthToken()
        if (!token) return

        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
        const host = window.location.host
        const wsUrl = `${protocol}//${host}/ws/contest`

        let ws: WebSocket | null = null
        let reconnectTimer: ReturnType<typeof setTimeout> | null = null
        let isUnmounted = false

        const connect = () => {
            if (isUnmounted) return
            try {
                ws = new WebSocket(wsUrl)

                ws.onopen = () => {
                    ws?.send(
                        JSON.stringify({
                            type: 'JOIN_ROOM',
                            roomCode,
                            token,
                        })
                    )
                }

                ws.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data)
                        if (data.type === 'PEER_DISQUALIFIED') {
                            setLiveAlert({
                                id: `${Date.now()}-${Math.random()}`,
                                message: `${data.userName} was disqualified (${data.reason})`,
                                type: 'disqualified',
                            })
                            setUserRemarks((prev) => ({
                                ...prev,
                                [data.userId]: `DISQUALIFIED: ${data.reason}`,
                            }))
                            queryClient.invalidateQueries({ queryKey: ['contest-room', roomCode] })
                        } else if (data.type === 'OPPONENT_SUBMITTED') {
                            if (data.userId !== userIdRef.current) {
                                const verdict =
                                    data.total > 0
                                        ? `${data.status} (${data.passed}/${data.total} tests)`
                                        : data.status
                                setLiveAlert({
                                    id: `${Date.now()}-${Math.random()}`,
                                    message: `${data.userName} submitted: ${verdict}`,
                                    type: 'info',
                                })
                                setUserRemarks((prev) => ({
                                    ...prev,
                                    [data.userId]: `LAST: ${String(data.status).toUpperCase()} ${data.passed}/${data.total}`,
                                }))
                            }
                        } else if (data.type === 'PEER_WARNED') {
                            if (data.userId !== userIdRef.current) {
                                setLiveAlert({
                                    id: `${Date.now()}-${Math.random()}`,
                                    message: `${data.userName} got an anti-cheat warning (${data.reason}). One more and they're out.`,
                                    type: 'paste',
                                })
                                setUserRemarks((prev) => ({
                                    ...prev,
                                    [data.userId]: 'WARNED (1/1)',
                                }))
                            }
                        } else if (data.type === 'REMATCH_OFFER') {
                            if (data.fromUserId !== userIdRef.current) {
                                setLiveAlert({
                                    id: `${Date.now()}-${Math.random()}`,
                                    message: `${data.fromName} wants a rematch!`,
                                    type: 'info',
                                })
                            }
                            queryClient.invalidateQueries({ queryKey: ['contest-room', roomCode] })
                        } else if (typeof data.type === 'string' && data.type.startsWith('DUEL_')) {
                            queryClient.invalidateQueries({ queryKey: ['contest-room', roomCode] })
                        } else if (data.type === 'PEER_PASTE_ATTEMPT') {
                            setLiveAlert({
                                id: `${Date.now()}-${Math.random()}`,
                                message: `${data.userName} tried to paste ${data.chars} characters (blocked)`,
                                type: 'paste',
                            })
                            setUserRemarks((prev) => ({
                                ...prev,
                                [data.userId]: `PASTED ${data.chars} CHARS (BLOCKED)`,
                            }))
                        }
                    } catch (e) {
                        console.error('Failed to parse WS message:', e)
                    }
                }

                ws.onclose = () => {
                    if (!isUnmounted) {
                        reconnectTimer = setTimeout(connect, 3000)
                    }
                }
            } catch (e) {
                console.error('WebSocket connection error:', e)
            }
        }

        connect()

        return () => {
            isUnmounted = true
            if (reconnectTimer) clearTimeout(reconnectTimer)
            if (ws) {
                ws.onclose = null
                ws.close()
            }
        }
    }, [roomCode, isLoggedIn, queryClient])

    // Auto-dismiss live alerts after exactly 5 seconds
    useEffect(() => {
        if (!liveAlert) return
        const timer = setTimeout(() => {
            setLiveAlert(null)
        }, 5000)
        return () => clearTimeout(timer)
    }, [liveAlert])

    // Anti-cheat for contests and duels: the server counts violations.
    // First one is a warning (back to the fullscreen gate); the second disqualifies
    // (contest: locked out, duel: the opponent wins).
    const triggerIntegrityViolation = useCallback(
        async (reason: string) => {
            if (!roomCode || isDisqualified || contestRoom?.isEnded || duelFinished) return
            const now = Date.now()
            // One Alt+Tab fires blur, visibilitychange and fullscreenchange together
            if (violationInFlightRef.current || now - lastViolationAtRef.current < 3000) {
                return
            }
            lastViolationAtRef.current = now
            violationInFlightRef.current = true
            setHasEnteredFullscreen(false)
            try {
                if (isDuel) {
                    const res = await reportDuelViolation(roomCode, reason)
                    if (!res.lost) setIntegrityWarning(reason)
                } else {
                    const res = await reportContestIntegrityEvent(roomCode, 'VIOLATION', { reason })
                    if (res?.disqualified) {
                        setIsDisqualified(true)
                        setDisqualifiedReason(reason)
                        if (user?.id) {
                            setUserRemarks((prev) => ({
                                ...prev,
                                [user.id]: `DISQUALIFIED: ${reason}`,
                            }))
                        }
                    } else {
                        setIntegrityWarning(reason)
                        if (user?.id) {
                            setUserRemarks((prev) => ({ ...prev, [user.id]: 'WARNED (1/1)' }))
                        }
                    }
                }
            } catch (err) {
                console.error('Failed to report integrity violation:', err)
                setIntegrityWarning(reason)
            } finally {
                violationInFlightRef.current = false
                queryClient.invalidateQueries({ queryKey: ['contest-room', roomCode] })
            }
        },
        [
            roomCode,
            isDisqualified,
            contestRoom?.isEnded,
            duelFinished,
            isDuel,
            user?.id,
            queryClient,
        ]
    )

    // Window focus, tab switch, and fullscreen watchdog (Contest mode only)
    useEffect(() => {
        if (
            !roomCode ||
            !contestRoom ||
            !hasEnteredFullscreen ||
            isDisqualified ||
            contestRoom.isEnded ||
            duelFinished
        )
            return

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                triggerIntegrityViolation('Tab switch detected')
            }
        }

        const handleBlur = () => {
            triggerIntegrityViolation('Window unfocused')
        }

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                triggerIntegrityViolation('Exited fullscreen')
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        window.addEventListener('blur', handleBlur)
        document.addEventListener('fullscreenchange', handleFullscreenChange)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            window.removeEventListener('blur', handleBlur)
            document.removeEventListener('fullscreenchange', handleFullscreenChange)
        }
    }, [
        roomCode,
        contestRoom,
        hasEnteredFullscreen,
        isDisqualified,
        duelFinished,
        triggerIntegrityViolation,
    ])

    // Paste attempt handler (Option A: Block buffer write and broadcast attempt)
    const handlePasteAttempt = useCallback(
        async (chars: number) => {
            if (!roomCode) return
            setLiveAlert({
                id: `${Date.now()}-${Math.random()}`,
                message: `Pasting is turned off here (${chars} characters blocked)`,
                type: 'paste',
            })
            if (user?.id) {
                setUserRemarks((prev) => ({
                    ...prev,
                    [user.id]: `PASTED ${chars} CHARS (BLOCKED)`,
                }))
            }
            try {
                await reportContestIntegrityEvent(roomCode, 'PASTE_ATTEMPT', { chars })
            } catch (err) {
                console.error('Failed to report paste attempt:', err)
            }
        },
        [roomCode, user?.id]
    )

    const handleExitContest = async () => {
        if (roomCode) {
            try {
                if (isDuel) {
                    if (!duelFinished) await leaveDuel(roomCode)
                } else {
                    await leaveContestRoom(roomCode)
                }
            } catch (err) {
                console.error('Failed to leave contest room:', err)
            }
        }
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => undefined)
        }
        navigate('/')
    }

    const rematchMutation = useMutation({
        mutationFn: () => requestRematch(roomCode as string),
        onSuccess: (next) => {
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => undefined)
            }
            navigate(`/duel/${next.code}`)
        },
        onError: (err) => setRematchError(getApiErrorMessage(err, 'Could not start a rematch')),
    })

    // Blast confetti from lower-left and lower-right only when the current user wins
    useEffect(() => {
        if (!isWinner || dismissedContestResult) return

        const blast = () => {
            // Lower-left blast
            confetti({
                particleCount: 65,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.95 },
                colors: ['#5cbf92', '#87b2f4', '#fcd34d', '#eda0a5', '#ffffff'],
                zIndex: 1000,
            })
            // Lower-right blast
            confetti({
                particleCount: 65,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.95 },
                colors: ['#5cbf92', '#87b2f4', '#fcd34d', '#eda0a5', '#ffffff'],
                zIndex: 1000,
            })
        }

        blast()
    }, [isWinner, dismissedContestResult])

    // Last-used language is remembered in this browser; every language starts empty
    const [language, setLanguageState] = useState<EditorLanguage>(getRememberedLanguage)
    const setLanguage = (next: EditorLanguage) => {
        setLanguageState(next)
        rememberLanguage(next)
    }
    const [codeByLanguage, setCodeByLanguage] = useState<Record<EditorLanguage, string>>(EMPTY_CODE)
    const [activeLeftTab, setActiveLeftTab] = useState<'description' | 'submissions'>('description')
    const [bottomPanelOpen, setBottomPanelOpen] = useState(false)
    const [activeBottomTab, setActiveBottomTab] = useState<'testcase' | 'testresult'>('testcase')
    const [activeTestCase, setActiveTestCase] = useState(0)
    const [resultTitle, setResultTitle] = useState('Run Results')
    const [resultMessage, setResultMessage] = useState<string | null>(null)
    const [executionResult, setExecutionResult] = useState<ExecutionResponse | null>(null)
    const [latestSubmission, setLatestSubmission] = useState<SubmissionItem | null>(null)
    const solveStartTimeRef = useRef<number>(Date.now())

    // Split panel sizing & drag states
    const [splitWidth, setSplitWidth] = useState(45) // percent for left panel
    const [bottomHeight, setBottomHeight] = useState(45) // percent for bottom panel
    const [isDraggingH, setIsDraggingH] = useState(false)
    const [isDraggingV, setIsDraggingV] = useState(false)
    const [mobileTab, setMobileTab] = useState<'problem' | 'editor'>('problem')
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    )

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const horizontalContainerRef = useRef<HTMLDivElement>(null)
    const verticalContainerRef = useRef<HTMLDivElement>(null)

    const onStartDragH = useCallback((e: ReactMouseEvent) => {
        e.preventDefault()
        setIsDraggingH(true)
    }, [])

    useEffect(() => {
        if (!isDraggingH) return

        const handleMouseMove = (e: MouseEvent) => {
            if (!horizontalContainerRef.current) return
            const rect = horizontalContainerRef.current.getBoundingClientRect()
            const newWidth = ((e.clientX - rect.left) / rect.width) * 100
            setSplitWidth(Math.min(75, Math.max(25, newWidth)))
        }

        const handleMouseUp = () => {
            setIsDraggingH(false)
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDraggingH])

    // Pointer events so the editor/test-panel divider also drags with touch on phones
    const onStartDragV = useCallback((e: ReactPointerEvent) => {
        e.preventDefault()
        setIsDraggingV(true)
    }, [])

    useEffect(() => {
        if (!isDraggingV) return

        const handlePointerMove = (e: PointerEvent) => {
            if (!verticalContainerRef.current) return
            const rect = verticalContainerRef.current.getBoundingClientRect()
            const newHeight = ((rect.bottom - e.clientY) / rect.height) * 100
            setBottomHeight(Math.min(75, Math.max(20, newHeight)))
        }

        const handlePointerUp = () => {
            setIsDraggingV(false)
        }

        window.addEventListener('pointermove', handlePointerMove)
        window.addEventListener('pointerup', handlePointerUp)
        window.addEventListener('pointercancel', handlePointerUp)
        return () => {
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerup', handlePointerUp)
            window.removeEventListener('pointercancel', handlePointerUp)
        }
    }, [isDraggingV])

    const problemQuery = useQuery({
        queryKey: ['problem', id],
        queryFn: () => getProblem(id as string),
        enabled: Boolean(id),
    })

    useEffect(() => {
        if (!problemQuery.data) {
            return
        }

        // Codeforces-style: a fresh, empty editor for every problem
        setCodeByLanguage(EMPTY_CODE)
        setActiveTestCase(0)
        setActiveLeftTab('description')
        setExecutionResult(null)
        setLatestSubmission(null)
        setResultMessage(null)
        solveStartTimeRef.current = Date.now()
    }, [problemQuery.data?.id])

    const runMutation = useMutation({
        mutationFn: () =>
            runCode({
                sourceCode: codeByLanguage[language],
                language,
                // "Run" checks the public examples; hidden tests only run on Submit
                testcases: problemQuery.data?.examples ?? [],
            }),
        onSuccess: (execution) => {
            setResultTitle('Run Results')
            setExecutionResult(execution)
            setResultMessage(null)
        },
        onError: (error) => {
            setResultTitle('Run Results')
            setExecutionResult(null)
            setResultMessage(getApiErrorMessage(error, 'Unable to run code'))
        },
    })

    const submitMutation = useMutation({
        mutationFn: (variables?: { solveDurationSeconds?: number }) =>
            submitCode({
                problemId: id as string,
                sourceCode: codeByLanguage[language],
                language,
                contestCode: isContestTimeout || duelFinished ? undefined : roomCode,
                solveDurationSeconds: variables?.solveDurationSeconds,
            }),
        onSuccess: async (response) => {
            setResultTitle('Submission Results')
            setExecutionResult(response.execution)
            setResultMessage(response.message)
            if (response.submission) {
                setLatestSubmission(response.submission as SubmissionItem)
            }
            setActiveLeftTab('submissions')

            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['problems'] }),
                queryClient.invalidateQueries({ queryKey: ['problem', id] }),
                queryClient.invalidateQueries({ queryKey: ['profile'] }),
                queryClient.invalidateQueries({ queryKey: ['potd'] }),
                queryClient.invalidateQueries({ queryKey: ['problem-submissions', id] }),
                roomCode
                    ? queryClient.invalidateQueries({ queryKey: ['contest-room', roomCode] })
                    : Promise.resolve(),
            ])
            if (roomCode) {
                contestRoomQuery.refetch()
            }
        },
        onError: (error) => {
            setResultTitle('Submission Results')
            setExecutionResult(null)
            setResultMessage(getApiErrorMessage(error, 'Unable to submit code'))
            setActiveLeftTab('submissions')
        },
    })

    const toggleBottomPanel = (tab: 'testcase' | 'testresult') => {
        if (bottomPanelOpen && activeBottomTab === tab) {
            setBottomPanelOpen(false)
        } else {
            setBottomPanelOpen(true)
            setActiveBottomTab(tab)
        }
    }

    const ensureAuthenticated = () => {
        if (isLoggedIn) {
            return true
        }

        openModal()
        return false
    }

    const handleRun = () => {
        if (isDisqualified || !problemQuery.data || !ensureAuthenticated()) {
            return
        }

        setBottomPanelOpen(true)
        setActiveBottomTab('testresult')
        if (isMobile) setMobileTab('editor')
        runMutation.mutate()
    }

    const handleSubmit = (explicitSeconds?: number) => {
        if (isDisqualified || !problemQuery.data || !ensureAuthenticated()) {
            return
        }

        const elapsed =
            explicitSeconds ??
            Math.max(1, Math.floor((Date.now() - solveStartTimeRef.current) / 1000))
        setActiveLeftTab('submissions')
        if (isMobile) setMobileTab('problem')
        submitMutation.mutate({ solveDurationSeconds: elapsed })
    }

    const handleResetCode = () => {
        if (isDisqualified || !problemQuery.data) return
        setCodeByLanguage((current) => ({
            ...current,
            [language]: '',
        }))
    }

    // Keyboard Shortcuts: Ctrl+' to Run, Ctrl+Enter to Submit
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isDisqualified) return
            if ((e.ctrlKey || e.metaKey) && e.key === "'") {
                e.preventDefault()
                handleRun()
            } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault()
                handleSubmit()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [codeByLanguage, language, problemQuery.data, isDisqualified])

    if (problemQuery.isLoading) {
        return <SolveScreenSkeleton backPath={roomCode ? `/contest/${roomCode}` : '/'} />
    }

    if (problemQuery.isError || !problemQuery.data) {
        return (
            <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-[#141414] px-6 text-center font-mono text-xs">
                <p className="text-rose-300">
                    {getApiErrorMessage(problemQuery.error, 'Unable to load this problem')}
                </p>
                <button
                    onClick={() => navigate(roomCode ? `/contest/${roomCode}` : '/')}
                    className="border border-[#333333] px-3.5 py-1.5 rounded-[3px] text-[#e8e8e6] hover:bg-[#252423] transition-colors cursor-pointer"
                >
                    &larr; Return to Problems
                </button>
            </div>
        )
    }

    const problem = problemQuery.data
    const duelCopy =
        isDuel && duelFinished && contestRoom ? duelResultCopy(contestRoom, user?.id) : null
    const activeCode = codeByLanguage[language] ?? ''

    return (
        <DarkSurface>
            <div className="solve-screen dark flex flex-col h-dvh bg-[#141414] text-[#e8e8e6] font-sans overflow-hidden relative">
                {/* Transparent dragging overlay to ensure cursor tracking */}
                {(isDraggingH || isDraggingV) && (
                    <div
                        className={cn(
                            'fixed inset-0 z-50 select-none',
                            isDraggingH ? 'cursor-col-resize' : 'cursor-row-resize'
                        )}
                    />
                )}

                <div className="dark relative z-10 flex flex-col h-full overflow-hidden bg-[#141414] text-[#e8e8e6]">
                    <SolveScreenNavbar
                        backPath="/"
                        handleRun={handleRun}
                        handleSubmit={handleSubmit}
                        handleResetCode={handleResetCode}
                        isRunning={runMutation.isPending}
                        isSubmitting={submitMutation.isPending}
                        problemTitle={problem.title}
                        splitWidth={splitWidth}
                        contestInfo={
                            roomCode && contestRoom
                                ? {
                                      roomCode,
                                      participantCount: contestRoom.participantCount,
                                      endsAt: contestRoom.endsAt,
                                      isEnded: contestRoom.isEnded || isContestTimeout,
                                      hasWinner,
                                      winnerName: winner?.name,
                                      isWinner,
                                      isDuel,
                                      duelFinished,
                                      opponentName: duelOpponentInfo?.name,
                                      participants: (contestRoom.participants || []).map((p) => ({
                                          ...p,
                                          remark: p.isDisqualified
                                              ? `DISQUALIFIED: ${p.disqualifiedReason || 'Tab switch'}`
                                              : userRemarks[p.userId] ||
                                                (p.isHost ? 'HOST' : 'ACTIVE'),
                                      })),
                                  }
                                : undefined
                        }
                        isDisqualified={isDisqualified}
                        liveAlert={liveAlert}
                        onDismissLiveAlert={() => setLiveAlert(null)}
                    />

                    {/* Duel concluded bar (when the result modal is dismissed) */}
                    {isDuel && duelFinished && dismissedContestResult && contestRoom && (
                        <div className="w-full bg-[#18181b] border-b border-[#333333] px-3 py-1.5 flex items-center justify-between text-xs font-mono shrink-0 select-none">
                            <span
                                className={cn(
                                    'font-medium',
                                    duelOutcome(contestRoom, user?.id) === 'won'
                                        ? 'text-emerald-400'
                                        : duelOutcome(contestRoom, user?.id) === 'lost'
                                          ? 'text-rose-300'
                                          : 'text-[#fcd34d]'
                                )}
                            >
                                {duelOutcome(contestRoom, user?.id) === 'won'
                                    ? 'Duel won'
                                    : duelOutcome(contestRoom, user?.id) === 'lost'
                                      ? 'Duel lost'
                                      : 'Duel drawn'}
                                <span className="text-[#a09f9d] font-normal"> · practice mode</span>
                            </span>
                            <button
                                type="button"
                                onClick={() => setDismissedContestResult(false)}
                                className="text-[11px] text-[#87b2f4] hover:underline cursor-pointer"
                            >
                                View result
                            </button>
                        </div>
                    )}

                    {/* Persistent Match Concluded Alert Bar (When Modal is Dismissed) */}
                    {!isDuel && hasWinner && dismissedContestResult && (
                        <div className="w-full bg-[#18181b] border-b border-[#333333] px-3 py-1.5 flex items-center justify-between text-xs font-mono shrink-0 select-none">
                            <div className="flex items-center gap-2">
                                {isWinner ? (
                                    <>
                                        <span className="text-emerald-400 font-medium">
                                            Contest Won!
                                        </span>
                                        <span className="text-[#a09f9d]">
                                            You solved this challenge first.
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-rose-300 font-medium">
                                            Contest Concluded
                                        </span>
                                        <span className="text-[#a09f9d]">
                                            Won by{' '}
                                            <strong className="text-[#e8e8e6]">
                                                {winner?.name}
                                            </strong>{' '}
                                            • Practice mode active
                                        </span>
                                    </>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => setDismissedContestResult(false)}
                                className="text-[11px] text-[#87b2f4] hover:underline cursor-pointer"
                            >
                                View Results
                            </button>
                        </div>
                    )}

                    {/* Mobile View Switcher Tab Bar (Visible on < 768px) */}
                    <div className="flex md:hidden items-center justify-between px-2.5 py-1.5 bg-[#191919] border-b border-[#333333] font-mono text-xs shrink-0">
                        <div className="flex items-center gap-1 bg-[#141414] p-0.5 rounded-[3px] border border-[#333333] w-full">
                            <button
                                type="button"
                                onClick={() => setMobileTab('problem')}
                                className={cn(
                                    'flex-1 py-1 px-2.5 rounded-[2px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer',
                                    mobileTab === 'problem'
                                        ? 'bg-[#252423] text-white font-medium border border-[#3f3f46]'
                                        : 'text-[#a09f9d] hover:text-[#e8e8e6]'
                                )}
                            >
                                <FileText className="h-3 w-3 text-[#87b2f4]" />
                                <span>Problem</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setMobileTab('editor')}
                                className={cn(
                                    'flex-1 py-1 px-2.5 rounded-[2px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer',
                                    mobileTab === 'editor'
                                        ? 'bg-[#252423] text-white font-medium border border-[#3f3f46]'
                                        : 'text-[#a09f9d] hover:text-[#e8e8e6]'
                                )}
                            >
                                <span className="font-semibold text-emerald-400">&lt;/&gt;</span>
                                <span>Code & Tests</span>
                            </button>
                        </div>
                    </div>

                    <div
                        ref={horizontalContainerRef}
                        className="flex flex-1 min-h-0 overflow-hidden p-1.5 sm:p-2 gap-1.5 bg-[#141414]"
                    >
                        {/* Left Panel: Dedicated Problem Description & Submissions */}
                        {(!isMobile || mobileTab === 'problem') && (
                            <div
                                style={{ width: isMobile ? '100%' : `${splitWidth}%` }}
                                className="flex flex-col h-full bg-[#191919] rounded-[3px] border border-[#333333] overflow-hidden min-w-0 md:min-w-[280px]"
                            >
                                <div className="flex items-center justify-between bg-[#191919] px-2.5 py-1.5 font-mono text-xs shrink-0 select-none">
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => setActiveLeftTab('description')}
                                            className={cn(
                                                'flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] transition-colors cursor-pointer',
                                                activeLeftTab === 'description'
                                                    ? 'bg-[#252423] text-[#e8e8e6] font-medium border border-[#333333]'
                                                    : 'text-[#888888] hover:text-[#e8e8e6] hover:bg-[#202020]'
                                            )}
                                        >
                                            <FileText className="h-3.5 w-3.5 text-[#87b2f4]" />
                                            <span>Description</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveLeftTab('submissions')}
                                            className={cn(
                                                'flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] transition-colors cursor-pointer',
                                                activeLeftTab === 'submissions'
                                                    ? 'bg-[#252423] text-[#e8e8e6] font-medium border border-[#333333]'
                                                    : 'text-[#888888] hover:text-[#e8e8e6] hover:bg-[#202020]'
                                            )}
                                        >
                                            <History className="h-3.5 w-3.5 text-emerald-400" />
                                            <span>Submissions</span>
                                            {executionResult &&
                                                resultTitle
                                                    .toLowerCase()
                                                    .includes('submission') && (
                                                    <span
                                                        className={cn(
                                                            'h-1.5 w-1.5 rounded-full shrink-0',
                                                            executionResult.allPassed
                                                                ? 'bg-emerald-400'
                                                                : 'bg-rose-300'
                                                        )}
                                                    />
                                                )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-[#191919]">
                                    {activeLeftTab === 'description' ? (
                                        <DescriptionPanel problem={problem} />
                                    ) : (
                                        <SubmissionsPanel
                                            problemId={problem.id}
                                            sampleCount={problem.examples?.length ?? 0}
                                            totalTestcases={problem.testCount ?? 50}
                                            isLoading={submitMutation.isPending}
                                            latestExecution={
                                                resultTitle.toLowerCase().includes('submission')
                                                    ? executionResult
                                                    : null
                                            }
                                            latestSubmission={
                                                resultTitle.toLowerCase().includes('submission')
                                                    ? latestSubmission
                                                    : null
                                            }
                                            submissionMessage={
                                                resultTitle.toLowerCase().includes('submission')
                                                    ? resultMessage
                                                    : null
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Horizontal Divider (Desktop only) */}
                        {!isMobile && (
                            <div
                                onMouseDown={onStartDragH}
                                className="w-1.5 hover:bg-[#87b2f4]/30 active:bg-[#87b2f4]/50 transition-colors cursor-col-resize flex flex-col items-center justify-center group select-none shrink-0"
                                title="Drag to resize"
                            >
                                <div className="h-6 w-0.5 bg-[#333333] rounded-full group-hover:bg-[#87b2f4]" />
                            </div>
                        )}

                        {/* Right Panel: Code Editor + Testcase/Result Panel */}
                        {(!isMobile || mobileTab === 'editor') && (
                            <div
                                ref={verticalContainerRef}
                                style={{
                                    width: isMobile ? '100%' : `calc(${100 - splitWidth}% - 8px)`,
                                }}
                                className="flex flex-col h-full bg-[#191919] rounded-[3px] border border-[#333333] overflow-hidden min-w-0 md:min-w-[320px]"
                            >
                                {/* Editor Section */}
                                <div
                                    style={
                                        bottomPanelOpen
                                            ? { height: `calc(${100 - bottomHeight}% - 8px)` }
                                            : { flex: '1 1 0%', minHeight: 0 }
                                    }
                                    className="flex flex-col overflow-hidden min-h-[140px]"
                                >
                                    <EditorHeader
                                        language={language}
                                        onLanguageChange={setLanguage}
                                        disabled={isDisqualified}
                                    />

                                    <CodeEditor
                                        code={activeCode}
                                        setCode={(value) =>
                                            setCodeByLanguage((current) => ({
                                                ...current,
                                                [language]: value,
                                            }))
                                        }
                                        language={language}
                                        isContestMode={Boolean(roomCode)}
                                        onPasteAttempt={handlePasteAttempt}
                                        readOnly={isDisqualified}
                                    />
                                </div>

                                {bottomPanelOpen && (
                                    <>
                                        {/* Vertical Divider */}
                                        <div
                                            onPointerDown={onStartDragV}
                                            className="h-3 md:h-1.5 touch-none hover:bg-[#87b2f4]/30 active:bg-[#87b2f4]/50 transition-colors cursor-row-resize flex items-center justify-center group select-none shrink-0"
                                            title="Drag to resize"
                                        >
                                            <div className="w-6 h-0.5 bg-[#333333] rounded-full group-hover:bg-[#87b2f4]" />
                                        </div>

                                        {/* Bottom Panel */}
                                        <div
                                            style={{ height: `${bottomHeight}%` }}
                                            className="flex flex-col bg-[#191919] overflow-hidden min-h-[120px]"
                                        >
                                            <BottomPanelHeader
                                                activeBottomTab={activeBottomTab}
                                                setActiveBottomTab={(tab) =>
                                                    setActiveBottomTab(
                                                        tab as 'testcase' | 'testresult'
                                                    )
                                                }
                                                setBottomPanelOpen={setBottomPanelOpen}
                                            />
                                            <div className="flex-1 overflow-y-auto p-4 bg-[#191919]">
                                                {activeBottomTab === 'testcase' ? (
                                                    <TestcasePanel
                                                        examples={problem.examples ?? []}
                                                        activeTestCase={activeTestCase}
                                                        setActiveTestCase={setActiveTestCase}
                                                    />
                                                ) : (
                                                    <TestResultPanel
                                                        isLoading={
                                                            runMutation.isPending ||
                                                            submitMutation.isPending
                                                        }
                                                        title={resultTitle}
                                                        result={executionResult}
                                                        message={resultMessage}
                                                        totalTestcases={problem.testCount ?? 50}
                                                        sampleCount={problem.examples?.length ?? 0}
                                                        userSolveTime={
                                                            resultTitle
                                                                .toLowerCase()
                                                                .includes('submission')
                                                                ? latestSubmission?.userSolveTime
                                                                : null
                                                        }
                                                        onViewSubmissions={() => {
                                                            setActiveLeftTab('submissions')
                                                            if (isMobile) setMobileTab('problem')
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {!bottomPanelOpen && (
                                    <BottomPanelFooter
                                        activeBottomTab={activeBottomTab}
                                        bottomPanelOpen={bottomPanelOpen}
                                        toggleBottomPanel={(tab) =>
                                            toggleBottomPanel(tab as 'testcase' | 'testresult')
                                        }
                                        setBottomPanelOpen={setBottomPanelOpen}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Duel result */}
                {isDuel && duelFinished && contestRoom && (
                    <Modal
                        open={!dismissedContestResult}
                        onClose={() => setDismissedContestResult(true)}
                        size="md"
                        zIndex={220}
                        eyebrow={duelCopy?.eyebrow}
                        title={duelCopy?.title}
                        description={duelCopy?.description}
                        tone={duelCopy?.tone}
                    >
                        <DuelResultPanel
                            duel={contestRoom}
                            myId={user?.id}
                            problemTitle={problem.title}
                            showHeading={false}
                            onExit={handleExitContest}
                            onStay={() => setDismissedContestResult(true)}
                            onRematch={() => {
                                setRematchError(null)
                                rematchMutation.mutate()
                            }}
                            isRematchPending={rematchMutation.isPending}
                            rematchError={rematchError}
                        />
                    </Modal>
                )}

                {/* Contest result: won / someone else won / time's up */}
                {!isDuel && (
                    <Modal
                        open={(hasWinner || isContestTimeout) && !dismissedContestResult}
                        onClose={() => setDismissedContestResult(true)}
                        tone={isWinner ? 'success' : hasWinner ? 'danger' : 'warning'}
                        eyebrow="Contest finished"
                        title={
                            isWinner
                                ? 'You solved it first!'
                                : hasWinner
                                  ? 'Contest over'
                                  : "Time's up"
                        }
                        description={
                            isWinner
                                ? 'Your submission passed every test first. This one is yours.'
                                : hasWinner
                                  ? 'Someone else solved it first. You can keep practising this problem.'
                                  : 'The contest timer ran out. Submissions are closed, but you can keep practising.'
                        }
                        footer={
                            <>
                                <ModalButton onClick={handleExitContest}>
                                    {isWinner ? 'Back to problems' : 'Exit contest'}
                                </ModalButton>
                                <ModalButton
                                    variant="primary"
                                    onClick={() => setDismissedContestResult(true)}
                                >
                                    {isWinner ? 'Stay in editor' : 'Keep solving'}
                                </ModalButton>
                            </>
                        }
                    >
                        {hasWinner && !isWinner && winner && (
                            <div className="flex items-center gap-2.5 rounded-[4px] bg-[#f8fafc] dark:bg-[#252423] px-3 py-2.5">
                                <div className="h-7 w-7 rounded-full bg-[#e2e8f0] dark:bg-[#333333] flex items-center justify-center text-[11px] font-medium overflow-hidden shrink-0">
                                    {winner.avatar ? (
                                        <img
                                            src={winner.avatar}
                                            alt=""
                                            className="h-full w-full object-cover"
                                            referrerPolicy="no-referrer"
                                        />
                                    ) : (
                                        (winner.name || 'W')[0].toUpperCase()
                                    )}
                                </div>
                                <div className="min-w-0 font-mono">
                                    <div className="text-xs truncate">
                                        {winner.name || 'Participant'}
                                    </div>
                                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
                                        solved first
                                    </div>
                                </div>
                            </div>
                        )}
                        <dl className="space-y-1.5 font-mono text-xs">
                            <div className="flex items-center justify-between gap-3">
                                <dt className="text-[#64748b] dark:text-[#888888]">Problem</dt>
                                <dd className="truncate max-w-[220px]">{problem.title}</dd>
                            </div>
                            {isWinner && (
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="text-[#64748b] dark:text-[#888888]">Verdict</dt>
                                    <dd className="text-emerald-600 dark:text-emerald-400">
                                        Accepted
                                    </dd>
                                </div>
                            )}
                            {!hasWinner && (
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="text-[#64748b] dark:text-[#888888]">Duration</dt>
                                    <dd>{contestRoom?.timeLimitMinutes || 45} min</dd>
                                </div>
                            )}
                            <div className="flex items-center justify-between gap-3">
                                <dt className="text-[#64748b] dark:text-[#888888]">Participants</dt>
                                <dd>{contestRoom?.participantCount ?? 0}</dd>
                            </div>
                        </dl>
                    </Modal>
                )}

                {/* Fullscreen rules / warning gate (not dismissible) */}
                <Modal
                    open={
                        Boolean(roomCode) &&
                        !hasEnteredFullscreen &&
                        !isDisqualified &&
                        !contestRoom?.isEnded &&
                        !duelFinished
                    }
                    zIndex={200}
                    tone={integrityWarning ? 'warning' : 'default'}
                    eyebrow={integrityWarning ? 'Warning 1 of 1' : isDuel ? '1v1 Duel' : 'Contest'}
                    title={integrityWarning ? 'You left the window' : 'Fullscreen required'}
                    description={
                        integrityWarning ? (
                            <>
                                {integrityWarning}. Do that once more and{' '}
                                {isDuel ? 'you lose the duel.' : "you'll be disqualified."}
                            </>
                        ) : (
                            `This ${isDuel ? 'duel' : 'contest'} runs in fullscreen to keep it fair.`
                        )
                    }
                    footer={
                        <ModalButton
                            variant="accent"
                            block
                            onClick={async () => {
                                try {
                                    if (!document.fullscreenElement) {
                                        await document.documentElement.requestFullscreen()
                                    }
                                } catch {
                                    // Allow entering if the browser denies programmatic fullscreen
                                }
                                setHasEnteredFullscreen(true)
                            }}
                        >
                            {integrityWarning
                                ? 'Re-enter fullscreen'
                                : isDuel
                                  ? 'Enter fullscreen & start duel'
                                  : 'Enter fullscreen & start contest'}
                        </ModalButton>
                    }
                >
                    <ol className="space-y-1.5 font-mono text-[11px] text-[#52525b] dark:text-[#a09f9d] list-decimal pl-4">
                        <li>Stay in fullscreen for the whole {isDuel ? 'duel' : 'contest'}.</li>
                        <li>
                            Switching tabs or windows: first time is a warning, second time{' '}
                            {isDuel ? 'you lose.' : "you're disqualified."}
                        </li>
                        <li>Pasting into the editor is blocked.</li>
                    </ol>
                </Modal>

                {/* Disqualified (contests only; duels show the duel result instead) */}
                <Modal
                    open={isDisqualified && !isDuel}
                    zIndex={210}
                    tone="danger"
                    eyebrow="Disqualified"
                    title="Your contest session has ended"
                    description="This room is locked for you after a second integrity violation. Edits and submissions are disabled."
                    footer={
                        <ModalButton variant="primary" block onClick={handleExitContest}>
                            Exit contest
                        </ModalButton>
                    }
                >
                    <div className="rounded-[4px] bg-rose-50 dark:bg-rose-950/30 px-3 py-2.5 font-mono text-xs text-rose-700 dark:text-rose-300">
                        Reason: {disqualifiedReason || 'Left the contest window'}
                    </div>
                </Modal>

                <LoginModal />
                <SignoutModal />
            </div>
        </DarkSurface>
    )
}
