import { useEffect, useState, useRef, useCallback, type MouseEvent as ReactMouseEvent } from 'react'
import { createPortal } from 'react-dom'
import confetti from 'canvas-confetti'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { FileText, History, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FALLBACK_CODE, LANGUAGES } from '@/data/code'
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
import { CodeEditor } from '@/components/problem/CodeEditor'
import { getApiErrorMessage, getProblem, getContestRoom, runCode, submitCode } from '@/lib/api'
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
    const winner = contestRoom?.leaderboard?.find((entry) => entry.solved >= 1)
    const hasWinner = Boolean(winner)
    const isWinner = Boolean(winner && (winner.isYou || (user && winner.userId === user.id)))
    const isContestTimeout = Boolean(
        contestRoom &&
            (contestRoom.isEnded ||
                (contestRoom.endsAt && (parseUtcDate(contestRoom.endsAt) ?? Infinity) <= Date.now())) &&
            !hasWinner
    )

    // Blast confetti from lower-left and lower-right when someone wins
    useEffect(() => {
        if (!hasWinner || dismissedContestResult) return

        const blast = () => {
            // Lower-left blast
            confetti({
                particleCount: 65,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.95 },
                colors: ['#34d399', '#87b2f4', '#fcd34d', '#fda4af', '#ffffff'],
                zIndex: 1000,
            })
            // Lower-right blast
            confetti({
                particleCount: 65,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.95 },
                colors: ['#34d399', '#87b2f4', '#fcd34d', '#fda4af', '#ffffff'],
                zIndex: 1000,
            })
        }

        blast()
        const timer = setTimeout(blast, 280)
        return () => clearTimeout(timer)
    }, [hasWinner, dismissedContestResult])

    const [language, setLanguage] = useState<EditorLanguage>('cpp')
    const [codeByLanguage, setCodeByLanguage] =
        useState<Record<EditorLanguage, string>>(FALLBACK_CODE)
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

    const onStartDragV = useCallback((e: ReactMouseEvent) => {
        e.preventDefault()
        setIsDraggingV(true)
    }, [])

    useEffect(() => {
        if (!isDraggingV) return

        const handleMouseMove = (e: MouseEvent) => {
            if (!verticalContainerRef.current) return
            const rect = verticalContainerRef.current.getBoundingClientRect()
            const newHeight = ((rect.bottom - e.clientY) / rect.height) * 100
            setBottomHeight(Math.min(75, Math.max(20, newHeight)))
        }

        const handleMouseUp = () => {
            setIsDraggingV(false)
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
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

        const nextCodes = {
            ...FALLBACK_CODE,
            ...(problemQuery.data.starterCodes ?? {}),
        }

        setCodeByLanguage(nextCodes)
        setActiveTestCase(0)
        setActiveLeftTab('description')
        setExecutionResult(null)
        setLatestSubmission(null)
        setResultMessage(null)
        solveStartTimeRef.current = Date.now()

        const defaultLanguage =
            LANGUAGES.find((item) => problemQuery.data?.starterCodes?.[item.id])?.id ?? 'cpp'
        setLanguage(defaultLanguage)
    }, [problemQuery.data?.id])

    const runMutation = useMutation({
        mutationFn: () =>
            runCode({
                sourceCode: codeByLanguage[language],
                language,
                testcases: problemQuery.data?.examples?.length
                    ? problemQuery.data.examples
                    : (problemQuery.data?.testcases ?? []),
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
                contestCode: isContestTimeout ? undefined : roomCode,
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
        if (!problemQuery.data || !ensureAuthenticated()) {
            return
        }

        setBottomPanelOpen(true)
        setActiveBottomTab('testresult')
        if (isMobile) setMobileTab('editor')
        runMutation.mutate()
    }

    const handleSubmit = (explicitSeconds?: number) => {
        if (!problemQuery.data || !ensureAuthenticated()) {
            return
        }

        const elapsed = explicitSeconds ?? Math.max(1, Math.floor((Date.now() - solveStartTimeRef.current) / 1000))
        setActiveLeftTab('submissions')
        if (isMobile) setMobileTab('problem')
        submitMutation.mutate({ solveDurationSeconds: elapsed })
    }

    const handleResetCode = () => {
        if (!problemQuery.data) return
        const defaultCode = problemQuery.data.starterCodes?.[language] ?? FALLBACK_CODE[language]
        setCodeByLanguage((current) => ({
            ...current,
            [language]: defaultCode,
        }))
    }

    // Keyboard Shortcuts: Ctrl+' to Run, Ctrl+Enter to Submit
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
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
    }, [codeByLanguage, language, problemQuery.data])

    if (problemQuery.isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#141414] text-[#a09f9d] font-mono text-xs">
                <div>Loading problem database...</div>
            </div>
        )
    }

    if (problemQuery.isError || !problemQuery.data) {
        return (
            <div className="flex h-screen flex-col items-center justify-center gap-4 bg-[#141414] px-6 text-center font-mono text-xs">
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
    const activeCode = codeByLanguage[language] ?? FALLBACK_CODE[language]

    return (
        <div className="solve-screen dark flex flex-col h-screen bg-[#141414] text-[#e8e8e6] font-sans overflow-hidden relative">
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
                                  participants: contestRoom.participants || [],
                              }
                            : undefined
                    }
                />

                {/* Persistent Match Concluded Alert Bar (When Modal is Dismissed) */}
                {hasWinner && dismissedContestResult && (
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
                                        <strong className="text-[#e8e8e6]">{winner?.name}</strong> •
                                        Practice mode active
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
                            <div className="flex items-center justify-between bg-[#191919] px-2.5 py-1.5 border-b border-[#333333] font-mono text-xs shrink-0 select-none">
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
                                        {executionResult && resultTitle.toLowerCase().includes('submission') && (
                                            <span
                                                className={cn(
                                                    'h-1.5 w-1.5 rounded-full shrink-0',
                                                    executionResult.allPassed ? 'bg-emerald-400' : 'bg-rose-300'
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
                                        totalTestcases={problem.testcases?.length ?? 30}
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
                                <EditorHeader language={language} />

                                <CodeEditor
                                    code={activeCode}
                                    setCode={(value) =>
                                        setCodeByLanguage((current) => ({
                                            ...current,
                                            [language]: value,
                                        }))
                                    }
                                    language={language}
                                />
                            </div>

                            {bottomPanelOpen && (
                                <>
                                    {/* Vertical Divider */}
                                    <div
                                        onMouseDown={onStartDragV}
                                        className="h-1.5 hover:bg-[#87b2f4]/30 active:bg-[#87b2f4]/50 transition-colors cursor-row-resize flex items-center justify-center group select-none shrink-0"
                                        title="Drag to resize"
                                    >
                                        <div className="w-6 h-0.5 bg-[#333333] rounded-full group-hover:bg-[#87b2f4]" />
                                    </div>

                                    {/* Bottom Panel */}
                                    <div
                                        style={{ height: `${bottomHeight}%` }}
                                        className="flex flex-col bg-[#191919] border-t border-[#333333] overflow-hidden min-h-[120px]"
                                    >
                                        <BottomPanelHeader
                                            activeBottomTab={activeBottomTab}
                                            setActiveBottomTab={(tab) =>
                                                setActiveBottomTab(tab as 'testcase' | 'testresult')
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
                                                    totalTestcases={problem.testcases?.length ?? 30}
                                                    sampleCount={problem.examples?.length ?? 0}
                                                    userSolveTime={
                                                        resultTitle.toLowerCase().includes('submission')
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

            {/* Contest Victory / Defeat / Timeout Overlay Modal */}
            {(hasWinner || isContestTimeout) &&
                !dismissedContestResult &&
                createPortal(
                    <div
                        className="dark fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 transition-all"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="w-full max-w-[440px] rounded-[4px] border border-[#333333] bg-[#1e1e1e] text-[#e8e8e6] shadow-2xl p-6 relative font-mono space-y-5 transition-all">
                            {/* Dismiss Button */}
                            <button
                                type="button"
                                onClick={() => setDismissedContestResult(true)}
                                className="absolute top-4 right-4 text-[#94a3b8] hover:text-white transition-colors p-1 cursor-pointer"
                                aria-label="Close"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            {hasWinner && isWinner ? (
                                /* VICTORY CARD FOR WINNER */
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <div className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold">
                                            Contest Concluded
                                        </div>
                                        <h2 className="text-base font-bold text-[#e8e8e6] tracking-tight">
                                            Victory! First to Solve!
                                        </h2>
                                    </div>

                                    <div className="space-y-2 text-xs py-1">
                                        <div className="flex items-center justify-between text-[#888888]">
                                            <span>Problem</span>
                                            <span className="text-[#e8e8e6] font-medium truncate max-w-[200px]">
                                                {problem.title}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-[#888888]">
                                            <span>Verdict</span>
                                            <span className="text-emerald-400 font-medium">
                                                Accepted (100% Passed)
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-[#888888]">
                                            <span>Participants</span>
                                            <span className="text-[#e8e8e6]">
                                                {contestRoom?.participantCount} Coders
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-[#888888] leading-relaxed">
                                        Congratulations! Your submission passed all test cases
                                        first, winning this match.
                                    </p>

                                    <div className="flex items-center gap-2 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setDismissedContestResult(true)}
                                            className="flex-1 border border-[#333333] hover:bg-[#252423] text-[#888888] hover:text-white text-xs py-2 px-3 rounded-[3px] font-medium transition-colors cursor-pointer text-center"
                                        >
                                            Stay in IDE
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => navigate('/')}
                                            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs py-2 px-3 rounded-[3px] font-medium transition-colors cursor-pointer text-center shadow-xs"
                                        >
                                            Back to Problems
                                        </button>
                                    </div>
                                </div>
                            ) : hasWinner ? (
                                /* DEFEAT / CONCLUDED CARD FOR OTHER PARTICIPANTS */
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <div className="text-[10px] text-rose-300 uppercase tracking-widest font-semibold">
                                            Match Concluded
                                        </div>
                                        <h2 className="text-base font-bold text-[#e8e8e6] tracking-tight">
                                            Contest Over
                                        </h2>
                                    </div>

                                    {/* Winner Basic Profile */}
                                    {winner && (
                                        <div className="flex items-center gap-3 py-1">
                                            <div className="h-9 w-9 rounded-full bg-[#252423] border border-[#333333] flex items-center justify-center text-xs font-medium text-[#e8e8e6] overflow-hidden shrink-0">
                                                {winner.avatar ? (
                                                    <img
                                                        src={winner.avatar}
                                                        alt={winner.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <span>
                                                        {(winner.name || 'W')[0].toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="text-xs font-medium text-[#e8e8e6] truncate">
                                                    {winner.name || 'Participant'}
                                                </div>
                                                <div className="text-[11px] text-[#888888] truncate">
                                                    Solved first • Match ended
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <p className="text-xs text-[#888888] leading-relaxed">
                                        Another participant solved the problem and passed all test
                                        cases first. You can keep writing and testing your code to
                                        finish this challenge for practice!
                                    </p>

                                    <div className="flex items-center gap-2 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/')}
                                            className="flex-1 border border-[#333333] hover:bg-[#252423] text-[#888888] hover:text-white text-xs py-2 px-3 rounded-[3px] font-medium transition-colors cursor-pointer text-center"
                                        >
                                            Exit Contest
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDismissedContestResult(true)}
                                            className="flex-1 bg-[#87b2f4] hover:bg-[#72a3ed] text-[#141414] text-xs py-2 px-3 rounded-[3px] font-medium transition-colors cursor-pointer text-center shadow-xs"
                                        >
                                            Keep Solving
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* TIME EXPIRED CARD WHEN NO ONE SOLVED IN TIME */
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <div className="text-[10px] text-rose-300 uppercase tracking-widest font-semibold">
                                            Contest Concluded
                                        </div>
                                        <h2 className="text-base font-bold text-[#e8e8e6] tracking-tight">
                                            Time&apos;s Up!
                                        </h2>
                                    </div>

                                    <div className="space-y-2 text-xs py-1">
                                        <div className="flex items-center justify-between text-[#888888]">
                                            <span>Problem</span>
                                            <span className="text-[#e8e8e6] font-medium truncate max-w-[200px]">
                                                {problem.title}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-[#888888]">
                                            <span>Duration</span>
                                            <span className="text-[#e8e8e6] font-medium">
                                                {contestRoom?.timeLimitMinutes || 45} mins expired
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-[#888888]">
                                            <span>Participants</span>
                                            <span className="text-[#e8e8e6]">
                                                {contestRoom?.participantCount} Coders
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-[#888888] leading-relaxed">
                                        The contest time limit has concluded. Contest submissions are now closed, but you can keep writing and testing your code in practice mode!
                                    </p>

                                    <div className="flex items-center gap-2 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/')}
                                            className="flex-1 border border-[#333333] hover:bg-[#252423] text-[#888888] hover:text-white text-xs py-2 px-3 rounded-[3px] font-medium transition-colors cursor-pointer text-center"
                                        >
                                            Exit Contest
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDismissedContestResult(true)}
                                            className="flex-1 bg-[#87b2f4] hover:bg-[#72a3ed] text-[#141414] text-xs py-2 px-3 rounded-[3px] font-medium transition-colors cursor-pointer text-center shadow-xs"
                                        >
                                            Keep Solving
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>,
                    document.body
                )}

            <LoginModal forceDark />
            <SignoutModal forceDark />
        </div>
    )
}
