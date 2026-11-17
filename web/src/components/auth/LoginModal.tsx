import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { rememberPostLoginRedirect } from '@/lib/utils'
import { Modal } from '@/components/ui/Modal'

const providerButton =
    'w-full flex items-center justify-center gap-2.5 font-mono text-xs font-medium py-2.5 px-4 rounded-[3px] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'

export function LoginModal() {
    const { isModalOpen, closeModal, authError, clearAuthError } = useAuth()
    const [loadingProvider, setLoadingProvider] = useState<'github' | 'google' | null>(null)

    const handleOAuth = async (provider: 'github' | 'google') => {
        clearAuthError()
        setLoadingProvider(provider)
        rememberPostLoginRedirect()

        if (provider === 'github') {
            const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID
            if (!clientId) {
                console.error('VITE_GITHUB_CLIENT_ID is not configured')
                setLoadingProvider(null)
                return
            }
            const redirectUri = `${window.location.origin}/auth/callback/github`
            window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email`
            return
        }

        if (provider === 'google') {
            const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
            if (!clientId) {
                console.error('VITE_GOOGLE_CLIENT_ID is not configured')
                setLoadingProvider(null)
                return
            }
            const redirectUri = window.location.origin
            const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20email%20profile&state=google`
            window.location.href = googleUrl
            return
        }
    }

    return (
        <Modal
            open={isModalOpen}
            onClose={closeModal}
            busy={loadingProvider !== null}
            eyebrow="CampusLab"
            title="Sign in to continue"
            description="Run code, track your submissions and compete with friends."
        >
            {authError && (
                <div className="rounded-[3px] bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 text-xs p-2.5 font-mono">
                    {authError}
                </div>
            )}

            <div className="space-y-2">
                <button
                    type="button"
                    disabled={loadingProvider !== null}
                    onClick={() => handleOAuth('github')}
                    className={`${providerButton} bg-[#090a0f] hover:bg-[#27272a] text-white dark:bg-white dark:hover:bg-[#e8e8e6] dark:text-[#141414]`}
                >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                    </svg>
                    <span>
                        {loadingProvider === 'github' ? 'Redirecting...' : 'Continue with GitHub'}
                    </span>
                </button>

                <button
                    type="button"
                    disabled={loadingProvider !== null}
                    onClick={() => handleOAuth('google')}
                    className={`${providerButton} border border-[#e2e8f0] dark:border-[#333333] bg-white dark:bg-[#252423] hover:bg-[#f8fafc] dark:hover:bg-[#2f2e2d] text-[#090a0f] dark:text-[#e8e8e6]`}
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                    </svg>
                    <span>
                        {loadingProvider === 'google' ? 'Redirecting...' : 'Continue with Google'}
                    </span>
                </button>
            </div>
        </Modal>
    )
}
