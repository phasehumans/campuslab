import type { ContestRoom, DuelDifficulty } from './types'
import { parseUtcDate } from './utils'

const DUEL_DIFFICULTY_LABELS: Record<DuelDifficulty, string> = {
    EASY: 'Easy',
    MEDIUM: 'Medium',
    HARD: 'Hard',
    EASY_OR_MEDIUM: 'Easy or Medium',
    RANDOM: 'Random',
}

export function duelDifficultyLabel(d: DuelDifficulty | null | undefined) {
    return d ? DUEL_DIFFICULTY_LABELS[d] : 'Easy or Medium'
}

/** Shown when creating a duel and when a friend opens the challenge link */
export const DUEL_RULES = [
    'Fullscreen is required for the whole duel.',
    'Leaving the window once is a warning. Twice and you lose.',
    'Pasting into the editor is blocked.',
    "If time runs out and nobody solves it, it's a draw.",
]

export function duelUrl(code: string) {
    return `${window.location.origin}/duel/${code}`
}

/**
 * Milliseconds to add to Date.now() to approximate the server clock.
 * `receivedAt` is when the response carrying `serverNow` arrived (e.g. React Query's
 * dataUpdatedAt); measuring against render time instead would freeze the countdown.
 */
export function serverClockOffset(duel: ContestRoom | undefined, receivedAt: number) {
    const server = parseUtcDate(duel?.serverNow)
    return server && receivedAt ? server - receivedAt : 0
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
