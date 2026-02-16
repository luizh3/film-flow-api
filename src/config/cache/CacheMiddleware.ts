import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { cache } from "./Cache";
import { StatusCodes } from "@/enum/StatusCode";
import crypto from "crypto";
import { logger } from "@/utils/Logger";

export default function cacheMiddleware(fastify: FastifyInstance) {

    fastify.decorateReply('useCache', false)

    function clientCacheAdjust(request: FastifyRequest, reply: FastifyReply, payload: string, done: any) {

        if (!reply.routeOptions.config?.clientCache) {
            return false
        }

        const expiresIn = reply.routeOptions.config?.clientCache.expiresIn ?? (process.env.CACHE_DEFAULT_EXPIRES_IN ? parseInt(process.env.CACHE_DEFAULT_EXPIRES_IN) : 3600);

        const hasExpiresTime = expiresIn > 0;

        const body = typeof payload === 'string'
            ? payload
            : JSON.stringify(payload)

        const eTag = crypto
            .createHash('sha1')
            .update(body)
            .digest('hex')

        reply.header('ETag', eTag)
        reply.header(
            'Cache-Control', hasExpiresTime ? `private, max-age=${expiresIn}` : 'private, no-cache'
        )

        logger.info(`ETag: ${eTag}, "If-None-Match: ${request.headers['if-none-match']}, Cache-Control: ${reply.getHeader('Cache-Control')}`)

        const ifNoneMatch = request.headers['if-none-match']

        if (ifNoneMatch === eTag) {
            logger.info('Cache hit: Itens are the same, returning 304 Not Modified')
            reply.status(StatusCodes.NOT_MODIFIED)
            done();
            return true
        }

        return false;

    }

    fastify.addHook('onSend', (request: FastifyRequest, reply: FastifyReply, payload: string, done) => {

        const isSendResult: boolean = clientCacheAdjust(request, reply, payload, done);

        if (isSendResult) {
            return;
        }

        console.log(`Payload: ${payload}`)

        const isSuccessStatus = reply.statusCode === StatusCodes.OK;

        if (!reply.useCache || !isSuccessStatus) {
            done();
            return;
        }

        cache.set(request.originalUrl, JSON.stringify(payload))

        done(null, payload)

    });

    fastify.decorate(
        "serverCache",
        async (request: FastifyRequest, reply: FastifyReply) => {

            const data = await cache.get(request.originalUrl);

            if (!data) {
                reply.useCache = true;
                return;
            }

            return reply.status(StatusCodes.OK).send(JSON.parse(data));
        }
    )
}