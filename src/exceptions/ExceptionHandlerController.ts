import { ErrorResponseType } from "@/types/error/ErrorResponseType";
import { FastifyReply, FastifyRequest } from "fastify";
import { ApiExption } from "./ApiException";
import { logger } from "@/utils/Logger";
import { StatusCodes } from "@/enum/StatusCode";

export class ExceptionHandlingController {

    private toResponse = ( message : string, path : string ) : ErrorResponseType =>  {
        return {
            message: message,
            path: path,
            timestamp: Date.now().toString()
        }
    }

    private replyHandler = ( error : Error, request : FastifyRequest, reply: FastifyReply ) => {

        const response : ErrorResponseType = this.toResponse( error.message, request.url );
    
        if( error instanceof ApiExption ) {
            reply.status( error.statusCode ).send( response )
            return;
        }
    
        reply.status( StatusCodes.INTERNAL_SERVER_ERROR ).send( response )

    }

    public handle = (  error : Error, request : FastifyRequest, reply: FastifyReply ) => {

        logger.warn( error );

        this.replyHandler( error, request, reply );
    }
}