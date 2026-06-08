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
                className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none transition-all font-semibold"
            >
                <span className="font-semibold">{selectedLabel}</span>
                <ChevronDown
                    className={cn(
                        'h-4 w-4 text-slate-400 transition-transform duration-200',
                        isOpen && 'rotate-180'
                    )}
                />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="max-h-48 overflow-y-auto py-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
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
                                        ? 'text-[#3E6FC3] bg-[#EBF3FC] hover:bg-[#D5E6FA]/65 font-bold'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                                )}
                            >
                                {opt.label}
                                {value === opt.value && (
                                    <CheckCircle2 className="h-4 w-4 text-[#3E6FC3]" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
