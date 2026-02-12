import { StatusCodes } from "@/enum/StatusCode";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fjwt, { FastifyJWT } from '@fastify/jwt'

export default function authenticationMiddleware(fastify: FastifyInstance) {

  fastify.addHook('preHandler', (request, reply, next) => {
    request.jwt = fastify.jwt
    return next()
  })

  const secret = process.env.JWT_SECRET || 'BATATINHA@123';
  fastify.register(fjwt, { secret })

  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {

      var token = request.headers.authorization

      if (!token) {
        return reply.status(StatusCodes.UNAUTHORIZED).send({ message: 'Authentication required' })
      }

      token = token.startsWith('Bearer ')
        ? token.slice(7)
        : token

      const userData = request.jwt.verify<FastifyJWT['user']>(token)

      request.user = userData

    },
  )

}