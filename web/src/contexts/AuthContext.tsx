import React, { createContext, useContext, useState, type ReactNode } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getApiErrorMessage, getCurrentUser, loginUser, logoutUser, registerUser } from '@/lib/api'
import type { User } from '@/lib/types'

type AuthMode = 'login' | 'signup'

interface AuthContextType {
    isLoggedIn: boolean
    isAuthLoading: boolean
    isSubmitting: boolean
    user: User | null
    isModalOpen: boolean
    authMode: AuthMode
    authError: string | null
    openModal: (mode?: AuthMode) => void
    closeModal: () => void
    setAuthMode: (mode: AuthMode) => void
    login: (payload: { prn: string; password: string }) => Promise<void>
    register: (payload: { name: string; prn: string; password: string }) => Promise<void>
    logout: () => Promise<void>
    clearAuthError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_QUERY_KEY = ['auth', 'current-user']

export function AuthProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [authMode, setAuthModeState] = useState<AuthMode>('signup')
    const [authError, setAuthError] = useState<string | null>(null)

    const currentUserQuery = useQuery({
        queryKey: AUTH_QUERY_KEY,
        queryFn: getCurrentUser,
    })

    const setCurrentUser = (user: User | null) => {
        queryClient.setQueryData(AUTH_QUERY_KEY, user)
    }

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (user) => {
            setCurrentUser(user)
            setAuthError(null)
            setIsModalOpen(false)
        },
    })

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (user) => {
            setCurrentUser(user)
            setAuthError(null)
            setIsModalOpen(false)
        },
    })

    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSettled: () => {
            setCurrentUser(null)
        },
    })

    const openModal = (mode: AuthMode = 'signup') => {
        setAuthModeState(mode)
        setAuthError(null)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setAuthError(null)
        setIsModalOpen(false)
    }

    const setAuthMode = (mode: AuthMode) => {
        setAuthError(null)
        setAuthModeState(mode)
    }

    const login = async (payload: { prn: string; password: string }) => {
        try {
            await loginMutation.mutateAsync(payload)
        } catch (error) {
            setAuthError(getApiErrorMessage(error, 'Unable to sign in'))
            throw error
        }
    }

    const register = async (payload: { name: string; prn: string; password: string }) => {
        try {
            await registerMutation.mutateAsync(payload)
        } catch (error) {
            setAuthError(getApiErrorMessage(error, 'Unable to create account'))
            throw error
        }
    }

    const logout = async () => {
        setAuthError(null)
        await logoutMutation.mutateAsync()
        queryClient.removeQueries({
            queryKey: ['profile'],
        })
    }

    const value: AuthContextType = {
        isLoggedIn: Boolean(currentUserQuery.data),
        isAuthLoading: currentUserQuery.isLoading,
        isSubmitting:
            loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,
        user: currentUserQuery.data ?? null,
        isModalOpen,
        authMode,
        authError,
        openModal,
        closeModal,
        setAuthMode,
        login,
        register,
        logout,
        clearAuthError: () => setAuthError(null),
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
