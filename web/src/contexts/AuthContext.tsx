import React, { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getApiErrorMessage, getCurrentUser, logoutUser, oauthLogin } from '@/lib/api'
import type { User } from '@/lib/types'

interface AuthContextType {
    isLoggedIn: boolean
    isAuthLoading: boolean
    isSubmitting: boolean
    user: User | null
    isModalOpen: boolean
    isSignoutModalOpen: boolean
    authError: string | null
    openModal: (mode?: string) => void
    closeModal: () => void
    openSignoutModal: () => void
    closeSignoutModal: () => void
    loginWithOAuth: (payload: {
        provider: 'github' | 'google'
        code?: string
        credential?: string
        redirectUri?: string
        email?: string
        name?: string
        avatar?: string
    }) => Promise<void>
    logout: () => Promise<void>
    clearAuthError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_QUERY_KEY = ['auth', 'current-user']

export function AuthProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSignoutModalOpen, setIsSignoutModalOpen] = useState(false)
    const [authError, setAuthError] = useState<string | null>(null)

    const currentUserQuery = useQuery({
        queryKey: AUTH_QUERY_KEY,
        queryFn: getCurrentUser,
    })

    const setCurrentUser = useCallback((user: User | null) => {
        queryClient.setQueryData(AUTH_QUERY_KEY, user)
    }, [queryClient])

    const oauthMutation = useMutation({
        mutationFn: oauthLogin,
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
            setIsSignoutModalOpen(false)
        },
    })

    const openModal = useCallback(() => {
        setAuthError(null)
        setIsModalOpen(true)
    }, [])

    const closeModal = useCallback(() => {
        setAuthError(null)
        setIsModalOpen(false)
    }, [])

    const openSignoutModal = useCallback(() => {
        setIsSignoutModalOpen(true)
    }, [])

    const closeSignoutModal = useCallback(() => {
        setIsSignoutModalOpen(false)
    }, [])

    const loginWithOAuth = useCallback(async (payload: {
        provider: 'github' | 'google'
        code?: string
        credential?: string
        redirectUri?: string
        email?: string
        name?: string
        avatar?: string
    }) => {
        try {
            await oauthMutation.mutateAsync(payload)
        } catch (error) {
            setAuthError(getApiErrorMessage(error, 'Unable to sign in with ' + payload.provider))
            throw error
        }
    }, [oauthMutation])

    const logout = useCallback(async () => {
        setAuthError(null)
        await logoutMutation.mutateAsync()
        queryClient.removeQueries({
            queryKey: ['profile'],
        })
    }, [logoutMutation, queryClient])

    const clearAuthError = useCallback(() => {
        setAuthError(null)
    }, [])

    const isSubmitting = oauthMutation.isPending || logoutMutation.isPending

    const value: AuthContextType = useMemo(
        () => ({
            isLoggedIn: Boolean(currentUserQuery.data),
            isAuthLoading: currentUserQuery.isLoading,
            isSubmitting,
            user: currentUserQuery.data ?? null,
            isModalOpen,
            isSignoutModalOpen,
            authError,
            openModal,
            closeModal,
            openSignoutModal,
            closeSignoutModal,
            loginWithOAuth,
            logout,
            clearAuthError,
        }),
        [
            currentUserQuery.data,
            currentUserQuery.isLoading,
            isSubmitting,
            isModalOpen,
            isSignoutModalOpen,
            authError,
            openModal,
            closeModal,
            openSignoutModal,
            closeSignoutModal,
            loginWithOAuth,
            logout,
            clearAuthError,
        ]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
