import { FastifyInstance } from "fastify";

export default function generalConfig(fastify: FastifyInstance) {

    const isDev = process.env.NODE_ENV === 'development'

    if (!isDev) {
        return;
    }

    const delay = Number(process.env.API_DELAY ?? 0)

    fastify.addHook('onRequest', async () => {
        await new Promise(r => setTimeout(r, delay))
    })
}