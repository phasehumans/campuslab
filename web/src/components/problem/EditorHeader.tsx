import { Code2 } from 'lucide-react'

interface EditorHeaderProps {
    language?: string
}

export function EditorHeader({ language = 'cpp' }: EditorHeaderProps) {
    const filename = language === 'cpp' ? 'solution.cpp' : `solution.${language}`

    return (
        <div className="flex items-center justify-between px-3.5 py-2 bg-[#191919] border-b border-[#333333] font-mono text-xs text-[#a09f9d]">
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-[#252423] text-[#e8e8e6] border border-[#333333] px-2.5 py-1 rounded-[2px] font-medium text-[11px]">
                    <Code2 className="h-3.5 w-3.5 text-[#87b2f4]" />
                    <span>{filename}</span>
                </div>
            </div>
        </div>
    )
}
