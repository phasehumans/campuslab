import bcrypt from 'bcrypt'
import { db } from './db.js'
import { seedProblems } from '../data/seedProblems.js'

const SYSTEM_PRN = '000000000'
const SYSTEM_PASSWORD = 'campuslab-seed-admin'

export const ensureSeedData = async () => {
    const [userCount, problemCount] = await Promise.all([db.user.count(), db.problem.count()])

    if (problemCount > 0) {
        return
    }

    const password = userCount === 0 ? await bcrypt.hash(SYSTEM_PASSWORD, 10) : undefined

    const systemUser = await db.user.upsert({
        where: { prn: SYSTEM_PRN },
        update: {
            name: 'Campus Lab Seed',
            role: 'ADMIN',
            ...(password ? { password } : {}),
        },
        create: {
            prn: SYSTEM_PRN,
            name: 'Campus Lab Seed',
            password: password ?? (await bcrypt.hash(SYSTEM_PASSWORD, 10)),
            role: 'ADMIN',
        },
    })

    for (const problem of seedProblems) {
        await db.problem.create({
            data: {
                ...problem,
                difficulty: problem.difficulty as never,
                user: {
                    connect: {
                        id: systemUser.id,
                    },
                },
            },
        })
    }
}
