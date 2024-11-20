import { FastifyReply, FastifyRequest } from "fastify"
import jwt from 'jsonwebtoken'

// interfaces
import { userToken } from "../interfaces/token.interfaces"
import { user } from '../interfaces/user.interfaces'
import { logEndPoint } from "../helpers/endPoint.helpers"

export function createUserToken(
    user: userToken | user,
    request: FastifyRequest,
    reply: FastifyReply
) {
    const token = jwt.sign({
        username : user.username,
        name     : user.name,
        email    : user.email
    }, "pi3.14159265359")
    logEndPoint('middleware', 'middleware', 200, '`User [${user.username}] with token`')
    return reply
        .status(200)
        .send({
            status: 200,
            message: `User [${user.username}] with token`,
            token: token
        })
}