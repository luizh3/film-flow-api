import { TVController } from "@/controllers/movie/TVController";
import { StatusCodes } from "@/enum/StatusCode";
import { MultiSearchFilterSchema, MultiSearchFilter } from "@/types/api/MultiSearchFilter";
import { SearchMoviesResultSchema, SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { ErrorResponseSchema } from "@/types/error/ErrorResponse";
import { FastifyInstance } from "fastify";

export default async function tvRoutes(
    fastify: FastifyInstance,
    options: { tvController: TVController }
) {

    const { tvController } = options;

    fastify.get<{ Querystring: MultiSearchFilter, Reply: SearchMoviesResult }>(
        "/filters",
        {
            preHandler: [fastify.authenticate, fastify.serverCache],
            schema: {
                querystring: MultiSearchFilterSchema,
                response: {
                    [StatusCodes.OK]: SearchMoviesResultSchema,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponseSchema
                }
            },
            config: {
                clientCache: {
                    privacy: 'private',
                }
            }
        },
        tvController.findByFilters.bind(tvController)
    )

}