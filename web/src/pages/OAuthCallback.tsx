import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2, AlertCircle } from 'lucide-react'

export function OAuthCallback({
    provider,
    customRedirectUri,
}: {
    provider: 'github' | 'google'
    customRedirectUri?: string
}) {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { loginWithOAuth } = useAuth()
    const [error, setError] = useState<string | null>(null)
    const executedRef = useRef(false)

    useEffect(() => {
        if (executedRef.current) return

        const code = searchParams.get('code')
        const errorParam = searchParams.get('error_description') || searchParams.get('error')

        if (errorParam) {
            executedRef.current = true
            setError(errorParam)
            return
        }

        if (!code) {
            executedRef.current = true
            setError('No authorization code received from provider.')
            return
        }

        executedRef.current = true

        const redirectUri = customRedirectUri || (provider === 'google'
            ? window.location.origin
            : `${window.location.origin}/auth/callback/github`)

        loginWithOAuth({
            provider,
            code,
            redirectUri,
        })
            .then(() => {
                if (window.history.replaceState) {
                    window.history.replaceState({}, document.title, '/')
                }
                navigate('/', { replace: true })
            })
            .catch((err: unknown) => {
                const message = err instanceof Error ? err.message : 'Authentication failed. Please try again.'
                setError(message)
            })
    }, [searchParams, provider, customRedirectUri, loginWithOAuth, navigate])

    return (
        <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-[#141414] font-mono text-xs text-[#090a0f] dark:text-[#e8e8e6]">
            {error ? (
                <div className="flex flex-col items-center gap-3 p-6 max-w-sm border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/20 rounded-[4px] text-center">
                    <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                    <p className="font-semibold text-red-700 dark:text-red-400">Sign-in Failed</p>
                    <p className="text-[#52525b] dark:text-[#a09f9d] text-[11px]">{error}</p>
                    <button
                        onClick={() => {
                            if (window.history.replaceState) {
                                window.history.replaceState({}, document.title, '/')
                            }
                            navigate('/', { replace: true })
                        }}
                        className="mt-2 px-4 py-1.5 bg-[#090a0f] dark:bg-white text-white dark:text-[#141414] rounded-[2px] font-medium cursor-pointer"
                    >
                        Back to Home
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-2 text-[#94a3b8] dark:text-[#a09f9d]">
                    <Loader2 className="h-4 w-4 animate-spin text-[#87b2f4]" />
                    <span>Completing {provider === 'github' ? 'GitHub' : 'Google'} sign-in...</span>
                </div>
            )}
        </div>
    )
}
