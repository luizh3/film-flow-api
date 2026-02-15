import { TVProviderService } from "@/services/movie/TVProviderService";
import { MultiSearchFilter } from "@/types/api/MultiSearchFilter";
import { FastifyReply, FastifyRequest } from "fastify";
import { SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { StatusCodes } from "@/enum/StatusCode";

export class TVController {

    constructor(private readonly tvProviderService: TVProviderService) {}

    public findByFilters = async( request : FastifyRequest, reply: FastifyReply ) => {

        const filters = request.query as MultiSearchFilter;

        const response : SearchMoviesResult = await this.tvProviderService.findByFilters( filters );

        reply.status( StatusCodes.OK ).send( response )

    }

}