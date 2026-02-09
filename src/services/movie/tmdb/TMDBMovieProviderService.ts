import { MultiSearchFilter } from "@/types/api/MultiSearchFilter";
import { SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { TMDBMovieEndpoint } from "@/api/tmdb/TMDBMovieEndpoint";
import { MovieProviderService } from "../MovieProviderService";

export class TMDBMovieProviderService extends MovieProviderService {

    async findByFilters( filters: MultiSearchFilter ): Promise<SearchMoviesResult> {
        return await new TMDBMovieEndpoint().findByFilters( filters );
    }

}