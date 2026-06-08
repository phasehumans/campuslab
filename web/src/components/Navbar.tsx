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
        { name: 'Problem Sheet', path: '/practice', icon: Code2 },
        { name: 'Contest', path: '/contest', icon: Trophy },
    ]

    return (
        <>
            <nav className="w-full bg-white border-b border-slate-100 shadow-sm text-slate-800">
                <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo - Left */}
                    <div className="flex-1 flex items-center">
                        <Link
                            to={isLoggedIn ? "/practice" : "/"}
                            className="flex items-center gap-2 text-xl font-bold tracking-tight transition-colors"
                        >
                            <span className="text-[#3E6FC3] font-black text-xl tracking-tight">
                                Campus Lab
                            </span>
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
                                    onClick={(e) => {
                                        if (!isLoggedIn) {
                                            e.preventDefault()
                                            openModal('login')
                                        }
                                    }}
                                    className={cn(
                                        'flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 border border-transparent',
                                        isActive
                                            ? 'text-[#3E6FC3] bg-[#EBF3FC] border-[#D5E6FA]/60 font-semibold shadow-[0_2px_8px_rgba(62,111,195,0.03)]'
                                            : 'text-slate-600 hover:text-[#3E6FC3] hover:bg-slate-50'
                                    )}
                                >
                                    <link.icon
                                        className={cn(
                                            'h-4 w-4',
                                            isActive ? 'text-[#3E6FC3]' : 'text-slate-400'
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
                                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#3E6FC3] px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                <User className="h-4 w-4 text-slate-400" />
                                Profile
                            </Link>
                        ) : (
                            <button
                                onClick={() => openModal('login')}
                                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#3E6FC3] px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                <LogIn className="h-4 w-4 text-slate-400" />
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
