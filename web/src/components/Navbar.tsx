import { Link } from 'react-router-dom'
import { ArrowRight, LogOut, Sun, Moon } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { LoginModal } from '@/components/auth/LoginModal'
import { SignoutModal } from '@/components/auth/SignoutModal'
import { Tooltip } from '@/components/ui/Tooltip'

export function Navbar() {
    const { isLoggedIn, user, openModal, openSignoutModal } = useAuth()
    const { theme, toggleTheme } = useTheme()

    return (
        <>
            <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#141414]/95 backdrop-blur-xs transition-colors">
                <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 sm:px-6 md:px-8">
                    {/* Brand (Left): CampusLab with byline */}
                    <div className="flex items-center gap-2 sm:gap-2.5">
                        <Link
                            to="/"
                            className="flex items-center font-mono text-xs sm:text-sm hover:opacity-80 transition-opacity"
                        >
                            <span className="font-semibold text-[#090a0f] dark:text-[#e8e8e6] tracking-tight">
                                CampusLab
                            </span>
                        </Link>
                        <span className="hidden sm:inline text-[11px] font-mono text-[#94a3b8] dark:text-[#a09f9d] select-none">
                            a project by jayesh, sachin, sakshi, chaitanya
                        </span>
                    </div>

                    {/* Right Area: GitHub, Theme Switcher, and Auth */}
                    <div className="flex items-center gap-2 sm:gap-2.5 font-mono text-xs">
                        {/* GitHub Link */}
                        <Tooltip content="GitHub Repository" position="bottom">
                            <a
                                href="https://github.com/phasehumans/campuslab"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 text-[#64748b] dark:text-[#a09f9d] hover:text-[#090a0f] dark:hover:text-[#e8e8e6] border border-[#e2e8f0] dark:border-[#333333] bg-[#f9fafb] dark:bg-[#252423] hover:bg-[#f1f5f9] dark:hover:bg-[#2f2e2d] rounded-[3px] transition-colors cursor-pointer inline-flex items-center justify-center"
                            >
                                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    />
                                </svg>
                            </a>
                        </Tooltip>

                        {/* Theme Switcher */}
                        <Tooltip
                            content={
                                theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
                            }
                            position="bottom"
                        >
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="p-1.5 text-[#64748b] dark:text-[#a09f9d] hover:text-[#090a0f] dark:hover:text-[#e8e8e6] border border-[#e2e8f0] dark:border-[#333333] bg-[#f9fafb] dark:bg-[#252423] hover:bg-[#f1f5f9] dark:hover:bg-[#2f2e2d] rounded-[3px] transition-colors cursor-pointer"
                            >
                                {theme === 'dark' ? (
                                    <Sun className="h-3.5 w-3.5 text-[#e8e8e6]" />
                                ) : (
                                    <Moon className="h-3.5 w-3.5 text-[#090a0f]" />
                                )}
                            </button>
                        </Tooltip>

                        {/* User or Sign In Modal trigger */}
                        {isLoggedIn ? (
                            <div className="flex items-center gap-2">
                                <div className="flex items-center border border-[#e2e8f0] dark:border-[#333333] bg-[#f9fafb] dark:bg-[#252423] px-2.5 py-1 rounded-[3px]">
                                    <span className="font-medium text-[#090a0f] dark:text-[#e8e8e6] max-w-[140px] truncate">
                                        {user?.name || user?.email?.split('@')[0] || 'User'}
                                    </span>
                                </div>

                                <Tooltip content="Sign out" position="bottom" align="end">
                                    <button
                                        type="button"
                                        onClick={openSignoutModal}
                                        className="p-1.5 text-[#94a3b8] dark:text-[#a09f9d] hover:text-[#ef4444] border border-[#e2e8f0] dark:border-[#333333] bg-[#f9fafb] dark:bg-[#252423] hover:bg-[#f1f5f9] dark:hover:bg-[#2f2e2d] rounded-[3px] transition-colors cursor-pointer"
                                    >
                                        <LogOut className="h-3.5 w-3.5" />
                                    </button>
                                </Tooltip>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={openModal}
                                className="inline-flex items-center gap-1.5 bg-[#090a0f] dark:bg-white text-white dark:text-[#141414] hover:bg-[#27272a] dark:hover:bg-[#e8e8e6] text-xs font-mono font-medium px-3 sm:px-3.5 py-1.5 rounded-[3px] transition-colors cursor-pointer"
                            >
                                <span>Sign in</span>
                                <ArrowRight className="h-3 w-3 opacity-70" />
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <LoginModal />
            <SignoutModal />
        </>
    )
}
