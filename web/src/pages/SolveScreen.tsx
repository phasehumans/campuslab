import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { FileText, FlaskConical } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Panel, Group, Separator } from 'react-resizable-panels'
import { FALLBACK_CODE, LANGUAGES } from '@/data/code'
import { useAuth } from '@/contexts/AuthContext'
import { DescriptionPanel } from '@/components/problem/DescriptionPanel'
import { SolutionsPanel } from '@/components/problem/SolutionsPanel'
import { TestcasePanel } from '@/components/problem/TestcasePanel'
import { TestResultPanel } from '@/components/problem/TestResultPanel'
import { EditorHeader } from '@/components/problem/EditorHeader'
import { BottomPanelHeader } from '@/components/problem/BottomPanelHeader'
import { BottomPanelFooter } from '@/components/problem/BottomPanelFooter'
import { SolveScreenNavbar } from '@/components/problem/SolveScreenNavbar'
import { CodeEditor } from '@/components/problem/CodeEditor'
import { getApiErrorMessage, getProblem, runCode, submitCode } from '@/lib/api'
import type { EditorLanguage, ExecutionResponse } from '@/lib/types'

export function SolveScreen() {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const roomCode = searchParams.get('room')
    const { isLoggedIn, openModal } = useAuth()

    const [activeTab, setActiveTab] = useState<'description' | 'solutions'>('description')
    const [language, setLanguage] = useState<EditorLanguage>('cpp')
    const [codeByLanguage, setCodeByLanguage] = useState<Record<EditorLanguage, string>>(FALLBACK_CODE)
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
    const [bottomPanelOpen, setBottomPanelOpen] = useState(false)
    const [activeBottomTab, setActiveBottomTab] = useState<'testcase' | 'testresult'>('testcase')
    const [copied, setCopied] = useState(false)
    const [activeTestCase, setActiveTestCase] = useState(0)
    const [resultTitle, setResultTitle] = useState('Run Results')
    const [resultMessage, setResultMessage] = useState<string | null>(null)
    const [executionResult, setExecutionResult] = useState<ExecutionResponse | null>(null)

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
            ...problemQuery.data.starterCodes,
        }

        setCodeByLanguage(nextCodes)
        setActiveTestCase(0)
        setExecutionResult(null)
        setResultMessage(null)

        const defaultLanguage =
            LANGUAGES.find((item) => problemQuery.data.starterCodes[item.id])?.id ?? 'cpp'
        setLanguage(defaultLanguage)
    }, [problemQuery.data?.id])

    const runMutation = useMutation({
        mutationFn: () =>
            runCode({
                sourceCode: codeByLanguage[language],
                language,
                testcases:
                    problemQuery.data?.examples.length ? problemQuery.data.examples : problemQuery.data?.testcases ?? [],
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
        mutationFn: () =>
            submitCode({
                problemId: id as string,
                sourceCode: codeByLanguage[language],
                language,
                contestCode: roomCode,
            }),
        onSuccess: async (response) => {
            setResultTitle('Submission Results')
            setExecutionResult(response.execution)
            setResultMessage(response.message)

            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['problems'] }),
                queryClient.invalidateQueries({ queryKey: ['problem', id] }),
                queryClient.invalidateQueries({ queryKey: ['profile'] }),
                roomCode
                    ? queryClient.invalidateQueries({ queryKey: ['contest-room', roomCode] })
                    : Promise.resolve(),
            ])
        },
        onError: (error) => {
            setResultTitle('Submission Results')
            setExecutionResult(null)
            setResultMessage(getApiErrorMessage(error, 'Unable to submit code'))
        },
    })

    const handleLanguageChange = (langId: string) => {
        const nextLanguage = langId as EditorLanguage
        setLanguage(nextLanguage)
        setCodeByLanguage((current) => ({
            ...current,
            [nextLanguage]:
                current[nextLanguage] ??
                problemQuery.data?.starterCodes[nextLanguage] ??
                FALLBACK_CODE[nextLanguage],
        }))
        setIsLangDropdownOpen(false)
    }

    const handleCopySolution = () => {
        const solution =
            problemQuery.data?.referenceSolutions[language] ??
            problemQuery.data?.starterCodes[language] ??
            FALLBACK_CODE[language]
        navigator.clipboard.writeText(solution)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

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

        openModal('login')
        return false
    }

    const handleRun = () => {
        if (!problemQuery.data || !ensureAuthenticated()) {
            return
        }

        setBottomPanelOpen(true)
        setActiveBottomTab('testresult')
        runMutation.mutate()
    }

    const handleSubmit = () => {
        if (!problemQuery.data || !ensureAuthenticated()) {
            return
        }

        setBottomPanelOpen(true)
        setActiveBottomTab('testresult')
        submitMutation.mutate()
    }

    if (problemQuery.isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#0A0A0A] text-gray-400">
                Loading problem...
            </div>
        )
    }

    if (problemQuery.isError || !problemQuery.data) {
        return (
            <div className="flex h-screen flex-col items-center justify-center gap-4 bg-[#0A0A0A] px-6 text-center">
                <p className="text-sm text-red-200">
                    {getApiErrorMessage(problemQuery.error, 'Unable to load this problem')}
                </p>
                <button
                    onClick={() => navigate(roomCode ? `/contest/${roomCode}` : '/')}
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/5"
                >
                    Go back
                </button>
            </div>
        )
    }

    const problem = problemQuery.data
    const activeCode = codeByLanguage[language] ?? FALLBACK_CODE[language]

    return (
        <div className="flex flex-col h-screen bg-[#0A0A0A] text-gray-300 font-sans overflow-hidden">
            <SolveScreenNavbar
                backPath={roomCode ? `/contest/${roomCode}` : '/'}
                handleRun={handleRun}
                handleSubmit={handleSubmit}
                isRunning={runMutation.isPending}
                isSubmitting={submitMutation.isPending}
            />

            <div className="flex flex-1 overflow-hidden p-2 bg-[#0A0A0A] gap-2">
                <Group orientation="horizontal" className="flex-1 rounded-lg overflow-hidden">
                    <Panel
                        defaultSize={40}
                        minSize={30}
                        className="flex flex-col bg-[#1E1E1E] rounded-lg border border-white/5 shadow-lg"
                    >
                        <div className="flex items-center gap-1 bg-[#181818] px-2 pt-2 border-b border-white/5">
                            <button
                                onClick={() => setActiveTab('description')}
                                className={cn(
                                    'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors',
                                    activeTab === 'description'
                                        ? 'bg-[#1E1E1E] text-white'
                                        : 'text-gray-400 hover:text-gray-200 hover:bg-[#1E1E1E]/50'
                                )}
                            >
                                <FileText className="h-4 w-4 text-blue-400" /> Description
                            </button>
                            <button
                                onClick={() => setActiveTab('solutions')}
                                className={cn(
                                    'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors',
                                    activeTab === 'solutions'
                                        ? 'bg-[#1E1E1E] text-white'
                                        : 'text-gray-400 hover:text-gray-200 hover:bg-[#1E1E1E]/50'
                                )}
                            >
                                <FlaskConical className="h-4 w-4 text-purple-400" /> Solutions
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {activeTab === 'description' ? (
                                <DescriptionPanel problem={problem} />
                            ) : (
                                <SolutionsPanel
                                    language={language}
                                    copied={copied}
                                    onCopy={handleCopySolution}
                                    solutionCode={problem.referenceSolutions[language]}
                                    editorial={problem.editorial}
                                />
                            )}
                        </div>
                    </Panel>

                    <Separator className="w-2 bg-transparent hover:bg-white/5 transition-colors cursor-col-resize flex flex-col items-center justify-center gap-1 group mx-1">
                        <div className="h-4 w-1 bg-white/10 rounded-full group-hover:bg-white/40 transition-colors" />
                    </Separator>

                    <Panel
                        defaultSize={60}
                        minSize={30}
                        className="flex flex-col bg-[#1E1E1E] rounded-lg border border-white/5 shadow-lg overflow-hidden"
                    >
                        <Group orientation="vertical" className="flex-1 w-full h-full">
                            <Panel
                                id="editor-panel"
                                defaultSize={bottomPanelOpen ? 70 : 100}
                                minSize={30}
                                className="flex flex-col"
                            >
                                <EditorHeader
                                    language={language}
                                    isLangDropdownOpen={isLangDropdownOpen}
                                    setIsLangDropdownOpen={setIsLangDropdownOpen}
                                    handleLanguageChange={handleLanguageChange}
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
                                />
                            </Panel>

                            {bottomPanelOpen && (
                                <>
                                    <Separator className="h-2 bg-transparent hover:bg-white/5 transition-colors cursor-row-resize flex items-center justify-center group">
                                        <div className="w-4 h-1 bg-white/10 rounded-full group-hover:bg-white/40 transition-colors" />
                                    </Separator>
                                    <Panel
                                        id="testcase-panel"
                                        defaultSize={30}
                                        minSize={20}
                                        className="flex flex-col bg-[#1E1E1E] border-t border-white/5"
                                    >
                                        <BottomPanelHeader
                                            activeBottomTab={activeBottomTab}
                                            setActiveBottomTab={(tab) =>
                                                setActiveBottomTab(tab as 'testcase' | 'testresult')
                                            }
                                            setBottomPanelOpen={setBottomPanelOpen}
                                        />
                                        <div className="flex-1 overflow-y-auto p-4 bg-[#1E1E1E]">
                                            {activeBottomTab === 'testcase' ? (
                                                <TestcasePanel
                                                    examples={problem.examples}
                                                    activeTestCase={activeTestCase}
                                                    setActiveTestCase={setActiveTestCase}
                                                />
                                            ) : (
                                                <TestResultPanel
                                                    isLoading={runMutation.isPending || submitMutation.isPending}
                                                    title={resultTitle}
                                                    result={executionResult}
                                                    message={resultMessage}
                                                />
                                            )}
                                        </div>
                                    </Panel>
                                </>
                            )}
                        </Group>

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
                    </Panel>
                </Group>
            </div>
        </div>
    )
}
