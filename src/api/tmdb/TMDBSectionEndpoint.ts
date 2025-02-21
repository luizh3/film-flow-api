import { SectionFiltersType } from "@/types/api/section/SectionFiltersType";
import { TMDBEndpoint } from "./TMDBEndpoint";
import { SearchMoviesResultType } from "@/types/api/SearchMoviesResultType";
import { ShowTypeEnum } from "@/enum/ShowTypeEnum";
import { QueryType } from "@/utils/FetchWrapper";
import { TMDBSearchMoviesMapper } from "@/mappers/api/tmdb/TMDBSearchMoviesMapper";
import { InternalErrorException } from "@/exceptions/InternalErrorException";

export class TMDBSectionEndpoint extends TMDBEndpoint {

    public async findTopRated( sectionFilters : SectionFiltersType ) : Promise<SearchMoviesResultType> {

        const type : ShowTypeEnum = sectionFilters.type as ShowTypeEnum; 

        var endpointByType = new Map([
            [ ShowTypeEnum.MOVIE, "/movie/top_rated"],
            [ ShowTypeEnum.TV, "/tv/top_rated"],
        ]);

        if( !endpointByType.has( type ) ) {
            throw new InternalErrorException( "Key not suported for this section type" )
        }

        const baseURL : string = endpointByType.get( type ) as string;

        const querys : QueryType = {
            language: sectionFilters.language,
            page: sectionFilters.page
        }

        const endpointURL = this.httpClient.toURL( baseURL, querys );

        const response = await this.httpClient.get( endpointURL );

        const tmdbSearchMoviesResponse : TMDBSearchMoviesResponseType = await response.json();

        return TMDBSearchMoviesMapper.toModel( tmdbSearchMoviesResponse );

    } 

    public async findPopular( sectionFilters : SectionFiltersType ) : Promise<SearchMoviesResultType> {

        const type : ShowTypeEnum = sectionFilters.type as ShowTypeEnum; 

        var endpointByType = new Map([
            [ ShowTypeEnum.MOVIE, "/movie/popular"],
            [ ShowTypeEnum.TV, "/tv/popular"],
        ]);

        if( !endpointByType.has( type ) ) {
            throw new InternalErrorException( "Key not suported for this section type" )
        }

        const baseURL : string = endpointByType.get( type ) as string;

        const querys : QueryType = {
            language: sectionFilters.language,
            page: sectionFilters.page
        }

        const endpointURL = this.httpClient.toURL( baseURL, querys );

        console.log( endpointURL );

        const response = await this.httpClient.get( endpointURL );

        const tmdbSearchMoviesResponse : TMDBSearchMoviesResponseType = await response.json();

        return TMDBSearchMoviesMapper.toModel( tmdbSearchMoviesResponse );

    } 

    
    public async findOnTheAir( sectionFilters : SectionFiltersType ) : Promise<SearchMoviesResultType> {

        const type : ShowTypeEnum = sectionFilters.type as ShowTypeEnum; 

        if( type !== ShowTypeEnum.TV ){
            throw new InternalErrorException("Key not suported for this section type")
        }

        const querys : QueryType = {
            language: sectionFilters.language,
            page: sectionFilters.page
        }

        const endpointURL = this.httpClient.toURL( "/tv/on_the_air", querys );

        const response = await this.httpClient.get( endpointURL );

        const tmdbSearchMoviesResponse : TMDBSearchMoviesResponseType = await response.json();

        return TMDBSearchMoviesMapper.toModel( tmdbSearchMoviesResponse );

    } 

}