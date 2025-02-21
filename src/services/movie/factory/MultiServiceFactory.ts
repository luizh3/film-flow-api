import { MovieProviderEnum } from "@/enum/MovieProviderEnum";
import { InternalErrorException } from "@/exceptions/InternalErrorException";

import { MultiProviderService } from "../MultiProviderService";
import { TMDBMultiProviderService } from "../tmdb/TMDBMultiProviderService";

export class MultiServiceFactory {

    public static create( tpProvider : MovieProviderEnum ) : MultiProviderService {

        switch( tpProvider ) {
            case MovieProviderEnum.TMDB:
                return new TMDBMultiProviderService();
            default:
                throw new InternalErrorException("Provider not found!");
        }

    }

}