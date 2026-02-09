import { FastifyInstance } from "fastify";

import { StatusCodes } from "@/enum/StatusCode";
import { ErrorResponseSchema, ErrorResponse } from "@/types/error/ErrorResponse";
import { ConfigSchema, Config } from "@/types/api/config/Config";
import { ConfigController } from "@/controllers/config/ConfigController";

export default async function configRoutes( fastify: FastifyInstance ) {

    fastify.get<{ Reply: Config }>(
        "/",
        {
            preHandler: [fastify.authenticate, fastify.cache],
            schema: {
                response: {
                    [StatusCodes.OK]: ConfigSchema,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponseSchema
                }
            }
        },
        new ConfigController().find
    )

}