import {
    createContext,
    useContext,
    useEffect,
    useId,
    useRef,
    type ButtonHTMLAttributes,
    type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

/*
 * Modals render into document.body (a portal), outside any `.dark` wrapper, so they
 * can't inherit the page theme from CSS. Pages that are always dark (solve screen,
 * playground) wrap themselves in <DarkSurface>, and every Modal opened inside them
 * renders dark. Everywhere else modals follow the app theme (light).
 */
const DarkSurfaceContext = createContext(false)

export function DarkSurface({ children }: { children: ReactNode }) {
    return <DarkSurfaceContext.Provider value={true}>{children}</DarkSurfaceContext.Provider>
}

export function useIsDarkSurface() {
    return useContext(DarkSurfaceContext)
}

type Tone = 'default' | 'danger' | 'warning' | 'success'

const EYEBROW_TONE: Record<Tone, string> = {
    default: 'text-[#3b6fc4] dark:text-[#87b2f4]',
    danger: 'text-rose-600 dark:text-rose-300',
    warning: 'text-amber-600 dark:text-amber-300',
    success: 'text-emerald-600 dark:text-emerald-400',
}

interface ModalProps {
    open: boolean
    /** Omit to make the modal non-dismissible (no close button, Esc or backdrop click). */
    onClose?: () => void
    /** Small uppercase label above the title. */
    eyebrow?: ReactNode
    title?: ReactNode
    description?: ReactNode
    tone?: Tone
    size?: 'sm' | 'md'
    /** While busy (e.g. a request in flight) the modal can't be dismissed. */
    busy?: boolean
    zIndex?: number
    footer?: ReactNode
    children?: ReactNode
}

let openModalCount = 0

export function Modal({
    open,
    onClose,
    eyebrow,
    title,
    description,
    tone = 'default',
    size = 'sm',
    busy = false,
    zIndex = 100,
    footer,
    children,
}: ModalProps) {
    const isDark = useIsDarkSurface()
    const titleId = useId()
    const panelRef = useRef<HTMLDivElement>(null)
    const canDismiss = Boolean(onClose) && !busy

    // Escape to close
    useEffect(() => {
        if (!open || !canDismiss) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose?.()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open, canDismiss, onClose])

    // Lock page scroll (shared across stacked modals) and manage focus
    useEffect(() => {
        if (!open) return
        const previouslyFocused = document.activeElement as HTMLElement | null
        openModalCount += 1
        if (openModalCount === 1) document.body.style.overflow = 'hidden'
        panelRef.current?.focus()
        return () => {
            openModalCount -= 1
            if (openModalCount === 0) document.body.style.overflow = ''
            previouslyFocused?.focus?.()
        }
    }, [open])

    if (!open) return null

    return createPortal(
        <div
            className={cn(
                'fixed inset-0 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-[2px]',
                isDark && 'dark'
            )}
            style={{ zIndex }}
            onMouseDown={(e) => {
                if (e.target === e.currentTarget && canDismiss) onClose?.()
            }}
        >
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                tabIndex={-1}
                className={cn(
                    'relative w-full max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[6px] border border-[#e2e8f0] dark:border-[#2e2e2e] bg-white dark:bg-[#1e1e1e] text-[#090a0f] dark:text-[#e8e8e6] p-5 sm:p-6 space-y-4 outline-none',
                    'shadow-[0_12px_40px_rgba(15,23,42,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.55)]',
                    size === 'sm' ? 'max-w-[400px]' : 'max-w-[460px]'
                )}
            >
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={busy}
                        className="absolute top-3.5 right-3.5 p-1 rounded-[3px] text-[#94a3b8] hover:text-[#090a0f] dark:text-[#777777] dark:hover:text-white transition-colors cursor-pointer disabled:opacity-40"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}

                {(eyebrow || title || description) && (
                    <div className="space-y-1 pr-6">
                        {eyebrow && (
                            <div
                                className={cn(
                                    'font-mono text-[10px] uppercase tracking-wider font-semibold',
                                    EYEBROW_TONE[tone]
                                )}
                            >
                                {eyebrow}
                            </div>
                        )}
                        {title && (
                            <h2
                                id={titleId}
                                className="text-[15px] font-semibold tracking-tight text-[#090a0f] dark:text-[#e8e8e6]"
                            >
                                {title}
                            </h2>
                        )}
                        {description && (
                            <div className="text-xs leading-relaxed text-[#64748b] dark:text-[#a09f9d]">
                                {description}
                            </div>
                        )}
                    </div>
                )}

                {children}

                {footer && (
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-1">
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body
    )
}

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'danger'

const BUTTON_VARIANT: Record<ButtonVariant, string> = {
    primary:
        'bg-[#090a0f] text-white hover:bg-[#27272a] dark:bg-white dark:text-[#141414] dark:hover:bg-[#e8e8e6]',
    secondary:
        'border border-[#e2e8f0] dark:border-[#333333] text-[#52525b] dark:text-[#a09f9d] hover:bg-[#f1f5f9] dark:hover:bg-[#252423] hover:text-[#090a0f] dark:hover:text-white',
    accent: 'bg-[#87b2f4] text-[#141414] hover:bg-[#72a3ed]',
    danger: 'bg-rose-500 text-white hover:bg-rose-600',
}

interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    /** Full width (for single-action or stacked layouts). */
    block?: boolean
}

export function ModalButton({
    variant = 'secondary',
    block = false,
    className,
    type = 'button',
    ...props
}: ModalButtonProps) {
    return (
        <button
            type={type}
            className={cn(
                'inline-flex items-center justify-center gap-1.5 font-mono text-xs font-medium py-2 px-3.5 rounded-[3px] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
                BUTTON_VARIANT[variant],
                block && 'w-full',
                className
            )}
            {...props}
        />
    )
}
