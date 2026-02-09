import TMDBImageURLProvider from "@/images/tmdb/TMDBImageURLProvider";
import { MovieInformation } from "@/types/api/MovieInformation";
import { ShowTypeEnum } from "@/enum/ShowTypeEnum";
import { TMDBMovieInformationResponse } from "@/types/api/response/tmdb/TMDBMovieInformationResponse";

export class TMDBMovieInformationMapper {

    static toModel(response: TMDBMovieInformationResponse, defaultShowType: ShowTypeEnum = ShowTypeEnum.UNKNOW): MovieInformation {

        const { backdrop, poster } = TMDBImageURLProvider;

        return {
            average: response.vote_average ?? null,
            backdropUrl: response.backdrop_path ? `${backdrop.original}${response.backdrop_path}` : "",
            genres: response.genres,
            title: response.title ?? response.name,
            overview: response.overview,
            posterUrl: response.poster_path ? `${poster.original}${response.poster_path}` : "",
            id: response.id.toString(),
            release: response.first_air_date,
            mediaType: response?.media_type?.toUpperCase() ?? defaultShowType
        }
    }

}