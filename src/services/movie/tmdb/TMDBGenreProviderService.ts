import { TMDBGenreEndpoint } from "@/api/tmdb/TMDBGenreEndpoint";
import { GenreProviderService } from "../GenreProviderService";
import { GenresResult } from "@/types/api/genre/GenresResult";
import { MultiGenre } from "@/types/api/multi/MultiGenre";


export class TMDBGenreProviderService extends GenreProviderService {
    
    async find(): Promise<MultiGenre> {
        
        const endpoint = new TMDBGenreEndpoint()

        const [ moviesGenres, tvGenres ] = await Promise.all([
            endpoint.findMovieList(),
            endpoint.findTVList() 
        ]);

        const multiGenres : MultiGenre = {
            movie: moviesGenres,
            tv: tvGenres
        }

        return multiGenres;
    }

}