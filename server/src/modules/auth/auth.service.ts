import { db } from '../../config/db.js'
import { UserRole } from '../../generated/prisma/enums.js'
import { Prisma } from '../../generated/prisma/client.js'

export const findUserByPrn = async (prn: string) => {
    return db.user.findUnique({
        where: { prn },
    })
}

export const findUserById = async (id: string) => {
    return db.user.findUnique({
        where: { id },
    })
}

export const createUser = async (data: Prisma.UserCreateInput) => {
    return db.user.create({
        data: {
            ...data,
            role: data.role || UserRole.USER,
        },
    })
}
