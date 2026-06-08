import type { Request, Response } from 'express'
import { createPlaylistSchema, problemIdsSchema } from './playlist.schema.js'
import { readParam } from './playlist.utils.js'
import * as playlistService from './playlist.service.js'

export const getAllPlaylist = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'unauthorized',
            })
        }

        const playlists = await playlistService.getAllPlaylistsByUserId(userId)

        return res.status(200).json({
            success: true,
            message: 'playlist fetched',
            playlists,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const getPlayListDetails = async (req: Request, res: Response) => {
    const playlistId = readParam(req.params.playlistId)

    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'unauthorized',
            })
        }

        const playlist = await playlistService.getPlaylistByIdAndUserId(playlistId, userId)

        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: 'playlist not found',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'playlist fetched',
            playlist,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const createPlayList = async (req: Request, res: Response) => {
    const parseData = createPlaylistSchema.safeParse(req.body)

    if (!parseData.success) {
        return res.status(400).json({
            success: false,
            message: 'invalid inputs',
            errors: parseData.error.flatten(),
        })
    }

    const { name, description } = parseData.data
    const userId = req.user?.id
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized',
        })
    }

    try {
        const playlist = await playlistService.createPlaylist({
            name,
            description,
            userId,
        })

        return res.status(201).json({
            success: true,
            message: 'playlist created',
            playlist,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const addProblemToPlayList = async (req: Request, res: Response) => {
    const playlistId = readParam(req.params.playlistId)
    const parsedBody = problemIdsSchema.safeParse(req.body)

    if (!parsedBody.success) {
        return res.status(400).json({
            success: false,
            message: 'invalid or missing problemIds',
            errors: parsedBody.error.flatten(),
        })
    }

    const problemIds = parsedBody.data

    try {
        const problemInPlaylist = await playlistService.addProblemsToPlaylist(playlistId, problemIds)

        return res.status(200).json({
            success: true,
            message: 'problem added in playlist',
            problemInPlaylist,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const deletePlayList = async (req: Request, res: Response) => {
    const playlistId = readParam(req.params.playlistId)
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'unauthorized',
            })
        }

        const playlist = await playlistService.getPlaylistByIdAndUserId(playlistId, userId)

        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: 'playlist not found',
            })
        }

        const deletedPlaylist = await playlistService.deletePlaylist(playlistId)

        return res.status(200).json({
            success: true,
            message: 'playlist deleted',
            deletedPlaylist,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const removeProblemFromPlayList = async (req: Request, res: Response) => {
    const playlistId = readParam(req.params.playlistId)
    const parsedBody = problemIdsSchema.safeParse(req.body)

    if (!parsedBody.success) {
        return res.status(400).json({
            success: false,
            message: 'invalid or missing problemIds',
            errors: parsedBody.error.flatten(),
        })
    }

    const problemIds = parsedBody.data

    try {
        const deletedProblems = await playlistService.removeProblemsFromPlaylist(playlistId, problemIds)

        return res.status(200).json({
            success: true,
            message: 'deleted from playlist',
            deletedProblems,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}
