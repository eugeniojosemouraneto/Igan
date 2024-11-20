import { PrismaClient } from "@prisma/client";
import { dataLogin, user, userCreate } from "../interfaces/user.interfaces";
import { logEndPoint } from "../helpers/endPoint.helpers"

const prisma = new PrismaClient()

export class userModelPrisma {

    private prisma: any

    constructor() { this.prisma = new PrismaClient() }

    async create(user: userCreate) {
        try {
            return await prisma.user.create({
                data: {
                    username : user.username,
                    email    : user.email,
                    name     : user.name,
                    password : user.password   
                },
            })
        }
        catch(error) { 
            logEndPoint('/users', 'model', 500, error)
            throw new Error("User with this email or username already exists") 
        }
    }

    async getByEmail(dataEmail: string) {
        return await prisma.user.findUnique({ where: { email: dataEmail } })
    }

    async isValidationCreate(user: userCreate): Promise<boolean> {
        const isExitsUsername = await prisma.user.findUnique({ where: { username: user.username } })
        const isExistEmail = this.getByEmail(user.email)
		return !!(isExitsUsername || isExistEmail)
    }
}