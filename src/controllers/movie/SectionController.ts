import { FastifyReply, FastifyRequest } from "fastify";
import { SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { StatusCodes } from "@/enum/StatusCode";

import ApiConfig from "@/utils/ApiConfig"
import { SectionFilters } from "@/types/api/section/SectionFilters";
import { SectionServiceFactory } from "@/services/movie/factory/SectionServiceFactory";

export class SectionController {

    public findBySection = async( request : FastifyRequest, reply: FastifyReply ) => {

        const sectionFilters = request.query as SectionFilters;

        const sectionService = SectionServiceFactory.create( ApiConfig.getTpProvider() );

        const response : SearchMoviesResult = await sectionService.findBySection( sectionFilters )

        reply.status( StatusCodes.OK ).send( response )

    }

}