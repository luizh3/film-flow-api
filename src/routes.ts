import { FastifyInstance, FastifyPluginOptions } from "fastify";

import userRoutes from "./routes/UserRoutes";
import configRoutes from "./routes/ConfigRoutes";
import multiRoutes from "./routes/MultiRoutes";
import movieRoutes from "./routes/MovieRoutes";
import tvRoutes from "./routes/TVRoutes";
import sectionRoutes from "./routes/SectionRoute";
import authRoutes from "./routes/AuthRoutes";
import reviewRoutes from "./routes/ReviewRoutes";
import notificationRoutes from "./routes/NotificationRoutes";
import type { Container } from "@/container";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions & { container: Container }) {

    const { container } = options;

    fastify.register(userRoutes, { prefix: "/user", userController: container.userController });
    fastify.register(multiRoutes, { prefix: "/multi", multiController: container.multiController });
    fastify.register(configRoutes, { prefix: "/config", configController: container.configController });
    fastify.register(movieRoutes, { prefix: "/movie", movieController: container.movieController });
    fastify.register(tvRoutes, { prefix: "/tv", tvController: container.tvController });
    fastify.register(sectionRoutes, { prefix: "/section", sectionController: container.sectionController });
    fastify.register(authRoutes, { prefix: "/auth", userController: container.userController });
    fastify.register(reviewRoutes, { prefix: "/review", reviewController: container.reviewController });
    fastify.register(notificationRoutes, { prefix: "/notification", notificationController: container.notificationController });

}