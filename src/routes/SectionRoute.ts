import { SectionController } from "@/controllers/movie/SectionController";
import { StatusCodes } from "@/enum/StatusCode";
import { SearchMoviesResult, SearchMoviesResultType } from "@/types/api/SearchMoviesResultType";
import { SectionFilters, SectionFiltersType } from "@/types/api/section/SectionFiltersType";
import { ErrorResponse } from "@/types/error/ErrorResponseType";
import { FastifyInstance } from "fastify";

export default async function sectionRoutes( fastify : FastifyInstance ) {

    fastify.get<{Querystring: SectionFiltersType, Reply: SearchMoviesResultType}>(
        "/",
        {
            preHandler: [fastify.authenticate, fastify.cache],
            schema: {
                querystring: SectionFilters,
                response: {
                    [StatusCodes.OK]: SearchMoviesResult,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponse
                }
            }
        },
        new SectionController().findBySection
    ) 

}