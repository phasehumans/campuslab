import React, { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
    isLoggedIn: boolean
    login: (prn: string) => void
    logout: () => void
    isModalOpen: boolean
    openModal: () => void
    closeModal: () => void
    user: { prn: string } | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [user, setUser] = useState<{ prn: string } | null>(null)

    const login = (prn: string) => {
        setIsLoggedIn(true)
        setUser({ prn })
        setIsModalOpen(false)
    }

    const logout = () => {
        setIsLoggedIn(false)
        setUser(null)
    }

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, login, logout, isModalOpen, openModal, closeModal, user }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
