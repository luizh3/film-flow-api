import { TMDBSearchMultiEndpoint } from "@/api/tmdb/TMDBSearchMultiEndpoint";
import { MultiProviderService } from "../MultiProviderService";
import { MultiFiltersParams } from "@/types/api/multi/MultiFiltersParams";
import { SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { MovieInformation } from "@/types/api/MovieInformation";

export class TMDBMultiProviderService extends MultiProviderService {

    async findByName(filters: MultiFiltersParams): Promise<SearchMoviesResult> {
        return await new TMDBSearchMultiEndpoint().find(filters);
    }

    async findById(id: number, filters: MultiFiltersParams): Promise<MovieInformation> {
        return await new TMDBSearchMultiEndpoint().findById(id, filters);
    }

}