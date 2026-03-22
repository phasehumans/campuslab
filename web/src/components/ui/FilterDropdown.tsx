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
                    'flex items-center gap-2 border rounded-full px-4 py-2 text-sm focus:outline-none transition-all duration-200',
                    value === 'All'
                        ? 'bg-transparent hover:bg-white/5 border-white/10 text-gray-400'
                        : 'bg-white/10 border-white/20 text-white shadow-sm shadow-white/5'
                )}
            >
                {Icon && (
                    <Icon
                        className={cn('h-4 w-4', value === 'All' ? 'text-gray-500' : 'text-white')}
                    />
                )}
                <span className="truncate max-w-[100px] font-medium">
                    {value === 'All' ? placeholder : value}
                </span>
                <ChevronDown
                    className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        isOpen ? 'rotate-180 text-white' : 'text-gray-500',
                        value !== 'All' && 'text-white/70'
                    )}
                />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-[#1E1E1E] border border-white/10 rounded-2xl shadow-2xl z-20 overflow-hidden backdrop-blur-xl">
                    <div className="max-h-60 overflow-y-auto py-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
                        <button
                            onClick={() => {
                                onChange('All')
                                setIsOpen(false)
                            }}
                            className={cn(
                                'w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between',
                                value === 'All'
                                    ? 'text-white bg-white/5 font-medium'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            )}
                        >
                            All {placeholder}s
                            {value === 'All' && <CheckCircle2 className="h-4 w-4 text-white/50" />}
                        </button>
                        <div className="h-px bg-white/5 my-1 mx-2" />
                        {options.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => {
                                    onChange(opt)
                                    setIsOpen(false)
                                }}
                                className={cn(
                                    'w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between',
                                    value === opt
                                        ? 'text-white bg-white/5 font-medium'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                )}
                            >
                                {opt}
                                {value === opt && (
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
