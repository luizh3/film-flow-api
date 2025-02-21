import { TMDBSearchMultiEndpoint } from "@/api/tmdb/TMDBSearchMultiEndpoint";
import { MultiProviderService } from "../MultiProviderService";
import { MultiFiltersParamsType } from "@/types/api/multi/MulitFiltersParamsType";
import { SearchMoviesResultType } from "@/types/api/SearchMoviesResultType";

export class TMDBMultiProviderService extends MultiProviderService {
    
    async findByName( filters: MultiFiltersParamsType ) : Promise<SearchMoviesResultType> {
        return await new TMDBSearchMultiEndpoint().find( filters );
    }

}