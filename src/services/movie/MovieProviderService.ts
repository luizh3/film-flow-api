import { MultiSearchFilter } from "@/types/api/MultiSearchFilter";
import { SearchMoviesResult } from "@/types/api/SearchMoviesResult";

export abstract class MovieProviderService {
    abstract findByFilters( filters : MultiSearchFilter ) : Promise<SearchMoviesResult> 
}