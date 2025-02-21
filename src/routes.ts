import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";

import userRoutes from "./routes/UserRoutes";
import configRoutes from "./routes/ConfigRoutes";
import multiRoutes from "./routes/MultiRoutes";
import movieRoutes from "./routes/MovieRoutes";
import tvRoutes from "./routes/TVRoutes";
import sectionRoutes from "./routes/SectionRoute";

export async function routes( fastify: FastifyInstance, options: FastifyPluginOptions ) {

    fastify.register( userRoutes, { prefix: "/user"} );
    fastify.register( multiRoutes, { prefix: "/multi"} );
    fastify.register( configRoutes, { prefix: "/config"} );
    fastify.register( movieRoutes, { prefix: "/movie"} );
    fastify.register( tvRoutes, { prefix: "/tv" } );
    fastify.register( sectionRoutes, { prefix: "/section" } );

}