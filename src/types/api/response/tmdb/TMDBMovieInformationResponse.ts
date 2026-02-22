export interface TMDBMovieInformationResponse {
    backdrop_path: string;
    id: number;
    title: string;
    name: string;
    overview: string;
    poster_path: string;
    genres: [];
    vote_average: number | null;
    first_air_date: string;
    media_type: string;
    release_date: string;
}