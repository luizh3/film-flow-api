import { FastifyInstance } from "fastify";

import { ConfigController } from "@/controllers/config/ConfigController";
import { StatusCodes } from "@/enum/StatusCode";
import { ErrorResponseSchema, ErrorResponse } from "@/types/error/ErrorResponse";
import { ConfigSchema, Config } from "@/types/api/config/Config";

export default async function configRoutes(
    fastify: FastifyInstance,
    options: { configController: ConfigController }
) {

    const { configController } = options;

    fastify.get<{ Reply: Config }>(
        "/",
        {
            preHandler: [fastify.authenticate, fastify.serverCache],
            schema: {
                response: {
                    [StatusCodes.OK]: ConfigSchema,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponseSchema
                }
            },
            config: {
                clientCache: {
                    privacy: 'private',
                }
            }
        },
        configController.find.bind(configController)
    )

}