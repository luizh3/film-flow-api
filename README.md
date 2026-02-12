### Description 

A middleware to integrate some movie providers, it does not store information about the movies that could replace the requests made to the provider, however... it keeps the data in cache for one hour so as not to cause excessive requests.

For now it is a very basic code, but in the future it would be interesting to create interface templates so that it would not be necessary to create code to approve a new provider.

This project has educational objectives only.

### Get starter

- If you don't want to use Redis to store cache, change `config/cache/cacheConfig` for use DefaultCache

#### Env variables

- Create a .env file on the root directory

| Variável            | Descrição               | Exemplo                              |
|---------------------|-------------------------|--------------------------------------|
| `DATABASE_URL`      | Database connection URL | `postgresql://postgres:postgres@localhost:5432/prisma?schema=public` |
| `TP_PROVIDER`      | Provider                | `TMDB`                               |
| `ACCESS_TOKEN_TMDB`| Token TMDB              | `Bearer token`                       |
| `API_URL_TMDB`     | TMDB api url            | `https://api.themoviedb.org/3`       |

### Tools

- Typescript how Language
- [Fastify](https://fastify.dev/docs/latest/) how Framework

- [Prisma](https://www.prisma.io/docs) with PSQL
- [Redis](https://redis.io/docs/latest/) for cache
- Swagger for documentation

### Providers

- [TMDB](https://developer.themoviedb.org/reference/intro/getting-started)
 
## Project Architecture

This project follows a layered architecture with a clear separation of responsibilities, making it easier to maintain, test, and evolve.

- **Routes:** files in `src/routes.ts` and `src/routes/` map HTTP endpoints to controllers.
- **Controllers:** in `src/controllers/` orchestrate requests, validate input, and call `services`.
- **Services:** in `src/services/` contain business logic and coordinate operations between repositories, cache, and external integrations.
- **Repositories:** in `src/repositories/` (and `src/repositorys/`) abstract database (Prisma) access and persistence.
- **Mappers:** in `src/mappers/` convert data between database models, DTOs, and responses from external APIs.
- **API Providers / Integrations:** in `src/api/` centralize integrations with external providers (e.g., TMDB).
- **Cache:** in `src/config/cache/` (Redis or `DefaultCache`) reduces calls to external providers.
- **Config and Utils:** in `src/config/` and `src/utils/` hold configuration, middlewares, and reusable helpers.
- **Websockets:** in `src/websockets/` and `src/websockets/manager/` for real-time communication (notifications).
- **Types:** in `src/types/` shared typings and DTOs.

Typical request flow:
1. The request hits the **Routes** (`src/routes/`).
2. The **Route** invokes the corresponding **Controller**.
3. The **Controller** calls the appropriate **Service**.
4. The **Service** queries **Repositories** (and possibly the cache) and external integrations via `src/api/`.
5. **Mappers** adjust the data for the response.
6. The **Controller** returns the response to the client.

### Redis Setup

- `docker network create redis-network`
- `docker run -d --network redis-network -v data:/data --name redis redis redis-server`
- `docker run -d --network redis-network --name redisinsight -p 5540:5540 redis/redisinsight:latest -v redisinsight:/data`

### Swagger 

- `http://<API_HOST>/docs`

### Docker Compose

- Coming soon

### Unit Test

- Coming soon

### CI/CD

- Coming soon

