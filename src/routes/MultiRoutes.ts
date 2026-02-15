import { FastifyInstance } from "fastify";

import { MultiController } from "@/controllers/movie/MultiController";
import { StatusCodes } from "@/enum/StatusCode";
import { MultiFiltersParamsSchema, MultiFiltersParams } from "@/types/api/multi/MultiFiltersParams";
import { SearchMoviesResultSchema, SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { ErrorResponseSchema } from "@/types/error/ErrorResponse";
import { MultiParamsSchema, MultiParams } from "@/types/api/multi/MultiParams";
import { MovieInformationSchema, MovieInformation } from "@/types/api/MovieInformation";
import { FindAllParamsRequestSchema, FindAllParamsRequest } from "@/types/review/FindAllParamsRequest";
import { FindAllReviewResponseSchema, FindAllReviewResponse } from "@/types/review/FindAllReviewResponse";

export default async function multiRoutes(
    fastify: FastifyInstance,
    options: { multiController: MultiController }
) {

    const { multiController } = options;

    fastify.get<{ Querystring: MultiFiltersParams, Reply: SearchMoviesResult }>(
        "/",
        {
            preHandler: [fastify.authenticate, fastify.serverCache],
            schema: {
                querystring: MultiFiltersParamsSchema,
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
        multiController.findByName.bind(multiController)
    )

    fastify.get<{ Params: MultiParams, Querystring: MultiFiltersParams, Reply: MovieInformation }>(
        "/:id",
        {
            preHandler: [fastify.authenticate, fastify.serverCache],
            schema: {
                params: MultiParamsSchema,
                querystring: MultiFiltersParamsSchema,
                response: {
                    [StatusCodes.OK]: MovieInformationSchema,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponseSchema
                }
            },
            config: {
                clientCache: {
                    privacy: 'private',
                }
            }
        },
        multiController.findById.bind(multiController)
    )

    fastify.get<{ Params: MultiParams, Querystring: FindAllParamsRequest, Reply: FindAllReviewResponse }>(
        "/:id/reviews",
        {
            preHandler: [fastify.authenticate],
            schema: {
                params: MultiParamsSchema,
                querystring: FindAllParamsRequestSchema,
                response: {
                    [StatusCodes.OK]: FindAllReviewResponseSchema,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponseSchema
                }
            },
            config: {
                clientCache: {
                    privacy: 'private',
                }
            }
        },
        multiController.findAllReviewsByIdMovie.bind(multiController)
    )

}