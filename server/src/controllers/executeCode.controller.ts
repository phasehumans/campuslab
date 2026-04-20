import type { Request, Response } from 'express'
import { z } from 'zod'
import { executeCodeAgainstTestcases } from '../libs/codeRunner.js'

const executeCodeSchema = z.object({
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

export const executeCode = async (req: Request, res: Response) => {
    const parsed = executeCodeSchema.safeParse(req.body)

    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            message: 'invalid input',
            details: parsed.error.flatten(),
        })
    }

    if (!req.user?.id) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized',
        })
    }

    try {
        const execution = await executeCodeAgainstTestcases(parsed.data)

        return res.status(200).json({
            success: true,
            message: 'Code executed successfully',
            execution: {
                language: execution.languageLabel,
                allPassed: execution.allPassed,
                results: execution.results,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}
