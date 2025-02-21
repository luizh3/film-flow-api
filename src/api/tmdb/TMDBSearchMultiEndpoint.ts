import { QueryType } from "@/utils/FetchWrapper";
import { TMDBEndpoint } from "./TMDBEndpoint";
import { MultiFiltersParamsType } from "@/types/api/multi/MulitFiltersParamsType";
import { SearchMoviesResultType } from "@/types/api/SearchMoviesResultType";
import { TMDBSearchMoviesMapper } from "@/mappers/api/tmdb/TMDBSearchMoviesMapper";

export class TMDBSearchMultiEndpoint extends TMDBEndpoint {

    public async find( filters : MultiFiltersParamsType ) : Promise<SearchMoviesResultType> {

        const querys : QueryType = {
            query: filters.query,
            include_adult: filters.includeAdult,
            language: filters.language,
            page: filters.page
        };
        
        const endpointURL = this.httpClient.toURL( "/search/multi", querys );

        const response = await this.httpClient.get( endpointURL );

        const tmdbSearchMoviesResponse : TMDBSearchMoviesResponseType = await response.json();

        return TMDBSearchMoviesMapper.toModel( tmdbSearchMoviesResponse );

    }

}