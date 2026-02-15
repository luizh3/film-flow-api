import { SectionController } from "@/controllers/movie/SectionController";
import { StatusCodes } from "@/enum/StatusCode";
import { SearchMoviesResultSchema, SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { SectionFiltersSchema, SectionFilters } from "@/types/api/section/SectionFilters";
import { ErrorResponseSchema } from "@/types/error/ErrorResponse";
import { FastifyInstance } from "fastify";

export default async function sectionRoutes(
    fastify: FastifyInstance,
    options: { sectionController: SectionController }
) {

    const { sectionController } = options;

    fastify.get<{ Querystring: SectionFilters, Reply: SearchMoviesResult }>(
        "/",
        {
            preHandler: [fastify.authenticate, fastify.serverCache],
            schema: {
                querystring: SectionFiltersSchema,
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
        sectionController.findBySection.bind(sectionController)
    )

}