import { MultiSearchFilterType } from "@/types/api/MultiSearchFilterType";
import { SearchMoviesResultType } from "@/types/api/SearchMoviesResultType";
import { TMDBMovieEndpoint } from "@/api/tmdb/TMDBMovieEndpoint";
import { MovieProviderService } from "../MovieProviderService";

export class TMDBMovieProviderService extends MovieProviderService {

    async findByFilters( filters: MultiSearchFilterType ): Promise<SearchMoviesResultType> {
        return await new TMDBMovieEndpoint().findByFilters( filters );
    }

}