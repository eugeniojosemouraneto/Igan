// interfaces
import { type FastifyReply, type FastifyRequest } from "fastify"
import { z } from 'zod'
import bcrypt from "bcrypt"

// interfaces
import { userCreate } from "../interfaces/user.interfaces"

// models
import { userModelPrisma } from "../models/user.models"
import { response } from "express"

// middleware
import { createUserToken } from "../middleware/createdUserToken"

export class userController {

    private userModel: userModelPrisma

    constructor() {
        this.userModel = new userModelPrisma()
    }

    async create(
        request: FastifyRequest<{ Body: userCreate }>,
        repliy: FastifyReply
    ){
        const createTransactionBodySchema = z.object({
            name: z
                .string()
                .min(6, "Username must be at learst 6 characters")
                .max(45, "Username can't execeed 45 characters"),
            username: z
                    .string()
                    .min(6, "Username must be at learst 6 characters")
                    .max(45, "Username can't execeed 45 characters"),
			email: z
                    .string()
                    .email("Invalid email format"),
			password: z
                    .string()
                    .min(6, "Password must be at learst 6 characters")
                    .max(15, "Password can't execeed 15 characters"),
        })
        const user: userCreate = createTransactionBodySchema.parse( request.body )
        if(await this.userModel.isValidationCreate(user)) {
            return repliy
                    .status(401)
                    .send({
                        error: 401,
                        menssage: "Username or email already registered in the database"
                    })
        }

        try {
            user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(12))
            const newUser = repliy
                                .status(201)
                                .send(await this.userModel.create(user))
            await createUserToken(await newUser, request, repliy)
        }
        catch(error) {
            return response
                        .status(500)
                        .send({
                            error: 500,
                            menssage: error
                        })
        }
    }
}