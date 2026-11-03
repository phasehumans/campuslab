import { Component, useMemo, type ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'
import CodeMirror from '@uiw/react-codemirror'
import { cpp } from '@codemirror/lang-cpp'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { FALLBACK_CODE, LANGUAGES } from '@/data/code'
import type { EditorLanguage } from '@/lib/types'

interface SolutionsPanelProps {
    language: EditorLanguage
    copied: boolean
    onCopy: () => void
    solutionCode?: string
}

class SolutionsErrorBoundary extends Component<{ children: ReactNode; code: string }, { hasError: boolean }> {
    state = { hasError: false }
    static getDerivedStateFromError() {
        return { hasError: true }
    }
    componentDidCatch(err: Error) {
        console.error('SolutionsPanel CodeMirror fallback:', err)
    }
    render() {
        if (this.state.hasError) {
            return (
                <pre className="rounded-lg bg-[#181818] border border-white/5 p-4 text-xs font-mono text-gray-300 overflow-x-auto whitespace-pre-wrap">
                    {this.props.code}
                </pre>
            )
        }
        return this.props.children
    }
}

export function SolutionsPanel({ language, copied, onCopy, solutionCode }: SolutionsPanelProps) {
    const activeLanguage = LANGUAGES.find((item) => item.id === language)
    const code = solutionCode ?? FALLBACK_CODE[language]

    const extensions = useMemo(() => {
        return [activeLanguage?.ext() ?? cpp()]
    }, [activeLanguage])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                    Reference Solution ({activeLanguage?.name})
                </h2>
                <button
                    onClick={onCopy}
                    className="flex items-center gap-1.5 text-xs font-medium bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1.5 rounded-md transition-colors"
                >
                    {copied ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                        <Copy className="h-3.5 w-3.5" />
                    )}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <SolutionsErrorBoundary code={code}>
                <div className="rounded-lg overflow-hidden border border-white/5">
                    <CodeMirror
                        value={code}
                        theme={vscodeDark}
                        extensions={extensions}
                        readOnly={true}
                        className="text-sm"
                        basicSetup={{
                            lineNumbers: true,
                            foldGutter: false,
                            highlightActiveLine: false,
                        }}
                    />
                </div>
            </SolutionsErrorBoundary>
        </div>
    )
}
