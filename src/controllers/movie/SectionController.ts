import { SectionService } from "@/services/movie/SectionService";
import { FastifyReply, FastifyRequest } from "fastify";
import { SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { StatusCodes } from "@/enum/StatusCode";
import { SectionFilters } from "@/types/api/section/SectionFilters";

export class SectionController {

    constructor(private readonly sectionService: SectionService) {}

    public findBySection = async( request : FastifyRequest, reply: FastifyReply ) => {

        const sectionFilters = request.query as SectionFilters;

        const response : SearchMoviesResult = await this.sectionService.findBySection( sectionFilters )

        reply.status( StatusCodes.OK ).send( response )

    }

}