import { FastifyReply, FastifyRequest } from "fastify";
import { SearchMoviesResultType } from "@/types/api/SearchMoviesResultType";
import { StatusCodes } from "@/enum/StatusCode";

import ApiConfig from "@/utils/ApiConfig"
import { SectionFiltersType } from "@/types/api/section/SectionFiltersType";
import { SectionServiceFactory } from "@/services/movie/factory/SectionServiceFactory";

export class SectionController {

    public findBySection = async( request : FastifyRequest, reply: FastifyReply ) => {

        const sectionFilters = request.query as SectionFiltersType;

        const sectionService = SectionServiceFactory.create( ApiConfig.getTpProvider() );

        const response : SearchMoviesResultType = await sectionService.findBySection( sectionFilters )

        reply.status( StatusCodes.OK ).send( response )

    }

}