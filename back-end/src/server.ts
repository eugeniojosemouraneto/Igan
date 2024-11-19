import fastify, { FastifyRequest } from 'fastify'

// routes
import { userRoutes } from './routers/user.router'

const app = fastify()

app.register(userRoutes, { prefix: "/users" })

app.listen({
    port: 3333,
})
.then(() => {
    console.log('HTTP Server running on port [3333]!')
})