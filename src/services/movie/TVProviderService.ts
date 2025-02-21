import { MultiSearchFilterType } from "@/types/api/MultiSearchFilterType";
import { SearchMoviesResultType } from "@/types/api/SearchMoviesResultType";

export abstract class TVProviderService {
    abstract findByFilters( filters : MultiSearchFilterType ) : Promise<SearchMoviesResultType> 
}