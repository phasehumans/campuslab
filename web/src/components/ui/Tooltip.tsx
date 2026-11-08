import { useState, useRef, useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

interface TooltipProps {
    children: ReactNode
    content: ReactNode
    position?: 'top' | 'bottom' | 'left' | 'right'
    align?: 'start' | 'center' | 'end'
    shortcut?: string
    delay?: number
    className?: string
}

export function Tooltip({
    children,
    content,
    position = 'bottom',
    align = 'center',
    shortcut,
    delay = 150,
    className,
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [coords, setCoords] = useState<{ top: number; left: number; transform: string } | null>(
        null
    )
    const triggerRef = useRef<HTMLDivElement | null>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const updatePosition = () => {
        if (!triggerRef.current) return
        const rect = triggerRef.current.getBoundingClientRect()
        let top = 0
        let left = 0
        let transform = ''

        const gap = 6

        if (position === 'top') {
            top = rect.top - gap
            left =
                align === 'center'
                    ? rect.left + rect.width / 2
                    : align === 'start'
                      ? rect.left
                      : rect.right
            transform =
                align === 'center'
                    ? 'translate(-50%, -100%)'
                    : align === 'start'
                      ? 'translate(0, -100%)'
                      : 'translate(-100%, -100%)'
        } else if (position === 'bottom') {
            top = rect.bottom + gap
            left =
                align === 'center'
                    ? rect.left + rect.width / 2
                    : align === 'start'
                      ? rect.left
                      : rect.right
            transform =
                align === 'center'
                    ? 'translate(-50%, 0)'
                    : align === 'start'
                      ? 'translate(0, 0)'
                      : 'translate(-100%, 0)'
        } else if (position === 'left') {
            top = rect.top + rect.height / 2
            left = rect.left - gap
            transform = 'translate(-100%, -50%)'
        } else if (position === 'right') {
            top = rect.top + rect.height / 2
            left = rect.right + gap
            transform = 'translate(0, -50%)'
        }

        setCoords({ top, left, transform })
    }

    const handleMouseEnter = () => {
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            updatePosition()
            setIsVisible(true)
        }, delay)
    }

    const handleMouseLeave = () => {
        if (timerRef.current) clearTimeout(timerRef.current)
        setIsVisible(false)
    }

    // Close on escape or scroll
    useEffect(() => {
        const handleScrollOrResize = () => {
            if (isVisible) setIsVisible(false)
        }
        window.addEventListener('scroll', handleScrollOrResize, true)
        window.addEventListener('resize', handleScrollOrResize)
        return () => {
            window.removeEventListener('scroll', handleScrollOrResize, true)
            window.removeEventListener('resize', handleScrollOrResize)
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [isVisible])

    return (
        <div
            ref={triggerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn('inline-flex', className)}
        >
            {children}
            {isVisible &&
                coords &&
                typeof document !== 'undefined' &&
                createPortal(
                    <div
                        className={cn(
                            'fixed z-[9999] pointer-events-none select-none flex items-center gap-1.5',
                            'px-2 py-1 rounded-[3px] text-[11px] font-mono tracking-tight whitespace-nowrap',
                            'bg-[#090a0f] text-[#f8fafc] border border-[#27272a] shadow-xl',
                            'dark:bg-[#1e1e1e] dark:text-[#e8e8e6] dark:border-[#333333]'
                        )}
                        style={{
                            top: coords.top,
                            left: coords.left,
                            transform: coords.transform,
                        }}
                    >
                        <span>{content}</span>
                        {shortcut && (
                            <kbd className="text-[9.5px] font-mono text-[#94a3b8] dark:text-[#a09f9d] bg-[#27272a] dark:bg-[#282828] border border-[#3f3f46] dark:border-[#383838] px-1 py-0.2 rounded-[2px] leading-tight">
                                {shortcut}
                            </kbd>
                        )}
                    </div>,
                    document.body
                )}
        </div>
    )
}
