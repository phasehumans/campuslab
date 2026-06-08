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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#152A4C]/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-[400px] rounded-[24px] border border-gray-200 bg-white shadow-2xl p-8 relative flex flex-col min-h-[460px]">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="flex flex-col items-center text-center mt-2 mb-8">
                    <div className="mb-4">
                        <span className="text-[#3E6FC3] font-black text-2xl tracking-tight">
                            Campus Lab
                        </span>
                    </div>

                    <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-1 mb-6">
                        <button
                            onClick={() => setAuthMode('login')}
                            className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-all ${
                                authMode === 'login'
                                    ? 'bg-white text-[#3E6FC3] shadow-sm border border-gray-200'
                                    : 'text-gray-500 hover:text-gray-900 border border-transparent'
                            }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setAuthMode('signup')}
                            className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-all ${
                                authMode === 'signup'
                                    ? 'bg-white text-[#3E6FC3] shadow-sm border border-gray-200'
                                    : 'text-gray-500 hover:text-gray-900 border border-transparent'
                            }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                        {authMode === 'login' ? 'Welcome back' : 'Create your account'}
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        {authMode === 'login'
                            ? 'Sign in to continue to Campus Lab'
                            : 'Register once, then join contests and solve problems'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
                    {authMode === 'signup' && (
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Full Name
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="e.g. Chaitanya Sonawane"
                                className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#3E6FC3] focus:ring-1 focus:ring-[#3E6FC3] transition-all"
                            />
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                            PRN Number
                        </label>
                        <input
                            type="text"
                            required
                            value={prn}
                            onChange={(event) => setPrn(event.target.value)}
                            placeholder="e.g. 202101234"
                            className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#3E6FC3] focus:ring-1 focus:ring-[#3E6FC3] transition-all"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="At least 6 characters"
                            className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#3E6FC3] focus:ring-1 focus:ring-[#3E6FC3] transition-all"
                        />
                    </div>

                    {authError ? (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 font-medium">
                            {authError}
                        </div>
                    ) : null}

                    <div className="mt-auto pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#3E6FC3] text-white hover:bg-[#4285F4] disabled:bg-blue-300 disabled:cursor-not-allowed font-bold py-3.5 rounded-xl text-sm transition-colors shadow-md shadow-blue-500/20"
                        >
                            {isSubmitting
                                ? 'Please wait...'
                                : authMode === 'login'
                                  ? 'Sign In'
                                  : 'Create Account'}
                        </button>
                        <p className="text-center text-sm text-gray-500 mt-6 font-medium">
                            {authMode === 'login' ? "Don't have an account?" : 'Already registered?'}{' '}
                            <button
                                type="button"
                                onClick={() =>
                                    setAuthMode(authMode === 'login' ? 'signup' : 'login')
                                }
                                className="text-[#3E6FC3] hover:text-[#4285F4] font-bold"
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
