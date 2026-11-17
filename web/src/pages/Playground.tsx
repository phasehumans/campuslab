import { useState, useEffect, useCallback, useTransition } from 'react'
import { Link } from 'react-router-dom'
import {
    Play,
    RotateCcw,
    Trash2,
    Copy,
    Check,
    AlertCircle,
    Loader2,
    ArrowLeft,
    Maximize,
    Minimize,
} from 'lucide-react'
import { CodeEditor } from '@/components/problem/CodeEditor'
import { EditorHeader } from '@/components/problem/EditorHeader'
import { getRememberedLanguage, rememberLanguage } from '@/data/code'
import { useAuth } from '@/contexts/AuthContext'
import { LoginModal } from '@/components/auth/LoginModal'
import { SignoutModal } from '@/components/auth/SignoutModal'
import { runPlaygroundCode } from '@/lib/api'
import { cn } from '@/lib/utils'
import { Tooltip } from '@/components/ui/Tooltip'
import { DarkSurface } from '@/components/ui/Modal'
import type { EditorLanguage, PlaygroundRunResponse } from '@/lib/types'

const RUN_SHORTCUT_HINT =
    typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent)
        ? 'Run code (⌘ + Enter)'
        : 'Run code (Ctrl + Enter)'

// Code is kept per language (the C++ key matches what older versions saved)
const codeStorageKey = (language: EditorLanguage) => `campuslab_playground_code_${language}`

function loadCode(language: EditorLanguage) {
    try {
        return localStorage.getItem(codeStorageKey(language)) ?? ''
    } catch {
        return ''
    }
}
const STORAGE_KEY_STDIN = 'campuslab_playground_stdin'

