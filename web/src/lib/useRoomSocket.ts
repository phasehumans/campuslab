import { useEffect, useRef } from 'react'
import { getAuthToken } from './api'

export type RoomSocketMessage = { type: string; [key: string]: unknown }

/**
 * Subscribes to live events for a contest/duel room over /ws/contest.
 * Reconnects automatically; the latest onMessage is always used.
 */
export function useRoomSocket(
    roomCode: string | null | undefined,
    enabled: boolean,
    onMessage: (message: RoomSocketMessage) => void
) {
    const handlerRef = useRef(onMessage)
    useEffect(() => {
        handlerRef.current = onMessage
    }, [onMessage])

    useEffect(() => {
        if (!roomCode || !enabled) return
        const token = getAuthToken()
        if (!token) return

        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
        const wsUrl = `${protocol}//${window.location.host}/ws/contest`

        let ws: WebSocket | null = null
        let reconnectTimer: ReturnType<typeof setTimeout> | null = null
        let pingTimer: ReturnType<typeof setInterval> | null = null
        let unmounted = false

        const connect = () => {
            if (unmounted) return
            try {
                ws = new WebSocket(wsUrl)
                ws.onopen = () => {
                    ws?.send(JSON.stringify({ type: 'JOIN_ROOM', roomCode, token }))
                    pingTimer = setInterval(() => {
                        if (ws?.readyState === WebSocket.OPEN) {
                            ws.send(JSON.stringify({ type: 'PING' }))
                        }
                    }, 25_000)
                }
                ws.onmessage = (event) => {
                    try {
                        handlerRef.current(JSON.parse(event.data) as RoomSocketMessage)
                    } catch {
                        // ignore malformed frames
                    }
                }
                ws.onclose = () => {
                    if (pingTimer) clearInterval(pingTimer)
                    if (!unmounted) reconnectTimer = setTimeout(connect, 3000)
                }
            } catch {
                if (!unmounted) reconnectTimer = setTimeout(connect, 3000)
            }
        }

        connect()

        return () => {
            unmounted = true
            if (reconnectTimer) clearTimeout(reconnectTimer)
            if (pingTimer) clearInterval(pingTimer)
            if (ws) {
                ws.onclose = null
                ws.close()
            }
        }
    }, [roomCode, enabled])
}
