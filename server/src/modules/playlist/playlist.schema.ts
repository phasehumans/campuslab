import { z } from 'zod'

export const createPlaylistSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
})

export const problemIdsSchema = z.array(z.string().min(1)).nonempty()
