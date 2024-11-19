import { PrismaClient } from "@prisma/client";
import { user, userCreate } from "../interfaces/user.interfaces";

const prisma = new PrismaClient()

export class userModelPrisma {
    async create(user: userCreate) {
        
    }

    async isValidationCreate(user: userCreate): Promise<boolean> {
        const isExitsUsername = await prisma.user.findUnique({ where: { username: user.username } })
        const isExistEmail = await prisma.user.findUnique({ where: { email: user.email } })
		return !!(isExitsUsername || isExistEmail)
    }
}