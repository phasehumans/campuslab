import { describe, it, expect } from 'bun:test'
import { getPageNumbers } from './ProblemPagination'

describe('ProblemPagination Helper', () => {
    it('returns all page numbers when totalPages <= 7', () => {
        expect(getPageNumbers(1, 5)).toEqual([1, 2, 3, 4, 5])
        expect(getPageNumbers(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7])
    })

    it('formats pagination for start pages when totalPages > 7 (e.g. 10 pages for 250 problems / 25 per page)', () => {
        expect(getPageNumbers(1, 10)).toEqual([1, 2, 3, 4, 5, '...', 10])
        expect(getPageNumbers(4, 10)).toEqual([1, 2, 3, 4, 5, '...', 10])
    })

    it('formats pagination for end pages when totalPages > 7', () => {
        expect(getPageNumbers(7, 10)).toEqual([1, '...', 6, 7, 8, 9, 10])
        expect(getPageNumbers(10, 10)).toEqual([1, '...', 6, 7, 8, 9, 10])
    })

    it('formats pagination for middle pages with double ellipsis', () => {
        expect(getPageNumbers(5, 10)).toEqual([1, '...', 4, 5, 6, '...', 10])
    })
})
