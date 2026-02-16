import Fastify from "fastify";
import cors from '@fastify/cors'
import websocket from "@fastify/websocket";

import { routes } from "@/routes";
import { createContainer } from "@/container";
import { ExceptionHandlingController } from "./exceptions/ExceptionHandlerController";

import swaggerConfig from "./config/swagger/SwaggerConfig";
import authenticationMiddleware from "./config/authentication/AuthenticationMiddleware";
import logerConfig from "./config/logger/LoggerConfig";
import cacheConfig from "./config/cache/CacheConfig";
import { cache } from "./config/cache/Cache";
import cacheMiddleware from "./config/cache/CacheMiddleware";
import websocketConfig from "./config/websocket/WebsocketConfig";
import { websocketsRoutes } from "./websocketsRoutes";
import generalConfig from "./config/cache/GeneralConfig";

const fastify = Fastify({
  logger: true
});

cacheConfig();
generalConfig(fastify);
logerConfig(fastify);
swaggerConfig(fastify);
authenticationMiddleware(fastify);
cacheMiddleware(fastify);
websocketConfig(fastify);

fastify.register(cors);
fastify.register(websocket);

fastify.register(websocketsRoutes);

const container = createContainer();
fastify.register(routes, { prefix: "/api", container });

fastify.setErrorHandler(new ExceptionHandlingController().handle);

const start = async () => {

  const port = 3333;

  try {

    await cache.start();
    await fastify.listen({ port: 3333 })

  } catch (error) {

    console.error(error)
    process.exit(1)

  }

  console.log(`Server listening at ${port}`)

}

start();
