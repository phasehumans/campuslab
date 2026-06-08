export const readParam = (value: string | string[] | undefined): string =>
    Array.isArray(value) ? (value[0] ?? '') : (value ?? '')

export const difficultyLabels = {
    EASY: 'Easy',
    MEDIUM: 'Medium',
    HARD: 'Hard',
} as const

export const difficultyPoints = {
    EASY: 100,
    MEDIUM: 200,
    HARD: 300,
} as const

export const shuffle = <T>(items: T[]) => {
    const copy = [...items]

    for (let index = copy.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1))
        ;[copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]]
    }

    return copy
}
