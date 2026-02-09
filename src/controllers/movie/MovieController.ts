import { MovieServiceFactory } from "@/services/movie/factory/MovieServiceFactory";
import { MultiSearchFilter } from "@/types/api/MultiSearchFilter";
import { FastifyReply, FastifyRequest } from "fastify";
import { SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { StatusCodes } from "@/enum/StatusCode";

import ApiConfig from "@/utils/ApiConfig"

export class MovieController {

    public findByFilters = async( request : FastifyRequest, reply: FastifyReply ) => {

        const filters = request.query as MultiSearchFilter;

        const movieService = MovieServiceFactory.create( ApiConfig.getTpProvider() );

        const response : SearchMoviesResult = await movieService.findByFilters( filters );

        reply.status( StatusCodes.OK ).send( response )

    }

}