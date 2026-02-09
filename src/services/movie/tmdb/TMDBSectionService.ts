import { SectionFilters } from "@/types/api/section/SectionFilters";
import { SectionService } from "../SectionService";
import { SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { SectionTypeEnum } from "@/enum/SectionTypeEnum";
import { TMDBSectionEndpoint } from "@/api/tmdb/TMDBSectionEndpoint";

export class TMDBSectionService extends SectionService {

    async findBySection( sectionFilters : SectionFilters ) : Promise<SearchMoviesResult> {

        const endpoint = new TMDBSectionEndpoint();

        const keyType = sectionFilters.key as SectionTypeEnum;

        switch( keyType ) {
            case SectionTypeEnum.TOP_RATED:
                return endpoint.findTopRated( sectionFilters );
            case SectionTypeEnum.ON_THE_AIR:
                return endpoint.findOnTheAir( sectionFilters );
            case SectionTypeEnum.POPULAR:
                return endpoint.findPopular( sectionFilters );
        }

    }

}