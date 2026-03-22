import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Code2, Trophy, User, LogIn } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { LoginModal } from '@/components/auth/LoginModal'

export function Navbar() {
    const location = useLocation()
    const { isLoggedIn, openModal } = useAuth()

    const navLinks = [
        { name: 'Problem Sheet', path: '/', icon: Code2 },
        { name: 'Contest', path: '/contest', icon: Trophy },
    ]

    return (
        <>
            <nav className="w-full border-b border-white/5 bg-[#1A1A1A] text-white">
                <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo - Left */}
                    <div className="flex-1 flex items-center">
                        <Link
                            to="/"
                            className="text-xl font-bold tracking-tight text-white hover:text-gray-200 transition-colors"
                        >
                            Campus Lab
                        </Link>
                    </div>

                    {/* Links - Center */}
                    <div className="hidden md:flex items-center justify-center gap-6 flex-1">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={cn(
                                        'flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200',
                                        isActive
                                            ? 'text-white bg-white/10'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    )}
                                >
                                    <link.icon
                                        className={cn(
                                            'h-4 w-4',
                                            isActive ? 'text-white' : 'text-gray-400'
                                        )}
                                    />
                                    {link.name}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Auth - Right */}
                    <div className="flex-1 flex items-center justify-end gap-4">
                        {isLoggedIn ? (
                            <Link
                                to="/profile"
                                className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white px-2 py-1.5 transition-colors"
                            >
                                <User className="h-4 w-4" />
                                Profile
                            </Link>
                        ) : (
                            <button
                                onClick={openModal}
                                className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white px-2 py-1.5 transition-colors"
                            >
                                <LogIn className="h-4 w-4" />
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            <LoginModal />
        </>
    )
}
