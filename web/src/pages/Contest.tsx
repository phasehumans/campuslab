import React, { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { CreateRoomCard } from '@/components/contest/CreateRoomCard'
import { JoinRoomCard } from '@/components/contest/JoinRoomCard'
import { useAuth } from '@/contexts/AuthContext'
import {
    createContestRoom,
    getApiErrorMessage,
    getProblems,
    joinContestRoom,
} from '@/lib/api'

export function Contest() {
    const navigate = useNavigate()
    const { isLoggedIn, openModal } = useAuth()

    const [usersAllowed, setUsersAllowed] = useState('4')
    const [topics, setTopics] = useState<string[]>([])
    const [numQuestions, setNumQuestions] = useState('3')
    const [timeLimit, setTimeLimit] = useState('45')
    const [roomCode, setRoomCode] = useState('')
    const [createdRoom, setCreatedRoom] = useState<{
        code: string
        users: string
        questions: string
        time: string
        topics: string[]
    } | null>(null)
    const [pageError, setPageError] = useState<string | null>(null)

    const problemsQuery = useQuery({
        queryKey: ['problems'],
        queryFn: getProblems,
    })

    const availableTopics = useMemo(
        () =>
            Array.from(new Set((problemsQuery.data ?? []).flatMap((problem) => problem.tags))).sort(),
        [problemsQuery.data]
    )

    useEffect(() => {
        if (availableTopics.length > 0 && topics.length === 0) {
            setTopics(availableTopics.slice(0, Math.min(2, availableTopics.length)))
        }
    }, [availableTopics, topics.length])

    const maxQuestionCount = Math.max(1, Math.min(5, problemsQuery.data?.length ?? 1))
    const questionOptions = Array.from({ length: maxQuestionCount }, (_, index) => String(index + 1))

    useEffect(() => {
        if (!questionOptions.includes(numQuestions)) {
            setNumQuestions(questionOptions[questionOptions.length - 1] ?? '1')
        }
    }, [numQuestions, questionOptions])

    const createRoomMutation = useMutation({
        mutationFn: () =>
            createContestRoom({
                maxParticipants: usersAllowed === 'unlimited' ? null : Number(usersAllowed),
                topics,
                questionCount: Number(numQuestions),
                timeLimitMinutes: Number(timeLimit),
            }),
        onSuccess: (room) => {
            setCreatedRoom({
                code: room.code,
                users: room.maxParticipants === null ? 'unlimited' : String(room.maxParticipants),
                questions: String(room.questionCount),
                time: String(room.timeLimitMinutes),
                topics: room.topics,
            })
            setPageError(null)
        },
        onError: (error) => {
            setPageError(getApiErrorMessage(error, 'Unable to create contest room'))
        },
    })

    const joinRoomMutation = useMutation({
        mutationFn: (code: string) => joinContestRoom(code),
        onSuccess: (room) => {
            setPageError(null)
            navigate(`/contest/${room.code}`)
        },
        onError: (error) => {
            setPageError(getApiErrorMessage(error, 'Unable to join contest room'))
        },
    })

    const ensureAuthenticated = () => {
        if (isLoggedIn) {
            return true
        }

        openModal('login')
        return false
    }

    const toggleTopic = (topic: string) => {
        setTopics((current) =>
            current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]
        )
    }

    const handleCreateRoom = (event: React.MouseEvent) => {
        event.stopPropagation()

        if (!ensureAuthenticated()) {
            return
        }

        if (topics.length === 0) {
            setPageError('Select at least one topic to create a contest room')
            return
        }

        createRoomMutation.mutate()
    }

    const handleJoinRoom = (event: React.MouseEvent) => {
        event.stopPropagation()

        if (!ensureAuthenticated()) {
            return
        }

        joinRoomMutation.mutate(roomCode.trim().toUpperCase())
    }

    return (
        <div className="max-w-4xl mx-auto w-full flex flex-col py-8 px-4">
            {problemsQuery.isLoading ? (
                <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 text-sm text-slate-400 shadow-sm">
                    Loading contest configuration...
                </div>
            ) : problemsQuery.isError ? (
                <div className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-200">
                    {getApiErrorMessage(problemsQuery.error, 'Unable to load available topics')}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <CreateRoomCard
                            usersAllowed={usersAllowed}
                            setUsersAllowed={setUsersAllowed}
                            topics={topics}
                            toggleTopic={toggleTopic}
                            availableTopics={availableTopics}
                            numQuestions={numQuestions}
                            setNumQuestions={(value) =>
                                setNumQuestions(questionOptions.includes(value) ? value : questionOptions[0] ?? '1')
                            }
                            questionOptions={questionOptions}
                            timeLimit={timeLimit}
                            setTimeLimit={setTimeLimit}
                            createdRoom={createdRoom}
                            handleCreateRoom={handleCreateRoom}
                            onEnterRoom={(event) => {
                                event.stopPropagation()
                                if (createdRoom) {
                                    navigate(`/contest/${createdRoom.code}`)
                                }
                            }}
                            isCreating={createRoomMutation.isPending}
                        />

                        <JoinRoomCard
                            roomCode={roomCode}
                            setRoomCode={setRoomCode}
                            handleJoinRoom={handleJoinRoom}
                            isJoining={joinRoomMutation.isPending}
                        />
                    </div>

                    {pageError ? (
                        <div className="mt-6 w-full rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                            {pageError}
                        </div>
                    ) : null}
                </>
            )}
        </div>
    )
}
