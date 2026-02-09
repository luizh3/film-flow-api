import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { notificationsWebsocket } from "./websockets/NotificationsWebsocket";

export async function websocketsRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.register(notificationsWebsocket)

}