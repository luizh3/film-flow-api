import { SectionFilters } from "@/types/api/section/SectionFilters";
import { TMDBEndpoint } from "./TMDBEndpoint";
import { SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { ShowTypeEnum } from "@/enum/ShowTypeEnum";
import { QueryType } from "@/utils/FetchWrapper";
import { TMDBSearchMoviesMapper } from "@/mappers/api/tmdb/TMDBSearchMoviesMapper";
import { InternalErrorException } from "@/exceptions/InternalErrorException";
import { TMDBSearchMoviesResponse } from "@/types/api/response/tmdb/TMDBSearchMoviesResponse";

export class TMDBSectionEndpoint extends TMDBEndpoint {

    public async findTopRated(sectionFilters: SectionFilters): Promise<SearchMoviesResult> {

        const mediaType: ShowTypeEnum = sectionFilters.mediaType as ShowTypeEnum;

        var endpointByType = new Map([
            [ShowTypeEnum.MOVIE, "/movie/top_rated"],
            [ShowTypeEnum.TV, "/tv/top_rated"],
        ]);

        if (!endpointByType.has(mediaType)) {
            throw new InternalErrorException("Key not suported for this section type")
        }

        const baseURL: string = endpointByType.get(mediaType) as string;

        const querys: QueryType = {
            language: sectionFilters.language,
            page: sectionFilters.page
        }

        const endpointURL = this.httpClient.toURL(baseURL, querys);

        const response = await this.httpClient.get(endpointURL);

        const tmdbSearchMoviesResponse: TMDBSearchMoviesResponse = await response.json();

        return TMDBSearchMoviesMapper.toModel(tmdbSearchMoviesResponse, mediaType);

    }

    public async findPopular(sectionFilters: SectionFilters): Promise<SearchMoviesResult> {

        const mediaType: ShowTypeEnum = sectionFilters.mediaType as ShowTypeEnum;

        var endpointByType = new Map([
            [ShowTypeEnum.MOVIE, "/movie/popular"],
            [ShowTypeEnum.TV, "/tv/popular"],
        ]);

        if (!endpointByType.has(mediaType)) {
            throw new InternalErrorException("Key not suported for this section type")
        }

        const baseURL: string = endpointByType.get(mediaType) as string;

        const querys: QueryType = {
            language: sectionFilters.language,
            page: sectionFilters.page
        }

        const endpointURL = this.httpClient.toURL(baseURL, querys);

        const response = await this.httpClient.get(endpointURL);

        const tmdbSearchMoviesResponse: TMDBSearchMoviesResponse = await response.json();

        return TMDBSearchMoviesMapper.toModel(tmdbSearchMoviesResponse, mediaType);

    }


    public async findOnTheAir(sectionFilters: SectionFilters): Promise<SearchMoviesResult> {

        const mediaType: ShowTypeEnum = sectionFilters.mediaType as ShowTypeEnum;

        if (mediaType !== ShowTypeEnum.TV) {
            throw new InternalErrorException("Key not suported for this section type")
        }

        const querys: QueryType = {
            language: sectionFilters.language,
            page: sectionFilters.page
        }

        const endpointURL = this.httpClient.toURL("/tv/on_the_air", querys);

        const response = await this.httpClient.get(endpointURL);

        const tmdbSearchMoviesResponse: TMDBSearchMoviesResponse = await response.json();

        return TMDBSearchMoviesMapper.toModel(tmdbSearchMoviesResponse, mediaType);

    }

}