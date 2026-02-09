import { NotificationsManager } from "@/websockets/manager/NotificationsManager";
import { FastifyInstance } from "fastify";

export default async function websocketConfig(
    fastify: FastifyInstance
) {
    fastify.decorate(
        "notificationsManager",
        new NotificationsManager()
    );
}
