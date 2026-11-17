import { Select } from '@/components/ui/Select'
import { LANGUAGES, languageInfo } from '@/data/code'
import type { EditorLanguage } from '@/lib/types'

interface EditorHeaderProps {
    language: EditorLanguage
    onLanguageChange?: (language: EditorLanguage) => void
    /** Lock the language (e.g. after disqualification) */
    disabled?: boolean
}

const LANGUAGE_OPTIONS = LANGUAGES.map((l) => ({ value: l.id, label: l.name }))

/** Editor top bar: language picker, file name. */
export function EditorHeader({ language, onLanguageChange, disabled = false }: EditorHeaderProps) {
    const info = languageInfo(language)

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#191919] border-b border-[#333333] font-mono text-xs text-[#a09f9d]">
            <div className="flex items-center gap-2 min-w-0">
                {onLanguageChange && !disabled ? (
                    <Select
                        label="Language"
                        value={language}
                        options={LANGUAGE_OPTIONS}
                        onChange={(v) => onLanguageChange(v as EditorLanguage)}
                        className="w-32"
                        compact
                    />
                ) : (
                    <span className="px-2.5 py-1 rounded-[2px] bg-[#252423] border border-[#333333] text-[#e8e8e6] text-[11px]">
                        {info.name}
                    </span>
                )}
                <span className="hidden sm:inline text-[11px] text-[#777777] truncate">
                    {info.file} · {info.version}
                </span>
            </div>
        </div>
    )
}
