import { TMDBEndpoint } from "./TMDBEndpoint";
import { QueryType } from "@/utils/FetchWrapper";
import { GenresResult } from "@/types/api/genre/GenresResult";

export class TMDBGenreEndpoint extends TMDBEndpoint {

    async findMovieList(): Promise<GenresResult> {

        const filters: QueryType = {
            language: "en-US"
        }

        const endpointURL = this.httpClient.toURL("/genre/movie/list", filters);

        const response = await this.httpClient.get(endpointURL);

        const genres = await response.json() as GenresResult;

        return genres;

    }

    async findTVList(): Promise<GenresResult> {

        const filters: QueryType = {
            language: "en-US"
        }

        const endpointURL = this.httpClient.toURL("/genre/tv/list", filters);

        const response = await this.httpClient.get(endpointURL);

        const genres = await response.json() as GenresResult;

        return genres;

    }

}