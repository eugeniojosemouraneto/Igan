import { FastifyInstance } from "fastify";

// interfaces
import { userCreate } from '../interfaces/user.interfaces'

// controller
import { userController } from "../controller/user.controller"

export async function userRoutes(fastify: FastifyInstance) {
    
    const controller = new userController()
    
    fastify.post<{ Body: userCreate }>('/', async (request, reply) => {
        const {username, name, email} = request.body
        try {
            const data = controller.create({ username, name, email })
            return reply.send(data)
        }
        catch(error) {
            reply.send(error)
        }
    })

    fastify.get('/', (request, reply) => {
        return reply.send("hello word!!!")
    })
}