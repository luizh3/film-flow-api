import redisClient from "@/config/cache/redis/RedisConfig";
import { MovieProviderEnum } from "@/enum/MovieProviderEnum";
import { SectionTypeEnum } from "@/enum/SectionTypeEnum";
import { ShowTypeEnum } from "@/enum/ShowTypeEnum";
import { StatusCodes } from "@/enum/StatusCode";
import { GenreServiceFactory } from "@/services/movie/factory/GenreServiceFactory";
import { Config } from "@/types/api/config/Config";
import { Section } from "@/types/api/config/Section";
import { MultiGenre } from "@/types/api/multi/MultiGenre";
import { FastifyReply, FastifyRequest } from "fastify";

export class ConfigController {

    private readonly tpProvider : MovieProviderEnum = process.env.TP_PROVIDER as MovieProviderEnum;

    public find = async ( request: FastifyRequest, reply: FastifyReply ) => {

        const genreService = GenreServiceFactory.create( this.tpProvider );

        const multiGenre : MultiGenre = await genreService.find();

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