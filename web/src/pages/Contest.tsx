import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { CreateRoomCard } from '@/components/contest/CreateRoomCard'
import { JoinRoomCard } from '@/components/contest/JoinRoomCard'

export function Contest() {
    const navigate = useNavigate()
    const { isLoggedIn, openModal } = useAuth()

    // Form states for Create Room
    const [usersAllowed, setUsersAllowed] = useState('4')
    const [topics, setTopics] = useState(['Array', 'String'])
    const [numQuestions, setNumQuestions] = useState('3')
    const [timeLimit, setTimeLimit] = useState('45')

    // State for created room
    const [createdRoom, setCreatedRoom] = useState<{
        code: string
        users: string
        questions: string
        time: string
        topics: string[]
    } | null>(null)

    // Form state for Join Room
    const [roomCode, setRoomCode] = useState('')

    const availableTopics = [
        'Array',
        'String',
        'Hash Table',
        'Dynamic Programming',
        'Tree',
        'Graph',
        'Math',
        'Sorting',
        'Greedy',
    ]

    const toggleTopic = (topic: string) => {
        if (topics.includes(topic)) {
            setTopics(topics.filter((t) => t !== topic))
        } else {
            setTopics([...topics, topic])
        }
    }

    const handleCreateRoom = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!isLoggedIn) {
            openModal()
            return
        }
        const code = Math.random().toString(36).substring(2, 8).toUpperCase()
        setCreatedRoom({
            code,
            users: usersAllowed,
            questions: numQuestions,
            time: timeLimit,
            topics,
        })
    }

    const handleJoinRoom = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!isLoggedIn) {
            openModal()
            return
        }
        navigate(`/contest/${roomCode}`)
    }

    return (
        <div className="max-w-4xl mx-auto min-h-[calc(100vh-5rem)] flex items-center justify-center py-8 px-4">
            {/* Main Content - Two Cards Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Create Room Card */}
                <CreateRoomCard
                    usersAllowed={usersAllowed}
                    setUsersAllowed={setUsersAllowed}
                    topics={topics}
                    toggleTopic={toggleTopic}
                    availableTopics={availableTopics}
                    numQuestions={numQuestions}
                    setNumQuestions={setNumQuestions}
                    timeLimit={timeLimit}
                    setTimeLimit={setTimeLimit}
                    createdRoom={createdRoom}
                    handleCreateRoom={handleCreateRoom}
                    onEnterRoom={(e) => {
                        e.stopPropagation()
                        navigate(`/contest/${createdRoom?.code}`)
                    }}
                />

                {/* Join Room Card */}
                <JoinRoomCard
                    roomCode={roomCode}
                    setRoomCode={setRoomCode}
                    handleJoinRoom={handleJoinRoom}
                />
            </div>
        </div>
    )
}
