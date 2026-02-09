import { SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { TMDBEndpoint } from "./TMDBEndpoint";
import { MultiSearchFilter } from "@/types/api/MultiSearchFilter";
import { QueryType } from "@/utils/FetchWrapper";
import { TMDBSearchMoviesMapper } from "@/mappers/api/tmdb/TMDBSearchMoviesMapper";
import { TMDBSearchMoviesResponse } from "@/types/api/response/tmdb/TMDBSearchMoviesResponse";

export class TMDBTVEndpoint extends TMDBEndpoint {

    async findByFilters( filters : MultiSearchFilter ) : Promise<SearchMoviesResult> {

        const querys : QueryType = {
            language: filters.language,
            page: filters.page,
            with_genres: filters.genres
        };
        
        const endpointURL = this.httpClient.toURL( "/discover/tv", querys );

        const response = await this.httpClient.get( endpointURL );

        const tmdbSearchMoviesResponse : TMDBSearchMoviesResponse = await response.json();

        return TMDBSearchMoviesMapper.toModel( tmdbSearchMoviesResponse );

    }

}