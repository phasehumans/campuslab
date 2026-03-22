import { Check, Copy } from 'lucide-react'
import CodeMirror from '@uiw/react-codemirror'
import { rust } from '@codemirror/lang-rust'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { DEFAULT_CODE, LANGUAGES } from '@/data/code'

interface SolutionsPanelProps {
    language: string
    copied: boolean
    onCopy: () => void
}

export function SolutionsPanel({ language, copied, onCopy }: SolutionsPanelProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                    Optimal Solution ({LANGUAGES.find((l) => l.id === language)?.name})
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
            <div className="rounded-lg overflow-hidden border border-white/5">
                <CodeMirror
                    value={DEFAULT_CODE[language]}
                    theme={vscodeDark}
                    extensions={[LANGUAGES.find((l) => l.id === language)?.ext() || rust()]}
                    readOnly={true}
                    className="text-sm"
                    basicSetup={{
                        lineNumbers: true,
                        foldGutter: false,
                        highlightActiveLine: false,
                    }}
                />
            </div>
            <div className="prose prose-invert max-w-none text-sm text-gray-300">
                <h3 className="text-white font-medium">Complexity</h3>
                <ul>
                    <li>
                        <strong>Time Complexity:</strong> O(N) where N is the number of elements in
                        the array. We traverse the list containing N elements exactly once. Each
                        lookup in the table costs only O(1) time.
                    </li>
                    <li>
                        <strong>Space Complexity:</strong> O(N). The extra space required depends on
                        the number of items stored in the hash table, which stores at most N
                        elements.
                    </li>
                </ul>
            </div>
        </div>
    )
}
