import { MultiFiltersParamsType } from "@/types/api/multi/MulitFiltersParamsType";
import { SearchMoviesResultType } from "@/types/api/SearchMoviesResultType";

export abstract class MultiProviderService {
    abstract findByName( filters : MultiFiltersParamsType ) : Promise<SearchMoviesResultType>;
}