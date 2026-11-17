import type { Extension } from '@codemirror/state'
import { StreamLanguage, type StreamParser } from '@codemirror/language'
import { cpp } from '@codemirror/lang-cpp'
import { python } from '@codemirror/lang-python'
import { javascript } from '@codemirror/lang-javascript'
import { lua } from '@codemirror/legacy-modes/mode/lua'
import { perl } from '@codemirror/legacy-modes/mode/perl'
import { ruby } from '@codemirror/legacy-modes/mode/ruby'
import type { EditorLanguage } from '@/lib/types'

// @codemirror/legacy-modes types its parsers against @codemirror/streamparser's
// StringStream, a type-only twin of @codemirror/language's. They're identical at
// runtime; the cast only bridges the two declarations.
const legacy = (parser: unknown) => StreamLanguage.define(parser as StreamParser<unknown>)

export type LanguageInfo = {
    id: EditorLanguage
    /** Shown in the dropdown */
    name: string
    /** Toolchain shown next to the name */
    version: string
    /** File name shown in the editor header */
    file: string
    /** CodeMirror syntax highlighting */
    ext: () => Extension
}

/** Must match the language ids accepted by the API and judge (common/languages.hpp). */
export const LANGUAGES: LanguageInfo[] = [
    {
        id: 'c',
        name: 'C',
        version: 'C17 · GCC 13',
        file: 'main.c',
        ext: () => cpp(),
    },
    {
        id: 'cpp',
        name: 'C++',
        version: 'C++20 · GCC 13',
        file: 'main.cpp',
        ext: () => cpp(),
    },
    {
        id: 'python',
        name: 'Python',
        version: '3.12',
        file: 'main.py',
        ext: () => python(),
    },
    {
        id: 'javascript',
        name: 'JavaScript',
        version: 'Node 22',
        file: 'main.js',
        ext: () => javascript(),
    },
    {
        id: 'typescript',
        name: 'TypeScript',
        version: 'Node 22 (types not checked)',
        file: 'main.ts',
        ext: () => javascript({ typescript: true }),
    },
    {
        id: 'lua',
        name: 'Lua',
        version: '5.4',
        file: 'main.lua',
        ext: () => legacy(lua),
    },
    {
        id: 'perl',
        name: 'Perl',
        version: '5',
        file: 'main.pl',
        ext: () => legacy(perl),
    },
    {
        id: 'ruby',
        name: 'Ruby',
        version: '3',
        file: 'main.rb',
        ext: () => legacy(ruby),
    },
]

export const DEFAULT_LANGUAGE: EditorLanguage = 'cpp'

export function languageInfo(id: string | null | undefined): LanguageInfo {
    return LANGUAGES.find((l) => l.id === id) ?? LANGUAGES.find((l) => l.id === DEFAULT_LANGUAGE)!
}

/** Codeforces-style: every language starts with an empty editor. */
export const EMPTY_CODE = Object.fromEntries(LANGUAGES.map((l) => [l.id, ''])) as Record<
    EditorLanguage,
    string
>

const LANGUAGE_STORAGE_KEY = 'campuslab_language'

/** The language this browser used last (remembered across problems and the playground). */
export function getRememberedLanguage(): EditorLanguage {
    try {
        const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY)
        if (saved && LANGUAGES.some((l) => l.id === saved)) return saved as EditorLanguage
    } catch {
        // storage unavailable
    }
    return DEFAULT_LANGUAGE
}

export function rememberLanguage(id: EditorLanguage) {
    try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, id)
    } catch {
        // storage unavailable: choice just isn't remembered
    }
}
