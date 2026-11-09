import { Component, useMemo, type ReactNode } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { cpp } from '@codemirror/lang-cpp'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { LANGUAGES } from '@/data/code'

interface CodeEditorProps {
    code: string
    setCode: (val: string) => void
    language: string
    isContestMode?: boolean
    onPasteAttempt?: (charCount: number) => void
    readOnly?: boolean
}

interface BoundaryProps {
    children: ReactNode
    code: string
    setCode: (val: string) => void
    readOnly?: boolean
    isContestMode?: boolean
    onPasteAttempt?: (charCount: number) => void
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
                    <div className="text-xs text-amber-200 mb-2 font-mono flex items-center justify-between">
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
                        onChange={(e) => !this.props.readOnly && this.props.setCode(e.target.value)}
                        onPaste={(e) => {
                            if (this.props.isContestMode) {
                                e.preventDefault()
                                const pasted = e.clipboardData?.getData('text') || ''
                                this.props.onPasteAttempt?.(pasted.length)
                            }
                        }}
                        readOnly={this.props.readOnly}
                        className="flex-1 w-full bg-[#141414] text-gray-200 font-mono text-sm p-3 rounded border border-white/10 outline-none resize-none"
                        spellCheck={false}
                    />
                </div>
            )
        }

        return this.props.children
    }
}

export function CodeEditor({
    code,
    setCode,
    language,
    isContestMode = false,
    onPasteAttempt,
    readOnly = false,
}: CodeEditorProps) {
    const pasteFilter = useMemo(() => {
        if (!isContestMode) return []
        return [
            EditorState.transactionFilter.of((tr) => {
                if (tr.docChanged) {
                    let insertedChars = 0
                    tr.changes.iterChanges((_fromA, _toA, _fromB, _toB, inserted) => {
                        insertedChars += inserted.length
                    })
                    // Reject explicit paste events or sudden bulk insertions (> 20 chars without manual typing)
                    if (
                        tr.isUserEvent('input.paste') ||
                        (insertedChars > 20 && !tr.isUserEvent('input.type'))
                    ) {
                        onPasteAttempt?.(insertedChars)
                        return [] // Completely drop the transaction from writing to buffer
                    }
                }
                return tr
            }),
        ]
    }, [isContestMode, onPasteAttempt])

    const readOnlyExtension = useMemo(() => {
        if (!readOnly) return []
        return [EditorState.readOnly.of(true), EditorView.editable.of(false)]
    }, [readOnly])

    const extensions = useMemo(() => {
        const langConfig = LANGUAGES.find((l) => l.id === language)
        return [langConfig?.ext() ?? cpp(), ...pasteFilter, ...readOnlyExtension]
    }, [language, pasteFilter, readOnlyExtension])

    return (
        <CodeEditorErrorBoundary
            code={code}
            setCode={setCode}
            readOnly={readOnly}
            isContestMode={isContestMode}
            onPasteAttempt={onPasteAttempt}
        >
            <div className="flex-1 min-h-0 overflow-auto bg-[#1E1E1E]">
                <CodeMirror
                    value={code}
                    onChange={(val) => !readOnly && setCode(val)}
                    height="100%"
                    theme={vscodeDark}
                    readOnly={readOnly}
                    editable={!readOnly}
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
