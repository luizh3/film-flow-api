import { SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { SectionFilters } from "@/types/api/section/SectionFilters";

export abstract class SectionService {
    abstract findBySection( sectionFilters : SectionFilters ) : Promise<SearchMoviesResult>
}