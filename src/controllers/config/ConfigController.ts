import { SectionTypeEnum } from "@/enum/SectionTypeEnum";
import { ShowTypeEnum } from "@/enum/ShowTypeEnum";
import { StatusCodes } from "@/enum/StatusCode";
import { GenreProviderService } from "@/services/movie/GenreProviderService";
import { Config } from "@/types/api/config/Config";
import { Section } from "@/types/api/config/Section";
import { MultiGenre } from "@/types/api/multi/MultiGenre";
import { FastifyReply, FastifyRequest } from "fastify";

export class ConfigController {

    constructor(private readonly genreProviderService: GenreProviderService) {}

    public find = async ( request: FastifyRequest, reply: FastifyReply ) => {

        const multiGenre : MultiGenre = await this.genreProviderService.find();

        const config : Config = {
            ...multiGenre,
            sections: this.sections()
        }

        reply.status( StatusCodes.OK ).send( config );
    }

    public sections = () : Section[] => {

        const sections : Section[] = [
            {
                key: SectionTypeEnum.TOP_RATED as string,
                name: "Top rated",
                type: ShowTypeEnum.TV
            },
            {
                key: SectionTypeEnum.POPULAR as string,
                name: "Popular",
                type: ShowTypeEnum.MOVIE
            },
        ]

        return sections; 

    }

}