import { SearchMoviesResultType } from "@/types/api/SearchMoviesResultType";
import { TMDBMovieInformationMapper } from "./TMDBMovieInformationMapper";

export class TMDBSearchMoviesMapper {

    static toModel( response : TMDBSearchMoviesResponseType ) : SearchMoviesResultType {
        return {
            page: response.page,
            totalPage: response.total_pages,
            totalResults: response.total_results,
            movies: response.results.map( ( movie ) => {
                return TMDBMovieInformationMapper.toModel( movie )
            })
        }
    }

}