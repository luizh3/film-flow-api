import { MovieController } from "@/controllers/movie/MovieController";
import { StatusCodes } from "@/enum/StatusCode";
import { MultiSearchFilterSchema, MultiSearchFilter } from "@/types/api/MultiSearchFilter";
import { SearchMoviesResultSchema, SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { ErrorResponseSchema, ErrorResponse } from "@/types/error/ErrorResponse";
import { FastifyInstance } from "fastify";

export default async function movieRoutes(
    fastify: FastifyInstance,
    options: { movieController: MovieController }
) {

    const { movieController } = options;

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
        movieController.findByFilters.bind(movieController)
    )

}