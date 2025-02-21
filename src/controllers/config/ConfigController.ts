import redisClient from "@/config/cache/redis/RedisConfig";
import { MovieProviderEnum } from "@/enum/MovieProviderEnum";
import { SectionTypeEnum } from "@/enum/SectionTypeEnum";
import { ShowTypeEnum } from "@/enum/ShowTypeEnum";
import { StatusCodes } from "@/enum/StatusCode";
import { GenreServiceFactory } from "@/services/movie/factory/GenreServiceFactory";
import { ConfigType } from "@/types/api/config/ConfigType";
import { SectionType } from "@/types/api/config/SectionType";
import { MultiGenreType } from "@/types/api/multi/MultiGenreType";
import { FastifyReply, FastifyRequest } from "fastify";

export class ConfigController {

    private readonly tpProvider : MovieProviderEnum = process.env.TP_PROVIDER as MovieProviderEnum;

    public find = async ( request: FastifyRequest, reply: FastifyReply ) => {

        const genreService = GenreServiceFactory.create( this.tpProvider );

        const multiGenre : MultiGenreType = await genreService.find();

        const config : ConfigType = {
            ...multiGenre,
            sections: this.sections()
        }

        reply.status( StatusCodes.OK ).send( config );
    }

    public sections = () : SectionType[] => {

        const sections : SectionType[] = [
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