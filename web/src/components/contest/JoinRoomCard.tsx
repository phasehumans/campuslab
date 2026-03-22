import React from 'react'
import { Play, Hash, ArrowRight } from 'lucide-react'

interface JoinRoomCardProps {
    roomCode: string
    setRoomCode: (code: string) => void
    handleJoinRoom: (e: React.MouseEvent) => void
}

export function JoinRoomCard({ roomCode, setRoomCode, handleJoinRoom }: JoinRoomCardProps) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#161616] p-6 flex flex-col shadow-xl">
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6 shrink-0">
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                        <Play className="h-5 w-5 text-gray-200 ml-0.5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white tracking-tight">Join Room</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Enter a code to compete</p>
                    </div>
                </div>

                <div
                    className="flex-1 flex flex-col justify-center space-y-8"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="space-y-3 text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1A1A1A] border border-white/5 mb-2">
                            <Hash className="h-6 w-6 text-gray-500" />
                        </div>
                        <h3 className="text-base font-medium text-white tracking-tight">
                            Have a room code?
                        </h3>
                        <p className="text-xs text-gray-400 max-w-[200px] mx-auto leading-relaxed">
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
                            className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3.5 text-center text-xl tracking-[0.5em] font-mono text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-all uppercase shadow-inner"
                        />
                    </div>
                </div>

                <button
                    onClick={handleJoinRoom}
                    disabled={roomCode.length < 4}
                    className="w-full mt-6 shrink-0 bg-[#F5F5F5] hover:bg-white disabled:bg-[#F5F5F5]/50 disabled:text-black/50 disabled:cursor-not-allowed text-black font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                    Join Contest <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}
