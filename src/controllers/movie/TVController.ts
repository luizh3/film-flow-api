import { MultiSearchFilterType } from "@/types/api/MultiSearchFilterType";
import { FastifyReply, FastifyRequest } from "fastify";
import { SearchMoviesResultType } from "@/types/api/SearchMoviesResultType";
import { StatusCodes } from "@/enum/StatusCode";
import { TVServiceFactory } from "@/services/movie/factory/TVServiceFactory";

import ApiConfig from "@/utils/ApiConfig"

export class TVController {

    public findByFilters = async( request : FastifyRequest, reply: FastifyReply ) => {

        const filters = request.query as MultiSearchFilterType;

        const tvService = TVServiceFactory.create( ApiConfig.getTpProvider() );

        const response : SearchMoviesResultType = await tvService.findByFilters( filters );

        reply.status( StatusCodes.OK ).send( response )

    }

}