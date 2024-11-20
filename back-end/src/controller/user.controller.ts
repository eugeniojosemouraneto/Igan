// interfaces
import { type FastifyReply, type FastifyRequest } from "fastify"
import { z } from 'zod'
import bcrypt from "bcrypt"

// interfaces
import { dataLogin, userCreate } from "../interfaces/user.interfaces"

// models
import { userModelPrisma } from "../models/user.models"

// middleware
import { createUserToken } from "../middleware/createdUserToken"
import { logEndPoint, ErrorEndPoint } from "../helpers/endPoint.helpers"

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
            return ErrorEndPoint(repliy, '/users/create', 'controller [ create ]', 500, "Username or email already registered in the database")
        }

        try {
            user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(12))
            const newUser = await repliy
                .status(201)
                .send(await this.userModel.create(user))
            logEndPoint('/users/create', 'controller [ create ]', 201, 'User registered successfully')
            await createUserToken(newUser, request, repliy)
        }
        catch(error) {
            return ErrorEndPoint(repliy, '/users/create', 'controller [ create ]', 500, "Error [ Internal server error ]", error)
        }
    }

    async login(
        request: FastifyRequest<{ Body: dataLogin }>,
        repliy: FastifyReply
    ) {
        const createTransactionBodySchema = z.object({
			email: z.string().email("Invalid email format."),
			password: z
				.string()
				.min(6, "Password must be at learst 6 characters.")
				.max(15, "Password can't execeed 15 characters."),
		})
        const dataReply: dataLogin = createTransactionBodySchema.parse(request.body, )
        const user = await this.userModel.getByEmail(dataReply.email)
        if(!user) { return ErrorEndPoint(repliy, '/users/login', 'controller [ login ]', 401, "User not found in database") }
        const isPasswordUser = await bcrypt.compare( dataReply.password, user.password )
        if(!isPasswordUser) { return ErrorEndPoint(repliy, '/users/login', 'controller [ login ]', 403, "The password provided is not compatible with the password of the user provided") }
        await createUserToken(user, request, repliy)
    }
} 