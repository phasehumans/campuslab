export type SeedExample = {
    title?: string
    input: string
    output: string
    explanation?: string
}

export type SeedTestcase = {
    input: string
    output: string
}

export type SeedProblem = {
    title: string
    description: string
    difficulty: 'EASY' | 'MEDIUM' | 'HARD'
    tags: string[]
    constraints: string
    hints?: string
    editorial?: string
    examples: SeedExample[]
    testcases: SeedTestcase[]
    codesnippets: {
        cpp: string
        python: string
        java: string
        rust: string
    }
    referneceSolution: {
        cpp: string
        python: string
        java: string
        rust: string
    }
}
