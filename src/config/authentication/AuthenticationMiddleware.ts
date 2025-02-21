import { StatusCodes } from "@/enum/StatusCode";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fjwt, { FastifyJWT } from '@fastify/jwt'

export default function authenticationMiddleware( fastify : FastifyInstance ) {

    fastify.addHook('preHandler', ( request, reply, next) => {
        request.jwt = fastify.jwt
        return next()
    })

    // TODO change for .env
    fastify.register( fjwt, { secret: 'BATATINHA@123' })

    fastify.decorate(
      'authenticate',
      async ( request: FastifyRequest, reply: FastifyReply) => {

        const token = request.headers.authorization
    
        if ( !token ) {
          return reply.status( StatusCodes.UNAUTHORIZED ).send( { message: 'Authentication required' } )
        }
    
        const userData = request.jwt.verify<FastifyJWT['user']>(token)
    
        request.user = userData

      },
    )

}