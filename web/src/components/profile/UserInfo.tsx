import React from 'react'
import { CalendarDays, LogOut } from 'lucide-react'
import type { User } from '@/lib/types'

interface UserInfoProps {
    user: User & { createdAt: string }
    handleLogout: () => void
}

export function UserInfo({ user, handleLogout }: UserInfoProps) {
    const initials = (user.name ?? user.prn)
        .split(' ')
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('')
        .slice(0, 2)

    return (
        <div className="md:col-span-4 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#161616] p-6 shadow-xl">
                <div className="flex flex-col items-center text-center">
                    <div className="h-28 w-28 rounded-full border border-white/10 bg-[#1A1A1A] flex items-center justify-center mb-4 overflow-hidden shadow-inner">
                        <span className="text-4xl font-light text-gray-300">{initials}</span>
                    </div>
                    <h1 className="text-xl font-bold text-white tracking-tight">
                        {user.name ?? 'Campus Lab User'}
                    </h1>
                    <p className="text-sm text-gray-400 mt-1 mb-6">{user.prn}</p>

                    <div className="w-full space-y-2 text-sm text-gray-400 text-left mb-6">
                        <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-[#1A1A1A] p-3">
                            <CalendarDays className="h-4 w-4 text-gray-500 shrink-0" />
                            <span className="truncate">
                                Joined {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-white/5 bg-[#1A1A1A] p-3">
                            <span>Role</span>
                            <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-gray-200">
                                {user.role}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all text-sm font-medium"
                    >
                        <LogOut className="h-4 w-4" /> Logout
                    </button>
                </div>
            </div>
        </div>
    )
}
