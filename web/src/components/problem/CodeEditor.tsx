import React, { Component, useMemo, type ReactNode } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { cpp } from '@codemirror/lang-cpp'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { LANGUAGES } from '@/data/code'

interface CodeEditorProps {
    code: string
    setCode: (val: string) => void
    language: string
}

interface BoundaryProps {
    children: ReactNode
    code: string
    setCode: (val: string) => void
}

interface BoundaryState {
    hasError: boolean
}

class CodeEditorErrorBoundary extends Component<BoundaryProps, BoundaryState> {
    state: BoundaryState = { hasError: false }

    static getDerivedStateFromError(): BoundaryState {
        return { hasError: true }
    }

    componentDidCatch(error: Error) {
        console.error('CodeMirror render error fallback triggered:', error)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex-1 min-h-0 flex flex-col p-4 bg-[#1E1E1E]">
                    <div className="text-xs text-yellow-400 mb-2 font-mono flex items-center justify-between">
                        <span>Editor Fallback Mode</span>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="text-xs underline text-gray-400 hover:text-white"
                        >
                            Retry CodeMirror
                        </button>
                    </div>
                    <textarea
                        value={this.props.code}
                        onChange={(e) => this.props.setCode(e.target.value)}
                        className="flex-1 w-full bg-[#141414] text-gray-200 font-mono text-sm p-3 rounded border border-white/10 outline-none resize-none"
                        spellCheck={false}
                    />
                </div>
            )
        }

        return this.props.children
    }
}

export function CodeEditor({ code, setCode, language }: CodeEditorProps) {
    const extensions = useMemo(() => {
        const langConfig = LANGUAGES.find((l) => l.id === language)
        return [langConfig?.ext() ?? cpp()]
    }, [language])

    return (
        <CodeEditorErrorBoundary code={code} setCode={setCode}>
            <div className="flex-1 min-h-0 overflow-auto bg-[#1E1E1E]">
                <CodeMirror
                    value={code}
                    onChange={(val) => setCode(val)}
                    height="100%"
                    theme={vscodeDark}
                    extensions={extensions}
                    className="h-full text-sm"
                    basicSetup={{
                        lineNumbers: true,
                        highlightActiveLineGutter: true,
                        highlightSpecialChars: true,
                        history: true,
                        foldGutter: true,
                        drawSelection: true,
                        dropCursor: true,
                        allowMultipleSelections: true,
                        indentOnInput: true,
                        syntaxHighlighting: true,
                        bracketMatching: true,
                        closeBrackets: true,
                        autocompletion: true,
                        rectangularSelection: true,
                        crosshairCursor: true,
                        highlightActiveLine: true,
                        highlightSelectionMatches: true,
                        closeBracketsKeymap: true,
                        defaultKeymap: true,
                        searchKeymap: true,
                        historyKeymap: true,
                        foldKeymap: true,
                        completionKeymap: true,
                        lintKeymap: true,
                    }}
                />
            </div>
        </CodeEditorErrorBoundary>
    )
}
