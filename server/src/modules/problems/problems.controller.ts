import type { Request, Response } from 'express'
import { problemSchema } from './problems.schema.js'
import { readParam, serializeProblemSummary } from './problems.utils.js'
import * as problemService from './problems.service.js'
import type { Difficulty } from '../../generated/prisma/client.js'

export const createProblem = async (req: Request, res: Response) => {
    const parseData = problemSchema.safeParse(req.body)

    if (!parseData.success) {
        return res.status(400).json({
            success: false,
            message: 'input invalid',
            error: parseData.error.flatten(),
        })
    }

    if (req.user?.role !== 'ADMIN' || !req.user?.id) {
        return res.status(403).json({
            success: false,
            message: 'you are not allowed to create problem',
        })
    }

    const validation = await problemService.validateReferenceSolutions(
        parseData.data.testcases,
        parseData.data.referneceSolution
    )

    if ('message' in validation) {
        return res.status(400).json({
            success: false,
            message: validation.message,
        })
    }

    try {
        const newProblem = await problemService.createProblem({
            ...parseData.data,
            difficulty: parseData.data.difficulty as Difficulty,
            userId: req.user.id,
        })

        return res.status(201).json({
            success: true,
            message: 'Problem created successfully',
            problem: newProblem,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const getAllProblems = async (req: Request, res: Response) => {
    try {
        const [problems, meta] = await Promise.all([
            problemService.getAllProblems(),
            problemService.getUserProblemMeta(req.user?.id),
        ])

        return res.status(200).json({
            success: true,
            message: 'Problems fetched successfully',
            problems: problems.map((problem) => serializeProblemSummary(problem, meta)),
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const getProblemById = async (req: Request, res: Response) => {
    const id = readParam(req.params.id)

    try {
        const [problem, meta] = await Promise.all([
            problemService.getProblemById(id),
            problemService.getUserProblemMeta(req.user?.id),
        ])

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Problem fetched successfully',
            problem: {
                ...serializeProblemSummary(problem, meta),
                description: problem.description,
                constraints: problem.constraints,
                hints: problem.hints,
                editorial: problem.editorial,
                examples: problem.examples,
                testcases: problem.testcases,
                starterCodes: problem.codesnippets,
                referenceSolutions: problem.referneceSolution,
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

export const updateProblem = async (req: Request, res: Response) => {
    const parseData = problemSchema.safeParse(req.body)

    if (!parseData.success) {
        return res.status(400).json({
            success: false,
            message: 'invalid inputs',
            error: parseData.error.flatten(),
        })
    }

    const id = readParam(req.params.id)

    try {
        const problem = await problemService.getProblemById(id)

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found',
            })
        }

        const validation = await problemService.validateReferenceSolutions(
            parseData.data.testcases,
            parseData.data.referneceSolution
        )

        if ('message' in validation) {
            return res.status(400).json({
                success: false,
                message: validation.message,
            })
        }

        const updatedProblem = await problemService.updateProblem(id, {
            ...parseData.data,
            difficulty: parseData.data.difficulty as Difficulty,
        })

        return res.status(200).json({
            success: true,
            message: 'Problem updated successfully',
            problem: updatedProblem,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const deleteProblem = async (req: Request, res: Response) => {
    const id = readParam(req.params.id)

    try {
        const problem = await problemService.getProblemById(id)

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found',
            })
        }

        await problemService.deleteProblem(id)

        return res.status(200).json({
            success: true,
            message: 'Problem deleted successfully',
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const getSolvedProblems = async (req: Request, res: Response) => {
    const userId = req.user?.id

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized',
        })
    }

    try {
        const [problems, meta] = await Promise.all([
            problemService.getSolvedProblemsByUser(userId),
            problemService.getUserProblemMeta(userId),
        ])

        return res.status(200).json({
            success: true,
            message: 'Solved problems fetched successfully',
            problems: problems.map((problem) => serializeProblemSummary(problem, meta)),
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}
