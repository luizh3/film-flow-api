import { SearchMoviesResultType } from "@/types/api/SearchMoviesResultType";
import { TMDBEndpoint } from "./TMDBEndpoint";
import { MultiSearchFilterType } from "@/types/api/MultiSearchFilterType";
import { QueryType } from "@/utils/FetchWrapper";
import { TMDBSearchMoviesMapper } from "@/mappers/api/tmdb/TMDBSearchMoviesMapper";

export class TMDBTVEndpoint extends TMDBEndpoint {

    async findByFilters( filters : MultiSearchFilterType ) : Promise<SearchMoviesResultType> {

        const querys : QueryType = {
            language: filters.language,
            page: filters.page,
            with_genres: filters.genres
        };
        
        const endpointURL = this.httpClient.toURL( "/discover/tv", querys );

        const response = await this.httpClient.get( endpointURL );

        const tmdbSearchMoviesResponse : TMDBSearchMoviesResponseType = await response.json();

        return TMDBSearchMoviesMapper.toModel( tmdbSearchMoviesResponse );

    }

}