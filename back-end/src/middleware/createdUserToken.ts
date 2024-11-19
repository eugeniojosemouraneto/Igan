import { FastifyReply, FastifyRequest } from "fastify"
import jwt from 'jsonwebtoken'

// interfaces
import { userToken } from "../interfaces/token.interfaces"

export function createUserToken(
    user: userToken,
    request: FastifyRequest,
    reply: FastifyReply
) {
    const token = jwt.sign({
        username : user.username,
        name     : user.name,
        email    : user.email
    }, "pi3.14159265359")
    return reply
        .status(200)
        .send({
            status: 200,
            message: `User [${user.username}] with token`,
            token: token
        })
}