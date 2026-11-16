import type { ContestRoom, DuelDifficulty } from './types'
import { parseUtcDate } from './utils'

export const DUEL_DIFFICULTIES: { value: DuelDifficulty; label: string }[] = [
    { value: 'EASY', label: 'Easy' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HARD', label: 'Hard' },
    { value: 'RANDOM', label: 'Random' },
]

export const DUEL_TIME_LIMITS = [15, 30, 45] as const

export function duelDifficultyLabel(d: DuelDifficulty | null | undefined) {
    return DUEL_DIFFICULTIES.find((x) => x.value === d)?.label ?? 'Random'
}

export function duelUrl(code: string) {
    return `${window.location.origin}/duel/${code}`
}

export function duelShareMessage(duel: ContestRoom) {
    return (
        `⚔️ I challenge you to a coding duel on CampusLab! ` +
        `${duelDifficultyLabel(duel.difficulty)} · ${duel.timeLimitMinutes} min. ` +
        `First to solve wins. Accept here: ${duelUrl(duel.code)}`
    )
}

export function whatsappShareUrl(message: string) {
    return `https://wa.me/?text=${encodeURIComponent(message)}`
}

/** Milliseconds to add to Date.now() to approximate the server clock. */
export function serverClockOffset(duel: ContestRoom | undefined) {
    const server = parseUtcDate(duel?.serverNow)
    return server ? server - Date.now() : 0
}

export type DuelOutcome = 'won' | 'lost' | 'draw'

export function duelOutcome(duel: ContestRoom, myId: string | undefined): DuelOutcome {
    if (!duel.winnerId) return 'draw'
    return duel.winnerId === myId ? 'won' : 'lost'
}

export function duelOpponent(duel: ContestRoom, myId: string | undefined) {
    return duel.participants.find((p) => p.userId !== myId)
}

export function duelResultText(duel: ContestRoom, myId: string | undefined) {
    const outcome = duelOutcome(duel, myId)
    const opponentName = duelOpponent(duel, myId)?.name || 'Your opponent'
    switch (duel.finishReason) {
        case 'SOLVED':
            return outcome === 'won' ? 'You solved it first.' : `${opponentName} solved it first.`
        case 'FORFEIT':
            return outcome === 'won' ? `${opponentName} left the duel.` : 'You left the duel.'
        case 'DISQUALIFIED':
            return outcome === 'won'
                ? `${opponentName} broke the anti-cheat rules twice.`
                : 'You left the duel window twice.'
        case 'TIMEOUT':
        default:
            return 'Time ran out and nobody solved it.'
    }
}

/** Seconds from the start of the duel to its end, or null. */
export function duelElapsedSeconds(duel: ContestRoom) {
    const start = parseUtcDate(duel.startsAt)
    const end = parseUtcDate(duel.finishedAt)
    if (!start || !end) return null
    return Math.max(0, Math.round((end - start) / 1000))
}
