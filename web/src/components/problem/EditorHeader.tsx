import { Code2, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LANGUAGES } from '@/data/code'

interface EditorHeaderProps {
    language: string
    isLangDropdownOpen: boolean
    setIsLangDropdownOpen: (open: boolean) => void
    handleLanguageChange: (langId: string) => void
}

export function EditorHeader({
    language,
    isLangDropdownOpen,
    setIsLangDropdownOpen,
    handleLanguageChange,
}: EditorHeaderProps) {
    return (
        <div className="flex items-center justify-between px-4 py-2 bg-[#181818] border-b border-white/5">
            <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 text-xs font-medium text-gray-300 hover:text-white transition-colors bg-[#262626] px-3 py-1.5 rounded-md">
                    <Code2 className="h-4 w-4 text-emerald-500" /> Code
                </button>

                <div className="relative">
                    <button
                        onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                        className="flex items-center gap-1.5 text-xs font-medium text-gray-300 hover:text-white transition-colors bg-transparent hover:bg-white/5 px-2 py-1.5 rounded-md"
                    >
                        {LANGUAGES.find((l) => l.id === language)?.name}{' '}
                        <ChevronDown className="h-3 w-3" />
                    </button>

                    {isLangDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-32 bg-[#262626] border border-white/10 rounded-md shadow-xl z-50 overflow-hidden">
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.id}
                                    onClick={() => handleLanguageChange(lang.id)}
                                    className={cn(
                                        'w-full text-left px-4 py-2 text-xs font-medium transition-colors hover:bg-white/10',
                                        language === lang.id
                                            ? 'text-white bg-white/10'
                                            : 'text-gray-400'
                                    )}
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
