import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export function LoginModal() {
    const {
        isModalOpen,
        closeModal,
        login,
        register,
        authMode,
        setAuthMode,
        authError,
        clearAuthError,
        isSubmitting,
    } = useAuth()

    const [name, setName] = useState('')
    const [prn, setPrn] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (!isModalOpen) {
            setName('')
            setPrn('')
            setPassword('')
            clearAuthError()
        }
    }, [clearAuthError, isModalOpen])

    if (!isModalOpen) return null

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (authMode === 'signup') {
            await register({ name, prn, password }).catch(() => undefined)
            return
        }

        await login({ prn, password }).catch(() => undefined)
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-[360px] rounded-[24px] border border-white/10 bg-[#121212] p-8 relative flex flex-col min-h-[440px]">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="flex flex-col items-center text-center mt-2 mb-8">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#1A1A1A] p-1 mb-5">
                        <button
                            onClick={() => setAuthMode('login')}
                            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                                authMode === 'login'
                                    ? 'bg-white text-black'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setAuthMode('signup')}
                            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                                authMode === 'signup'
                                    ? 'bg-white text-black'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        {authMode === 'login' ? 'Welcome back' : 'Create your account'}
                    </h2>
                    <p className="text-sm text-gray-400 mt-2">
                        {authMode === 'login'
                            ? 'Sign in to continue to Campus Lab'
                            : 'Register once, then join contests and solve problems'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
                    {authMode === 'signup' && (
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Full Name
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="e.g. Chaitanya Sonawane"
                                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            PRN Number
                        </label>
                        <input
                            type="text"
                            required
                            value={prn}
                            onChange={(event) => setPrn(event.target.value)}
                            placeholder="e.g. 202101234"
                            className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="At least 6 characters"
                            className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                        />
                    </div>

                    {authError ? (
                        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                            {authError}
                        </div>
                    ) : null}

                    <div className="mt-auto pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-white text-black hover:bg-gray-200 disabled:bg-white/60 disabled:cursor-not-allowed font-medium py-2.5 rounded-xl text-sm transition-colors"
                        >
                            {isSubmitting
                                ? 'Please wait...'
                                : authMode === 'login'
                                  ? 'Sign In'
                                  : 'Create Account'}
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-6">
                            {authMode === 'login' ? "Don't have an account?" : 'Already registered?'}{' '}
                            <button
                                type="button"
                                onClick={() =>
                                    setAuthMode(authMode === 'login' ? 'signup' : 'login')
                                }
                                className="text-white hover:underline"
                            >
                                {authMode === 'login' ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
