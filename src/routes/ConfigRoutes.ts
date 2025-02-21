import { FastifyInstance } from "fastify";

import { StatusCodes } from "@/enum/StatusCode";
import { ErrorResponse } from "@/types/error/ErrorResponseType";
import { Config, ConfigType } from "@/types/api/config/ConfigType";
import { ConfigController } from "@/controllers/config/ConfigController";

export default async function configRoutes( fastify: FastifyInstance ) {

    fastify.get<{ Reply: ConfigType }>(
        "/",
        {
            preHandler: [fastify.authenticate, fastify.cache],
            schema: {
                response: {
                    [StatusCodes.OK]: Config,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponse
                }
            }
        },
        new ConfigController().find
    )

}