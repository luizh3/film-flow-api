import { JWT } from '@fastify/jwt'

declare module 'fastify' {
    interface FastifyRequest {
      jwt: JWT
    }
    export interface FastifyInstance {
      authenticate: any,
      cache: any
    }
    interface FastifyReply {
      useCache: boolean
    }
  }

  type UserPayload = {
    id: string
  }

  declare module '@fastify/jwt' {
    interface FastifyJWT {
      user: UserPayload
    }
  }