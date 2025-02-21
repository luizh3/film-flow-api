import TMDBImageURLProvider from "@/images/tmdb/TMDBImageURLProvider";
import { MovieInformationType } from "@/types/api/MovieInformationType";

export class TMDBMovieInformationMapper {

    static toModel( response : TMDBMovieInformationResponseType ) : MovieInformationType {

        const { backdrop, poster } = TMDBImageURLProvider;

        return {
            average: response.vote_average ?? null,
            backdropUrl: response.backdrop_path ? `${backdrop.original}${response.backdrop_path}` : "",
            genres: response.genre_ids,
            title: response.title ?? response.name,
            overview: response.overview,
            posterUrl: response.poster_path ? `${poster.original}${response.poster_path}` : "",
            id: response.id.toString(),
            release: response.first_air_date
        }
    }

}