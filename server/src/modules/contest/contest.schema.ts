import { z } from 'zod'

export const createRoomSchema = z.object({
    maxParticipants: z.number().int().positive().nullable(),
    topics: z.array(z.string().min(1)).min(1),
    questionCount: z.number().int().min(1).max(10),
    timeLimitMinutes: z.number().int().min(5).max(180),
})
