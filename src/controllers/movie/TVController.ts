import { MultiSearchFilter } from "@/types/api/MultiSearchFilter";
import { FastifyReply, FastifyRequest } from "fastify";
import { SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { StatusCodes } from "@/enum/StatusCode";
import { TVServiceFactory } from "@/services/movie/factory/TVServiceFactory";

import ApiConfig from "@/utils/ApiConfig"

export class TVController {

    public findByFilters = async( request : FastifyRequest, reply: FastifyReply ) => {

        const filters = request.query as MultiSearchFilter;

        const tvService = TVServiceFactory.create( ApiConfig.getTpProvider() );

        const response : SearchMoviesResult = await tvService.findByFilters( filters );

        reply.status( StatusCodes.OK ).send( response )

    }

}