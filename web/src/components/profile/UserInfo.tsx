import React from 'react'
import { CalendarDays, LogOut, MapPin, GraduationCap, Award } from 'lucide-react'
import type { User } from '@/lib/types'

interface UserInfoProps {
    user: User & { createdAt: string }
    handleLogout: () => void
}

export function UserInfo({ user, handleLogout }: UserInfoProps) {
    const avatarUrl = `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(user.name ?? user.prn)}`

    return (
        <div className="md:col-span-4 space-y-6">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.03)]">
                <div className="flex flex-col">
                    {/* LeetCode style top section with avatar on left/center */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-20 w-20 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-center overflow-hidden shadow-sm shrink-0">
                            <img
                                src={avatarUrl}
                                alt={user.name ?? 'User'}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-lg font-bold text-slate-800 tracking-tight truncate">
                                {user.name ?? 'Campus Lab User'}
                            </h1>
                            <p className="text-sm text-slate-400 font-mono font-medium truncate">
                                @{user.prn}
                            </p>
                            <span className="inline-block mt-2 rounded-full bg-slate-100 border border-slate-200/50 px-2.5 py-0.5 text-[10px] text-slate-600 font-semibold uppercase tracking-wider">
                                {user.role}
                            </span>
                        </div>
                    </div>

                    <div className="h-px bg-slate-100 my-4" />

                    {/* LeetCode style profile stats list */}
                    <div className="space-y-4 text-sm text-slate-500 font-medium mb-6">
                        <div className="flex items-center gap-2.5 text-slate-600">
                            <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                            <span>Shirpur, India</span>
                        </div>

                        <div className="flex items-center gap-2.5 text-slate-600">
                            <GraduationCap className="h-4 w-4 text-slate-400 shrink-0" />
                            <span className="truncate">RCPIT, Shirpur</span>
                        </div>

                        <div className="flex items-center gap-2.5 text-slate-600">
                            <Award className="h-4 w-4 text-slate-400 shrink-0" />
                            <span className="truncate">AIML, Batch of 2027</span>
                        </div>

                        <div className="flex items-center gap-2.5 text-slate-600">
                            <CalendarDays className="h-4 w-4 text-slate-400 shrink-0" />
                            <span className="truncate">
                                Joined{' '}
                                {new Date(user.createdAt).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>
                    </div>

                    <div className="h-px bg-slate-100 my-4" />

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-800 transition-all text-sm font-semibold focus:outline-none"
                    >
                        <LogOut className="h-4 w-4" /> Logout
                    </button>
                </div>
            </div>
        </div>
    )
}
