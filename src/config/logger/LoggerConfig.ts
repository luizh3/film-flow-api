import { FastifyInstance } from "fastify";
import { logger } from "@/utils/Logger";

export default function logerConfig( fastify : FastifyInstance ) {

    logger.init( fastify.log )
    
}