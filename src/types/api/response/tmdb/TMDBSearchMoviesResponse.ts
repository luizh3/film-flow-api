import { TMDBPaginationResponse } from './TMDBPaginationResponse';
import { TMDBMovieInformationResponse } from './TMDBMovieInformationResponse';

export interface TMDBSearchMoviesResponse extends TMDBPaginationResponse {
    results: TMDBMovieInformationResponse[]
}