import { z } from 'zod'

export const executeCodeSchema = z.object({
    sourceCode: z.string().min(1),
    language: z.string().min(1),
    testcases: z
        .array(
            z.object({
                input: z.string(),
                output: z.string().optional(),
            })
        )
        .nonempty(),
})
