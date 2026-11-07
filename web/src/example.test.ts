import { describe, it, expect } from 'bun:test'
import { cn } from './lib/utils'

describe('Web Utilities', () => {
    it('cn helper combines class names properly', () => {
        const isHidden = false
        expect(cn('px-2', 'py-1')).toBe('px-2 py-1')
        expect(cn('p-2', isHidden && 'hidden', 'p-4')).toBe('p-4')
    })
})
