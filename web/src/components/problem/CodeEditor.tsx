import React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { rust } from '@codemirror/lang-rust'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { LANGUAGES } from '@/data/code'

interface CodeEditorProps {
    code: string
    setCode: (val: string) => void
    language: string
}

export function CodeEditor({ code, setCode, language }: CodeEditorProps) {
    return (
        <div className="flex-1 overflow-auto bg-[#1E1E1E]">
            <CodeMirror
                value={code}
                onChange={(val) => setCode(val)}
                height="100%"
                theme={vscodeDark}
                extensions={[LANGUAGES.find((l) => l.id === language)?.ext() || rust()]}
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
    )
}
