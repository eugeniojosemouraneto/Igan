import { FastifyInstance } from "fastify";

// interfaces
import { userCreate } from '../interfaces/user.interfaces'

// controller
import { userController } from "../controller/user.controller"

export async function userRoutes(fastify: FastifyInstance) {
    
    const controller = new userController()
    
    fastify.post('/', controller.create.bind(controller))

    fastify.post('/', controller.login.bind(controller))
}