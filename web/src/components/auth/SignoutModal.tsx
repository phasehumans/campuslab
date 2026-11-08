import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { X, LogOut, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

interface SignoutModalProps {
    forceDark?: boolean
}

export function SignoutModal({ forceDark = false }: SignoutModalProps) {
    const { isSignoutModalOpen, closeSignoutModal, logout, isSubmitting, user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isSignoutModalOpen) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !isSubmitting) {
                closeSignoutModal()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isSignoutModalOpen, isSubmitting, closeSignoutModal])

    if (!isSignoutModalOpen) return null

    const handleConfirm = async () => {
        try {
            await logout()
            closeSignoutModal()
            navigate('/')
        } catch (err) {
            console.error('Logout error:', err)
        }
    }

    return createPortal(
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget && !isSubmitting) {
                    closeSignoutModal()
                }
            }}
            className={cn(
                'fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4',
                forceDark && 'dark'
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="signout-modal-title"
        >
            <div className="w-full max-w-[380px] rounded-[4px] border border-[#e2e8f0] dark:border-[#333333] bg-white dark:bg-[#1e1e1e] text-[#090a0f] dark:text-[#e8e8e6] shadow-2xl p-6 relative transition-colors">
                <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={closeSignoutModal}
                    className="absolute top-4 right-4 text-[#94a3b8] hover:text-[#090a0f] dark:hover:text-white transition-colors p-1 cursor-pointer disabled:opacity-50"
                    aria-label="Close dialog"
                >
                    <X className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                    <div className="h-9 w-9 rounded-[3px] bg-rose-50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/30 flex items-center justify-center text-rose-500 dark:text-rose-300 shrink-0">
                        <LogOut className="h-4 w-4" />
                    </div>
                    <div>
                        <h2
                            id="signout-modal-title"
                            className="text-base font-medium text-[#090a0f] dark:text-[#e8e8e6] tracking-tight"
                        >
                            Sign out
                        </h2>
                        <p className="text-xs text-[#52525b] dark:text-[#a09f9d]">
                            Confirm end of active session
                        </p>
                    </div>
                </div>

                {user && (
                    <div className="flex items-center gap-2.5 p-2.5 mb-4 rounded-[3px] border border-[#e2e8f0] dark:border-[#2f2e2d] bg-[#f8fafc] dark:bg-[#18181b]/60">
                        <div className="h-7 w-7 rounded-full bg-[#e2e8f0] dark:bg-[#333333] flex items-center justify-center text-[11px] font-semibold text-[#090a0f] dark:text-[#e8e8e6] overflow-hidden shrink-0">
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt="avatar"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span>{(user.name || user.email || 'U')[0].toUpperCase()}</span>
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="text-xs font-medium text-[#090a0f] dark:text-[#e8e8e6] truncate">
                                {user.name || 'Developer'}
                            </div>
                            <div className="text-[11px] font-mono text-[#64748b] dark:text-[#a09f9d] truncate">
                                {user.email || user.name || ''}
                            </div>
                        </div>
                    </div>
                )}

                <p className="text-xs text-[#52525b] dark:text-[#a09f9d] leading-relaxed mb-6">
                    Are you sure you want to sign out? You will need to sign in again to submit code
                    solutions and participate in live contests.
                </p>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#f0f2f5] dark:border-[#272727]">
                    <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={closeSignoutModal}
                        className="border border-[#e2e8f0] dark:border-[#333333] hover:bg-[#f1f5f9] dark:hover:bg-[#27272a] text-[#52525b] dark:text-[#a09f9d] hover:text-[#090a0f] dark:hover:text-white font-mono text-xs py-2 px-3.5 rounded-[3px] font-medium transition-colors cursor-pointer disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={handleConfirm}
                        className="bg-rose-500/85 hover:bg-rose-500 text-white font-mono text-xs py-2 px-3.5 rounded-[3px] font-medium transition-colors disabled:opacity-60 cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                <span>Signing out...</span>
                            </>
                        ) : (
                            <>
                                <LogOut className="h-3.5 w-3.5" />
                                <span>Sign out</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}
