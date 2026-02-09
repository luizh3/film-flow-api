import { SectionController } from "@/controllers/movie/SectionController";
import { StatusCodes } from "@/enum/StatusCode";
import { SearchMoviesResultSchema, SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { SectionFiltersSchema, SectionFilters } from "@/types/api/section/SectionFilters";
import { ErrorResponseSchema, ErrorResponse } from "@/types/error/ErrorResponse";
import { FastifyInstance } from "fastify";

export default async function sectionRoutes(fastify: FastifyInstance) {

    fastify.get<{ Querystring: SectionFilters, Reply: SearchMoviesResult }>(
        "/",
        {
            preHandler: [fastify.authenticate, fastify.cache],
            schema: {
                querystring: SectionFiltersSchema,
                response: {
                    [StatusCodes.OK]: SearchMoviesResultSchema,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponseSchema
                }
            }
        },
        new SectionController().findBySection
    )

}