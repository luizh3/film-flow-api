import { QueryType } from "@/utils/FetchWrapper";
import { TMDBEndpoint } from "./TMDBEndpoint";
import { MultiFiltersParams } from "@/types/api/multi/MultiFiltersParams";
import { SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { TMDBSearchMoviesMapper } from "@/mappers/api/tmdb/TMDBSearchMoviesMapper";
import { TMDBMovieInformationMapper } from "@/mappers/api/tmdb/TMDBMovieInformationMapper";
import { MovieInformation } from "@/types/api/MovieInformation";
import { ShowTypeEnum } from "@/enum/ShowTypeEnum";
import { InternalErrorException } from "@/exceptions/InternalErrorException";
import { TMDBSearchMoviesResponse } from "@/types/api/response/tmdb/TMDBSearchMoviesResponse";
import { TMDBMovieInformationResponse } from "@/types/api/response/tmdb/TMDBMovieInformationResponse";

export class TMDBSearchMultiEndpoint extends TMDBEndpoint {

    public async find(filters: MultiFiltersParams): Promise<SearchMoviesResult> {

        const querys: QueryType = {
            query: filters.query,
            include_adult: filters.includeAdult,
            language: filters.language,
            page: filters.page
        };

        const endpointURL = this.httpClient.toURL("/search/multi", querys);

        const response = await this.httpClient.get(endpointURL);

        const tmdbSearchMoviesResponse: TMDBSearchMoviesResponse = await response.json();

        return TMDBSearchMoviesMapper.toModel(tmdbSearchMoviesResponse);

    }

    public async findById(id: number, filters: MultiFiltersParams): Promise<MovieInformation> {

        const querys: QueryType = {
            language: filters.language,
        };

        var endpointByType = new Map([
            [ShowTypeEnum.MOVIE, `/movie/${id}`],
            [ShowTypeEnum.TV, `/tv/${id}`],
        ]);

        const type: ShowTypeEnum = filters.mediaType as ShowTypeEnum;

        if (!endpointByType.has(type)) {
            throw new InternalErrorException("Type of media not suported")
        }

        const baseURL: string = endpointByType.get(type) as string;

        const endpointURL = this.httpClient.toURL(baseURL, querys);

        const response = await this.httpClient.get(endpointURL);

        const tmdbSearchMoviesResponse: TMDBMovieInformationResponse = await response.json();

        return TMDBMovieInformationMapper.toModel(tmdbSearchMoviesResponse, type);

    }

}