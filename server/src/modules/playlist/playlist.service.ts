import { db } from '../../config/db.js'

export const getAllPlaylistsByUserId = async (userId: string) => {
    return db.playlist.findMany({
        where: { userId },
        include: {
            problems: {
                include: {
                    problem: true,
                },
            },
        },
    })
}

export const getPlaylistByIdAndUserId = async (playlistId: string, userId: string) => {
    return db.playlist.findFirst({
        where: { id: playlistId, userId },
        include: {
            problems: {
                include: {
                    problem: true,
                },
            },
        },
    })
}

export const createPlaylist = async (data: { name: string; description?: string; userId: string }) => {
    return db.playlist.create({
        data,
    })
}

export const addProblemsToPlaylist = async (playListId: string, problemIds: string[]) => {
    return db.problemPlaylist.createMany({
        data: problemIds.map((problemId) => ({
            playListId,
            problemId,
        })),
        skipDuplicates: true,
    })
}

export const deletePlaylist = async (playlistId: string) => {
    return db.playlist.delete({
        where: { id: playlistId },
    })
}

export const removeProblemsFromPlaylist = async (playListId: string, problemIds: string[]) => {
    return db.problemPlaylist.deleteMany({
        where: {
            playListId,
            problemId: {
                in: problemIds,
            },
        },
    })
}
