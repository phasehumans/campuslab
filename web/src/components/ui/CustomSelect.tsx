import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CustomSelectProps {
    value: string
    onChange: (v: string) => void
    options: { label: string; value: string }[]
}

export function CustomSelect({ value, onChange, options }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const selectedLabel = options.find((o) => o.value === value)?.label || value

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between bg-[#1A1A1A] hover:bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all"
            >
                <span className="font-medium">{selectedLabel}</span>
                <ChevronDown
                    className={cn(
                        'h-4 w-4 text-gray-500 transition-transform duration-200',
                        isOpen && 'rotate-180'
                    )}
                />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-[#1E1E1E] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl">
                    <div className="max-h-48 overflow-y-auto py-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    onChange(opt.value)
                                    setIsOpen(false)
                                }}
                                className={cn(
                                    'w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between',
                                    value === opt.value
                                        ? 'text-white bg-white/10 font-medium'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                )}
                            >
                                {opt.label}
                                {value === opt.value && (
                                    <CheckCircle2 className="h-4 w-4 text-white/50" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
