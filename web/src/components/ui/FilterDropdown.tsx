import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterDropdownProps {
    value: string
    onChange: (v: string) => void
    options: string[]
    placeholder: string
    icon?: React.ElementType
}

export function FilterDropdown({
    value,
    onChange,
    options,
    placeholder,
    icon: Icon,
}: FilterDropdownProps) {
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

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'flex items-center gap-2 border rounded-full px-4 py-2 text-sm focus:outline-none transition-all duration-200 shadow-sm font-semibold',
                    value === 'All'
                        ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-500'
                        : 'bg-[#EBF3FC] border-[#D5E6FA] text-[#3E6FC3]'
                )}
            >
                {Icon && (
                    <Icon
                        className={cn('h-4 w-4', value === 'All' ? 'text-slate-400' : 'text-[#3E6FC3]')}
                    />
                )}
                <span className="truncate max-w-[100px] font-semibold">
                    {value === 'All' ? placeholder : value}
                </span>
                <ChevronDown
                    className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        isOpen ? 'rotate-180' : '',
                        value === 'All' ? 'text-slate-400' : 'text-[#3E6FC3]/70'
                    )}
                />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                    <div className="max-h-60 overflow-y-auto py-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                        <button
                            onClick={() => {
                                onChange('All')
                                setIsOpen(false)
                            }}
                            className={cn(
                                'w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between',
                                value === 'All'
                                    ? 'text-[#3E6FC3] bg-[#EBF3FC]/50 hover:bg-[#EBF3FC]/70 font-bold'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                            )}
                        >
                            All {placeholder}s
                            {value === 'All' && <CheckCircle2 className="h-4 w-4 text-[#3E6FC3]" />}
                        </button>
                        <div className="h-px bg-slate-100 my-1 mx-2" />
                        {options.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => {
                                    onChange(opt)
                                    setIsOpen(false)
                                }}
                                className={cn(
                                    'w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between',
                                    value === opt
                                        ? 'text-[#3E6FC3] bg-[#EBF3FC]/50 hover:bg-[#EBF3FC]/70 font-bold'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                                )}
                            >
                                {opt}
                                {value === opt && (
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
