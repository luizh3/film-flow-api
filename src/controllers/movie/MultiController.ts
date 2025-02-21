import { StatusCodes } from "@/enum/StatusCode";
import { MultiServiceFactory } from "@/services/movie/factory/MultiServiceFactory";
import { MultiFiltersParamsType } from "@/types/api/multi/MulitFiltersParamsType";
import { SearchMoviesResultType } from "@/types/api/SearchMoviesResultType";
import { FastifyReply, FastifyRequest } from "fastify";

import ApiConfig from "@/utils/ApiConfig"

export class MultiController {

    public findByName = async( request : FastifyRequest, reply : FastifyReply ) => {

        console.log( request.originalUrl )

        const filters = request.query as MultiFiltersParamsType;

        const multiService = MultiServiceFactory.create( ApiConfig.getTpProvider() );

        const response : SearchMoviesResultType = await multiService.findByName( filters );

        reply.status( StatusCodes.OK ).send( response )
    }

}