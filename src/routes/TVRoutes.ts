import { TVController } from "@/controllers/movie/TVController";
import { StatusCodes } from "@/enum/StatusCode";
import { MultiSearchFilter, MultiSearchFilterType } from "@/types/api/MultiSearchFilterType";
import { SearchMoviesResult, SearchMoviesResultType } from "@/types/api/SearchMoviesResultType";
import { ErrorResponse } from "@/types/error/ErrorResponseType";
import { FastifyInstance } from "fastify";

export default async function tvRoutes( fastify : FastifyInstance ) {

    fastify.get<{Querystring: MultiSearchFilterType, Reply: SearchMoviesResultType}>(
        "/filters",
        {
            preHandler: [fastify.authenticate, fastify.cache],
            schema: {
                querystring: MultiSearchFilter,
                response: {
                    [StatusCodes.OK]: SearchMoviesResult,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponse
                }
            }
        },
        new TVController().findByFilters
    ) 

}