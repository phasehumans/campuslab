import { describe, it, expect } from 'bun:test'
import { cn, formatDuration, formatRelativeTime, parseUtcDate } from './utils'

describe('Web Utilities', () => {
    it('cn helper combines class names properly', () => {
        const isHidden = false
        expect(cn('px-2', 'py-1')).toBe('px-2 py-1')
        expect(cn('p-2', isHidden && 'hidden', 'p-4')).toBe('p-4')
    })

    it('formatDuration formats seconds into human readable duration', () => {
        expect(formatDuration(42)).toBe('42s')
        expect(formatDuration(60)).toBe('1m 0s')
        expect(formatDuration(252)).toBe('4m 12s')
        expect(formatDuration(3605)).toBe('60m 5s')
        expect(formatDuration(null)).toBe('—')
        expect(formatDuration(undefined)).toBe('—')
    })

    it('formatRelativeTime correctly formats recent PostgreSQL timestamps as just now', () => {
        const nowPg = new Date().toISOString().replace('T', ' ').replace('Z', '')
        expect(formatRelativeTime(nowPg)).toBe('just now')

        const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString().replace('T', ' ').replace('Z', '')
        expect(formatRelativeTime(fiveMinAgo)).toBe('5m ago')

        expect(formatRelativeTime(null)).toBe('recently')
        expect(formatRelativeTime('')).toBe('recently')
    })

    it('parseUtcDate safely parses raw PostgreSQL timestamps as UTC', () => {
        const rawPgTimestamp = '2026-11-08 12:00:00'
        const parsedMs = parseUtcDate(rawPgTimestamp)
        expect(parsedMs).not.toBeNull()
        expect(new Date(parsedMs!).toISOString()).toBe('2026-11-08T12:00:00.000Z')

        const isoTimestamp = '2026-11-08T12:00:00Z'
        expect(parseUtcDate(isoTimestamp)).toBe(parsedMs)

        expect(parseUtcDate(undefined)).toBeNull()
        expect(parseUtcDate(null)).toBeNull()
        expect(parseUtcDate('')).toBeNull()
    })
})
