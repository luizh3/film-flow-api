import { MultiGenre } from "@/types/api/multi/MultiGenre";

export abstract class GenreProviderService {
    abstract find() : Promise<MultiGenre>;
}