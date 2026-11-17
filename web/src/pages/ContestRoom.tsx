import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getApiErrorMessage, getContestRoom, joinContestRoom } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import { Modal, ModalButton } from '@/components/ui/Modal'
import { ProblemSet } from '@/pages/ProblemSet'

export function ContestRoom() {
    const { roomId } = useParams()
    const navigate = useNavigate()
    const { isLoggedIn, openModal } = useAuth()

    const roomQuery = useQuery({
        queryKey: ['contest-room', roomId],
        queryFn: () => getContestRoom(roomId as string),
        enabled: Boolean(roomId),
        refetchInterval: 3000,
    })

    const joinMutation = useMutation({
        mutationFn: () => joinContestRoom(roomId as string),
        onSuccess: (room) => {
            if (room.questions && room.questions.length > 0) {
                navigate(`/problem/${room.questions[0].id}?room=${room.code}`, { replace: true })
            }
        },
    })

    useEffect(() => {
        if (!roomQuery.data) return
        const room = roomQuery.data
        if (room.mode === 'DUEL') {
            navigate(`/duel/${room.code}`, { replace: true })
            return
        }
        if (!room.questions || room.questions.length === 0) return

        if (room.meJoined) {
            navigate(`/problem/${room.questions[0].id}?room=${room.code}`, { replace: true })
        } else if (
            isLoggedIn &&
            !joinMutation.isPending &&
            !joinMutation.isSuccess &&
            !joinMutation.isError
        ) {
            joinMutation.mutate()
        }
    }, [roomQuery.data, isLoggedIn, joinMutation, navigate])

    // Shown as a modal over the Problem Sheet (usually only for a moment before
    // joining redirects into the problem)
    const goHome = () => navigate('/')
    const room = roomQuery.data
    const isConnecting = roomQuery.isLoading || joinMutation.isPending
    const hasError = !isConnecting && (roomQuery.isError || !room)

    return (
        <>
            <ProblemSet />
            <Modal
                open
                onClose={goHome}
                tone={hasError ? 'danger' : 'default'}
                eyebrow="Contest Room"
                title={
                    isConnecting
                        ? `Joining room ${roomId}...`
                        : hasError
                          ? 'Room not found'
                          : `Room ${room?.code}`
                }
                description={
                    isConnecting
                        ? 'Connecting you to the contest.'
                        : hasError
                          ? getApiErrorMessage(roomQuery.error, 'Unable to locate contest room')
                          : `${room?.participantCount ?? 0} ${room?.participantCount === 1 ? 'player' : 'players'} in the room · 45 minutes · first correct submission wins.`
                }
                footer={
                    isConnecting ? undefined : hasError ? (
                        <ModalButton variant="primary" block onClick={goHome}>
                            Back to problems
                        </ModalButton>
                    ) : !isLoggedIn ? (
                        <ModalButton variant="primary" block onClick={openModal}>
                            Sign in to enter
                        </ModalButton>
                    ) : (
                        <ModalButton
                            variant="accent"
                            block
                            onClick={() => {
                                if (room?.questions?.[0]) {
                                    navigate(`/problem/${room.questions[0].id}?room=${room.code}`)
                                }
                            }}
                        >
                            Enter contest
                        </ModalButton>
                    )
                }
            />
        </>
    )
}
