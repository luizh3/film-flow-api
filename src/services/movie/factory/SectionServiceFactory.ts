import { MovieProviderEnum } from "@/enum/MovieProviderEnum";
import { InternalErrorException } from "@/exceptions/InternalErrorException";

import { TMDBSectionService } from "../tmdb/TMDBSectionService";
import { SectionService } from "../SectionService";

export class SectionServiceFactory {

    public static create( tpProvider : MovieProviderEnum ) : SectionService {

        switch( tpProvider ) {
            case MovieProviderEnum.TMDB:
                return new TMDBSectionService();
            default:
                throw new InternalErrorException("Provider not found!");
        }

    }

}