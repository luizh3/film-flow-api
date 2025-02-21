import { SearchMoviesResultType } from "@/types/api/SearchMoviesResultType";
import { SectionFiltersType } from "@/types/api/section/SectionFiltersType";

export abstract class SectionService {
    abstract findBySection( sectionFilters : SectionFiltersType ) : Promise<SearchMoviesResultType>
}