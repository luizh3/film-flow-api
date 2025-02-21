import { MovieProviderEnum } from "@/enum/MovieProviderEnum";
import { InternalErrorException } from "@/exceptions/InternalErrorException";

import { GenreProviderService } from "../GenreProviderService";
import { TMDBGenreProviderService } from "../tmdb/TMDBGenreProviderService";

export class GenreServiceFactory {

    public static create( tpProvider : MovieProviderEnum ) : GenreProviderService {

        switch( tpProvider ) {
            case MovieProviderEnum.TMDB:
                return new TMDBGenreProviderService();
            default:
                throw new InternalErrorException("Provider not found!");
        }

    }

}