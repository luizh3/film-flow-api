import { MovieInformation } from "@/types/api/MovieInformation";
import { MultiFiltersParams } from "@/types/api/multi/MultiFiltersParams";
import { SearchMoviesResult } from "@/types/api/SearchMoviesResult";

export abstract class MultiProviderService {
    abstract findByName(filters: MultiFiltersParams): Promise<SearchMoviesResult>;
    abstract findById(id: number, filter: MultiFiltersParams): Promise<MovieInformation>;
}