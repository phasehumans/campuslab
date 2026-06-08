import React from 'react'
import { Play, Hash, ArrowRight } from 'lucide-react'

interface JoinRoomCardProps {
    roomCode: string
    setRoomCode: (code: string) => void
    handleJoinRoom: (e: React.MouseEvent) => void
    isJoining?: boolean
}

export function JoinRoomCard({
    roomCode,
    setRoomCode,
    handleJoinRoom,
    isJoining = false,
}: JoinRoomCardProps) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 flex flex-col shadow-[0_12px_40px_rgba(0,0,0,0.03)]">
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6 shrink-0">
                    <div className="p-2.5 bg-slate-50 border border-slate-150 rounded-xl">
                        <Play className="h-5 w-5 text-[#3E6FC3] ml-0.5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 tracking-tight">Join Room</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Enter a code to compete</p>
                    </div>
                </div>

                <div
                    className="flex-1 flex flex-col justify-center space-y-8"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="space-y-3 text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 mb-2">
                            <Hash className="h-6 w-6 text-slate-400" />
                        </div>
                        <h3 className="text-base font-semibold text-slate-700 tracking-tight">
                            Have a room code?
                        </h3>
                        <p className="text-xs text-slate-400 max-w-[200px] mx-auto leading-relaxed font-medium">
                            Ask the host for the room code and enter it below to join the contest.
                        </p>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                            placeholder="ENTER CODE"
                            maxLength={6}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-center text-xl tracking-[0.5em] font-mono text-[#3E6FC3] font-bold placeholder:text-slate-300 focus:outline-none focus:bg-white focus:border-[#3E6FC3]/40 transition-all uppercase shadow-inner"
                        />
                    </div>
                </div>

                <button
                    onClick={handleJoinRoom}
                    disabled={roomCode.length < 4 || isJoining}
                    className="w-full mt-6 shrink-0 bg-[#3E6FC3] hover:bg-[#325a9e] disabled:bg-blue-300 disabled:text-white/60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-2 text-sm"
                >
                    {isJoining ? 'Joining...' : 'Join Contest'} <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}
