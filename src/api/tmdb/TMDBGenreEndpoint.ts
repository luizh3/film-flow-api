import { TMDBEndpoint } from "./TMDBEndpoint";
import { QueryType } from "@/utils/FetchWrapper";
import { GenresResultType } from "@/types/api/genre/GenresResultType";

export class TMDBGenreEndpoint extends TMDBEndpoint {

    async findMovieList() : Promise<GenresResultType> {

        const filters : QueryType = {
            language: "en-US"
        }

        const endpointURL = this.httpClient.toURL( "/genre/movie/list", filters );

        const response = await this.httpClient.get( endpointURL );

        const genres = await response.json() as GenresResultType;

        return genres;

    }

    async findTVList() : Promise<GenresResultType> {

        const filters : QueryType = {
            language: "en-US"
        }

        const endpointURL = this.httpClient.toURL( "/genre/tv/list", filters );

        const response = await this.httpClient.get( endpointURL );

        const genres = await response.json() as GenresResultType;

        return genres;
        
    }

}