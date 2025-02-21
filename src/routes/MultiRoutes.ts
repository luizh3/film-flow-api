import { FastifyInstance } from "fastify";

import { MultiController } from "@/controllers/movie/MultiController";
import { StatusCodes } from "@/enum/StatusCode";
import { MultiFiltersParams, MultiFiltersParamsType } from "@/types/api/multi/MulitFiltersParamsType";
import { SearchMoviesResult, SearchMoviesResultType } from "@/types/api/SearchMoviesResultType";
import { ErrorResponse } from "@/types/error/ErrorResponseType";

export default async function multiRoutes( fastify: FastifyInstance ) {

    fastify.get<{ Querystring: MultiFiltersParamsType, Reply: SearchMoviesResultType }>(
        "/",
        {
            preHandler: [fastify.authenticate, fastify.cache],
            schema: {
                querystring: MultiFiltersParams,
                response: {
                    [StatusCodes.OK]: SearchMoviesResult,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponse
                }
            }
        },
        new MultiController().findByName
    )

}