import { MultiSearchFilterType } from "@/types/api/MultiSearchFilterType";
import { SearchMoviesResultType } from "@/types/api/SearchMoviesResultType";
import { TVProviderService } from "../TVProviderService";
import { TMDBTVEndpoint } from "@/api/tmdb/TMDBTVEndpoint";

export class TMDBTVProviderService extends TVProviderService {

    async findByFilters( filters: MultiSearchFilterType ): Promise<SearchMoviesResultType> {
        return await new TMDBTVEndpoint().findByFilters( filters );
    }

}