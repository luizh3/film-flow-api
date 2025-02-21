import { MovieServiceFactory } from "@/services/movie/factory/MovieServiceFactory";
import { MultiSearchFilterType } from "@/types/api/MultiSearchFilterType";
import { FastifyReply, FastifyRequest } from "fastify";
import { SearchMoviesResultType } from "@/types/api/SearchMoviesResultType";
import { StatusCodes } from "@/enum/StatusCode";

import ApiConfig from "@/utils/ApiConfig"

export class MovieController {

    public findByFilters = async( request : FastifyRequest, reply: FastifyReply ) => {

        const filters = request.query as MultiSearchFilterType;

        const movieService = MovieServiceFactory.create( ApiConfig.getTpProvider() );

        const response : SearchMoviesResultType = await movieService.findByFilters( filters );

        reply.status( StatusCodes.OK ).send( response )

    }

}