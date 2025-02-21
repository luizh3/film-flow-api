import { MultiGenreType } from "@/types/api/multi/MultiGenreType";

export abstract class GenreProviderService {
    abstract find() : Promise<MultiGenreType>;
}