import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { cache } from "./Cache";
import { StatusCodes } from "@/enum/StatusCode";

export default function cacheMiddleware ( fastify : FastifyInstance ) {

    fastify.decorateReply('useCache', false )

    fastify.addHook('onSend', ( request : FastifyRequest, reply: FastifyReply, payload : string, done ) => {

        const isSuccessStatus = reply.statusCode === StatusCodes.OK;

        if( !reply.useCache || !isSuccessStatus ) {
            done();
            return;
        }

        cache.set( request.originalUrl, JSON.stringify( payload ) )

        done( null, payload )

    });

    fastify.decorate( 
        "cache",
        async ( request : FastifyRequest, reply: FastifyReply ) => {

            const data = await cache.get( request.originalUrl );

            if( !data ) {
                reply.useCache = true;
                return;
            }

            return reply.status( StatusCodes.OK ).send( JSON.parse( data ) );
        }
    )
}