import { SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { TMDBMovieInformationMapper } from "./TMDBMovieInformationMapper";
import { ShowTypeEnum } from "@/enum/ShowTypeEnum";
import { TMDBSearchMoviesResponse } from "@/types/api/response/tmdb/TMDBSearchMoviesResponse";

export class TMDBSearchMoviesMapper {

    static toModel(response: TMDBSearchMoviesResponse, defaultShowType: ShowTypeEnum = ShowTypeEnum.UNKNOW): SearchMoviesResult {
        return {
            page: response.page,
            totalPage: response.total_pages,
            totalResults: response.total_results,
            movies: response.results.map((movie) => {
                return TMDBMovieInformationMapper.toModel(movie, defaultShowType)
            })
        }
    }

}