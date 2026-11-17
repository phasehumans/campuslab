import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'

export type SelectOption = {
    value: string
    label: string
    /** Optional text colour for the label (e.g. difficulty colours) */
    className?: string
}

interface SelectProps {
    value: string
    options: SelectOption[]
    onChange: (value: string) => void
    /** Accessible name, e.g. "Topic" */
    label: string
    className?: string
    /** Tighter rows and a shorter list, for dense toolbars */
    compact?: boolean
}

/**
 * Minimal dropdown matching the app's mono style. Keyboard: Enter/Space/Arrow keys
 * to open and move, Enter to choose, Escape to close, type a letter to jump.
 */
export function Select({ value, options, onChange, label, className, compact = false }: SelectProps) {
    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const rootRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLUListElement>(null)
    const listId = useId()

    const selectedIndex = Math.max(
        0,
        options.findIndex((o) => o.value === value)
    )
    const selected = options[selectedIndex]

    // Close on outside click
    useEffect(() => {
        if (!open) return
        const onDown = (e: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', onDown)
        return () => document.removeEventListener('mousedown', onDown)
    }, [open])

    // Keep the active option visible while navigating long lists
    useEffect(() => {
        if (!open) return
        const el = listRef.current?.children[activeIndex] as HTMLElement | undefined
        el?.scrollIntoView({ block: 'nearest' })
    }, [open, activeIndex])

    const openList = () => {
        setActiveIndex(selectedIndex)
        setOpen(true)
    }

    const choose = (index: number) => {
        const option = options[index]
        if (option) onChange(option.value)
        setOpen(false)
    }

    const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (!open) {
            if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
                e.preventDefault()
                openList()
            }
            return
        }
        if (e.key === 'Escape') {
            e.preventDefault()
            setOpen(false)
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIndex((i) => Math.min(options.length - 1, i + 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex((i) => Math.max(0, i - 1))
        } else if (e.key === 'Home') {
            e.preventDefault()
            setActiveIndex(0)
        } else if (e.key === 'End') {
            e.preventDefault()
            setActiveIndex(options.length - 1)
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            choose(activeIndex)
        } else if (e.key === 'Tab') {
            setOpen(false)
        } else if (e.key.length === 1) {
            const ch = e.key.toLowerCase()
            const next = options.findIndex(
                (o, i) => i > activeIndex && o.label.toLowerCase().startsWith(ch)
            )
            const wrap = options.findIndex((o) => o.label.toLowerCase().startsWith(ch))
            const target = next !== -1 ? next : wrap
            if (target !== -1) setActiveIndex(target)
        }
    }

    return (
        <div ref={rootRef} className={cn('relative', className)}>
            <button
                type="button"
                role="combobox"
                aria-label={label}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listId}
                aria-activedescendant={open ? `${listId}-${activeIndex}` : undefined}
                onClick={() => (open ? setOpen(false) : openList())}
                onKeyDown={onKeyDown}
                className={cn(
                    'w-full flex items-center justify-between gap-2 px-2.5 py-1.5 border rounded-[2px] bg-white dark:bg-[#252423] font-mono text-xs text-left transition-colors cursor-pointer focus:outline-none',
                    open
                        ? 'border-[#87b2f4]'
                        : 'border-[#e2e8f0] dark:border-[#333333] hover:border-[#cbd5e1] dark:hover:border-[#52525b] focus-visible:border-[#87b2f4]'
                )}
            >
                <span
                    className={cn(
                        'truncate',
                        selected?.className ?? 'text-[#52525b] dark:text-[#e8e8e6]'
                    )}
                >
                    {selected?.label}
                </span>
                <span
                    aria-hidden
                    className={cn(
                        'text-[9px] text-[#94a3b8] dark:text-[#777777] transition-transform',
                        open && 'rotate-180'
                    )}
                >
                    ▼
                </span>
            </button>

            {open && (
                <ul
                    ref={listRef}
                    id={listId}
                    role="listbox"
                    aria-label={label}
                    className={cn(
                        'absolute right-0 sm:right-auto sm:left-0 z-30 mt-1 min-w-full w-max max-w-[260px] overflow-y-auto py-1 bg-white dark:bg-[#1e1e1e] border border-[#e2e8f0] dark:border-[#333333] rounded-[3px] shadow-lg font-mono text-xs',
                        compact ? 'max-h-48' : 'max-h-64'
                    )}
                >
                    {options.map((option, index) => {
                        const isSelected = option.value === value
                        return (
                            <li
                                key={option.value}
                                id={`${listId}-${index}`}
                                role="option"
                                aria-selected={isSelected}
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => choose(index)}
                                className={cn(
                                    'px-2.5 cursor-pointer truncate',
                                    compact ? 'py-1' : 'py-1.5',
                                    index === activeIndex && 'bg-[#f1f5f9] dark:bg-[#252423]',
                                    option.className ??
                                        (isSelected
                                            ? 'text-[#090a0f] dark:text-white'
                                            : 'text-[#52525b] dark:text-[#cccccc]'),
                                    isSelected && 'font-semibold'
                                )}
                            >
                                {option.label}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}
