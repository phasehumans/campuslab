import React from 'react'
import { Users, Clock, Plus, Hash, BookOpen, ArrowRight, CheckCircle2, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CustomSelect } from '@/components/ui/CustomSelect'

interface CreatedRoom {
    code: string
    users: string
    questions: string
    time: string
    topics: string[]
}

interface CreateRoomCardProps {
    usersAllowed: string
    setUsersAllowed: (val: string) => void
    topics: string[]
    toggleTopic: (topic: string) => void
    availableTopics: string[]
    numQuestions: string
    setNumQuestions: (val: string) => void
    questionOptions?: string[]
    timeLimit: string
    setTimeLimit: (val: string) => void
    createdRoom: CreatedRoom | null
    handleCreateRoom: (e: React.MouseEvent) => void
    onEnterRoom: (e: React.MouseEvent) => void
    isCreating?: boolean
}

export function CreateRoomCard({
    usersAllowed,
    setUsersAllowed,
    topics,
    toggleTopic,
    availableTopics,
    numQuestions,
    setNumQuestions,
    questionOptions = ['1', '2', '3', '4', '5'],
    timeLimit,
    setTimeLimit,
    createdRoom,
    handleCreateRoom,
    onEnterRoom,
    isCreating = false,
}: CreateRoomCardProps) {
    return (
        <div className="relative overflow-visible rounded-2xl border border-white/10 bg-[#161616] p-6 flex flex-col shadow-xl">
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6 shrink-0">
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                        <Plus className="h-5 w-5 text-gray-200" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white tracking-tight">Create Room</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Host a custom contest</p>
                    </div>
                </div>

                {createdRoom ? (
                    <div
                        className="flex-1 flex flex-col justify-center items-center space-y-6 text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="h-14 w-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-2">
                            <CheckCircle2 className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white tracking-tight">
                                Room Created!
                            </h3>
                            <p className="text-xs text-gray-400 mt-1">
                                Share this code with your friends
                            </p>
                        </div>

                        <div
                            className="bg-[#1A1A1A] border border-white/10 rounded-xl px-6 py-4 w-full flex items-center justify-center gap-3 group cursor-pointer hover:bg-white/5 transition-colors"
                            onClick={() => navigator.clipboard.writeText(createdRoom.code)}
                        >
                            <div className="text-2xl tracking-[0.3em] font-mono text-white font-bold">
                                {createdRoom.code}
                            </div>
                            <Copy className="h-4 w-4 text-gray-500 group-hover:text-white transition-colors" />
                        </div>

                        <div className="grid grid-cols-2 gap-3 w-full text-left text-sm">
                            <div className="bg-[#1A1A1A] border border-white/5 rounded-lg p-3">
                                <div className="text-gray-500 text-xs mb-1">Participants</div>
                                <div className="text-gray-200 font-medium text-sm">
                                    {createdRoom.users === 'unlimited'
                                        ? 'Unlimited'
                                        : `${createdRoom.users} Players`}
                                </div>
                            </div>
                            <div className="bg-[#1A1A1A] border border-white/5 rounded-lg p-3">
                                <div className="text-gray-500 text-xs mb-1">Time Limit</div>
                                <div className="text-gray-200 font-medium text-sm">
                                    {createdRoom.time} Mins
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-5 flex-1" onClick={(e) => e.stopPropagation()}>
                        {/* Users Allowed */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs font-medium text-gray-400">
                                <Users className="h-3.5 w-3.5" /> Max Participants
                            </label>
                            <CustomSelect
                                value={usersAllowed}
                                onChange={setUsersAllowed}
                                options={[
                                    { label: '2 Players', value: '2' },
                                    { label: '4 Players', value: '4' },
                                    { label: '8 Players', value: '8' },
                                    { label: '10 Players', value: '10' },
                                    { label: 'Unlimited', value: 'unlimited' },
                                ]}
                            />
                        </div>

                        {/* Number of Questions & Time Limit */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-medium text-gray-400">
                                    <Hash className="h-3.5 w-3.5" /> Questions
                                </label>
                                <CustomSelect
                                    value={numQuestions}
                                    onChange={setNumQuestions}
                                    options={questionOptions.map((option) => ({
                                        label: `${option} Question${option === '1' ? '' : 's'}`,
                                        value: option,
                                    }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-medium text-gray-400">
                                    <Clock className="h-3.5 w-3.5" /> Time Limit
                                </label>
                                <CustomSelect
                                    value={timeLimit}
                                    onChange={setTimeLimit}
                                    options={[
                                        { label: '15 Minutes', value: '15' },
                                        { label: '30 Minutes', value: '30' },
                                        { label: '45 Minutes', value: '45' },
                                        { label: '60 Minutes', value: '60' },
                                        { label: '90 Minutes', value: '90' },
                                    ]}
                                />
                            </div>
                        </div>

                        {/* Topics Selection */}
                        <div className="space-y-2.5">
                            <label className="flex items-center gap-2 text-xs font-medium text-gray-400">
                                <BookOpen className="h-3.5 w-3.5" /> Topics
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                                {availableTopics.map((topic) => (
                                    <button
                                        key={topic}
                                        onClick={() => toggleTopic(topic)}
                                        className={cn(
                                            'px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all',
                                            topics.includes(topic)
                                                ? 'bg-white/10 text-white border border-white/20'
                                                : 'bg-[#1A1A1A] text-gray-500 border border-white/5 hover:border-white/10 hover:text-gray-300'
                                        )}
                                    >
                                        {topic}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {createdRoom ? (
                    <button
                        onClick={onEnterRoom}
                        className="w-full mt-6 shrink-0 bg-[#F5F5F5] hover:bg-white text-black font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                    >
                        Enter Room <ArrowRight className="h-4 w-4" />
                    </button>
                ) : (
                    <button
                        onClick={handleCreateRoom}
                        disabled={isCreating}
                        className="w-full mt-6 shrink-0 bg-[#F5F5F5] hover:bg-white disabled:bg-[#F5F5F5]/60 disabled:cursor-not-allowed text-black font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                    >
                        {isCreating ? 'Creating...' : 'Create Room'} <ArrowRight className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    )
}
