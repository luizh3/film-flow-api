interface TMDBMovieInformationResponseType {
    backdrop_path: string;
    id: number;
    title: string;
    name: string;
    overview: string;
    poster_path: string;
    genre_ids: number[];
    vote_average: number | null;
    first_air_date: string;
}