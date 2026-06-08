import React from 'react'
import { Link } from 'react-router-dom'
import { LogIn, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { LoginModal } from '@/components/auth/LoginModal'

export function LandingNavbar() {
    const { isLoggedIn, openModal } = useAuth()

    const navLinks = [
        { name: 'Practice', path: '/practice' },
        { name: 'Contest', path: '/contest' },
    ]

    return (
        <>
            <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo - Left */}
                    <div className="flex flex-1 items-center gap-2">
                        <Link
                            to={isLoggedIn ? '/practice' : '/'}
                            className="flex items-center gap-2 text-xl font-bold tracking-tight transition-colors"
                        >
                            <span className="text-[#3E6FC3] font-black text-xl tracking-tight">
                                Campus Lab
                            </span>
                        </Link>
                    </div>

                    {/* Links - Center */}
                    <div className="hidden md:flex items-center justify-center gap-8 flex-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={(e) => {
                                    if (!isLoggedIn) {
                                        e.preventDefault()
                                        openModal('login')
                                    }
                                }}
                                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Auth - Right */}
                    <div className="flex flex-1 items-center justify-end gap-4">
                        {isLoggedIn ? (
                            <Link
                                to="/profile"
                                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 px-4 py-2 transition-colors"
                            >
                                <User className="h-4 w-4" />
                                Profile
                            </Link>
                        ) : (
                            <>
                                <button
                                    onClick={() => openModal('login')}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700 px-4 py-2 transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => openModal('signup')}
                                    className="bg-[#4285F4] hover:bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors shadow-sm"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <LoginModal />
        </>
    )
}
