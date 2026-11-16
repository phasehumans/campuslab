import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Format elapsed seconds into human-readable duration (e.g. "4m 12s" or "42s").
 */
export function formatDuration(totalSeconds?: number | null): string {
    if (totalSeconds == null || totalSeconds < 0) return '—'
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    if (mins > 0) {
        return `${mins}m ${secs}s`
    }
    return `${secs}s`
}

/**
 * Safely parse a date string as UTC timestamp in milliseconds.
 * Works even when PostgreSQL returns strings without timezone offsets (e.g. "2026-11-08 11:45:00").
 */
export function parseUtcDate(dateStr?: string | null): number | null {
    if (!dateStr) return null
    const trimmed = dateStr.trim()
    if (!trimmed) return null
    const iso =
        trimmed.includes('Z') || trimmed.includes('+') ? trimmed : trimmed.replace(' ', 'T') + 'Z'
    const ms = new Date(iso).getTime()
    return isNaN(ms) ? null : ms
}

/**
 * Format timestamp into relative time string (e.g. "just now", "5m ago", "2h ago", "3d ago").
 * Safely parses UTC dates returned from PostgreSQL even without timezone suffixes.
 */
export function formatRelativeTime(dateString?: string | null): string {
    if (!dateString) return 'recently'
    try {
        const timeMs = parseUtcDate(dateString)
        if (!timeMs) return 'recently'
        const date = new Date(timeMs)
        const now = Date.now()
        const diffMs = Math.max(0, now - timeMs)
        const diffSecs = Math.floor(diffMs / 1000)
        const diffMins = Math.floor(diffSecs / 60)
        const diffHours = Math.floor(diffMins / 60)
        const diffDays = Math.floor(diffHours / 24)

        if (diffSecs < 60) return 'just now'
        if (diffMins < 60) return `${diffMins}m ago`
        if (diffHours < 24) return `${diffHours}h ago`
        if (diffDays < 7) return `${diffDays}d ago`
        return date.toLocaleDateString()
    } catch {
        return 'recently'
    }
}

const POST_LOGIN_REDIRECT_KEY = 'post_login_redirect'

/** Remember the current page so OAuth can bring the user back to it (e.g. a duel invite). */
export function rememberPostLoginRedirect(): void {
    try {
        const path = window.location.pathname + window.location.search
        if (path !== '/' && !path.startsWith('/auth')) {
            sessionStorage.setItem(POST_LOGIN_REDIRECT_KEY, path)
        } else {
            sessionStorage.removeItem(POST_LOGIN_REDIRECT_KEY)
        }
    } catch {
        // storage unavailable: fall back to the home page
    }
}

/** Read and clear the remembered page. Only same-origin relative paths are accepted. */
export function consumePostLoginRedirect(): string {
    try {
        const path = sessionStorage.getItem(POST_LOGIN_REDIRECT_KEY)
        sessionStorage.removeItem(POST_LOGIN_REDIRECT_KEY)
        if (path && path.startsWith('/') && !path.startsWith('//') && !path.startsWith('/auth')) {
            return path
        }
    } catch {
        // ignore
    }
    return '/'
}
