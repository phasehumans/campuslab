import React from 'react'
import { MapPin, Link as LinkIcon, Github, LogOut } from 'lucide-react'

interface UserInfoProps {
    handleLogout: () => void
}

export function UserInfo({ handleLogout }: UserInfoProps) {
    return (
        <div className="md:col-span-4 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#161616] p-6 shadow-xl">
                <div className="flex flex-col items-center text-center">
                    <div className="h-28 w-28 rounded-full border border-white/10 bg-[#1A1A1A] flex items-center justify-center mb-4 overflow-hidden shadow-inner relative">
                        <span className="text-4xl font-light text-gray-300">AC</span>
                        <div className="absolute -bottom-1 -right-1 bg-[#1A1A1A] border border-white/10 rounded-full p-1">
                            <div className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                PRO
                            </div>
                        </div>
                    </div>
                    <h1 className="text-xl font-bold text-white tracking-tight">Alex Chen</h1>
                    <p className="text-sm text-gray-400 mt-1 mb-6">@alexcoder</p>

                    <div className="w-full space-y-1 text-sm text-gray-400 text-left mb-6">
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <MapPin className="h-4 w-4 text-gray-500 shrink-0" />
                            <span className="truncate">San Francisco, CA</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <LinkIcon className="h-4 w-4 text-gray-500 shrink-0" />
                            <a href="#" className="hover:text-white transition-colors truncate">
                                alexchen.dev
                            </a>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <Github className="h-4 w-4 text-gray-500 shrink-0" />
                            <a href="#" className="hover:text-white transition-colors truncate">
                                github.com/alexc
                            </a>
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
