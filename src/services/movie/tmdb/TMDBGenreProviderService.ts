import { TMDBGenreEndpoint } from "@/api/tmdb/TMDBGenreEndpoint";
import { GenreProviderService } from "../GenreProviderService";
import { GenresResultType } from "@/types/api/genre/GenresResultType";
import { MultiGenreType } from "@/types/api/multi/MultiGenreType";


export class TMDBGenreProviderService extends GenreProviderService {
    
    async find(): Promise<MultiGenreType> {
        
        const endpoint = new TMDBGenreEndpoint()

        const [ moviesGenres, tvGenres ] = await Promise.all([
            endpoint.findMovieList(),
            endpoint.findTVList() 
        ]);

        const multiGenres : MultiGenreType = {
            movie: moviesGenres,
            tv: tvGenres
        }

        return multiGenres;
    }

}