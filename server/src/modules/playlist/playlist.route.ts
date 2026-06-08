import { Router } from 'express'
import { authMiddleware } from '../../middleware/auth.middleware.js'
import {
    addProblemToPlayList,
    createPlayList,
    deletePlayList,
    getAllPlaylist,
    getPlayListDetails,
    removeProblemFromPlayList,
} from './playlist.controller.js'

const playListRouter = Router()

playListRouter.get('/', authMiddleware, getAllPlaylist)
playListRouter.get('/:playlistId', authMiddleware, getPlayListDetails)
playListRouter.post('/create-playlist', authMiddleware, createPlayList)
playListRouter.post('/:playlistId/add-problem', authMiddleware, addProblemToPlayList)
playListRouter.delete('/:playlistId', authMiddleware, deletePlayList)
playListRouter.delete('/:playlistId/remove-problem', authMiddleware, removeProblemFromPlayList)

export default playListRouter