export function Playground() {
    const { isLoggedIn, openModal } = useAuth()
    const [language, setLanguageState] = useState<EditorLanguage>(getRememberedLanguage)
    const [code, setCode] = useState<string>(() => loadCode(getRememberedLanguage()))
    const changeLanguage = (next: EditorLanguage) => {
        setLanguageState(next)
        rememberLanguage(next)
        setCode(loadCode(next))
        setResult(null)
        setErrorMsg(null)
    }

    const [stdin, setStdin] = useState<string>(() => {
        try {
            return localStorage.getItem(STORAGE_KEY_STDIN) || ''
        } catch {
            return ''
        }
    })

    const [isRunning, setIsRunning] = useState(false)
    const [result, setResult] = useState<PlaygroundRunResponse | null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    // Below lg the editor and input/output panels are shown one at a time
    const [mobileTab, setMobileTab] = useState<'code' | 'io'>('code')
    const [, startTransition] = useTransition()

    // Autosave code to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(codeStorageKey(language), code)
        } catch {
            // ignore storage quota errors
        }
    }, [code, language])

    // Autosave stdin to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY_STDIN, stdin)
        } catch {
            // ignore storage quota errors
        }
    }, [stdin])

    const handleRun = useCallback(async () => {
        if (isRunning) return
        setIsRunning(true)
        setErrorMsg(null)
        // On phones the output lives on its own tab, so jump there to show the run
        setMobileTab('io')

        try {
            const res = await runPlaygroundCode({
                sourceCode: code,
                stdin,
                language,
            })
            startTransition(() => {
                setResult(res)
            })
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : 'Execution failed. Please try again.'
            setErrorMsg(message)
        } finally {
            setIsRunning(false)
        }
    }, [code, stdin, isRunning, language])

    // Global keyboard shortcut: Ctrl+Enter or Cmd+Enter to run
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault()
                handleRun()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleRun])

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => setIsFullscreen(true))
        } else {
            document.exitFullscreen().then(() => setIsFullscreen(false))
        }
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement))
        }
        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }, [])

    const handleReset = () => {
        if (window.confirm('Clear the editor? Your current code will be removed.')) {
            setCode('')
            setResult(null)
            setErrorMsg(null)
        }
    }

    const handleClearOutput = () => {
        setResult(null)
        setErrorMsg(null)
    }

    const handleCopyOutput = () => {
        const textToCopy =
            result?.compile_output ||
            [result?.stdout, result?.stderr].filter(Boolean).join('\n') ||
            ''
        if (!textToCopy) return
        navigator.clipboard.writeText(textToCopy)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <DarkSurface>
            <div className="solve-screen dark flex flex-col h-dvh w-full bg-[#141414] text-[#e8e8e6] font-sans overflow-hidden select-none relative">
                {/* Top Navbar: matches SolveScreenNavbar in dark theme always */}
                <nav className="flex items-center justify-between h-12 px-2.5 sm:px-4 bg-[#141414] text-[#e8e8e6] font-mono text-xs border-b border-[#333333] shrink-0 select-none">
                    {/* Left: Back Arrow + Logo */}
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                        <Link
                            to="/"
                            className="p-1.5 text-[#a09f9d] hover:text-[#e8e8e6] border border-[#333333] bg-[#252423] hover:bg-[#2f2e2d] rounded-[3px] transition-colors cursor-pointer flex items-center justify-center shrink-0"
                            title="Back to CampusLab"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                        </Link>

                        <Link
                            to="/"
                            className="flex items-center gap-2 hover:opacity-85 transition-opacity"
                        >
                            <span className="font-semibold text-[#e8e8e6] tracking-tight">
                                CampusLab
                            </span>
                            <span className="text-[#333333] select-none">/</span>
                            <span className="text-[#a09f9d] font-medium hidden sm:inline">
                                Playground
                            </span>
                        </Link>
                    </div>

                    {/* Center: Run Code Action Button */}
                    <div className="flex items-center gap-2">
                        <Tooltip content={RUN_SHORTCUT_HINT} position="bottom">
                            <button
                                type="button"
                                onClick={handleRun}
                                disabled={isRunning}
                                aria-label={RUN_SHORTCUT_HINT}
                                className="flex items-center gap-1.5 bg-[#252423] hover:bg-[#2f2e2d] disabled:opacity-50 disabled:cursor-not-allowed text-[#e8e8e6] border border-[#333333] px-3.5 sm:px-4 py-1.5 rounded-[2px] font-mono text-xs font-medium transition-colors cursor-pointer shadow-xs"
                            >
                                {isRunning ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin text-[#87b2f4]" />
                                ) : (
                                    <Play className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500" />
                                )}
                                <span>{isRunning ? 'Running...' : 'Run'}</span>
                            </button>
                        </Tooltip>
                    </div>

                    {/* Right: Reset, Clear, Fullscreen, GitHub, Auth */}
                    <div className="flex items-center gap-2 font-mono text-xs">
                        <Tooltip content="Clear the editor" position="bottom">
                            <button
                                type="button"
                                onClick={handleReset}
                                aria-label="Clear the editor"
                                className="p-1.5 text-[#a09f9d] hover:text-[#e8e8e6] border border-[#333333] bg-[#252423] hover:bg-[#2f2e2d] rounded-[3px] transition-colors cursor-pointer flex items-center justify-center"
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                            </button>
                        </Tooltip>

                        {result && (
                            <Tooltip content="Clear output" position="bottom">
                                <button
                                    type="button"
                                    onClick={handleClearOutput}
                                    aria-label="Clear output"
                                    className="p-1.5 text-[#a09f9d] hover:text-[#e8e8e6] border border-[#333333] bg-[#252423] hover:bg-[#2f2e2d] rounded-[3px] transition-colors cursor-pointer flex items-center justify-center"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            </Tooltip>
                        )}

                        <Tooltip
                            content={isFullscreen ? 'Exit Fullscreen' : 'Zen Fullscreen'}
                            position="bottom"
                        >
                            <button
                                type="button"
                                onClick={toggleFullscreen}
                                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Zen Fullscreen'}
                                className="p-1.5 text-[#a09f9d] hover:text-[#e8e8e6] border border-[#333333] bg-[#252423] hover:bg-[#2f2e2d] rounded-[3px] transition-colors cursor-pointer hidden sm:flex items-center justify-center"
                            >
                                {isFullscreen ? (
                                    <Minimize className="h-3.5 w-3.5" />
                                ) : (
                                    <Maximize className="h-3.5 w-3.5" />
                                )}
                            </button>
                        </Tooltip>

                        {/* GitHub Link */}
                        <Tooltip content="GitHub Repository" position="bottom" align="end">
                            <a
                                href="https://github.com/phasehumans/campuslab"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 text-[#a09f9d] hover:text-[#e8e8e6] border border-[#333333] bg-[#252423] hover:bg-[#2f2e2d] rounded-[3px] transition-colors cursor-pointer flex items-center justify-center"
                                aria-label="GitHub Repository"
                            >
                                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    />
                                </svg>
                            </a>
                        </Tooltip>

                        {/* Sign In (logged out only) */}
                        {!isLoggedIn && (
                            <button
                                type="button"
                                onClick={openModal}
                                className="inline-flex items-center gap-1.5 bg-[#252423] hover:bg-[#2f2e2d] text-[#e8e8e6] border border-[#333333] text-xs font-mono font-medium px-2.5 py-1 rounded-[3px] transition-colors cursor-pointer"
                            >
                                <span>Sign in</span>
                            </button>
                        )}
                    </div>
                </nav>

                {/* Mobile View Switcher (visible below lg) */}
                <div className="flex lg:hidden items-center px-2.5 py-1.5 bg-[#191919] border-b border-[#333333] font-mono text-xs shrink-0">
                    <div className="flex items-center gap-1 bg-[#141414] p-0.5 rounded-[3px] border border-[#333333] w-full">
                        <button
                            type="button"
                            onClick={() => setMobileTab('code')}
                            className={cn(
                                'flex-1 py-1 px-2.5 rounded-[2px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer',
                                mobileTab === 'code'
                                    ? 'bg-[#252423] text-white font-medium border border-[#3f3f46]'
                                    : 'text-[#a09f9d] hover:text-[#e8e8e6]'
                            )}
                        >
                            <span className="font-semibold text-emerald-400">&lt;/&gt;</span>
                            <span>Code</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileTab('io')}
                            className={cn(
                                'flex-1 py-1 px-2.5 rounded-[2px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer',
                                mobileTab === 'io'
                                    ? 'bg-[#252423] text-white font-medium border border-[#3f3f46]'
                                    : 'text-[#a09f9d] hover:text-[#e8e8e6]'
                            )}
                        >
                            <span>Input & Output</span>
                            {result && <span className="h-1.5 w-1.5 rounded-full bg-[#87b2f4]" />}
                        </button>
                    </div>
                </div>

                {/* Main Side-by-Side Area */}
                <div className="flex-1 min-h-0 p-2 sm:p-2.5 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 h-full">
                        {/* Left Panel: Code Editor */}
                        <div
                            className={cn(
                                'flex-col border border-[#333333] rounded-[3px] bg-[#191919] overflow-hidden h-full shadow-xs lg:flex',
                                mobileTab === 'code' ? 'flex' : 'hidden'
                            )}
                        >
                            <EditorHeader language={language} onLanguageChange={changeLanguage} />
                            <div className="flex-1 min-h-0 flex flex-col bg-[#1E1E1E]">
                                <CodeEditor code={code} setCode={setCode} language={language} />
                            </div>
                        </div>

                        {/* Right Panel: Side-by-Side Input & Output */}
                        <div
                            className={cn(
                                'flex-col gap-2.5 h-full min-h-0 lg:flex',
                                mobileTab === 'io' ? 'flex' : 'hidden'
                            )}
                        >
                            {/* Custom Input Panel */}
                            <div className="flex flex-col border border-[#333333] rounded-[3px] bg-[#191919] overflow-hidden h-40 shrink-0 shadow-xs">
                                <div className="flex items-center justify-between px-3.5 py-2 bg-[#191919] border-b border-[#333333] font-mono text-xs text-[#a09f9d] shrink-0">
                                    <div className="flex items-center gap-1.5 bg-[#252423] text-[#e8e8e6] border border-[#333333] px-2.5 py-1 rounded-[2px] font-medium text-[11px]">
                                        <span>Custom Input</span>
                                    </div>
                                    {stdin && (
                                        <button
                                            type="button"
                                            onClick={() => setStdin('')}
                                            className="text-[11px] text-[#888888] hover:text-[#e8e8e6] transition-colors cursor-pointer"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                                <textarea
                                    value={stdin}
                                    onChange={(e) => setStdin(e.target.value)}
                                    placeholder="Enter custom input to pass to standard input (cin / scanf)..."
                                    className="flex-1 w-full p-3 font-mono text-base sm:text-xs bg-[#141414] text-[#e8e8e6] placeholder-[#555555] outline-none resize-none border-none leading-relaxed select-text"
                                    spellCheck={false}
                                />
                            </div>

                            {/* Output Terminal Panel */}
                            <div className="flex-1 min-h-0 flex flex-col border border-[#333333] rounded-[3px] bg-[#191919] text-[#e8e8e6] overflow-hidden shadow-xs">
                                <div className="flex items-center justify-between px-3.5 py-2 bg-[#191919] border-b border-[#333333] font-mono text-xs text-[#a09f9d] shrink-0">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex items-center gap-1.5 bg-[#252423] text-[#e8e8e6] border border-[#333333] px-2.5 py-1 rounded-[2px] font-medium text-[11px]">
                                            <span>Output</span>
                                        </div>
                                        {result && (
                                            <span
                                                className={cn(
                                                    'text-xs font-semibold',
                                                    result.status === 'Accepted'
                                                        ? 'text-emerald-400'
                                                        : 'text-rose-300'
                                                )}
                                            >
                                                {result.status}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3 text-xs text-[#888888]">
                                        {result && (
                                            <>
                                                {result.time && (
                                                    <span>
                                                        Time:{' '}
                                                        <span className="text-[#e8e8e6]">
                                                            {result.time}
                                                        </span>
                                                    </span>
                                                )}
                                                {result.memory && (
                                                    <span>
                                                        Memory:{' '}
                                                        <span className="text-[#e8e8e6]">
                                                            {result.memory}
                                                        </span>
                                                    </span>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={handleCopyOutput}
                                                    title="Copy output"
                                                    className="p-1 text-[#888888] hover:text-[#e8e8e6] hover:bg-[#252423] rounded-[2px] transition-colors cursor-pointer inline-flex items-center justify-center"
                                                >
                                                    {copied ? (
                                                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                                                    ) : (
                                                        <Copy className="h-3.5 w-3.5" />
                                                    )}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Output Console Body */}
                                <div className="flex-1 p-3.5 font-mono text-xs bg-[#141414] overflow-auto select-text">
                                    {isRunning ? (
                                        <div className="flex items-center gap-2 py-6 text-[#888888] font-mono text-xs">
                                            <Loader2 className="h-4 w-4 animate-spin text-[#87b2f4]" />
                                            <span>Executing code in sandbox...</span>
                                        </div>
                                    ) : errorMsg ? (
                                        <div className="p-3 rounded-[3px] bg-[#191919] border border-rose-900/40 text-rose-300 flex items-start gap-2.5">
                                            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
                                            <div className="space-y-1">
                                                <p className="font-semibold text-rose-200">
                                                    Execution Error
                                                </p>
                                                <p className="text-[11px] text-rose-300/90 whitespace-pre-wrap">
                                                    {errorMsg}
                                                </p>
                                            </div>
                                        </div>
                                    ) : result ? (
                                        <div className="space-y-3.5">
                                            {/* Compilation Output */}
                                            {result.compile_output && (
                                                <div className="space-y-1">
                                                    <div className="text-[10px] text-amber-200 uppercase tracking-wider font-semibold">
                                                        Compilation Output
                                                    </div>
                                                    <pre className="whitespace-pre-wrap rounded-[3px] bg-[#191919] p-3 text-xs text-amber-100/90 overflow-x-auto max-h-56 select-text leading-relaxed border border-[#333333]">
                                                        {result.compile_output}
                                                    </pre>
                                                </div>
                                            )}

                                            {/* Standard Error */}
                                            {result.stderr && (
                                                <div className="space-y-1">
                                                    <div className="text-[10px] text-rose-300 uppercase tracking-wider font-semibold">
                                                        Standard Error
                                                    </div>
                                                    <pre className="whitespace-pre-wrap rounded-[3px] bg-[#191919] p-3 text-xs text-rose-200/90 overflow-x-auto max-h-56 select-text leading-relaxed border border-[#333333]">
                                                        {result.stderr}
                                                    </pre>
                                                </div>
                                            )}

                                            {/* Standard Output */}
                                            {result.stdout ? (
                                                <div className="space-y-1">
                                                    {(result.compile_output || result.stderr) && (
                                                        <div className="text-[10px] text-[#888888] uppercase tracking-wider font-semibold">
                                                            Standard Output
                                                        </div>
                                                    )}
                                                    <pre className="whitespace-pre-wrap font-mono text-xs text-[#e8e8e6] leading-relaxed select-text">
                                                        {result.stdout}
                                                    </pre>
                                                </div>
                                            ) : (
                                                !result.compile_output &&
                                                !result.stderr && (
                                                    <div className="text-[#888888] italic py-2">
                                                        Program finished with exit code 0. (No
                                                        output produced)
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <div className="py-6 text-[#888888] font-mono text-xs">
                                            Click Run to verify your code against custom input.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <LoginModal />
                <SignoutModal />
            </div>
        </DarkSurface>
    )
}
