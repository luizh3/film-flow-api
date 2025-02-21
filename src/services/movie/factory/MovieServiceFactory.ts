import { MovieProviderEnum } from "@/enum/MovieProviderEnum";
import { InternalErrorException } from "@/exceptions/InternalErrorException";

import { MovieProviderService } from "../MovieProviderService";
import { TMDBMovieProviderService } from "../tmdb/TMDBMovieProviderService";

export class MovieServiceFactory {

    public static create( tpProvider : MovieProviderEnum ) : MovieProviderService {

        switch( tpProvider ) {
            case MovieProviderEnum.TMDB:
                return new TMDBMovieProviderService();
            default:
                throw new InternalErrorException("Provider not found!");
        }

    }

}