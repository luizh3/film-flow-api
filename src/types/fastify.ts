import { NotificationsManager } from '@/websockets/manager/NotificationsManager'
import { JWT } from '@fastify/jwt'

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
  }
  export interface FastifyInstance {
    authenticate: any,
    serverCache: any
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

declare module "fastify" {
  interface FastifyInstance {
    notificationsManager: NotificationsManager;
  }
}

declare module 'fastify' {
  interface FastifyContextConfig {
    clientCache?: {
      privacy?: 'public' | 'private'
      expiresIn?: number,
      hasEtag?: boolean
    }
  }
}