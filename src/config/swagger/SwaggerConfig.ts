import { FastifyInstance } from "fastify";

function informations() {
    return {
        openapi: {
            openapi: '3.0.0',
            info: {
                title: 'Film Flow API',
                description: 'A Middleware for get movies from multiple providers, with educacional / personal purpose.',
                version: '1.0.0'
            },
            servers: [
                {
                    url: 'http://localhost:3333',
                    description: 'Development server'
                }
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    }
                }
            },
            security: [
                {
                    bearerAuth: []
                }
            ],
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            }
        }
    }
}

export default function swaggerConfig(fastify: FastifyInstance) {
    fastify.register(import("@fastify/swagger"), informations())

    fastify.register(import("@fastify/swagger-ui"), {
        routePrefix: "/docs"
    })
}
