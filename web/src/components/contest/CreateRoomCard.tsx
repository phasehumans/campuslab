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
        <div className="relative overflow-visible rounded-2xl border border-slate-100 bg-white p-6 flex flex-col shadow-[0_12px_40px_rgba(0,0,0,0.03)]">
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6 shrink-0">
                    <div className="p-2.5 bg-slate-50 border border-slate-150 rounded-xl">
                        <Plus className="h-5 w-5 text-[#3E6FC3]" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                            Create Room
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">Host a custom contest</p>
                    </div>
                </div>

                {createdRoom ? (
                    <div
                        className="flex-1 flex flex-col justify-center items-center space-y-6 text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="h-14 w-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mb-2 shadow-sm">
                            <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                                Room Created!
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">
                                Share this code with your friends
                            </p>
                        </div>

                        <div
                            className="bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 w-full flex items-center justify-center gap-3 group cursor-pointer hover:bg-slate-100/60 transition-colors"
                            onClick={() => navigator.clipboard.writeText(createdRoom.code)}
                        >
                            <div className="text-2xl tracking-[0.3em] font-mono text-[#3E6FC3] font-bold">
                                {createdRoom.code}
                            </div>
                            <Copy className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                        </div>

                        <div className="grid grid-cols-2 gap-3 w-full text-left text-sm">
                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                                <div className="text-slate-400 text-xs mb-1">Participants</div>
                                <div className="text-slate-700 font-bold text-sm">
                                    {createdRoom.users === 'unlimited'
                                        ? 'Unlimited'
                                        : `${createdRoom.users} Players`}
                                </div>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                                <div className="text-slate-400 text-xs mb-1">Time Limit</div>
                                <div className="text-slate-700 font-bold text-sm">
                                    {createdRoom.time} Mins
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-5 flex-1" onClick={(e) => e.stopPropagation()}>
                        {/* Users Allowed */}
                        <div className="space-y-2 relative z-30">
                            <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                                <Users className="h-3.5 w-3.5 text-slate-400" /> Max Participants
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
                        <div className="grid grid-cols-2 gap-4 relative z-20">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                                    <Hash className="h-3.5 w-3.5 text-slate-400" /> Questions
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
                                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                                    <Clock className="h-3.5 w-3.5 text-slate-400" /> Time Limit
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
                        <div className="space-y-2.5 relative z-10">
                            <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                                <BookOpen className="h-3.5 w-3.5 text-slate-400" /> Topics
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                                {availableTopics.map((topic) => (
                                    <button
                                        key={topic}
                                        onClick={() => toggleTopic(topic)}
                                        className={cn(
                                            'px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border',
                                            topics.includes(topic)
                                                ? 'bg-[#EBF3FC] text-[#3E6FC3] border-[#D5E6FA]'
                                                : 'bg-slate-50 text-slate-500 border-slate-200/60 hover:bg-slate-100 hover:text-slate-700'
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
                        className="w-full mt-6 shrink-0 bg-[#3E6FC3] hover:bg-[#325a9e] text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-2 text-sm"
                    >
                        Enter Room <ArrowRight className="h-4 w-4" />
                    </button>
                ) : (
                    <button
                        onClick={handleCreateRoom}
                        disabled={isCreating}
                        className="w-full mt-6 shrink-0 bg-[#3E6FC3] hover:bg-[#325a9e] disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-2 text-sm"
                    >
                        {isCreating ? 'Creating...' : 'Create Room'}{' '}
                        <ArrowRight className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    )
}
