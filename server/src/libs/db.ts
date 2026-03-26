// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = globalThis as typeof globalThis & {
//     prisma?: PrismaClient
// }

// export const db =
//     globalForPrisma.prisma ??
//     new PrismaClient({
//         log: ['query', 'error', 'warn'],
//     })

// if (process.env.NODE_ENV !== 'production') {
//     globalForPrisma.prisma = db
// }


import { PrismaClient } from '../generated/prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
})

export const db = new PrismaClient({
    adapter,
})
