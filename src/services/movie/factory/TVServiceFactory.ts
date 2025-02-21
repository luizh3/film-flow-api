import { MovieProviderEnum } from "@/enum/MovieProviderEnum";
import { InternalErrorException } from "@/exceptions/InternalErrorException";
import { TVProviderService } from "../TVProviderService";
import { TMDBTVProviderService } from "../tmdb/TMDBTVProviderService";

export class TVServiceFactory {

    public static create( tpProvider : MovieProviderEnum ) : TVProviderService {

        switch( tpProvider ) {
            case MovieProviderEnum.TMDB:
                return new TMDBTVProviderService();
            default:
                throw new InternalErrorException("Provider not found!");
        }

    }

}