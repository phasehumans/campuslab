import { z } from 'zod'

export const testcaseSchema = z.object({
    input: z.string(),
    output: z.string(),
})

export const problemSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
    tags: z.array(z.string()).min(1),
    examples: z.array(
        z.object({
            title: z.string().optional(),
            input: z.string(),
            output: z.string(),
            explanation: z.string().optional(),
        })
    ),
    constraints: z.string().min(1),
    testcases: z.array(testcaseSchema).nonempty(),
    codesnippets: z.record(z.string(), z.string()),
    editorial: z.string().optional(),
    hints: z.string().optional(),
    referneceSolution: z.record(z.string(), z.string()),
})
