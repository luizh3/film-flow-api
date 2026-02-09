import { MultiSearchFilter } from "@/types/api/MultiSearchFilter";
import { SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { TVProviderService } from "../TVProviderService";
import { TMDBTVEndpoint } from "@/api/tmdb/TMDBTVEndpoint";

export class TMDBTVProviderService extends TVProviderService {

    async findByFilters( filters: MultiSearchFilter ): Promise<SearchMoviesResult> {
        return await new TMDBTVEndpoint().findByFilters( filters );
    }

}