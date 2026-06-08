import bcrypt from 'bcrypt'
import { db } from '../config/db.js'

const SYSTEM_PRN = '000000000'
const SYSTEM_PASSWORD = 'campuslab-seed-admin'

export const ensureSeedData = async () => {
    const userCount = await db.user.count()
    const password = userCount === 0 ? await bcrypt.hash(SYSTEM_PASSWORD, 10) : undefined

    await db.user.upsert({
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
}
